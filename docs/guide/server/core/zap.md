# zap

Gin-Vue-Admin 的日志体系基于 [zap](https://pkg.go.dev/go.uber.org/zap) 构建，v3.0 在其上做了大幅增强，主要组成部分：

| 位置 | 职责 |
| ---- | ---- |
| `core/zap.go` | 初始化 `global.GVA_LOG`：按级别拆分多个 ZapCore 再合并 |
| `core/internal/zap_core.go` | 自定义 ZapCore：控制台路由、子目录路由、Error 级日志自动入库 |
| `core/internal/cutter.go` | 日志文件按日期切割与保留天数清理 |
| `utils/logger` | Context 日志包：自动携带 request_id/trace_id 等链路与请求字段 |
| `middleware/request_meta.go` | 链路追踪：request_id / trace_id / span_id 的提取、生成与透传 |
| `middleware/access_log.go` | 访问日志（Access Log）：记录每次 HTTP 请求的结构化字段 |

> 全局中间件在 `server/initialize/router.go` 中注册，顺序为 `RequestMeta()` → `GinRecovery(true)` → `AccessLog()`。RequestMeta 必须最先注册，保证 panic 日志与 `X-Request-Id` 响应头都带 request_id。

## 配置说明

Zap日志库的配置选择在 config.yaml (./server/config.yaml)下的zap

```yaml
# zap logger configuration
zap:
  level: 'info'
  format: 'console'
  prefix: '[GIN-VUE-ADMIN]'
  director: 'log'
  show-line: true
  encode-level: 'LowercaseColorLevelEncoder'
  stacktrace-key: 'stacktrace'
  log-in-console: true
  retention-day: 7
  access-req-body: true
  access-resp-data: true
  access-req-headers: true
  access-log-max-bytes: 1024
  file-only-modules:
    - http
    - sql
```

| 配置名         | 配置的类型 | 说明                                                         |
| -------------- | ---------- | ------------------------------------------------------------ |
| level          | string     | level的模式的详细说明,请看[zap官方文档](https://pkg.go.dev/go.uber.org/zap?tab=doc#pkg-constants) <br />info: info模式,无错误的堆栈信息,只输出信息<br />debug:debug模式,有错误的堆栈详细信息<br />warn:warn模式<br />error: error模式,有错误的堆栈详细信息<br />dpanic: dpanic模式<br />panic: panic模式<br />fatal: fatal模式<br /> |
| format         | string     | console: 控制台形式输出日志<br />json: json格式输出日志（时间戳输出 RFC3339Nano，方便 Vector/Fluent Bit/Promtail 等采集器解析）      |
| prefix         | string     | 日志的前缀（console 格式下拼在时间前）                       |
| director       | string     | 存放日志的文件夹,修改即可,不需要手动创建                     |
| show-line      | bool       | 显示行号（caller）, 默认为true,不建议修改                    |
| encode-level   | string     | LowercaseLevelEncoder:小写<br /> LowercaseColorLevelEncoder:小写带颜色<br />CapitalLevelEncoder: 大写<br />CapitalColorLevelEncoder: 大写带颜色 |
| stacktrace-key | string     | 堆栈的名称,即在json格式输出日志时的json的key                 |
| log-in-console | bool       | 是否输出到控制台,默认为true                                  |
| retention-day  | int        | 日志保留天数，按天清理过期日志文件，负数表示不清理           |
| access-req-body | bool      | 访问日志是否记录请求体（v3.0 新增，记录前会脱敏）            |
| access-resp-data | bool     | 访问日志是否记录响应体（v3.0 新增）                          |
| access-req-headers | bool   | 访问日志是否记录请求头（v3.0 新增，敏感头会脱敏）            |
| access-log-max-bytes | int  | 访问日志/操作记录中请求体与响应体的最大记录字节数，超出截断；为 0 时兜底 1024（v3.0 新增） |
| file-only-modules | []string | 指定模块（对应 `logger.WithCtx(ctx).Mod("xxx")` 的 xxx）的日志只写文件、不进控制台，即使 log-in-console 为 true（v3.0 新增） |

- 开发环境 || 调试环境配置建议
	- `level:debug`
	- `format:console`
	- `encode-level:LowercaseColorLevelEncoder`或者`encode-leve:CapitalColorLevelEncoder`
- 部署环境配置建议
	- `level:error`
	- `format:json` 
	- `encode-level: LowercaseLevelEncoder `或者 `encode-level:CapitalLevelEncoder`
	- `log-in-console: false` 
- 建议只是建议,按照自己的需求进行即可,给出建议仅供参考

## 初始化流程（core/zap.go）

1. `director` 文件夹不存在时自动创建。
2. 按配置的 `level` 计算需要输出的级别列表，**每个级别创建一个独立的 ZapCore**，再用 `zapcore.NewTee` 合并——因此日志文件按 `director/日期/level.log` 分级别落盘。
3. 通过 `zap.AddStacktrace(zapcore.ErrorLevel)` 让 Error 及以上级别自动附加堆栈；`show-line: true` 时附加 caller（源文件与行号）。
4. 把 `app` 节配置的应用身份作为静态字段注入每条日志：`node`、`app_id`、`env`。

## 自定义 ZapCore（core/internal/zap_core.go）

- **控制台路由**：`log-in-console` 为全局开关；某条日志的 `mod` 字段命中 `file-only-modules` 时，该条日志只写文件不进控制台。
- **子目录路由**：日志字段中带 `business`/`folder`/`directory` 时，该条日志会写入 `director/日期/子目录/level.log` 子目录。
- **Error 自动入库**：Error 及以上级别的日志在写文件的同时自动写入 `sys_error` 表，内容包括来源文件与行号、调用栈、最终业务调用方法的源码片段（通过堆栈解析 + AST 提取），以及 `request_id`/`trace_id`（由 GORM logger 触发的日志会跳过，避免递归）。

## 日志切割（core/internal/cutter.go）

按 `director/日期(2006-01-02)/level.log` 组织日志文件，跨天自动切换新文件；`retention-day` 控制保留天数，过期文件自动清理，负数表示不清理。

## Context 日志（utils/logger）

业务代码中推荐使用 `utils/logger` 包记录日志，自动从 `context.Context` 中提取并输出链路字段：

```go
logger.WithCtx(ctx).Mod("biz").Field("user_id", 1).Info("查询用户成功")
logger.WithCtx(ctx).Mod("biz").Err(err).Error("查询用户失败")
logger.Bg().Mod("system").Info("register swagger handler") // 无 ctx 时用 Bg()
```

- 链式 API：`WithCtx(ctx)` 或 `Bg()` → `Mod()` / `Field()` / `Err()` → `Info` / `Warn` / `Error` / `Debug`。
- 自动从 ctx 输出：`request_id`、`trace_id`、`span_id`、`parent_span_id`、`device_id`、`client_ip`、`http_method`、`http_path`。
- `Err(err)` 会附加 `error_msg` 与 `error_stack` 字段。
- 提供 `InjectTraceHeaders(ctx, req)`，用于出站 HTTP 请求注入链路头，实现链路向下游传播。
- `sanitize.go` 会对 `authorization`、`cookie`、`x-token` 等请求头以及 `password`、`token`、`secret` 等字段自动脱敏，访问日志记录请求头/请求体前都会先脱敏。

## 链路追踪（middleware/request_meta.go）

零配置的链路追踪中间件，处理逻辑：

1. 提取请求头 `X-Request-Id`，不合法或缺失时生成新的 UUID。
2. trace 提取优先级：**合法的 W3C `traceparent` 头** → **`X-Trace-Id` 宽松透传**（兼容非 W3C 格式的自定义网关） → 都没有则本地生成 `trace_id`/`span_id`，保证全链路 trace_id 永不为空。
3. 把 `RequestID`、`TraceID`、`SpanID`、`ParentSpanID`、`DeviceID`（取自 `X-Device-Id`）、`ClientIP` 等注入 `request.Context()`，供 `logger.WithCtx` 消费。
4. 响应回写 `X-Request-Id`、`X-Trace-Id`，trace_id 合法时回写 W3C `traceparent` 头——前端/网关报障时可直接凭 trace_id 关联日志。

## 访问日志（middleware/access_log.go）

每次 HTTP 请求记录一条结构化访问日志（`mod: http`），字段包括：

| 字段 | 说明 |
| ---- | ---- |
| http_route | 路由模板（低基数，用于聚合分组；未命中路由时为 unmatched） |
| http_status | 响应状态码 |
| latency_ms | 请求耗时（毫秒） |
| bytes_in / bytes_out | 请求/响应字节数 |
| user_id / authority_id | 当前用户与角色 |
| ua | User-Agent |
| req_query | 原始 query string |
| error | 是否出错（5xx 或存在 gin 私有错误） |
| req_headers / req_body / resp_data | 按 zap 配置 `access-req-headers`/`access-req-body`/`access-resp-data` 附加，记录前脱敏、超长按 `access-log-max-bytes` 截断 |

::: tip 说明

- 响应体捕获有 1MB 上限（`respCaptureLimit`），SSE 等长连接流式响应不会撑爆内存；该缓冲同时供操作记录（operation 中间件）复用，避免重复读取 body。
- 该中间件还会写响应头 `X-Gva-Version`，标识当前后端版本。
- `mod: http` 默认在 `file-only-modules` 中，因此访问日志默认只写文件、不刷控制台。
:::
