---
id: zap
title: zap
---

## 基于zap的扩展路由日志中间件

> 添加文件, 代码来源于[李文周](https://www.liwenzhou.com/posts/Go/use_zap_in_gin/)

在 `server/middleware` 目录新建一个 `logger.go` 文件,将以下代码复制粘贴进 `logger.go` 文件

```go
package middleware

import (
	"gin-vue-admin/global"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"time"
)

// ZapLogger 接收gin框架的路由日志
func ZapLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		query := c.Request.URL.RawQuery
		c.Next()

		cost := time.Since(start)
		global.GVA_LOG.Info(path,
			zap.Int("status", c.Writer.Status()),
			zap.String("method", c.Request.Method),
			zap.String("path", path),
			zap.String("query", query),
			zap.String("ip", c.ClientIP()),
			zap.String("user-agent", c.Request.UserAgent()),
			zap.String("errors", c.Errors.ByType(gin.ErrorTypePrivate).String()),
			zap.Duration("cost", cost),
		)
	}
}
```

> 使用ZapLogger()中间件

```go
var Router = gin.Default()
// 将上面的代码替换为
var Router = gin.New()
Router.Use(middleware.ZapLogger(), gin.Recovery())
```

- 在 `server/initialize/router.go` 文件中

- 一定要 `ZapLogger` 中间件 **注册为全局中间件** ,不然不会生效的

- `gin.Recovery()` 与 `Logger()` 为Gin框架的 `gin.Default()`  默认使用的全局中间件

	- ```go
		// 此代码为Gin框架的源码
		// Default returns an Engine instance with the Logger and Recovery middleware already attached.
		func Default() *Engine {
			debugPrintWARNINGDefault()
			engine := New()
			engine.Use(Logger(), Recovery())
			return engine
		}
		```

## 基于zap的Recovery捕获panic异常中间件

> 添加文件,代码来源于[李文周](https://www.liwenzhou.com/posts/Go/use_zap_in_gin/)

在 `server/middleware` 目录新建一个 `logger.go` 文件,将以下代码复制粘贴进 `logger.go` 文件

```go
package middleware

import (
	"gin-vue-admin/global"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"net"
	"net/http"
	"net/http/httputil"
	"os"
	"runtime/debug"
	"strings"
)

// ZapRecovery recover掉项目可能出现的panic，并使用zap记录相关日志
func ZapRecovery(stack bool) gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				// Check for a broken connection, as it is not really a
				// condition that warrants a panic stack trace.
				var brokenPipe bool
				if ne, ok := err.(*net.OpError); ok {
					if se, ok := ne.Err.(*os.SyscallError); ok {
						if strings.Contains(strings.ToLower(se.Error()), "broken pipe") || strings.Contains(strings.ToLower(se.Error()), "connection reset by peer") {
							brokenPipe = true
						}
					}
				}

				httpRequest, _ := httputil.DumpRequest(c.Request, false)
				if brokenPipe {
					global.GVA_LOG.Error(c.Request.URL.Path,
						zap.Any("error", err),
						zap.String("request", string(httpRequest)),
					)
					// If the connection is dead, we can't write a status to it.
					_ = c.Error(err.(error)) // nolint: errcheck
					c.Abort()
					return
				}

				if stack {
					global.GVA_LOG.Error("[Recovery from panic]",
						zap.Any("error", err),
						zap.String("request", string(httpRequest)),
						zap.String("stack", string(debug.Stack())),
					)
				} else {
					global.GVA_LOG.Error("[Recovery from panic]",
						zap.Any("error", err),
						zap.String("request", string(httpRequest)),
					)
				}
				c.AbortWithStatus(http.StatusInternalServerError)
			}
		}()
		c.Next()
	}
}
```

- [v2.3.0](https://github.com/flipped-aurora/gin-vue-admin/releases/tag/v2.3.0)版本以上无需添加此文件代码

> 使用ZapRecovery()中间件

```go
var Router = gin.Default()
// 将上面的代码替换为
var Router = gin.New()
Router.Use(middleware.ZapLogger(), middleware.ZapRecovery())

// V2.3.0版本请使用以下代码
var Router = gin.Default()
// 将上面的代码替换为
var Router = gin.New()
Router.Use(middleware.ZapLogger(), middleware.GinRecovery())
```



> Zap日志库使用指南&&配置指南

Zap日志库的配置选择在 config.yaml (./server/config.yaml)下的zap

```yaml
# zap logger configuration
zap:
  level: 'debug'
  format: 'console'
  prefix: '[GIN-VUE-ADMIN]'
  director: 'log'
  link_name: 'latest_log'
  show_line: true
  encode_level: 'LowercaseColorLevelEncoder'
  stacktrace_key: 'stacktrace'
  log_in_console: true
```

| 配置名         | 配置的类型 | 说明                                                         |
| -------------- | ---------- | ------------------------------------------------------------ |
| level          | string     | level的模式的详细说明,请看[zap官方文档](https://pkg.go.dev/go.uber.org/zap?tab=doc#pkg-constants) <br />info: info模式,无错误的堆栈信息,只输出信息<br />debug:debug模式,有错误的堆栈详细信息<br />warn:warn模式<br />error: error模式,有错误的堆栈详细信息<br />dpanic: dpanic模式<br />panic: panic模式<br />fatal: fatal模式<br /> |
| format         | string     | console: 控制台形式输出日志<br />json: json格式输出日志      |
| prefix         | string     | 日志的前缀                                                   |
| director       | string     | 存放日志的文件夹,修改即可,不需要手动创建                     |
| link_name      | string     | 在server目录下会生成一个link_name的[软连接文件](https://baike.baidu.com/item/%E8%BD%AF%E9%93%BE%E6%8E%A5),链接的是director配置项的最新日志文件 |
| show_line      | bool       | 显示行号, 默认为true,不建议修改                              |
| encode_level   | string     | LowercaseLevelEncoder:小写<br /> LowercaseColorLevelEncoder:小写带颜色<br />CapitalLevelEncoder: 大写<br />CapitalColorLevelEncoder: 大写带颜色 |
| stacktrace_key | string     | 堆栈的名称,即在json格式输出日志时的josn的key                 |
| log_in_console | bool       | 是否输出到控制台,默认为true                                  |

- 开发环境 || 调试环境配置建议
	- `level:debug`
	- `format:console`
	- `encode_level:LowercaseColorLevelEncoder`或者`encode_leve:CapitalColorLevelEncoder`
- 部署环境配置建议
	- `level:error`
	- `format:json` 
	- `encode_level: LowercaseLevelEncoder `或者 `encode_level:CapitalLevelEncoder`
	- `log_in_console: false` 
- 建议只是建议,按照自己的需求进行即可,给出建议仅供参考











































