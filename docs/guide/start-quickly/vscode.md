---
id: vscode
title: VS Code 开发配置
---

# VS Code 开发配置

VS Code 是一个轻量级但功能强大的代码编辑器，非常适合 Gin-Vue-Admin 项目的开发。本指南将详细介绍如何配置 VS Code 以获得最佳的开发体验。

## 前置要求

在开始配置之前，请确保您已经：

- 安装了 [VS Code](https://code.visualstudio.com/)
- 完成了 [环境准备](/guide/start-quickly/env)
- 克隆了项目代码到本地

## 快速开始

### 1. 打开工作区

推荐使用 VS Code 的工作区功能来管理整个项目：

```bash
# 进入项目根目录
cd gin-vue-admin

# 使用 VS Code 打开整个项目
code .
```

或者打开预配置的工作区文件：

![VS Code 工作区](https://qmplusimg.henrongyi.top/gva/vscode.png)

### 2. 工作区配置

创建 `.vscode/gin-vue-admin.code-workspace` 文件：

```json
{
  "folders": [
    {
      "name": "🔧 Server (Go)",
      "path": "./server"
    },
    {
      "name": "🎨 Web (Vue)",
      "path": "./web"
    },
    {
      "name": "📚 Docs",
      "path": "./docs"
    }
  ],
  "settings": {
    "go.gopath": "",
    "go.goroot": "",
    "go.toolsManagement.autoUpdate": true,
    "typescript.preferences.importModuleSpecifier": "relative",
    "eslint.workingDirectories": ["web"],
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },
  "extensions": {
    "recommendations": [
      "golang.go",
      "vue.volar",
      "antfu.unocss",
      "esbenp.prettier-vscode",
      "ms-vscode.vscode-typescript-next"
    ]
  }
}
```

## 必备插件安装

### Go 开发插件

1. **Go** (golang.go)
   - Go 语言官方插件
   - 提供语法高亮、智能提示、调试等功能

2. **Go Outliner** (766b.go-outliner)
   - 显示 Go 文件的结构大纲

### Vue 开发插件

1. **Vue Language Features (Volar)** (vue.volar)
   - Vue 3 官方语言支持
   - 替代 Vetur，提供更好的 TypeScript 支持

2. **TypeScript Vue Plugin (Volar)** (vue.vscode-typescript-vue-plugin)
   - Vue 文件的 TypeScript 支持

### 通用开发插件

1. **Prettier - Code formatter** (esbenp.prettier-vscode)
   - 代码格式化工具

2. **ESLint** (dbaeumer.vscode-eslint)
   - JavaScript/TypeScript 代码检查

3. **UnoCSS** (antfu.unocss)
   - UnoCSS 原子化 CSS 智能提示

4. **Auto Rename Tag** (formulahendry.auto-rename-tag)
   - 自动重命名配对的 HTML/XML 标签

5. **Path Intellisense** (christian-kohler.path-intellisense)
   - 文件路径智能提示

### 安装插件

```bash
# 使用命令行安装推荐插件
code --install-extension golang.go
code --install-extension vue.volar
code --install-extension vue.vscode-typescript-vue-plugin
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension antfu.unocss
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
```

## 运行和调试配置

### 1. 创建调试配置

在项目根目录创建 `.vscode/launch.json` 文件：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🔧 Launch Server (Go)",
      "type": "go",
      "request": "launch",
      "mode": "auto",
      "program": "${workspaceFolder}/server/main.go",
      "cwd": "${workspaceFolder}/server",
      "env": {
        "GIN_MODE": "debug"
      },
      "args": [],
      "showLog": true,
      "console": "integratedTerminal"
    },
    {
      "name": "🎨 Launch Web (Node)",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}/web",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "serve"]
    }
  ],
  "compounds": [
    {
      "name": "🚀 Launch Both (Server + Web)",
      "configurations": [
        "🔧 Launch Server (Go)",
        "🎨 Launch Web (Node)"
      ],
      "stopAll": true
    }
  ]
}
```

### 2. 创建任务配置

创建 `.vscode/tasks.json` 文件：

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "🔧 Build Server",
      "type": "shell",
      "command": "go",
      "args": ["build", "-o", "gin-vue-admin", "main.go"],
      "options": {
        "cwd": "${workspaceFolder}/server"
      },
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "🎨 Build Web",
      "type": "shell",
      "command": "npm",
      "args": ["run", "build"],
      "options": {
        "cwd": "${workspaceFolder}/web"
      },
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "📝 Generate Swagger",
      "type": "shell",
      "command": "swag",
      "args": ["init"],
      "options": {
        "cwd": "${workspaceFolder}/server"
      },
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    }
  ]
}
```

### 3. 运行项目

#### 方式一：使用调试面板

1. 按 `Ctrl+Shift+D` (Windows/Linux) 或 `Cmd+Shift+D` (macOS) 打开调试面板
2. 选择要运行的配置：
   - **Launch Server (Go)**: 仅启动后端服务
   - **Launch Web (Node)**: 仅启动前端应用
   - **Launch Both (Server + Web)**: 同时启动前后端

![VS Code 后端调试](https://qmplusimg.henrongyi.top/gva/vscode-backend.png)

![VS Code 前端调试](https://qmplusimg.henrongyi.top/gva/vscode-frontend.png)

![VS Code 同时运行](https://qmplusimg.henrongyi.top/gva/vscode-both.png)

#### 方式二：使用终端

```bash
# 启动后端（在 server 目录）
cd server
go run main.go

# 启动前端（在 web 目录）
cd web
npm run serve
```

#### 方式三：使用任务

1. 按 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (macOS)
2. 输入 "Tasks: Run Task"
3. 选择要执行的任务

## Go 环境配置

### 1. 配置 Go 模块代理

为了提高依赖下载速度，建议配置 Go 模块代理：

```bash
# 启用 Go Modules
go env -w GO111MODULE=on

# 配置模块代理
go env -w GOPROXY=https://goproxy.cn,direct

# 配置校验和数据库
go env -w GOSUMDB=sum.golang.google.cn
```

### 2. VS Code Go 插件配置

在 VS Code 设置中添加以下配置：

```json
{
  "go.toolsManagement.autoUpdate": true,
  "go.useLanguageServer": true,
  "go.gocodeAutoBuild": false,
  "go.lintOnSave": "package",
  "go.vetOnSave": "package",
  "go.buildOnSave": "package",
  "go.testOnSave": false,
  "go.coverOnSave": false,
  "go.formatTool": "goimports",
  "go.gotoSymbol.includeImports": true,
  "go.gotoSymbol.includeGoroot": true,
  "gopls": {
    "experimentalWorkspaceModule": true,
    "completeUnimported": true,
    "usePlaceholders": true,
    "deepCompletion": true
  }
}
```

### 3. 安装 Go 工具

在 VS Code 中按 `Ctrl+Shift+P`，输入 "Go: Install/Update Tools"，选择所有工具进行安装。

## 前端开发配置

### 1. Prettier 配置

在 `web` 目录创建 `.prettierrc` 文件：

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### 2. ESLint 配置

确保 `web` 目录有正确的 `.eslintrc.js` 配置文件。

### 3. VS Code 前端设置

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.workingDirectories": ["web"],
  "vetur.validation.template": false,
  "vetur.validation.script": false,
  "vetur.validation.style": false
}
```

## 实用技巧

### 1. 代码片段

创建 Go 代码片段 `.vscode/go.code-snippets`：

```json
{
  "Gin Handler": {
    "prefix": "ginhandler",
    "body": [
      "// $1 $2",
      "// @Tags $3",
      "// @Summary $2",
      "// @Security ApiKeyAuth",
      "// @accept application/json",
      "// @Produce application/json",
      "// @Success 200 {object} response.Response \"成功\"",
      "// @Router /$4 [$5]",
      "func (a *$6Api) $1(c *gin.Context) {",
      "\t$0",
      "}"
    ],
    "description": "Create a Gin handler with Swagger annotations"
  }
}
```

### 2. 快捷键配置

在 `keybindings.json` 中添加自定义快捷键：

```json
[
  {
    "key": "ctrl+shift+r",
    "command": "workbench.action.tasks.runTask",
    "args": "🔧 Build Server"
  },
  {
    "key": "ctrl+shift+w",
    "command": "workbench.action.tasks.runTask",
    "args": "🎨 Build Web"
  }
]
```

### 3. 文件关联

在设置中添加文件关联：

```json
{
  "files.associations": {
    "*.vue": "vue",
    "*.go": "go",
    "*.yaml": "yaml",
    "*.yml": "yaml"
  }
}
```

## 调试技巧

### 1. Go 调试

- 在代码行号左侧点击设置断点
- 使用 `F5` 开始调试
- 使用 `F10` 单步执行，`F11` 步入函数
- 在调试控制台查看变量值

### 2. 前端调试

- 使用浏览器开发者工具
- 在 VS Code 中安装 "Debugger for Chrome" 插件
- 配置浏览器调试

### 3. 日志查看

- 使用集成终端查看应用日志
- 配置输出面板显示不同类型的日志

## 性能优化

### 1. 排除文件

在 `.vscode/settings.json` 中排除不必要的文件：

```json
{
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true,
    "**/vendor": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/vendor": true
  }
}
```

### 2. 禁用不需要的插件

在工作区中禁用不相关的插件以提高性能。
