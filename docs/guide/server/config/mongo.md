# MongoDB 配置

MongoDB 连接配置，在 `initialize/mongo.go` 中通过 `Mongo.Uri()` 拼接连接串并初始化，仅在 `system.use-mongo` 开启时生效（见 `core/server.go`）。

### yaml

```yaml
# mongo configuration
mongo:
  coll: ''
  options: ''
  database: ''
  username: ''
  password: ''
  auth-source: ''
  min-pool-size: 0
  max-pool-size: 100
  socket-timeout-ms: 0
  connect-timeout-ms: 0
  is-zap: false
  hosts:
    - host: ''
      port: ''
```

### struct

```go
type Mongo struct {
	Coll             string       `json:"coll" yaml:"coll" mapstructure:"coll"`                                           // collection name
	Options          string       `json:"options" yaml:"options" mapstructure:"options"`                                  // mongodb options
	Database         string       `json:"database" yaml:"database" mapstructure:"database"`                               // database name
	Username         string       `json:"username" yaml:"username" mapstructure:"username"`                               // 用户名
	Password         string       `json:"password" yaml:"password" mapstructure:"password"`                               // 密码
	AuthSource       string       `json:"auth-source" yaml:"auth-source" mapstructure:"auth-source"`                      // 验证数据库
	MinPoolSize      uint64       `json:"min-pool-size" yaml:"min-pool-size" mapstructure:"min-pool-size"`                // 最小连接池
	MaxPoolSize      uint64       `json:"max-pool-size" yaml:"max-pool-size" mapstructure:"max-pool-size"`                // 最大连接池
	SocketTimeoutMs  int64        `json:"socket-timeout-ms" yaml:"socket-timeout-ms" mapstructure:"socket-timeout-ms"`    // socket超时时间
	ConnectTimeoutMs int64        `json:"connect-timeout-ms" yaml:"connect-timeout-ms" mapstructure:"connect-timeout-ms"` // 连接超时时间
	IsZap            bool         `json:"is-zap" yaml:"is-zap" mapstructure:"is-zap"`                                     // 是否开启zap日志
	Hosts            []*MongoHost `json:"hosts" yaml:"hosts" mapstructure:"hosts"`                                        // 主机列表
}

type MongoHost struct {
	Host string `json:"host" yaml:"host" mapstructure:"host"` // ip地址
	Port string `json:"port" yaml:"port" mapstructure:"port"` // 端口
}
```

### description

| 配置名 | 类型 | 默认值 | 说明 |
| :----- | :--- | :----- | :--- |
| coll | string | 空 | collection name |
| options | string | 空 | mongodb options（拼接到连接串 `?` 之后） |
| database | string | 空 | database name |
| username | string | 空 | 用户名 |
| password | string | 空 | 密码 |
| auth-source | string | 空 | 验证数据库 |
| min-pool-size | uint64 | 0 | 最小连接池 |
| max-pool-size | uint64 | 100 | 最大连接池 |
| socket-timeout-ms | int64 | 0 | socket超时时间（毫秒） |
| connect-timeout-ms | int64 | 0 | 连接超时时间（毫秒） |
| is-zap | bool | false | 是否开启zap日志 |
| hosts | []MongoHost | - | 主机列表，每项含 host（ip地址）与 port（端口） |

### 注意事项

- `Mongo.Uri()` 方法（`config/mongo.go`）会把 `hosts` 中非空的 host:port 用逗号拼接，生成 `mongodb://host1:port1,host2:port2/database[?options]` 形式的连接串。
- 使用前需将 `system.use-mongo` 设为 `true`，见 [System 系统配置](./system)。
