# 日志配置

zap 日志配置，在 `core/zap.go` 中初始化全局 logger；访问日志记录开关由 `middleware/access_log.go` 与 `middleware/operation.go` 消费，截断字节数兜底逻辑在 `utils/logger/sanitize.go`。

### yaml

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

### struct

```go
type Zap struct {
	Level             string   `mapstructure:"level" json:"level" yaml:"level"`                                              // 级别
	Prefix            string   `mapstructure:"prefix" json:"prefix" yaml:"prefix"`                                           // 日志前缀
	Format            string   `mapstructure:"format" json:"format" yaml:"format"`                                           // 输出
	Director          string   `mapstructure:"director" json:"director"  yaml:"director"`                                    // 日志文件夹
	EncodeLevel       string   `mapstructure:"encode-level" json:"encode-level" yaml:"encode-level"`                         // 编码级
	StacktraceKey     string   `mapstructure:"stacktrace-key" json:"stacktrace-key" yaml:"stacktrace-key"`                   // 栈名
	ShowLine          bool     `mapstructure:"show-line" json:"show-line" yaml:"show-line"`                                  // 显示行
	LogInConsole      bool     `mapstructure:"log-in-console" json:"log-in-console" yaml:"log-in-console"`                   // 输出控制台
	RetentionDay      int      `mapstructure:"retention-day" json:"retention-day" yaml:"retention-day"`                      // 日志保留天数
	AccessReqBody     bool     `mapstructure:"access-req-body" json:"access-req-body" yaml:"access-req-body"`                // 访问日志记录请求体
	AccessRespData    bool     `mapstructure:"access-resp-data" json:"access-resp-data" yaml:"access-resp-data"`             // 访问日志记录响应体
	AccessReqHeaders  bool     `mapstructure:"access-req-headers" json:"access-req-headers" yaml:"access-req-headers"`       // 访问日志记录请求头
	AccessLogMaxBytes int      `mapstructure:"access-log-max-bytes" json:"access-log-max-bytes" yaml:"access-log-max-bytes"` // 访问日志/操作记录请求体与响应体的最大字节数，超过则截断为占位标记；0 表示用代码兜底默认值
	// 这些模块的日志只进文件，不进控制台（即使 log-in-console 为 true）。
	// 模块名对应 logger.WithCtx(ctx).Mod("xxx") 的 xxx
	FileOnlyModules []string `mapstructure:"file-only-modules" json:"file-only-modules" yaml:"file-only-modules"`
}
```

### description

| 配置名         | 类型   | 默认值 | 说明                                                         |
| -------------- | ------ | ------ | ------------------------------------------------------------ |
| level          | string | info | level的模式的详细说明,请看[zap官方文档](https://pkg.go.dev/go.uber.org/zap?tab=doc#pkg-constants) <br />info: info模式,无错误的堆栈信息,只输出信息 <br />debug:debug模式,有错误的堆栈详细信息 <br />warn:warn模式 <br />error: error模式,有错误的堆栈详细信息 <br />dpanic: dpanic模式 <br />panic: panic模式 <br />fatal: fatal模式 |
| format         | string | console | console: 控制台形式输出日志 json: json格式输出日志           |
| prefix         | string | [GIN-VUE-ADMIN] | 日志的前缀                                                   |
| director       | string | log | 存放日志的文件夹,修改即可,不需要手动创建                     |
| show_line      | bool   | true | 显示行号, 默认为true,不建议修改                              |
| encode_level   | string | LowercaseColorLevelEncoder | LowercaseLevelEncoder:小写 <br />LowercaseColorLevelEncoder:小写带颜色 <br />CapitalLevelEncoder: 大写 <br />CapitalColorLevelEncoder: 大写带颜色 |
| stacktrace_key | string | stacktrace | 堆栈的名称,即在json格式输出日志时的josn的key                 |
| log_in_console | bool   | true | 是否输出到控制台,默认为true                                  |
| retention_day  | int    | 7 | 日志保留天数，负数表示不清理                                 |
| access-req-body | bool | true | 访问日志是否记录请求体（v3.0 新增，记录前会脱敏）            |
| access-resp-data | bool | true | 访问日志是否记录响应体（v3.0 新增）                          |
| access-req-headers | bool | true | 访问日志是否记录请求头（v3.0 新增，authorization/cookie/x-token 等敏感头会脱敏） |
| access-log-max-bytes | int | 1024 | 访问日志/操作记录中请求体与响应体的最大记录字节数，超出截断；为 0 时兜底 1024（v3.0 新增） |
| file-only-modules | []string | - | 指定模块（对应 `logger.WithCtx(ctx).Mod("xxx")` 的 xxx）的日志只写文件、不进控制台，即使 log-in-console 为 true（v3.0 新增） |

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

### 注意事项

- `retention-day` 在 `core/internal/zap_core.go` 中用于日志切割清理，负数表示不清理；官方 `config.yaml` 示例值为 `-1`。
- `access-log-max-bytes` 的兜底逻辑在 `utils/logger/sanitize.go` 的 `AccessLogMaxBytes()`：配置值大于 0 时生效，否则按 1024 处理。
- `app` 节的 node/app-id/env 会作为静态字段注入每条日志，见[其他配置](./other)。
