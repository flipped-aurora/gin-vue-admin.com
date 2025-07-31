# 插件开发指南

本指南将帮助您了解如何为 Gin-Vue-Admin 开发自定义插件，包括插件的目录结构、开发规范和最佳实践。

## 概述

Gin-Vue-Admin 插件系统采用模块化设计，支持前后端分离的插件架构。每个插件都包含独立的前端（web）和后端（server）部分，可以无缝集成到主项目中。

### 插件特性

- **模块化设计**：前后端分离，结构清晰
- **热插拔**：支持动态加载和卸载
- **标准化**：统一的目录结构和开发规范
- **可扩展**：丰富的 API 和钩子函数
- **易维护**：独立的配置和依赖管理

## 快速开始

### 前置要求

- 熟悉 Vue 3 + TypeScript 前端开发
- 熟悉 Go + Gin 后端开发
- 了解 Gin-Vue-Admin 项目结构
- 具备基本的插件开发概念

### 开发流程

1. **规划插件功能**：明确插件的功能需求和技术方案
2. **创建插件结构**：按照标准目录结构创建插件文件
3. **开发前端组件**：实现用户界面和交互逻辑
4. **开发后端接口**：实现业务逻辑和数据处理
5. **测试和调试**：确保插件功能正常运行
6. **打包和发布**：生成插件包并发布到插件市场

## 标准化插件目录

### 前端（Web）目录结构

```
插件名称/
  └─ web/
    └─ plugin/
      └─ 插件名称/                    # 插件根目录（必须）
        ├─ api/                      # API 接口文件（可选）
        ├─ view/                     # 页面组件（可选）
        │  ├─ index.vue             # 主页面
        │  └─ components/           # 页面子组件
        ├─ components/               # 公共组件（可选）
        │  ├─ PluginComponent.vue   # 插件组件
        │  └─ index.ts              # 组件导出
        └─ utils/                    # 工具函数（可选）
           ├─ index.ts              # 工具函数
           └─ constants.ts          # 常量定义
```

### 后端（Server）目录结构

::: tip 提示
后端插件可以使用自动插件模板工具生成基础结构，提高开发效率。
:::

```
插件名称/
  └─ server/
    └─ plugin/
      └─ 插件名称/                    # 插件根目录（必须）
        ├─ api/                      # API 控制器（可选）
        │  ├─ api.go             # 主要 API 接口
        │  └─ enter.go              # API 入口文件
        ├─ config/                   # 配置结构（可选）
        │  └─ config.go             # 配置定义
        ├─ global/                   # 全局变量（可选）
        │  └─ global.go             # 全局变量定义
        ├─ model/                    # 数据模型（可选）
        │  ├─ model.go             # 数据模型
        │  ├─ request/              # 请求模型
        │  │  └─ main.go          # 请求参数结构
        │  └─ response/             # 响应模型
        │     └─ main.go          # 响应数据结构
        ├─ router/                   # 路由注册（可选）
           ├─ router.go              # 路由定义
        │  └─ enter.go             # 路由入口
        ├─ service/                  # 业务逻辑（可选）
        │  ├─ service.go             # 主要业务逻辑
        │  └─ enter.go              # 服务入口文件
        ├─ utils/                    # 工具函数（可选）
        │  └─ plugin.go             # 工具函数
        ├─ middleware/               # 中间件（可选）
        │  └─ plugin.go             # 自定义中间件
        ├─ initialize/               # 初始化（可选）
        │  ├─ router.go             # 路由初始化
        │  ├─ gorm.go               # 数据库初始化
        │  └─ viper.go              # 配置初始化
        ├─ plugin.go                 # 插件入口文件（必须）
        └─ README.md                 # 插件说明（推荐）
```

## 开发规范

### 命名规范

- **插件名称**：使用小写字母和连字符，如 `user-management`
- **文件命名**：遵循项目命名规范，Go 文件使用下划线，Vue 文件使用 PascalCase
- **API 路径**：使用 RESTful 风格，如 `/api/plugin/user-management/users`
- **组件命名**：使用 PascalCase，如 `UserManagement`

### 代码规范

- **前端代码**：遵循 Vue 3 + TypeScript 最佳实践
- **后端代码**：遵循 Go 编码规范和 Gin 框架约定
- **注释规范**：提供清晰的函数和接口注释
- **错误处理**：统一的错误处理和日志记录

### 版本管理

- 使用语义化版本号（Semantic Versioning）
- 在 `package.json` 中明确版本信息
- 提供版本更新日志

### 后端配置

在 `server/plugin/插件名称/plugin.go` 中定义插件信息：

```go
package plugin_name

import (
    "github.com/flipped-aurora/gin-vue-admin/server/global"
    "github.com/flipped-aurora/gin-vue-admin/server/plugin/plugin_name/router"
)

type Plugin struct{}

func CreatePlugin() *Plugin {
    return &Plugin{}
}

func (*Plugin) Register(group *gin.RouterGroup) {
    router.RouterGroupApp.InitPluginRouter(group)
}

func (*Plugin) RouterPath() string {
    return "plugin-name"
}
```

### 开发环境配置

1. **前端开发**：在主项目的 `web` 目录下开发和调试
2. **后端开发**：在主项目的 `server` 目录下开发和调试
3. **热重载**：支持前后端代码的热重载功能

## 最佳实践

### 性能优化

- **懒加载**：使用 Vue 的异步组件和路由懒加载
- **代码分割**：合理拆分代码，避免单个文件过大
- **缓存策略**：合理使用缓存提高响应速度
- **数据库优化**：优化查询语句和索引设计

### 安全考虑

- **输入验证**：严格验证用户输入数据
- **权限控制**：集成主项目的权限管理系统
- **SQL 注入防护**：使用参数化查询
- **XSS 防护**：对输出内容进行转义

### 错误处理

- **统一错误码**：使用项目统一的错误码规范
- **日志记录**：记录关键操作和错误信息
- **用户友好**：提供清晰的错误提示信息
- **降级处理**：在插件异常时不影响主系统

### 测试策略

- **单元测试**：为核心业务逻辑编写单元测试
- **集成测试**：测试插件与主系统的集成
- **端到端测试**：测试完整的用户操作流程
- **性能测试**：验证插件的性能表现

## 常见问题

### 插件无法加载

1. 检查插件目录结构是否正确
2. 确认插件配置文件格式正确
3. 查看控制台错误信息
4. 检查插件依赖是否安装

### 路由冲突

1. 确保插件路由路径唯一
2. 避免与主系统路由冲突
3. 使用插件前缀区分路由

### 样式冲突

1. 使用 CSS Modules 或 scoped 样式
2. 避免全局样式污染
3. 使用插件特定的 CSS 类名前缀

### 数据库迁移

1. 提供数据库迁移脚本
2. 支持版本升级和回滚
3. 注意数据库兼容性