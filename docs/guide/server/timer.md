# 定时任务

v3.0 将定时任务重构为数据库持久化模式：任务定义落库保存，服务启动时自动恢复调度，并配套管理页面、执行日志与失败告警实时推送。

## 数据模型

| 模型 | 表名 | 说明 |
| --- | --- | --- |
| SysTimedTask | sys_timed_tasks | 任务定义（任务唯一事实源，调度状态以 enabled 为准） |
| SysTimedTaskLog | sys_timed_task_logs | 执行日志（触发方式 auto/manual、耗时、结果 success/fail/timeout、错误信息等） |

服务启动时，`main.go` 在建表（RegisterTables）之后调用 `initialize.LoadTimedTasks()`（`server/initialize/timed_task.go`），从 `sys_timed_tasks` 恢复所有启用任务的调度。该调用幂等，运行时 initdb 完成或系统重载后也会再次执行。

## 执行器

任务支持两种执行器类型（executorType）：

- **method**：调用 `server/task/registry.go` 注册表中已注册的 Go 方法。内置注册了 `ClearDB`（清理过期日志：操作记录/JWT 黑名单/定时任务执行日志）与 `CleanStaleUploads`（清理过期大文件上传会话）两个示例。二开时在 `server/initialize/timer.go` 中追加 `task.Register`，然后在面板新建任务选择该方法即可。
- **http**：定时请求指定 URL，可配置请求方法、自定义请求头与请求体。默认禁止访问内网/环回地址（SSRF 防护），确有需要可开启 `httpAllowPrivate` 放行。

method 执行器的任务函数签名为：

```go
type TaskFunc func(ctx context.Context, params json.RawMessage) error
```

ctx 由统一 Runner 注入（已带 datascope.WithSystem 与超时），params 为面板配置的自由 JSON 入参，无参任务忽略即可。

注册示例（`server/initialize/timer.go`）：

```go
func Timer() {
	task.Register("ClearDB", "清理数据库过期日志(操作记录/JWT黑名单/定时任务执行日志)", func(ctx context.Context, _ json.RawMessage) error {
		return task.ClearTable(global.GVA_DB.WithContext(ctx))
	})
}
```

## 管理接口与页面

管理接口位于 `/timedTask/*`：

| 接口 | 方法 | 说明 |
| --- | --- | --- |
| /timedTask/createTimedTask | POST | 创建定时任务 |
| /timedTask/updateTimedTask | PUT | 更新定时任务 |
| /timedTask/deleteTimedTask | DELETE | 删除定时任务 |
| /timedTask/toggleTimedTask | POST | 启用/停用 |
| /timedTask/triggerTimedTask | POST | 手动触发 |
| /timedTask/getTimedTaskList | GET | 任务列表 |
| /timedTask/getTimedTaskLogList | GET | 执行日志 |
| /timedTask/getRegisteredMethods | GET | 已注册方法列表 |
| /timedTask/alertStream | GET | 失败告警订阅（SSE） |

前端页面为 `web/src/view/systemTools/timedTask/index.vue`。

## SSE 实时告警

任务执行失败时，通过 SSE 向前端实时推送告警，订阅端点为 `/timedTask/alertStream`，前端封装在 `web/src/view/systemTools/timedTask/useAlertStream.js`。

推送中枢是 `server/utils/sse/hub.go` 的进程内 SSE Hub，按用户维度管理长连接：

- 单用户最多 10 条并发连接，超出时逐出最早注册的连接；
- 单连接事件缓冲满时直接丢弃本次事件（慢消费者不阻塞发布方）；
- 进程内实现，多实例部署时需自行在上层用共享队列（Redis 等）把事件扇出到每个实例的 Hub。

::: warning
挂载 SSE 长连接的路由绝不能套 TimeoutMiddleware（其 goroutine 加 AbortWithStatusJSON 的模型与流式响应冲突）。优雅停机时会先调用 `sse.Default().Shutdown()` 关闭全部活跃连接（`server/core/server_run.go`），否则 SSE 常驻连接永不空闲，`http.Server` 的 Shutdown 会一直等到超时。
:::

## Timer 接口

底层调度基于 robfig/cron/v3，支持多命名 cron 管理。`global.GVA_Timer` 初始化即 `timer.NewTimerTask()`，接口定义在 `server/utils/timer/timed_task.go`：

```go
type Timer interface {
	// Snapshot 返回全部任务的只读快照(含下次执行时间), 并发安全
	Snapshot() []TaskDetail
	// Deprecated: 返回内部 map, 调用方锁外遍历有竞态; 请改用 Snapshot()
	FindCronList() map[string]*taskManager
	// 添加Task 方法形式以秒的形式加入
	AddTaskByFuncWithSecond(cronName string, spec string, fun func(), taskName string, option ...cron.Option) (cron.EntryID, error)
	// 添加Task 接口形式以秒的形式加入
	AddTaskByJobWithSeconds(cronName string, spec string, job interface{ Run() }, taskName string, option ...cron.Option) (cron.EntryID, error)
	// 通过函数的方法添加任务
	AddTaskByFunc(cronName string, spec string, task func(), taskName string, option ...cron.Option) (cron.EntryID, error)
	// 通过接口的方法添加任务 要实现一个带有 Run方法的接口触发
	AddTaskByJob(cronName string, spec string, job interface{ Run() }, taskName string, option ...cron.Option) (cron.EntryID, error)
	// 获取对应taskName的cron 可能会为空
	FindCron(cronName string) (*taskManager, bool)
	// 指定cron开始执行
	StartCron(cronName string)
	// 指定cron停止执行
	StopCron(cronName string)
	// 查找指定cron下的指定task
	FindTask(cronName string, taskName string) (*task, bool)
	// 根据id删除指定cron下的指定task
	RemoveTask(cronName string, id int)
	// 根据taskName删除指定cron下的指定task
	RemoveTaskByName(cronName string, taskName string)
	// 清理掉指定cronName
	Clear(cronName string)
	// 停止所有的cron
	Close()
}
```

## 使用 Demo

日常任务建议直接通过面板配置（落库持久化，重启自动恢复）。如需在代码中临时调度，可使用 `global.GVA_Timer`：

```go
type Job struct{}

func (j *Job) Run() {
	fmt.Println("testFunc") // 每天打印一遍
}

func Demo() {
	// 在gva中 global.GVA_Timer 已经是初始化Timer对象供使用
	// 如果你想自己调用 timer.NewTimerTask() 即可拿到 Timer 接口
	// demo 演示
	t := timer.NewTimerTask()
	// spec 定时任务详细配置参考 https://pkg.go.dev/github.com/robfig/cron/v3
	// 同一个 cronName 中也可以设置多个任务
	id, err := t.AddTaskByFunc("testFunc", "@daily", func() {
		fmt.Println("testFunc") // 每天打印一遍
	}, "testFunc")
	if err != nil {
		// ...
	}
	// job 实例
	_, err1 := t.AddTaskByJob("testFunc", "@daily", &Job{}, "testJob")
	if err1 != nil {
		// ...
	}

	// 使用 AddTaskByFunc AddTaskByJob 添加的任务默认是激活状态
	// 想要停止调用 StopCron 即可
	t.StopCron("testFunc")

	// 也可以调用 t.FindCron() 获取cron原生对象,调用它的更多方法

	// t.RemoveTask() 删除任务
	t.RemoveTask("testFunc", int(id))

	// t.Close() 释放资源
	t.Close()
}
```

::: tip
遍历全部任务请使用并发安全的 `Snapshot()`；`FindCronList()` 已标记废弃，调用方在锁外遍历其返回的内部 map 存在竞态。
:::
