# 定时任务

## 开放接口说明
接口地址 : gin-vue-admin/server/utils/timer/Timer
```go
type Timer interface {
	// 通过函数的方法添加任务
	AddTaskByFunc(taskName string, spec string, task func()) (cron.EntryID, error)
	// 通过接口的方法添加任务 要实现一个带有 Run方法的接口触发
	AddTaskByJob(taskName string, spec string, job interface{ Run() }) (cron.EntryID, error)
	// 获取对应taskName的cron 可能会为空
	FindCron(taskName string) (*cron.Cron, bool)
	// StartTask 指定taskName开始执行
	StartTask(taskName string)
	// StopTask 指定taskName停止任务
	StopTask(taskName string)
	// Remove 从taskName 删除指定任务
	Remove(taskName string, id int)
	// Clear 清除taskName任务
	Clear(taskName string)
	// 关闭回收资源
	Close()
}
```

## 使用Demo
```go
type Job struct{}

func (j *Job) Run() {
	fmt.Println("testFunc") // 每天打印一遍
}

func Demo() {
	// 在gva中 global.GVA_Timer 已经是初始化Timer对象供使用
	// 如果你想自己调用 utils.NewTimerTask() 即可拿到 Timer 接口
	// demo 演示
	t := utils.NewTimerTask()
	// spec 定时任务详细配置参考 https://pkg.go.dev/github.com/robfig/cron?utm_source=godoc
	// 同一个 taskName 中也可以设置多个任务
	id , err := t.AddTaskByFunc("testFunc", "@daily", func() {
		fmt.Println("testFunc") // 每天打印一遍
	})
	if err != nil {
		// ...
    }
	// job 实例
	id1 , err1 := t.AddTaskByJob("testFunc", "@daily", &Job{})
	if err1 != nil {
	     // ...   	    
	} 

	// 使用 AddTaskByFunc AddTaskByJob 添加的任务默认是激活状态
	// 想要停止调用 StopTask 即可
	t.StopTask("testFunc")

	// 也可以调用 t.FindCron() 获取cron原生对象,调用它的更多方法

	// t.Remove() 删除任务
	t.Remove("testFunc",id)
    
	
	
	// t.Close() 释放资源
	t.Close()
}

```

## 项目内示例

文件路径`gin-vue-admin/server/initialize/timer.go`

```go
package initialize

import (
	"fmt"
	"github.com/flipped-aurora/gin-vue-admin/server/task"

	"github.com/robfig/cron/v3"

	"github.com/flipped-aurora/gin-vue-admin/server/global"
)

func Timer() {
	go func() {
		var option []cron.Option
		option = append(option, cron.WithSeconds())
		// 清理DB定时任务
		_, err := global.GVA_Timer.AddTaskByFunc("ClearDB", "@daily", func() {
			err := task.ClearTable(global.GVA_DB) // 定时任务方法定在task文件包中
			if err != nil {
				fmt.Println("timer error:", err)
			}
		}, option...)
		if err != nil {
			fmt.Println("add timer error:", err)
		}

		// 其他定时任务定在这里 参考上方使用方法

		//_, err := global.GVA_Timer.AddTaskByFunc("定时任务标识", "corn表达式", func() {
		//	具体执行内容...
		//  ......
		//}, option...)
		//if err != nil {
		//	fmt.Println("add timer error:", err)
		//}
	}()
}
```
