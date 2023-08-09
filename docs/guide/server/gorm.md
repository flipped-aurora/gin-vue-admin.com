# Gorm连接mysql和pgsql的配置和指南

> 需要重写!


## mysql

### server/config/gorm_mysql.go

- gorm-mysql

```go
package config

type Mysql struct {
	Path         string `mapstructure:"path" json:"path" yaml:"path"`                             // 服务器地址
	Port         string `mapstructure:"port" json:"port" yaml:"port"`                             // 端口
	Config       string `mapstructure:"config" json:"config" yaml:"config"`                       // 高级配置
	Dbname       string `mapstructure:"db-name" json:"dbname" yaml:"db-name"`                     // 数据库名
	Username     string `mapstructure:"username" json:"username" yaml:"username"`                 // 数据库用户名
	Password     string `mapstructure:"password" json:"password" yaml:"password"`                 // 数据库密码
	MaxIdleConns int    `mapstructure:"max-idle-conns" json:"maxIdleConns" yaml:"max-idle-conns"` // 空闲中的最大连接数
	MaxOpenConns int    `mapstructure:"max-open-conns" json:"maxOpenConns" yaml:"max-open-conns"` // 打开到数据库的最大连接数
	LogMode      string `mapstructure:"log-mode" json:"logMode" yaml:"log-mode"`                  // 是否开启Gorm全局日志
	LogZap       bool   `mapstructure:"log-zap" json:"logZap" yaml:"log-zap"`                     // 是否通过zap写入日志文件
}
```

## pgsql

### server/config/gorm_pgsql.go

- gorm-pgsql

```go
package config

type Pgsql struct {
	Path         string `mapstructure:"path" json:"path" yaml:"path"`                             // 服务器地址:端口
	Port         string `mapstructure:"port" json:"port" yaml:"port"`                             //:端口
	Config       string `mapstructure:"config" json:"config" yaml:"config"`                       // 高级配置
	Dbname       string `mapstructure:"db-name" json:"dbname" yaml:"db-name"`                     // 数据库名
	Username     string `mapstructure:"username" json:"username" yaml:"username"`                 // 数据库用户名
	Password     string `mapstructure:"password" json:"password" yaml:"password"`                 // 数据库密码
	MaxIdleConns int    `mapstructure:"max-idle-conns" json:"maxIdleConns" yaml:"max-idle-conns"` // 空闲中的最大连接数
	MaxOpenConns int    `mapstructure:"max-open-conns" json:"maxOpenConns" yaml:"max-open-conns"` // 打开到数据库的最大连接数
	LogMode      string `mapstructure:"log-mode" json:"logMode" yaml:"log-mode"`                  // 是否开启Gorm全局日志
	LogZap       bool   `mapstructure:"log-zap" json:"logZap" yaml:"log-zap"`                     // 是否通过zap写入日志文件
}
```

### server/config/config.go

### 在system选项下 选择db-type为mysql或者qgsql

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
  max-idle-conns: 10 # 连接池相关
  max-open-conns: 100 # 连接池相关
  log-mode: "" # 是控制台打印日志级别 "silent"、"error"、"warn"、"info" 不填默认info  填入silent可以关闭控制台日志
  log-zap: false # 日志是否用zap保存到本地
```
