# MCP 配置

MCP 服务配置，在主服务启动流程（`core/server.go`）与独立服务入口 `cmd/mcp` 中被消费。

### yaml

```yaml
# mcp configuration
mcp:
  name: GVA_MCP
  version: v1.0.0
  addr: 8889
  separate: false
```

### struct

```go
type MCP struct {
	Name            string `mapstructure:"name" json:"name" yaml:"name"`
	Version         string `mapstructure:"version" json:"version" yaml:"version"`
	Path            string `mapstructure:"path" json:"path" yaml:"path"`
	Addr            int    `mapstructure:"addr" json:"addr" yaml:"addr"`
	BaseURL         string `mapstructure:"base_url" json:"base_url" yaml:"base_url"`
	UpstreamBaseURL string `mapstructure:"upstream_base_url" json:"upstream_base_url" yaml:"upstream_base_url"`
	AuthHeader      string `mapstructure:"auth_header" json:"auth_header" yaml:"auth_header"`
	RequestTimeout  int    `mapstructure:"request_timeout" json:"request_timeout" yaml:"request_timeout"`

	// Deprecated fields kept for backward compatibility with older configs.
	SSEPath     string `mapstructure:"sse_path" json:"sse_path" yaml:"sse_path"`
	MessagePath string `mapstructure:"message_path" json:"message_path" yaml:"message_path"`
	UrlPrefix   string `mapstructure:"url_prefix" json:"url_prefix" yaml:"url_prefix"`
	Separate    bool   `mapstructure:"separate" json:"separate" yaml:"separate"`
}
```

### description

| 配置名   | 类型   | 默认值 | 说明                                                         |
| -------- | ------ | ------ | ------------------------------------------------------------ |
| name     | string | GVA_MCP | MCP 服务名称                                                 |
| version  | string | v1.0.0 | MCP 服务版本                                                 |
| path     | string | - | MCP 服务路径                                                 |
| addr     | int    | 8889 | MCP 服务端口（`separate: true` 时独立进程监听）              |
| base_url | string | - | MCP 服务对外基础地址                                         |
| upstream_base_url | string | - | 上游（主服务）基础地址                              |
| auth_header | string | - | 向上游发起请求时携带的认证头                              |
| request_timeout | int | - | 请求超时时间                                          |
| separate | bool   | false | 是否以独立进程方式运行 MCP 服务（已 Deprecated，仅为兼容保留） |

### 注意事项

- `sse_path`、`message_path`、`url_prefix`、`separate` 四个字段已 Deprecated，仅为兼容旧配置保留（见结构体注释），新部署不建议使用。
- 独立 MCP 服务入口在 `cmd/mcp`，使用其自带的 `cmd/mcp/config.yaml`。
