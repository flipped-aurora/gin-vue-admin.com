# CORS 跨域配置

跨域配置，在 `middleware/cors.go` 的 `CorsByRules()` 中被消费，需要配合 `server/initialize/router.go` 中的 `Router.Use(middleware.CorsByRules())` 使用。

### yaml

```yaml
# 跨域配置
cors:
  mode: strict-whitelist # 放行模式: allow-all, 放行全部; whitelist, 白名单模式, 来自白名单内域名的请求添加 cors 头; strict-whitelist 严格白名单模式, 白名单外的请求一律拒绝
  whitelist:
    - allow-origin: example1.com
      allow-headers: Content-Type,AccessToken,X-CSRF-Token, Authorization, Token,X-Token,X-User-Id
      allow-methods: POST, GET
      expose-headers: Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type
      allow-credentials: true # 布尔值
```

### struct

```go
type CORS struct {
	Mode      string          `mapstructure:"mode" json:"mode" yaml:"mode"`
	Whitelist []CORSWhitelist `mapstructure:"whitelist" json:"whitelist" yaml:"whitelist"`
}

type CORSWhitelist struct {
	AllowOrigin      string `mapstructure:"allow-origin" json:"allow-origin" yaml:"allow-origin"`
	AllowMethods     string `mapstructure:"allow-methods" json:"allow-methods" yaml:"allow-methods"`
	AllowHeaders     string `mapstructure:"allow-headers" json:"allow-headers" yaml:"allow-headers"`
	ExposeHeaders    string `mapstructure:"expose-headers" json:"expose-headers" yaml:"expose-headers"`
	AllowCredentials bool   `mapstructure:"allow-credentials" json:"allow-credentials" yaml:"allow-credentials"`
}
```

### description

| 配置名 | 类型   | 默认值 | 说明                                                         |
| ------ | ------ | ------ | ------------------------------------------------------------ |
| mode   | string | strict-whitelist | allow-all：放行全部；whitelist：白名单模式，仅对白名单内域名添加 cors 头；strict-whitelist：严格白名单模式，白名单外的请求一律拒绝 |
| whitelist | []CORSWhitelist | - | 白名单列表，逐项配置 allow-origin、allow-headers、allow-methods、expose-headers、allow-credentials |

### 注意事项

三种模式的行为差异（见 `middleware/cors.go`）：

- `allow-all`：不校验来源，对所有请求添加 cors 头并放行。
- `whitelist`：仅对 Origin 命中白名单的请求添加 cors 头，未命中的请求不加 cors 头但**不拦截**。
- `strict-whitelist`：Origin 未命中白名单的请求一律返回 403，但健康检查 `GET /health` 始终放行。
