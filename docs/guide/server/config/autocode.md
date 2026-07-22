# AutoCode 配置

代码生成器路径配置，在 `service/system/auto_code_*.go` 系列自动代码服务中被消费；`core/viper.go` 启动时会把 `root` 自动适配为项目根目录绝对路径。

### yaml

```yaml
# autocode configuration
autocode:
  web: 'web/src'
  root: ''
  server: 'server'
  module: 'github.com/flipped-aurora/gin-vue-admin/server'
  ai-path: ''
```


### struct

```go
type Autocode struct {
	Web    string `mapstructure:"web" json:"web" yaml:"web"`
	Root   string `mapstructure:"root" json:"root" yaml:"root"`
	Server string `mapstructure:"server" json:"server" yaml:"server"`
	Module string `mapstructure:"module" json:"module" yaml:"module"`
	AiPath string `mapstructure:"ai-path" json:"ai-path" yaml:"ai-path"`
}
```

### description

| 配置名  | 类型   | 默认值 | 说明                                                         |
| ------- | ------ | ------ | ------------------------------------------------------------ |
| web     | string | web/src | 前端项目路径                                                 |
| root    | string | 空 | 项目根目录，启动时自动适配为项目根目录绝对路径，请不要手动配置 |
| server  | string | server | 服务端项目路径                                               |
| module  | string | github.com/flipped-aurora/gin-vue-admin/server | Go模块名称                                                   |
| ai-path | string | 空 | AI服务路径                                                   |

### 注意事项

- `root` 在 `core/viper.go` 中被强制赋值为 `filepath.Abs("..")`（即 server 目录的上一级，项目根目录），yaml 中的配置会被覆盖，不要手动填写。
- `module` 为空时，`initialize/other.go` 会读取 `go.mod` 首行自动填充。
