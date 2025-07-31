# MCP AI助手集成

**革命性的AI开发体验！** 通过MCP（Model Context Protocol）让AI编辑工具深度理解GVA项目结构，实现智能化的代码生成和项目管理。

:::warning 版本要求
使用MCP功能需要GVA版本 **≥ 2.8.4**，请确保您的项目版本满足要求。
:::

## ✨ 核心特性

- 🚀 **智能代码生成**：AI自动创建完整的CRUD模板
- 🔍 **智能文件搜索**：自动定位相关文件并提供精准修改建议  
- 🎯 **自动化流程**：一键生成API接口和菜单配置
- 🧠 **上下文理解**：AI深度理解项目架构，提供更准确的代码联动

## 🛠️ AI编辑工具配置

### 支持的AI编辑工具
- Trae
- Cursor
- Claude Code
- Windsurf  
- 其他支持MCP协议的AI编辑器

### 配置步骤

#### 第一步：启动GVA项目
确保你的GVA项目正在运行，MCP服务会自动在 `http://127.0.0.1:8888/sse` 启动

#### 第二步：配置AI编辑器
在你的AI编辑工具的配置文件中添加以下MCP配置：

```json
{
  "mcpServers": {
    "GVA Helper": {
      "url": "http://127.0.0.1:8888/sse"
    }
  }
}
```

<img src="/mcp/ai-config-demo.svg" alt="AI编辑器MCP配置示例" style="width: 100%; max-width: 800px; margin: 20px 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"/>

#### 第三步：重启编辑器
保存配置后重启你的AI编辑工具，等待MCP连接建立

#### 第四步：验证连接
在AI助手中输入："帮我检查GVA项目状态"，如果AI能够识别项目结构，说明配置成功！

### 🚀 AI助手新能力

配置完成后，AI助手将获得以下超能力：

- 🧠 **深度理解项目**：自动识别GVA项目结构和代码模式
- 🎯 **智能代码生成**：根据需求自动生成完整的功能模块
- 🔍 **精准文件定位**：快速找到相关文件并提供修改建议
- 📱 **全栈开发**：同时处理前端、后端、数据库的代码生成
- 🎨 **UI自动化**：自动配置路由、菜单和权限系统

### 使用示例

只需要告诉AI："我想创建一个用户管理模块"，AI就会：
- 📋 自动生成用户表结构
- 🔧 创建完整的CRUD API
- 🎨 生成前端管理页面
- 📱 配置菜单和路由
- 🔐 设置权限控制

## 🎓 开发者培训资源

## 授权用户内部培训文档【公开】

[MCP内部培训文档](https://flipped-aurora.feishu.cn/docx/DWvvdLVfvoZajJxwDR1cDThhnAh?from=from_copylink)

## 视频教程

[点击观看](https://www.bilibili.com/video/BV1cNJgzbEHT)

## 配置文件说明

```yaml
mcp:
    name: GVA_MCP  # MCP服务名称
    version: v1.0.0 # 版本号
    sse_path: /sse # SSE路径
    message_path: /message # 消息路径
    url_prefix: '' # URL前缀
```

## 自动填写页面参数示例

<img src="/mcp/image.png"/>

点击生成后后端会获得MCP模板

在模板的handle函数中书写业务逻辑即可实现一个简单的mcp工具

<img src="/mcp/image2.png"/>

## 调试工具展示

<img src="/mcp/image3.png"/>

<img src="/mcp/image4.png"/>

<img src="/mcp/image5.png"/>
