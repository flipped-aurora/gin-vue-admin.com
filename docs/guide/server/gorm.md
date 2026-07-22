# Gorm连接mysql和pgsql的配置和指南

## mysql

### server/config/gorm_mysql.go

- gorm-mysql

```go
package config

type Mysql struct {
	GeneralDB `yaml:",inline" mapstructure:",squash"`
}

func (m *Mysql) Dsn() string {
	return m.Username + ":" + m.Password + "@tcp(" + m.Path + ":" + m.Port + ")/" + m.Dbname + "?" + m.Config
}
```

## pgsql

### server/config/gorm_pgsql.go

- gorm-pgsql

```go
package config

type Pgsql struct {
	GeneralDB `yaml:",inline" mapstructure:",squash"`
}

// Dsn 基于配置文件获取 dsn
func (p *Pgsql) Dsn() string {
	return "host=" + p.Path + " user=" + p.Username + " password=" + p.Password + " dbname=" + p.Dbname + " port=" + p.Port + " " + p.Config
}
```

### server/config/db_list.go

Mysql、Pgsql 等配置均内嵌同一个 GeneralDB 结构，字段如下：

```go
package config

// GeneralDB 也被 Pgsql 和 Mysql 原样使用
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

### server/config/config.go

### 在system选项下 选择db-type为mysql、pgsql、mssql、oracle或sqlite

```yaml
system:
  env: 'public'  # Change to "develop" to skip authentication for development mode
  addr: 8888
  db-type: 'mysql'
  oss-type: 'local'    # 控制oss选择走本地还是 七牛等其他仓 自行增加其他oss仓可以在 server/utils/upload/upload.go 中 NewOss函数配置
  use-multipoint: false
  # IP限制次数 一个小时15000次
  iplimit-count: 15000
  #  IP限制一个小时
  iplimit-time: 3600
```


### config.yaml 配置字段详解
```yaml
mysql:
  path: ''   # 链接地址
  port: ''   # 链接端口
  config: ''  # 其他配置 例如时区
  db-name: ''  # 数据库名称
  username: '' # 数据库用户名
  password: '' # 数据库密码
  prefix: '' # 数据库表前缀
  singular: false # 是否开启全局禁用复数，true表示开启
  engine: "" # 数据库引擎，默认InnoDB
  max-idle-conns: 10 # 连接池相关
  max-open-conns: 100 # 连接池相关
  conn-max-lifetime: 0 # 连接最长复用时间,单位秒
  log-mode: "" # 是控制台打印日志级别 "silent"、"error"、"warn"、"info" 不填默认info  填入silent可以关闭控制台日志
  log-zap: false # 日志是否用zap保存到本地
```
