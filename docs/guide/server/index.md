# 后端知识库

## 后端目录结构


> **server文件夹为Golang后端项目,需要有Golang基础,Gin框架基础**

## server项目结构

```shell
├── api
│   └── v1
├── config
├── core
├── docs
├── global
├── initialize
│   └── internal
├── middleware
├── model
│   ├── request
│   └── response
├── packfile
├── resource
│   ├── excel
│   ├── page
│   └── template
├── router
├── service
├── source
└── utils
    ├── timer
    └── upload
```

| 文件夹       | 说明                    | 描述                        |
| ------------ | ----------------------- | --------------------------- |
| `api`        | api层                   | api层 |
| `--v1`       | v1版本接口              | v1版本接口                  |
| `config`     | 配置包                  | config.yaml对应的配置结构体 |
| `core`       | 核心文件                | 核心组件(zap, viper, server)的初始化 |
| `docs`       | swagger文档目录         | swagger文档目录 |
| `global`     | 全局对象                | 全局对象 |
| `initialize` | 初始化 | router,redis,gorm,validator, timer的初始化 |
| `--internal` | 初始化内部函数 | gorm 的 longger 自定义,在此文件夹的函数只能由 `initialize` 层进行调用 |
| `middleware` | 中间件层 | 用于存放 `gin` 中间件代码 |
| `model`      | 模型层                  | 模型对应数据表              |
| `--request`  | 入参结构体              | 接收前端发送到后端的数据。  |
| `--response` | 出参结构体              | 返回给前端的数据结构体      |
| `packfile`   | 静态文件打包            | 静态文件打包 |
| `resource`   | 静态资源文件夹          | 负责存放静态文件                |
| `--excel` | excel导入导出默认路径 | excel导入导出默认路径 |
| `--page` | 表单生成器 | 表单生成器 打包后的dist |
| `--template` | 模板 | 模板文件夹,存放的是代码生成器的模板 |
| `router`     | 路由层                  | 路由层 |
| `service`    | service层               | 存放业务逻辑问题 |
| `source` | source层 | 存放初始化数据的函数 |
| `utils`      | 工具包                  | 工具函数封装            |
| `--timer` | timer | 定时器接口封装 |
| `--upload`      | oss                  | oss接口封装        |

## 本文使用的环境

- 数据库选择mysql

- Goland(2020.2)

## 1. 初始化server项目

- Goland打开server文件夹
- 设置GOPROXY
	- windows:打开File → settings → Go → Go Modules，将 Environment 项的值设置为`GOPROXY=https://goproxy.cn,direct`
	- Mac: 打开Goland→Preferences...→Go → Go Modules,将Environment项的值设置为`GOPROXY=https://goproxy.cn,direct`
- 打开go.mod文件,在文件空白处鼠标右键点击`Go Mod Tidy`
- ![](../static/img/GoModTidy.png)

## 2. config.yaml

- 按照 [config的详细说明](./config) 按需修改, `V2.4.0` 版本以后不需要配置mysql相关配置, [点我跳转](#v240master)

## 3. [数据库初始化](./first_master)


## 4. 启动server项目

- 完成后打开main.go, 在文件空白处鼠标右键点击`运行'go build main.go'`,或者使用图中红色框的右边的快捷键组合进行启动项目或者打开goland的终端,输入命令`go run main.go`
- ![](../static/img/GoRunMain.png)

## 5. 生成swagger自动化API文档

### 5.1 安装 swagger

- 可以翻墙
````
go get -u github.com/swaggo/swag/cmd/swag
````

- 无法翻墙
由于国内没法安装 go.org/x 包下面的东西，推荐使用 [goproxy.cn](https://goproxy.cn/zh/) 或者 [goproxy.cn/](https://goproxy.cn/)

```bash
# 如果您使用的 Go 版本是 1.13 - 1.15 需要手动设置GO111MODULE=on, 开启方式如下命令, 如果你的 Go 版本 是 1.16 ~ 最新版 可以忽略以下步骤一
# 步骤一、启用 Go Modules 功能
go env -w GO111MODULE=on 
# 步骤二、配置 GOPROXY 环境变量
go env -w GOPROXY=https://goproxy.cn,https://goproxy.cn,direct

# 如果嫌弃麻烦,可以使用go generate 编译前自动执行代码, 不过这个不能使用 `Goland` 或者 Vscode 的 命令行终端
cd server
go generate -run "go env -w .*?"

# 使用如下命令下载swag
go get -u github.com/swaggo/swag/cmd/swag
```

### 5.2 生成API文档

````
cd server
swag init
````
执行上面的命令后，server目录下会出现docs文件夹，打开浏览器输入 [http://localhost:8888/swagger/index.html](http://localhost:8888/swagger/index.html)，即可查看swagger文档

:::danger 您可能遇到的问题
1. 启动时报数据库启动失败，请检查是否创建qmsql数据库，或者是否是您自行配置的数据库
2. 登录时用户名密码错误，请检查数据库文件是否导入
:::
