# JWT 配置

JWT 认证相关配置，在 `utils/jwt.go` 中被消费（签发、解析与缓冲期内自动续签），启动时由 `initialize/other.go` 校验时间格式合法性。

### yaml

```yaml
# jwt configuration
jwt:
  signing-key: 'qmPlus'
  expires-time: 7d
  buffer-time: 1d
  issuer: 'qmPlus'
```

### struct

```go
type JWT struct {
	SigningKey  string `mapstructure:"signing-key" json:"signing-key" yaml:"signing-key"`    // jwt签名
	ExpiresTime string `mapstructure:"expires-time" json:"expires-time" yaml:"expires-time"` // 过期时间
	BufferTime  string `mapstructure:"buffer-time" json:"buffer-time" yaml:"buffer-time"`    // 缓冲时间
	Issuer      string `mapstructure:"issuer" json:"issuer" yaml:"issuer"`                   // 签发者
}
```

### description

| 配置名      | 类型   | 默认值 | 说明      |
| :---------- | :----- | :----- | :-------- |
| signing-key | string | qmPlus | jwt的签名 |
| expires-time | string | 7d | 过期时间，支持 Go duration 格式与 `"7d"` 天数格式（由 `utils/human_duration.go` 解析） |
| buffer-time | string | 1d | 缓冲时间（过期前这段时间内有过请求会刷新jwt续期），同样支持 `"1d"` 天数格式 |
| issuer | string | qmPlus | jwt签发者 |

### 注意事项

- `expires-time`、`buffer-time` 在启动时由 `initialize/other.go` 调用 `utils.ParseDuration` 校验，格式非法会直接 panic。
- 缓冲期机制见 `middleware/jwt.go`：token 已过期但仍在 `expires-time + buffer-time` 之内时，会自动签发新 token 并通过响应头 `new-token` 返回，实现无感续签。
- 未配置 Redis 时，内存缓存后端的默认过期时间也取自 `jwt.expires-time`（见 `initialize/gva_cache.go`）。
