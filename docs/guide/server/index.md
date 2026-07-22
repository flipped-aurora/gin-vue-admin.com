# 后端知识库

## 后端目录结构


> **server文件夹为Golang后端项目,需要有Golang基础,Gin框架基础**

当前目录结构对应 v3.0.0（`global/version.go` 中 `Version = "v3.0.0"`）。

## server项目结构

```shell
├── api
│   └── v1
│       ├── system
│       ├── media
│       └── example
├── cmd
│   ├── gva
│   └── mcp
├── config
├── core
│   └── internal
├── docs
├── global
├── initialize
│   └── internal
├── internal
│   └── testutil
├── mcp
├── middleware
├── model
│   ├── system
│   ├── media
│   ├── example
│   └── common
│       ├── request
│       └── response
├── plugin
├── resource
├── router
├── service
├── source
├── task
└── utils
    ├── timer
    └── upload
```

| 文件夹       | 说明                    | 描述                        |
| ------------ | ----------------------- | --------------------------- |
| `api`        | api层                   | api层 |
| `--v1`       | v1版本接口              | 按 `system`（系统功能）、`media`（v3.0 新增：文件上传下载、附件分类、大文件分片）、`example`（客户示例）分为三组，`enter.go` 仅挂载这三组 |
| `cmd`        | 命令行入口              | `cmd/gva`：基于 cobra 的动态 CLI（内置 login/set-base-url/version，其余子命令按 manifest 动态挂载）；`cmd/mcp`：MCP 独立服务入口（Streamable HTTP） |
| `config`     | 配置包                  | config.yaml对应的配置结构体，v3.0 新增 `media.go`、`app.go` |
| `core`       | 核心文件                | 核心组件(viper, zap, server)的初始化；`server.go` 提供 RunServer，`server_run.go` 负责跨平台启动与优雅关闭 |
| `--internal` | 核心内部实现            | `constant`（配置文件名/环境变量常量）、`zap_core`（自定义 ZapCore）、`cutter`（日志切割） |
| `docs`       | swagger文档目录         | swagger文档目录 |
| `global`     | 全局对象                | GVA_DB、GVA_DBList、GVA_REDIS、GVA_REDISList、GVA_MONGO、GVA_CONFIG、GVA_VP、GVA_LOG、GVA_Timer、GVA_Concurrency_Control、GVA_ROUTERS、GVA_MCP_SERVER、GVA_CACHE（v3.0 新增，类型为 `utils/gva_cache.Cache`）等 |
| `initialize` | 初始化 | router、redis、gorm、validator、timer、gva_cache、data_scope、timed_task、ensure_tables（建表）等的初始化 |
| `--internal` | 初始化内部函数 | gorm 的 logger 自定义,在此文件夹的函数只能由 `initialize` 层进行调用 |
| `internal`   | 内部包                  | 仅项目内部使用的代码 |
| `--testutil` | 测试工具包              | NewMemoryDB、InitMemoryCache、InitNopLogger、LoadConfig、NewRedisOrSkip 等测试辅助函数 |
| `mcp`        | MCP 工具层              | MCP 工具注册表与 14 个内置工具实现 |
| `middleware` | 中间件层 | 用于存放 `gin` 中间件代码，v3.0 共 14 个：request_meta（链路追踪）、access_log（访问日志）、operation（操作记录）、jwt（鉴权）、must_change_pwd（强制改密守卫）、casbin_rbac（鉴权）、data_scope（数据权限）、limit_ip（IP限流）、cors、error（GinRecovery）、logger、email、timeout、loadtls |
| `model`      | 模型层                  | 模型对应数据表，按 `system`/`media`/`example`/`common` 分组 |
| `--request`  | 入参结构体              | 接收前端发送到后端的数据。  |
| `--response` | 出参结构体              | 返回给前端的数据结构体      |
| `plugin`     | 插件层                  | 内置插件：ai、announcement、auto、email、plugin-tool |
| `resource`   | 静态资源文件夹          | 负责存放静态文件（excel、page、template、package、mcp、api_cli、plugin 等子目录） |
| `router`     | 路由层                  | 路由层 |
| `service`    | service层               | 存放业务逻辑问题 |
| `source` | source层 | 注册式初始化数据（api、casbin、authority、user、menu、dictionary、timed_task、department、security_config、media 示例等） |
| `task`       | 定时任务                | 定时任务注册表（registry.go、clearTable.go） |
| `utils`      | 工具包                  | 工具函数封装：claims、jwt、validator、human_duration、hash、password_complexity、casbin_util、directory、file_meta、fmt_plus、server（服务器监控）、system_events、datascope、gva_cache、logger、captcha、timer、upload、sse、stacktrace、request、ast、autocode、plugin 等 |
| `--timer` | timer | 定时器接口封装 |
| `--upload`      | oss                  | oss接口封装（接口 + 8 种实现 + chunk 分片）        |
