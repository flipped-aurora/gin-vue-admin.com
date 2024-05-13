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
	SigningKey  string `mapstructure:"signing-key" json:"signingKey" yaml:"signing-key"`    // jwt签名
	ExpiresTime string  `mapstructure:"expires-time" json:"expiresTime" yaml:"expires-time"` // 过期时间
	BufferTime  string  `mapstructure:"buffer-time" json:"bufferTime" yaml:"buffer-time"`    // 缓冲时间
	Issuer  string  `mapstructure:"issuer" json:"issuer" yaml:"issuer"`                     // jwt签发者 
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
  link-name: 'latest_log'
  show-line: true
  encode-level: 'LowercaseColorLevelEncoder'
  stacktrace-key: 'stacktrace'
  log-in-console: true
```

### struct

```go
type Zap struct {
	Level         string `mapstructure:"level" json:"level" yaml:"level"`
	Format        string `mapstructure:"format" json:"format" yaml:"format"`
	Prefix        string `mapstructure:"prefix" json:"prefix" yaml:"prefix"`
	Director      string `mapstructure:"director" json:"director"  yaml:"director"`
	LinkName      string `mapstructure:"link-name" json:"linkName" yaml:"link-name"`
	ShowLine      bool   `mapstructure:"show-line" json:"showLine" yaml:"showLine"`
	EncodeLevel   string `mapstructure:"encode-level" json:"encodeLevel" yaml:"encode-level"`
	StacktraceKey string `mapstructure:"stacktrace-key" json:"stacktraceKey" yaml:"stacktrace-key"`
	LogInConsole  bool   `mapstructure:"log-in-console" json:"logInConsole" yaml:"log-in-console"`
}
```

### description

| 配置名         | 类型   | 说明                                                         |
| -------------- | ------ | ------------------------------------------------------------ |
| level          | string | level的模式的详细说明,请看[zap官方文档](https://pkg.go.dev/go.uber.org/zap?tab=doc#pkg-constants) <br />info: info模式,无错误的堆栈信息,只输出信息 <br />debug:debug模式,有错误的堆栈详细信息 <br />warn:warn模式 <br />error: error模式,有错误的堆栈详细信息 <br />dpanic: dpanic模式 <br />panic: panic模式 <br />fatal: fatal模式 |
| format         | string | console: 控制台形式输出日志 json: json格式输出日志           |
| prefix         | string | 日志的前缀                                                   |
| director       | string | 存放日志的文件夹,修改即可,不需要手动创建                     |
| link_name      | string | 在server目录下会生成一个link_name的[软连接文件](https://baike.baidu.com/item/软链接),链接的是director配置项的最新日志文件 |
| show_line      | bool   | 显示行号, 默认为true,不建议修改                              |
| encode_level   | string | LowercaseLevelEncoder:小写 <br />LowercaseColorLevelEncoder:小写带颜色 <br />CapitalLevelEncoder: 大写 <br />CapitalColorLevelEncoder: 大写带颜色 |
| stacktrace_key | string | 堆栈的名称,即在json格式输出日志时的josn的key                 |
| log_in_console | bool   | 是否输出到控制台,默认为true                                  |

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
  db: 0
  addr: '127.0.0.1:6379'
  password: ''
```

### struct

```go
type Redis struct {
	DB       int    `mapstructure:"db" json:"db" yaml:"db"`
	Addr     string `mapstructure:"addr" json:"addr" yaml:"addr"`
	Password string `mapstructure:"password" json:"password" yaml:"password"`
}
```

### description

| 配置名   | 类型   | 说明                |
| -------- | ------ | ------------------- |
| db       | int    | redis的哪个数据库   |
| addr     | string | redis连接地址及端口 |
| password | string | 密码                |

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
```

### struct

```go
type Email struct {
	To       string `mapstructure:"to" json:"to" yaml:"to"`
	Port     int    `mapstructure:"port" json:"port" yaml:"port"`
	From     string `mapstructure:"from" json:"from" yaml:"from"`
	Host     string `mapstructure:"host" json:"host" yaml:"host"`
	IsSSL    bool   `mapstructure:"is-ssl" json:"isSSL" yaml:"is-ssl"`
	Secret   string `mapstructure:"secret" json:"secret" yaml:"secret"`
	Nickname string `mapstructure:"nickname" json:"nickname" yaml:"nickname"`
}
```

### description

| 配置名   | 类型   | 说明                                                         |
| -------- | ------ | ------------------------------------------------------------ |
| to       | string | 邮件接收者,可以是多个,<br />以英文逗号(,)进行区分,最好别带空格,如果是一个邮箱最后请不要加英文逗号(,) |
| port     | int    | 邮件服务端口                                                 |
| from     | string | 用户名                                                       |
| host     | string | 邮箱的主服务器地址                                           |
| is-ssl   | bool   | 是否使用ssl                                                  |
| secret   | string | 密码                                                         |
| nickname | string | 对方收到的昵称                                               |

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
  env: 'public'  # Change to "develop" to skip authentication for development mode
  addr: 8888
  db-type: 'mysql'
  oss-type: 'local'
  use-multipoint: false
  use-redis: false
  iplimit-count: 15000
  iplimit-time: 3600
```

### struct

```go
type System struct {
	Env           string `mapstructure:"env" json:"env" yaml:"env"`
	Addr          int    `mapstructure:"addr" json:"addr" yaml:"addr"`
	DbType        string `mapstructure:"db-type" json:"dbType" yaml:"db-type"`
	OssType       string `mapstructure:"oss-type" json:"ossType" yaml:"oss-type"`
	UseMultipoint bool   `mapstructure:"use-multipoint" json:"useMultipoint" yaml:"use-multipoint"`
}
```

### description

| 配置名         | 类型   | 说明                                                                                                                                   |
| -------------- | ------ |--------------------------------------------------------------------------------------------------------------------------------------|
| env            | string | 更改为“develop”以跳过开发模式的身份验证                                                                                                             |
| addr           | int    | 后端端口,默认8888                                                                                                                          |
| db-type        | string | 可以使用 pgsql,sqlite,mssql,oracle                                                                                                                                |
| oss-type       | string | 可以指定上传头像的oss为local/qiniu/aliyun/minio<br />local:本地的 `local.path` 目录<br />qiniu:七牛云<br />aliyun与minio可能框架不会集成,需自己添加,或者参考 [额外功能](oss) |
| use-multipoint | bool   | 单点登录,默认为关闭                                                                                                                           |
| use-redis | bool   | 使用redis,默认为关闭                                                                                                                        |
| iplimit-count | int   | time时间段内同IP最多访问次数,默认为15000                                                                                                           |
| iplimit-time | int   | 限制时间区间,默认为3600                                                                                                                       |

## captcha

### yaml

```yaml
# captcha configuration
captcha:
  key-long: 6
  img-width: 240
  img-height: 80
```

### struct

```go
type Captcha struct {
	KeyLong   int `mapstructure:"key-long" json:"keyLong" yaml:"key-long"`
	ImgWidth  int `mapstructure:"img-width" json:"imgWidth" yaml:"img-width"`
	ImgHeight int `mapstructure:"img-height" json:"imgHeight" yaml:"img-height"`
}
```

### description

| 配置名     | 类型 | 说明       |
| ---------- | ---- | ---------- |
| key-long   | int  | 验证码长度 |
| img-width  | int  | 验证码宽度 |
| img-height | int  | 验证码高度 |

## Mysql [pgsql,sqlite,mssql,oracle]

### yaml

```yaml
# mysql connect configuration
mysql:
  path: ''
  config: ''
  db-name: ''
  username: ''
  password: ''
  max-idle-conns: 10
  max-open-conns: 100
  log-mode: false
  log-zap: ""
```

### struct

```go
type Mysql struct {
	Path         string `mapstructure:"path" json:"path" yaml:"path"`
	Config       string `mapstructure:"config" json:"config" yaml:"config"`
	Dbname       string `mapstructure:"db-name" json:"dbname" yaml:"db-name"`
	Username     string `mapstructure:"username" json:"username" yaml:"username"`
	Password     string `mapstructure:"password" json:"password" yaml:"password"`
	MaxIdleConns int    `mapstructure:"max-idle-conns" json:"maxIdleConns" yaml:"max-idle-conns"`
	MaxOpenConns int    `mapstructure:"max-open-conns" json:"maxOpenConns" yaml:"max-open-conns"`
	LogMode      string `mapstructure:"log-mode" json:"logMode" yaml:"log-mode"`                  // 开启Gorm全局日志等级
	LogZap       bool   `mapstructure:"log-zap" json:"logZap" yaml:"log-zap"`                    // 是否通过zap写入日志文件
}
```

### description

| 配置名         | 类型   | 说明                         |
| -------------- | ------ | ---------------------------- |
| username       | string | 用户名                       |
| password       | string | 密码                         |
| path           | string | mysql的连接地址及端口        |
| db-name        | string | 数据库名                     |
| config         | string | 高级配置                     |
| max-idle-conns | int    | 设置空闲中的最大连接数       |
| max-open-conns | int    | 设置打开到数据库的最大连接数 |
| log-mode       | string   | 开启Gorm全局日志等级  "silent"、"error"、"warn"、"info" 不填默认info  填入silent可以关闭控制台日志       |
| log-zap       | bool   | 是否写入zap         |

### struct

```go
type Pgsql struct {
	Path         string `mapstructure:"path" json:"path" yaml:"path"`
	Config       string `mapstructure:"config" json:"config" yaml:"config"`
	Dbname       string `mapstructure:"db-name" json:"dbname" yaml:"db-name"`
	Username     string `mapstructure:"username" json:"username" yaml:"username"`
	Password     string `mapstructure:"password" json:"password" yaml:"password"`
	MaxIdleConns int    `mapstructure:"max-idle-conns" json:"maxIdleConns" yaml:"max-idle-conns"`
	MaxOpenConns int    `mapstructure:"max-open-conns" json:"maxOpenConns" yaml:"max-open-conns"`
	LogMode      string `mapstructure:"log-mode" json:"logMode" yaml:"log-mode"`                  // 开启Gorm全局日志等级
	LogZap       bool   `mapstructure:"log-zap" json:"logZap" yaml:"log-zap"`                    // 是否通过zap写入日志文件
}
```

### description

| 配置名         | 类型   | 说明                         |
| -------------- | ------ | ---------------------------- |
| username       | string | 用户名                       |
| password       | string | 密码                         |
| path           | string | mysql的连接地址及端口        |
| db-name        | string | 数据库名                     |
| config         | string | 高级配置                     |
| max-idle-conns | int    | 设置空闲中的最大连接数       |
| max-open-conns | int    | 设置打开到数据库的最大连接数 |
| log-mode       | string   | 开启Gorm全局日志等级  "silent"、"error"、"warn"、"info" 不填默认info  填入silent可以关闭控制台日志       |
| log-zap       | bool   | 是否写入zap         |

## Local

### yaml

```yaml
# local configuration
local:
  path: 'uploads/file'
```

### struct

```go
type Local struct {
	Path string `mapstructure:"path" json:"path" yaml:"path" `
}
```

### description

| 配置名 | 类型   | 说明         |
| ------ | ------ | ------------ |
| Path   | string | 本地存放路径 |

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

### autocode configuration

```yaml
autocode:
  transfer-restart: true
  # root 自动适配项目根目录
  # 请不要手动配置,他会在项目加载的时候识别出根路径
  # 除root外请使用相对路径配置
  root: ""
  server: /server      #服务端所在位置
  server-api: /api/v1/autocode  #服务端api所在位置
  server-initialize: /initialize  #服务端initialize所在位置
  server-model: /model/autocode  #服务端model所在位置
  server-request: /model/autocode/request/  #服务端request所在位置
  server-router: /router/autocode  #服务端router所在位置
  server-service: /service/autocode  #服务端service所在位置
  web: /web/src     
  web-api: /api
  web-form: /view
  web-table: /view
```


| 配置名          | 类型   | 说明                                                         |
| --------------- | ------ | ------------------------------------------------------------ |
| root            | string | root 自动适配项目根目录 请不要手动配置（手动配置也无效）,他会在项目加载的时候识别出根路径 除root外请使用相对路径配置 |
| server          | string | 服务端所在位置                                                     |
| server-api        | string | 服务端api文件所在位置                                            |
| server-initialize       | bool   | 服务端initialize文件所在位置                                                |
| server-model      | string | 服务端model文件所在位置                                                       |
| server-request      | string | 服务端requset文件所在位置                                                       |
| server-router | bool   | 服务端router件所在位置                                      |
| server-service | bool   | 服务端service文件所在位置                                      |
| web | bool   | 前端src文件夹位置                                      |
| web-api | bool   | 前端自动生成的api所在位置                                      |
| web-form | bool   | 前端自动生成的表单所在位置                                      |
| web-table | bool   | 前端自动生成的表格所在位置                                      |
