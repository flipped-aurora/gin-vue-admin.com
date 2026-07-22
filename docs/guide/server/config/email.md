# Email 配置

邮件发送（SMTP）配置，在 `initialize/plugin_biz_v1.go` 中被消费（系统通知邮件插件初始化时读取）。

### yaml

```yaml
# email configuration
email:
  to: 'xxx@qq.com'
  port: 465
  from: 'xxx@163.com'
  host: 'smtp.163.com'
  is-ssl: true
  secret: 'xxx'
  nickname: 'test'
```

### struct

```go
type Email struct {
	To          string `mapstructure:"to" json:"to" yaml:"to"`                               // 收件人:多个以英文逗号分隔 例：a@qq.com b@qq.com 正式开发中请把此项目作为参数使用
	From        string `mapstructure:"from" json:"from" yaml:"from"`                         // 发件人  你自己要发邮件的邮箱
	Host        string `mapstructure:"host" json:"host" yaml:"host"`                         // 服务器地址 例如 smtp.qq.com  请前往QQ或者你要发邮件的邮箱查看其smtp协议
	Secret      string `mapstructure:"secret" json:"secret" yaml:"secret"`                   // 密钥    用于登录的密钥 最好不要用邮箱密码 去邮箱smtp申请一个用于登录的密钥
	Nickname    string `mapstructure:"nickname" json:"nickname" yaml:"nickname"`             // 昵称    发件人昵称 通常为自己的邮箱
	Port        int    `mapstructure:"port" json:"port" yaml:"port"`                         // 端口     请前往QQ或者你要发邮件的邮箱查看其smtp协议 大多为 465
	IsSSL       bool   `mapstructure:"is-ssl" json:"is-ssl" yaml:"is-ssl"`                   // 是否SSL   是否开启SSL
	IsLoginAuth bool   `mapstructure:"is-loginauth" json:"is-loginauth" yaml:"is-loginauth"` // 是否LoginAuth   是否使用LoginAuth认证方式（适用于IBM、微软邮箱服务器等）
}
```

### description

| 配置名       | 类型   | 默认值 | 说明                                                         |
| ------------ | ------ | ------ | ------------------------------------------------------------ |
| to           | string | - | 邮件接收者,可以是多个,<br />以英文逗号(,)进行区分,最好别带空格,如果是一个邮箱最后请不要加英文逗号(,) |
| from         | string | - | 发件人邮箱                                                   |
| host         | string | - | 邮箱的主服务器地址                                           |
| secret       | string | - | 密钥，用于登录的密钥，最好不要用邮箱密码                     |
| nickname     | string | - | 发件人昵称                                                   |
| port         | int    | 465 | 邮件服务端口                                                 |
| is-ssl       | bool   | true | 是否使用SSL                                                  |
| is-loginauth | bool   | false | 是否使用LoginAuth认证方式（适用于IBM、微软邮箱服务器等）     |

### 注意事项

- yaml 示例中未写出 `is-loginauth`，其 Go 零值为 `false`，即默认使用普通 PLAIN 认证；使用 IBM、微软等邮箱服务器时可显式设为 `true`。
- `secret` 建议使用邮箱服务商提供的 SMTP 授权码，而不是邮箱登录密码。
