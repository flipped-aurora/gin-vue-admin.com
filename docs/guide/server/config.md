# 配置文件

## JWT

### yaml

```yaml
# jwt configuration
jwt:
  signing-key: 'qmPlus'
  expires-time: 7d
  buffer-time: 1d
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

| 配置名      | 类型   | 说明      |
| :---------- | :----- | :-------- |
| signing-key | string | jwt的签名 |
| expires-time | int64 | 过期时间 |
| buffer-time | int64 | 缓冲时间（过期前这段时间内有过请求会刷新jwt续期） |
| issuer | string | jwt签发者 |

## Zap

### yaml

```yaml
# zap logger configuration
zap:
  level: 'info'
  format: 'console'
  prefix: '[GIN-VUE-ADMIN]'
  director: 'log'
  show-line: true
  encode-level: 'LowercaseColorLevelEncoder'
  stacktrace-key: 'stacktrace'
  log-in-console: true
  retention-day: 7
```

### struct

```go
type Zap struct {
	Level         string `mapstructure:"level" json:"level" yaml:"level"`                            // 级别
	Prefix        string `mapstructure:"prefix" json:"prefix" yaml:"prefix"`                         // 日志前缀
	Format        string `mapstructure:"format" json:"format" yaml:"format"`                         // 输出
	Director      string `mapstructure:"director" json:"director"  yaml:"director"`                  // 日志文件夹
	EncodeLevel   string `mapstructure:"encode-level" json:"encode-level" yaml:"encode-level"`       // 编码级
	StacktraceKey string `mapstructure:"stacktrace-key" json:"stacktrace-key" yaml:"stacktrace-key"` // 栈名
	ShowLine      bool   `mapstructure:"show-line" json:"show-line" yaml:"show-line"`                // 显示行
	LogInConsole  bool   `mapstructure:"log-in-console" json:"log-in-console" yaml:"log-in-console"` // 输出控制台
	RetentionDay  int    `mapstructure:"retention-day" json:"retention-day" yaml:"retention-day"`    // 日志保留天数
}
```

### description

| 配置名         | 类型   | 说明                                                         |
| -------------- | ------ | ------------------------------------------------------------ |
| level          | string | level的模式的详细说明,请看[zap官方文档](https://pkg.go.dev/go.uber.org/zap?tab=doc#pkg-constants) <br />info: info模式,无错误的堆栈信息,只输出信息 <br />debug:debug模式,有错误的堆栈详细信息 <br />warn:warn模式 <br />error: error模式,有错误的堆栈详细信息 <br />dpanic: dpanic模式 <br />panic: panic模式 <br />fatal: fatal模式 |
| format         | string | console: 控制台形式输出日志 json: json格式输出日志           |
| prefix         | string | 日志的前缀                                                   |
| director       | string | 存放日志的文件夹,修改即可,不需要手动创建                     |
| show_line      | bool   | 显示行号, 默认为true,不建议修改                              |
| encode_level   | string | LowercaseLevelEncoder:小写 <br />LowercaseColorLevelEncoder:小写带颜色 <br />CapitalLevelEncoder: 大写 <br />CapitalColorLevelEncoder: 大写带颜色 |
| stacktrace_key | string | 堆栈的名称,即在json格式输出日志时的josn的key                 |
| log_in_console | bool   | 是否输出到控制台,默认为true                                  |
| retention_day  | int    | 日志保留天数                                                 |

- 开发环境 || 调试环境配置建议
	- `level:debug`
	- `format:console`
	- `encode-level:LowercaseColorLevelEncoder`或者`encode-leve:CapitalColorLevelEncoder`
- 部署环境配置建议
	- `level:error`
	- `format:json`
	- `encode-level: LowercaseLevelEncoder `或者 `encode-level:CapitalLevelEncoder`
	- `log-in-console: false`
- 建议只是建议,按照自己的需求进行即可,给出建议仅供参考

## Redis

### yaml

```yaml
# redis configuration
redis:
  name: ''
  addr: '127.0.0.1:6379'
  password: ''
  db: 0
  use-cluster: false
  cluster-addrs: []
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

| 配置名        | 类型     | 说明                        |
| ------------- | -------- | --------------------------- |
| name          | string   | 代表当前实例的名字          |
| addr          | string   | redis连接地址及端口         |
| password      | string   | 密码                        |
| db            | int      | redis的哪个数据库           |
| use-cluster   | bool     | 是否使用集群模式            |
| cluster-addrs | []string | 集群模式下的节点地址列表    |

## Email

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
  is-loginauth: false
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

| 配置名       | 类型   | 说明                                                         |
| ------------ | ------ | ------------------------------------------------------------ |
| to           | string | 邮件接收者,可以是多个,<br />以英文逗号(,)进行区分,最好别带空格,如果是一个邮箱最后请不要加英文逗号(,) |
| from         | string | 发件人邮箱                                                   |
| host         | string | 邮箱的主服务器地址                                           |
| secret       | string | 密钥，用于登录的密钥，最好不要用邮箱密码                     |
| nickname     | string | 发件人昵称                                                   |
| port         | int    | 邮件服务端口                                                 |
| is-ssl       | bool   | 是否使用SSL                                                  |
| is-loginauth | bool   | 是否使用LoginAuth认证方式（适用于IBM、微软邮箱服务器等）     |

## Casbin

### yaml

```yaml
# casbin configuration
casbin:
  model-path: './resource/rbac_model.conf'
```

### struct

```go
type Casbin struct {
	ModelPath string `mapstructure:"model-path" json:"modelPath" yaml:"model-path"`
}
```

### description

| 配置名     | 类型   | 说明                                                         | 建议是否修改 |
| ---------- | ------ | ------------------------------------------------------------ | ------------ |
| model-path | string | 存放casbin模型的相对路径<br />默认值为`./resource/rbac_model.conf` | 不推荐修改   |

## System

### yaml

```yaml
# system configuration
system:
  env: 'public'
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
```

### struct

```go
type System struct {
	Env           string `mapstructure:"env" json:"env" yaml:"env"`                                     // 环境值
	DbType        string `mapstructure:"db-type" json:"db-type" yaml:"db-type"`                         // 数据库类型:mysql(默认)|sqlite|sqlserver|postgresql
	OssType       string `mapstructure:"oss-type" json:"oss-type" yaml:"oss-type"`                     // Oss类型
	RouterPrefix  string `mapstructure:"router-prefix" json:"router-prefix" yaml:"router-prefix"`       // 路由前缀
	Addr          int    `mapstructure:"addr" json:"addr" yaml:"addr"`                                 // 端口值
	LimitCountIP  int    `mapstructure:"iplimit-count" json:"iplimit-count" yaml:"iplimit-count"`       // 限制同IP访问次数
	LimitTimeIP   int    `mapstructure:"iplimit-time" json:"iplimit-time" yaml:"iplimit-time"`          // 限制时间
	UseMultipoint bool   `mapstructure:"use-multipoint" json:"use-multipoint" yaml:"use-multipoint"`    // 多点登录拦截
	UseRedis      bool   `mapstructure:"use-redis" json:"use-redis" yaml:"use-redis"`                   // 使用redis
	UseMongo      bool   `mapstructure:"use-mongo" json:"use-mongo" yaml:"use-mongo"`                   // 使用mongo
	UseStrictAuth bool   `mapstructure:"use-strict-auth" json:"use-strict-auth" yaml:"use-strict-auth"` // 使用树形角色分配模式
}
```

### description

| 配置名           | 类型   | 说明                                                                                                                                   |
| ---------------- | ------ |--------------------------------------------------------------------------------------------------------------------------------------|
| env              | string | 环境模式，"develop"为开发模式（跳过身份验证），"public"为生产模式                                                                                      |
| addr             | int    | 后端服务端口，默认8888                                                                                                                        |
| db-type          | string | 数据库类型，支持：mysql、pgsql、sqlite、mssql、oracle                                                                                            |
| oss-type         | string | 对象存储类型：local（本地存储）、qiniu（七牛云）、aliyun（阿里云）、minio<br />local：存储到 `local.path` 目录<br />其他类型需要配置对应的参数                                |
| router-prefix    | string | 路由前缀，用于API路由统一前缀                                                                                                                     |
| use-multipoint   | bool   | 是否启用多点登录拦截（单点登录），默认false                                                                                                            |
| use-redis        | bool   | 是否使用Redis缓存，默认false                                                                                                                  |
| iplimit-count    | int    | IP限流：指定时间段内同IP最大访问次数，默认15000                                                                                                        |
| iplimit-time     | int    | IP限流：限制时间窗口（秒），默认3600                                                                                                               |
| use-mongo        | bool   | 是否使用MongoDB数据库，默认false                                                                                                              |
| use-strict-auth  | bool   | 是否开启严格角色模式（树形角色分配），默认false                                                                                                         |

## captcha

### yaml

```yaml
# captcha configuration
captcha:
  key-long: 6
  img-width: 240
  img-height: 80
  open-captcha: 0
  open-captcha-timeout: 3600
```

### struct

```go
type Captcha struct {
	KeyLong            int `mapstructure:"key-long" json:"key-long" yaml:"key-long"`                                     // 验证码长度
	ImgWidth           int `mapstructure:"img-width" json:"img-width" yaml:"img-width"`                                  // 验证码宽度
	ImgHeight          int `mapstructure:"img-height" json:"img-height" yaml:"img-height"`                               // 验证码高度
	OpenCaptcha        int `mapstructure:"open-captcha" json:"open-captcha" yaml:"open-captcha"`                         // 防爆破验证码开启此数，0代表每次登录都需要验证码，其他数字代表错误密码次数，如3代表错误三次后出现验证码
	OpenCaptchaTimeOut int `mapstructure:"open-captcha-timeout" json:"open-captcha-timeout" yaml:"open-captcha-timeout"` // 防爆破验证码超时时间，单位：s(秒)
}
```

### description

| 配置名                | 类型 | 说明                                                         |
| --------------------- | ---- | ------------------------------------------------------------ |
| key-long              | int  | 验证码长度                                                   |
| img-width             | int  | 验证码宽度                                                   |
| img-height            | int  | 验证码高度                                                   |
| open-captcha          | int  | 防爆破验证码开启此数，0代表每次登录都需要验证码，其他数字代表错误密码次数 |
| open-captcha-timeout  | int  | 防爆破验证码超时时间，单位：s(秒)                            |

## Mysql [pgsql,sqlite,mssql,oracle]

### yaml

```yaml
# mysql connect configuration
mysql:
  path: ''
  port: ''
  config: ''
  db-name: ''
  username: ''
  password: ''
  prefix: ''
  singular: false
  engine: 'InnoDB'
  max-idle-conns: 10
  max-open-conns: 100
  log-mode: 'info'
  log-zap: false
```

### struct

```go
type Mysql struct {
    GeneralDB `yaml:",inline" mapstructure:",squash"`
}

type GeneralDB struct {
    Path         string `mapstructure:"path" json:"path" yaml:"path"`
    Port         string `mapstructure:"port" json:"port" yaml:"port"`
    Config       string `mapstructure:"config" json:"config" yaml:"config"`
    Dbname       string `mapstructure:"db-name" json:"db-name" yaml:"db-name"`
    Username     string `mapstructure:"username" json:"username" yaml:"username"`
    Password     string `mapstructure:"password" json:"password" yaml:"password"`
    Prefix       string `mapstructure:"prefix" json:"prefix" yaml:"prefix"`
    Singular     bool   `mapstructure:"singular" json:"singular" yaml:"singular"`
    Engine       string `mapstructure:"engine" json:"engine" yaml:"engine" default:"InnoDB"`
    MaxIdleConns int    `mapstructure:"max-idle-conns" json:"max-idle-conns" yaml:"max-idle-conns"`
    MaxOpenConns int    `mapstructure:"max-open-conns" json:"max-open-conns" yaml:"max-open-conns"`
    LogMode      string `mapstructure:"log-mode" json:"log-mode" yaml:"log-mode"`
    LogZap       bool   `mapstructure:"log-zap" json:"log-zap" yaml:"log-zap"`
}
```

### description

| 配置名         | 类型   | 说明                         |
| -------------- | ------ | ---------------------------- |
| path           | string | 数据库服务器地址             |
| port           | string | 数据库端口                   |
| username       | string | 数据库用户名                 |
| password       | string | 数据库密码                   |
| db-name        | string | 数据库名                     |
| config         | string | 数据库连接高级配置           |
| prefix         | string | 表名前缀                     |
| singular       | bool   | 是否使用单数表名             |
| engine         | string | 数据库引擎，默认InnoDB       |
| max-idle-conns | int    | 设置空闲中的最大连接数       |
| max-open-conns | int    | 设置打开到数据库的最大连接数 |
| log-mode       | string | 开启Gorm全局日志等级："silent"、"error"、"warn"、"info"，默认info |
| log-zap        | bool   | 是否通过zap写入日志文件      |

### struct

```go
type Pgsql struct {
    GeneralDB `yaml:",inline" mapstructure:",squash"`
}

// GeneralDB 结构体定义见上方 Mysql 部分
```

### description

| 配置名         | 类型   | 说明                         |
| -------------- | ------ | ---------------------------- |
| path           | string | 数据库服务器地址             |
| port           | string | 数据库端口                   |
| username       | string | 数据库用户名                 |
| password       | string | 数据库密码                   |
| db-name        | string | 数据库名                     |
| config         | string | 数据库连接高级配置           |
| prefix         | string | 表名前缀                     |
| singular       | bool   | 是否使用单数表名             |
| engine         | string | 数据库引擎，默认InnoDB       |
| max-idle-conns | int    | 设置空闲中的最大连接数       |
| max-open-conns | int    | 设置打开到数据库的最大连接数 |
| log-mode       | string | 开启Gorm全局日志等级："silent"、"error"、"warn"、"info"，默认info |
| log-zap        | bool   | 是否通过zap写入日志文件      |

## Local

### yaml

```yaml
# local configuration
local:
  path: 'uploads/file'
  store-path: 'uploads/file'
```

### struct

```go
type Local struct {
	Path      string `mapstructure:"path" json:"path" yaml:"path"`                   // 本地文件访问路径
	StorePath string `mapstructure:"store-path" json:"store-path" yaml:"store-path"` // 本地文件存储路径
}
```

### description

| 配置名     | 类型   | 说明             |
| ---------- | ------ | ---------------- |
| path       | string | 本地文件访问路径 |
| store-path | string | 本地文件存储路径 |

## Qiniu

### yaml

```yaml
# qiniu configuration (请自行七牛申请对应的 公钥 私钥 bucket 和 域名地址)
qiniu:
  zone: '你的空间区域'
  bucket: '你的空间名'
  img-path: '你的oss域名'
  use-https: false
  access-key: 'xxxxxxxxxxxxxxxxxxxxxxxxx'
  secret-key: 'xxxxxxxxxxxxxxxxxxxxxxxxx'
  use-cdn-domains: false
```

### struct

```go
type Qiniu struct {
	Zone          string `mapstructure:"zone" json:"zone" yaml:"zone"`
	Bucket        string `mapstructure:"bucket" json:"bucket" yaml:"bucket"`
	ImgPath       string `mapstructure:"img-path" json:"imgPath" yaml:"img-path"`
	UseHTTPS      bool   `mapstructure:"use-https" json:"useHttps" yaml:"use-https"`
	AccessKey     string `mapstructure:"access-key" json:"accessKey" yaml:"access-key"`
	SecretKey     string `mapstructure:"secret-key" json:"secretKey" yaml:"secret-key"`
	UseCdnDomains bool   `mapstructure:"use-cdn-domains" json:"useCdnDomains" yaml:"use-cdn-domains"`
}
```

### description

| 配置名          | 类型   | 说明                                                         |
| --------------- | ------ | ------------------------------------------------------------ |
| zone            | string | 存储区域 [Zone](https://github.com/qiniu/api.v7/blob/master/storage/zone.go) ,可配置选项为 `ZoneHuadong` / `ZoneHuabei` / `ZoneHuanan` / `ZoneBeimei` / `ZoneXinjiapo` |
| bucket          | string | 存储空间                                                     |
| img-path        | string | CDN 加速域名                                                 |
| use-https       | bool   | 是否使用https                                                |
| access-key      | string | 秘钥AK                                                       |
| secret-key      | string | 秘钥SK                                                       |
| use-cdn-domains | bool   | 上传是否使用CDN上传加速                                      |


## AutoCode

### yaml

```yaml
# autocode configuration
autocode:
  web: '/web/src'
  root: ''
  server: '/server'
  module: 'github.com/flipped-aurora/gin-vue-admin/server'
  ai-path: ''
```


### struct

```go
type Autocode struct {
	Web    string `mapstructure:"web" json:"web" yaml:"web"`
	Root   string `mapstructure:"root" json:"root" yaml:"root"`
	Server string `mapstructure:"server" json:"server" yaml:"server"`
	Module string `mapstructure:"module" json:"module" yaml:"module"`
	AiPath string `mapstructure:"ai-path" json:"ai-path" yaml:"ai-path"`
}
```

### description

| 配置名  | 类型   | 说明                                                         |
| ------- | ------ | ------------------------------------------------------------ |
| web     | string | 前端项目路径                                                 |
| root    | string | 项目根目录，自动适配，请不要手动配置                         |
| server  | string | 服务端项目路径                                               |
| module  | string | Go模块名称                                                   |
| ai-path | string | AI相关路径                                                   |
