# Swagger API 文档

Swagger 是一个强大的 API 文档生成工具，Gin-Vue-Admin 集成了 Swagger 来自动生成和维护 API 文档。本指南将介绍如何安装、配置和使用 Swagger。

## 📋 什么是 Swagger

Swagger 是一个用于设计、构建、记录和使用 RESTful Web 服务的开源软件框架。它提供了：

- 🔍 **API 文档自动生成**: 从代码注释自动生成文档
- 🧪 **在线测试**: 直接在浏览器中测试 API
- 📊 **可视化界面**: 清晰的 API 结构展示
- 🔄 **实时更新**: 代码变更时文档自动同步

## 🛠️ 安装 Swagger

### 方式一：直接安装（推荐）

如果您的网络环境良好，可以直接安装：

```bash
# 安装最新版本的 swag 工具
go install github.com/swaggo/swag/cmd/swag@latest
```

### 方式二：使用代理安装

如果遇到网络问题，建议配置 Go 模块代理：

```bash
# 启用 Go Modules
go env -w GO111MODULE=on

# 配置国内代理（选择其一）
go env -w GOPROXY=https://goproxy.cn,direct
# 或者使用
# go env -w GOPROXY=https://goproxy.io,direct

# 安装 swag 工具
go install github.com/swaggo/swag/cmd/swag@latest
```

### 验证安装

安装完成后，验证 swag 工具是否正确安装：

```bash
# 检查 swag 版本
swag --version

# 查看帮助信息
swag --help
```

## 📝 配置 Swagger 注释

### 1. 主程序注释

在 `main.go` 文件中添加 API 基本信息：

```go
// @title           Gin-Vue-Admin API
// @version         1.0
// @description     This is a sample server for Gin-Vue-Admin.
// @termsOfService  https://github.com/flipped-aurora/gin-vue-admin

// @contact.name   API Support
// @contact.url    https://github.com/flipped-aurora/gin-vue-admin/issues
// @contact.email  support@gin-vue-admin.com

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8888
// @BasePath  /

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name x-token

func main() {
    // 应用程序代码
}
```

### 2. API 接口注释

为每个 API 接口添加详细注释：

```go
// CreateUser 创建用户
// @Tags      用户管理
// @Summary   创建用户
// @Description 创建新的用户账号
// @Security  ApiKeyAuth
// @accept    application/json
// @Produce   application/json
// @Param     data  body      request.CreateUserReq  true  "用户信息"
// @Success   200   {object}  response.Response{data=response.UserResponse}  "创建成功"
// @Failure   400   {object}  response.Response  "请求参数错误"
// @Failure   500   {object}  response.Response  "内部服务器错误"
// @Router    /user [post]
func (u *UserApi) CreateUser(c *gin.Context) {
    // 接口实现代码
}
```

### 3. 数据模型注释

为数据结构添加注释：

```go
// User 用户信息
type User struct {
    ID       uint   `json:"id" example:"1"`                    // 用户ID
    Username string `json:"username" example:"admin"`          // 用户名
    Email    string `json:"email" example:"admin@example.com"` // 邮箱
    Phone    string `json:"phone" example:"13800138000"`       // 手机号
    Status   int    `json:"status" example:"1"`                // 状态：1-启用，0-禁用
}
```

## 🔄 生成 API 文档

### 1. 生成文档

在项目根目录（包含 `main.go` 的目录）下运行：

```bash
# 生成 Swagger 文档
swag init
```

### 2. 生成成功

命令执行成功后，会在项目中生成以下文件：

```
server/
├── docs/
│   ├── docs.go      # 文档数据
│   ├── swagger.json # JSON 格式文档
│   └── swagger.yaml # YAML 格式文档
└── main.go
```

### 3. 自动化生成

您也可以在 `main.go` 中添加 `go:generate` 指令来自动化文档生成：

```go
//go:generate swag init

package main
```

然后使用 `go generate` 命令：

```bash
go generate
```

## 🌐 访问 Swagger 文档

### 1. 启动服务

确保后端服务正在运行：

```bash
go run main.go
```

### 2. 访问文档

在浏览器中访问 Swagger UI：

**本地访问**: [http://localhost:8888/swagger/index.html](http://localhost:8888/swagger/index.html)

### 3. 文档功能

Swagger UI 提供以下功能：

- 📖 **API 列表**: 查看所有可用的 API 接口
- 🔍 **接口详情**: 查看每个接口的参数、响应等详细信息
- 🧪 **在线测试**: 直接在页面中测试 API 接口
- 📥 **下载文档**: 下载 JSON 或 YAML 格式的 API 文档

## 🎯 使用技巧

### 1. 接口分组

使用 `@Tags` 注释对接口进行分组：

```go
// @Tags 用户管理
// @Tags 权限管理
// @Tags 系统设置
```

### 2. 参数验证

结合 `binding` 标签进行参数验证：

```go
type CreateUserReq struct {
    Username string `json:"username" binding:"required" example:"admin"`     // 用户名（必填）
    Password string `json:"password" binding:"required,min=6" example:"123456"` // 密码（必填，最少6位）
    Email    string `json:"email" binding:"email" example:"admin@example.com"` // 邮箱（邮箱格式）
}
```

### 3. 响应示例

提供详细的响应示例：

```go
// @Success 200 {object} response.Response{data=[]model.User} "获取成功"
// @Success 200 {object} response.PageResult{list=[]model.User} "分页获取成功"
```

### 4. 错误处理

定义常见的错误响应：

```go
// @Failure 400 {object} response.Response "请求参数错误"
// @Failure 401 {object} response.Response "未授权"
// @Failure 403 {object} response.Response "权限不足"
// @Failure 404 {object} response.Response "资源不存在"
// @Failure 500 {object} response.Response "内部服务器错误"
```

## 🔧 高级配置

### 1. 自定义配置

创建 `.swaggo` 配置文件：

```yaml
# .swaggo
dir: ./
general_info: main.go
output_dir: ./docs
parse_vendor: false
parse_dependency: false
parse_internal: false
generate_types: false
```

### 2. 排除特定文件

使用 `--exclude` 参数排除不需要解析的文件：

```bash
swag init --exclude ./vendor
```

### 3. 指定输出目录

```bash
swag init --output ./api-docs
```

## 🔗 相关资源

### 官方文档

- [Swag GitHub 仓库](https://github.com/swaggo/swag)
- [Swag 中文文档](https://github.com/swaggo/swag/blob/master/README_zh-CN.md)
- [Swagger 官方网站](https://swagger.io/)

### 注释规范

- [Swagger 注释语法](https://github.com/swaggo/swag#declarative-comments-format)
- [OpenAPI 3.0 规范](https://swagger.io/specification/)

### 示例项目

- [Gin Swagger 示例](https://github.com/swaggo/gin-swagger)
- [Gin-Vue-Admin API 文档](https://demo.gin-vue-admin.com/swagger/index.html)

## 🚀 最佳实践

1. **及时更新文档**: 每次修改 API 后都要重新生成文档
2. **详细注释**: 为每个接口提供清晰的描述和示例
3. **统一规范**: 团队内部统一注释格式和命名规范
4. **版本管理**: 为不同版本的 API 维护对应的文档
5. **测试验证**: 使用 Swagger UI 测试接口确保文档准确性
