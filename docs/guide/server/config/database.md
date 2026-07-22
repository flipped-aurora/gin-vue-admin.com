# 数据库配置

mysql/pgsql/mssql/oracle/sqlite 五种数据库的连接配置，均内嵌 `GeneralDB` 结构体、字段完全一致；`initialize/gorm.go` 按 `system.db-type` 选择对应节初始化主库连接（`global.GVA_DB`），`initialize/db_list.go` 初始化多数据库连接。

## Mysql [pgsql,sqlite,mssql,oracle]

### yaml

```yaml
# mysql connect configuration
# 未初始化之前请勿手动修改数据库信息！！！如果一定要手动初始化请看（https://gin-vue-admin.com/docs/first_master）
mysql:
  path: ''
  port: ''
  config: ''
  db-name: ''
  username: ''
  password: ''
  max-idle-conns: 10
  max-open-conns: 100
  conn-max-lifetime: 0
  log-mode: ''
  log-zap: false
```

### struct

```go
type Mysql struct {
    GeneralDB `yaml:",inline" mapstructure:",squash"`
}

type GeneralDB struct {
    Prefix          string `mapstructure:"prefix" json:"prefix" yaml:"prefix"`                                  // 数据库前缀
    Port            string `mapstructure:"port" json:"port" yaml:"port"`                                        // 数据库端口
    Config          string `mapstructure:"config" json:"config" yaml:"config"`                                  // 高级配置
    Dbname          string `mapstructure:"db-name" json:"db-name" yaml:"db-name"`                               // 数据库名
    Username        string `mapstructure:"username" json:"username" yaml:"username"`                            // 数据库账号
    Password        string `mapstructure:"password" json:"password" yaml:"password"`                            // 数据库密码
    Path            string `mapstructure:"path" json:"path" yaml:"path"`                                        // 数据库地址
    Engine          string `mapstructure:"engine" json:"engine" yaml:"engine" default:"InnoDB"`                 // 数据库引擎，默认InnoDB
    LogMode         string `mapstructure:"log-mode" json:"log-mode" yaml:"log-mode"`                            // 是否开启Gorm全局日志
    MaxIdleConns    int    `mapstructure:"max-idle-conns" json:"max-idle-conns" yaml:"max-idle-conns"`          // 空闲中的最大连接数
    MaxOpenConns    int    `mapstructure:"max-open-conns" json:"max-open-conns" yaml:"max-open-conns"`          // 打开到数据库的最大连接数
    ConnMaxLifetime int    `mapstructure:"conn-max-lifetime" json:"conn-max-lifetime" yaml:"conn-max-lifetime"` // 连接最长复用时间,单位秒
    Singular        bool   `mapstructure:"singular" json:"singular" yaml:"singular"`                            // 是否开启全局禁用复数，true表示开启
    LogZap          bool   `mapstructure:"log-zap" json:"log-zap" yaml:"log-zap"`                               // 是否通过zap写入日志文件
}
```

### description

| 配置名         | 类型   | 默认值 | 说明                         |
| -------------- | ------ | ------ | ---------------------------- |
| path           | string | 空 | 数据库服务器地址             |
| port           | string | 空 | 数据库端口                   |
| username       | string | 空 | 数据库用户名                 |
| password       | string | 空 | 数据库密码                   |
| db-name        | string | 空 | 数据库名                     |
| config         | string | 空 | 数据库连接高级配置           |
| prefix         | string | 空 | 表名前缀                     |
| singular       | bool   | false | 是否使用单数表名             |
| engine         | string | InnoDB | 数据库引擎，默认InnoDB       |
| max-idle-conns | int    | 10 | 设置空闲中的最大连接数       |
| max-open-conns | int    | 100 | 设置打开到数据库的最大连接数 |
| conn-max-lifetime | int | 0 | 连接最长复用时间，单位秒，0 表示不限制 |
| log-mode       | string | 空 | 开启Gorm全局日志等级："silent"、"error"、"warn"、"info"，默认info |
| log-zap        | bool   | false | 是否通过zap写入日志文件      |

### struct

```go
type Pgsql struct {
    GeneralDB `yaml:",inline" mapstructure:",squash"`
}

// GeneralDB 结构体定义见上方 Mysql 部分
// Mssql / Oracle / Sqlite 同样内嵌 GeneralDB
```

pgsql、mssql、oracle、sqlite 的配置项与 mysql 完全一致，均内嵌 `GeneralDB`，yaml 顶级节名分别为 `pgsql`、`mssql`、`oracle`、`sqlite`。

### 注意事项

- 每种数据库的结构体都有各自的 `Dsn()` 方法（`config/gorm_mysql.go` 等），用上方字段拼接 DSN 连接串。
- 实际使用哪一节由 `system.db-type` 决定，见 [System 系统配置](./system)。
- `log-mode` 为空或其他非法值时按 `info` 处理（见 `GeneralDB.LogLevel()`）。

## db-list

多数据库配置，初始化后写入 `global.GVA_DBList`，通过 `global.GetGlobalDBByDBName(alias-name)` 获取对应连接。

### yaml

```yaml
db-list:
  - disable: true   # 是否禁用
    type: ""        # 数据库的类型,目前支持mysql、pgsql、mssql、oracle
    alias-name: ""  # 数据库的名称,注意: alias-name 需要在db-list中唯一
    path: ""
    port: ""
    config: ""
    db-name: ""
    username: ""
    password: ""
    max-idle-conns: 10
    max-open-conns: 100
    conn-max-lifetime: 0
    log-mode: ""
    log-zap: false
```

### struct

```go
type SpecializedDB struct {
	Type      string `mapstructure:"type" json:"type" yaml:"type"`
	AliasName string `mapstructure:"alias-name" json:"alias-name" yaml:"alias-name"`
	GeneralDB `yaml:",inline" mapstructure:",squash"`
	Disable   bool `mapstructure:"disable" json:"disable" yaml:"disable"`
}
```

### description

| 配置名     | 类型   | 默认值 | 说明                                       |
| ---------- | ------ | ------ | ------------------------------------------ |
| type       | string | 空 | 数据库类型，目前支持 mysql、pgsql、mssql、oracle |
| alias-name | string | 空 | 数据库别名，需要在 db-list 中唯一          |
| disable    | bool   | true | 是否禁用该连接                             |

其余字段同上方 `GeneralDB`。
