# Redis 配置

Redis 连接配置，在 `initialize/redis.go` 中初始化（`core/server.go` 在 `system.use-redis` 开启时调用），初始化结果写入 `global.GVA_REDIS` 与 `global.GVA_REDISList`。

## redis

### yaml

```yaml
# redis configuration
redis:
  useCluster: false
  addr: '127.0.0.1:6379'
  password: ''
  db: 0
  clusterAddrs: []
```

### struct

```go
type Redis struct {
	Name         string   `mapstructure:"name" json:"name" yaml:"name"`                         // 代表当前实例的名字
	Addr         string   `mapstructure:"addr" json:"addr" yaml:"addr"`                         // 服务器地址:端口
	Password     string   `mapstructure:"password" json:"password" yaml:"password"`             // 密码
	DB           int      `mapstructure:"db" json:"db" yaml:"db"`                               // 单实例模式下redis的哪个数据库
	UseCluster   bool     `mapstructure:"useCluster" json:"useCluster" yaml:"useCluster"`       // 是否使用集群模式
	ClusterAddrs []string `mapstructure:"clusterAddrs" json:"clusterAddrs" yaml:"clusterAddrs"` // 集群模式下的节点地址列表
}
```

### description

| 配置名        | 类型     | 默认值 | 说明                        |
| ------------- | -------- | ------ | --------------------------- |
| name          | string   | - | 代表当前实例的名字（仅 redis-list 中使用，顶级 redis 节无需配置） |
| addr          | string   | 127.0.0.1:6379 | redis连接地址及端口         |
| password      | string   | 空 | 密码                        |
| db            | int      | 0 | redis的哪个数据库           |
| useCluster    | bool     | false | 是否使用集群模式（集群模式下 addr 和 db 默认无效） |
| clusterAddrs  | []string | [] | 集群模式下的节点地址列表    |

## redis-list

多 Redis 实例配置，仅在 `system.use-multipoint` 开启时初始化（见 `core/server.go`），通过 `global.GetRedis(name)` 获取对应实例。

### yaml

```yaml
# redis-list configuration
redis-list:
  - name: cache           # 数据库的名称,注意: name 需要在 redis-list 中唯一
    useCluster: false     # 是否使用redis集群模式
    addr: 127.0.0.1:6379  # 使用集群模式addr和db默认无效
    password: ""
    db: 0
    clusterAddrs:
      - "172.21.0.3:7000"
      - "172.21.0.4:7001"
      - "172.21.0.2:7002"
```

### struct

```go
RedisList []Redis `mapstructure:"redis-list" json:"redis-list" yaml:"redis-list"`
```

### description

列表元素与上方 `Redis` 结构体完全一致，`name` 必须在 redis-list 中唯一。

### 注意事项

- 顶级 `redis` 节与 `redis-list` 的初始化都以 `system.use-redis: true` 为前提；`redis-list` 额外要求 `system.use-multipoint: true`。
- 通用缓存 `GVA_CACHE` 不需要单独配置：`initialize/gva_cache.go` 按 `GVA_REDIS` 是否初始化自动选择后端，有 Redis 用 Redis，否则用内存后端，内存后端的默认过期时间取自 `jwt.expires-time`。
