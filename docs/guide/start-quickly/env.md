
# 环境准备

本指南将帮助您从零开始搭建 Gin-Vue-Admin 项目的开发环境。如果您已经具备相关环境，可以跳过对应部分。

## 🚀 快速检查清单

在开始之前，请确保您的系统满足以下要求：

::: warning 📋 环境要求
- **Git**: 用于代码版本管理
- **Node.js**: >= 20.19 或 >= 22.12 (推荐使用 LTS 版本)
- **Go**: >= 1.22 (推荐使用最新稳定版)
- **MySQL**: >= 8.0，存储引擎必须为 <span class="bg-red-600 text-white rounded font-medium dark:bg-red-500 px-1">InnoDB</span>
- **Redis**: >= 6.0 (可选，用于缓存)
:::

## 📦 Node.js 环境安装

### 1. 下载安装 Node.js

访问 [Node.js 官网](https://nodejs.org/zh-cn/) 下载并安装 LTS 版本。

**推荐版本**: Node.js 20.19+ 或 22.12+

### 2. 验证安装

打开终端或命令提示符，运行以下命令验证安装：

```bash
# 检查 Node.js 版本
node -v
# 输出示例: v22.12.0

# 检查 npm 版本
npm -v
# 输出示例: 9.6.7
```

### 3. 配置 npm 镜像源（可选）

为了提高国内下载速度，建议配置淘宝镜像源：

```bash
# 设置淘宝镜像源
npm config set registry https://registry.npmmirror.com

# 验证配置
npm config get registry
```

### 4. 推荐开发工具

- **VS Code**: [下载地址](https://code.visualstudio.com/)
- **WebStorm**: [下载地址](https://www.jetbrains.com/webstorm/)

## 🔧 Go 环境安装

### 1. 下载安装 Go

根据您的网络环境选择下载地址：

- **国际用户**: [https://golang.org/dl/](https://golang.org/dl/)
- **国内用户**: [https://golang.google.cn/dl/](https://golang.google.cn/dl/)

**推荐版本**: Go 1.22 或更高版本

### 2. 验证安装

```bash
# 检查 Go 版本
go version
# 输出示例: go version go1.22.0 darwin/amd64

# 查看 Go 环境信息
go env
```

### 3. 配置 Go 模块代理（推荐）

为了提高模块下载速度，建议配置 Go 模块代理：

```bash
# 启用 Go Modules
go env -w GO111MODULE=on

# 配置模块代理
go env -w GOPROXY=https://goproxy.cn,direct

# 配置私有模块跳过代理
go env -w GOPRIVATE=*.corp.example.com
```

### 4. 推荐开发工具

- **GoLand**: [下载地址](https://www.jetbrains.com/go/) (推荐)
- **VS Code + Go 插件**: 免费替代方案

## 🗄️ 数据库环境

### MySQL 安装

#### macOS
```bash
# 使用 Homebrew 安装
brew install mysql

# 启动 MySQL 服务
brew services start mysql
```

#### Ubuntu/Debian
```bash
# 更新包列表
sudo apt update

# 安装 MySQL
sudo apt install mysql-server

# 启动 MySQL 服务
sudo systemctl start mysql
sudo systemctl enable mysql
```

#### Windows
访问 [MySQL 官网](https://dev.mysql.com/downloads/mysql/) 下载安装包。

### Redis 安装（可选）

#### macOS
```bash
brew install redis
brew services start redis
```

#### Ubuntu/Debian
```bash
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

## 🛠️ 开发工具配置

### VS Code 推荐插件

```json
{
  "recommendations": [
    "golang.go",
    "vue.volar",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### GoLand 配置建议

1. **Go Modules**: 确保启用 Go Modules 支持
2. **代码格式化**: 配置 `gofmt` 和 `goimports`
3. **代码检查**: 启用 `golint` 和 `go vet`

## 📚 版本分支说明

| 分支 | 状态 | 说明 | 推荐使用 |
|------|------|------|----------|
| [main](https://github.com/flipped-aurora/gin-vue-admin/tree/main) | 🟢 活跃维护 | 主分支，生产环境推荐 | ✅ 推荐 |
| [i18n-dev-new](https://github.com/flipped-aurora/gin-vue-admin/tree/i18n-dev-new) | 🟡 更新中 | 组合式API多语言版本 | 🔄 开发中 |
| [v2.4.x](https://github.com/flipped-aurora/gin-vue-admin/tree/v2.4.x) | 🔴 停止维护 | 声明式API版本 | ❌ 不推荐 |
| [i18n-dev](https://github.com/flipped-aurora/gin-vue-admin/tree/i18n-dev) | 🔴 停止维护 | 声明式API多语言版本 | ❌ 不推荐 |

## ✅ 环境验证

完成环境安装后，请运行以下命令验证环境是否正确配置：

```bash
# 检查 Git
git --version

# 检查 Node.js 和 npm
node -v && npm -v

# 检查 Go
go version

# 检查 MySQL（需要先启动服务）
mysql --version

# 检查 Redis（如果安装了）
redis-cli --version
```

如果所有命令都能正常输出版本信息，说明环境配置成功！
