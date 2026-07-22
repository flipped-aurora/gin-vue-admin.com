# System 系统配置

系统级开关配置，在 `core/server.go`（服务端口、各组件初始化分支）、`initialize/gorm.go`（db-type 选择）等处被消费。

### yaml

```yaml
# system configuration
system:
  db-type: 'mysql'
  oss-type: 'local'
  router-prefix: ''
  addr: 8888
  iplimit-count: 15000
  iplimit-time: 3600
  use-multipoint: false
  use-redis: false
  use-mongo: false
  use-strict-auth: false
  disable-auto-migrate: false
```

### struct

```go
type System struct {
	DbType             string `mapstructure:"db-type" json:"db-type" yaml:"db-type"`                         // 数据库类型:mysql(默认)|sqlite|sqlserver|postgresql
	OssType            string `mapstructure:"oss-type" json:"oss-type" yaml:"oss-type"`                      // Oss类型
	RouterPrefix       string `mapstructure:"router-prefix" json:"router-prefix" yaml:"router-prefix"`       // 路由前缀
	Addr               int    `mapstructure:"addr" json:"addr" yaml:"addr"`                                  // 端口值
	LimitCountIP       int    `mapstructure:"iplimit-count" json:"iplimit-count" yaml:"iplimit-count"`       // 限制同IP访问次数
	LimitTimeIP        int    `mapstructure:"iplimit-time" json:"iplimit-time" yaml:"iplimit-time"`          // 限制时间
	UseMultipoint      bool   `mapstructure:"use-multipoint" json:"use-multipoint" yaml:"use-multipoint"`    // 多点登录拦截
	UseRedis           bool   `mapstructure:"use-redis" json:"use-redis" yaml:"use-redis"`                   // 使用redis
	UseMongo           bool   `mapstructure:"use-mongo" json:"use-mongo" yaml:"use-mongo"`                   // 使用mongo
	UseStrictAuth      bool   `mapstructure:"use-strict-auth" json:"use-strict-auth" yaml:"use-strict-auth"` // 使用树形角色分配模式
	DisableAutoMigrate bool   `mapstructure:"disable-auto-migrate" json:"disable-auto-migrate" yaml:"disable-auto-migrate"` // 是否关闭自动迁移数据库
}
```

### description

| 配置名           | 类型   | 默认值 | 说明                                                                                                                                   |
| ---------------- | ------ | ------ |--------------------------------------------------------------------------------------------------------------------------------------|
| addr             | int    | 8888 | 后端服务端口，默认8888                                                                                                                        |
| db-type          | string | mysql | 数据库类型，支持：mysql、pgsql、sqlite、mssql、oracle                                                                                            |
| oss-type         | string | local | 对象存储类型：local（本地存储）、qiniu（七牛云）、aliyun（阿里云）、minio 等<br />local：存储到 `local.path` 目录<br />其他类型需要配置对应的参数                                |
| router-prefix    | string | 空 | 路由前缀，用于API路由统一前缀                                                                                                                     |
| use-multipoint   | bool   | false | 是否启用多点登录拦截（单点登录），默认false                                                                                                            |
| use-redis        | bool   | false | 是否使用Redis缓存，默认false                                                                                                                  |
| iplimit-count    | int    | 15000 | IP限流：指定时间段内同IP最大访问次数，默认15000                                                                                                        |
| iplimit-time     | int    | 3600 | IP限流：限制时间窗口（秒），默认3600                                                                                                               |
| use-mongo        | bool   | false | 是否使用MongoDB数据库，默认false                                                                                                              |
| use-strict-auth  | bool   | false | 是否开启严格角色模式（树形角色分配），默认false                                                                                                         |
| disable-auto-migrate      | bool   | false | 是否禁用自动迁移数据库表结构，默认false，生产环境建议设为 true 手动迁移                                                                                                        |

::: warning 注意
v3.0 起 `env` 字段已从 `System` 结构体移除（config.yaml 中残留的 `system.env` 行不再生效），应用身份配置（node/app-id/env）迁移到了 `app` 节，见[其他配置](./other)。
:::

### 注意事项

- `db-type` 决定 `initialize/gorm.go` 初始化哪种数据库连接，取值与 [数据库配置](./database) 中的顶级节名一一对应。
- `oss-type` 决定 `utils/upload/upload.go` 中 `NewOss()` 返回哪种实现，可选值与配置节对应关系见[对象存储配置](./oss)。
- `use-redis`、`use-multipoint` 控制 `redis`、`redis-list` 的初始化，见 [Redis 配置](./redis)；`use-mongo` 控制 mongo 初始化，见 [MongoDB 配置](./mongo)。
- `use-strict-auth` 开启后权限存在上下级关系，影响 `service/system` 中 API、角色、casbin 的鉴权逻辑。
