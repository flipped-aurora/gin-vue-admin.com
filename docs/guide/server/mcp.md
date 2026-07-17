# MCP AI助手配置

接入分三步——**启动 MCP 独立服务、获取鉴权 Token、配置 AI 编辑器**。三步完成后，AI 即可连上 GVA 提供的全部工具。

### 第一步：启动 MCP 独立服务

先确认 GVA 后端已启动（默认端口 `8888`），再在 `server/` 目录下启动 MCP 服务：

```bash
cd server
go run ./cmd/mcp -config ./cmd/mcp/config.yaml
```

后端启动时的横幅中也会打印这条命令。启动后，可用健康检查确认服务是否就绪：

```bash
curl http://127.0.0.1:8889/health   # 返回 ok 即为正常
```

:::warning `-config` 不能省略
配置文件的查找顺序为「命令行 `-config` → 环境变量 `GVA_MCP_CONFIG` → 当前目录 `config.yaml` → `cmd/mcp/config.yaml` → …」。在 `server/` 下直接执行 `go run ./cmd/mcp`，会**先命中主项目的 `server/config.yaml`**——虽然靠默认值也能起来，但加载的并不是你以为的那份配置。请始终显式带上 `-config`。
:::

除命令行外，**AI 工坊 → Mcp Tools管理** 页面也提供了启动 / 停止按钮，效果等同于上述命令（后台会先 `go build` 再拉起独立进程，因此运行 GVA 后端的机器上需装有 Go）。若 MCP 是你自己在终端启动的，页面会显示为「外部启动」状态，此时无法从页面停止。

<!-- 📷 截图位（待补）：AI 工坊 → Mcp Tools管理 页面——需露出顶部的 MCP 服务状态（running/external）、「启动 / 停止」按钮，以及下方的 MCP 地址 http://127.0.0.1:8889/mcp。图片放 docs/public/ai-generate/mcp-manage.png -->

### 第二步：获取 x-token

MCP 自身不做鉴权，它把请求原样转发给 GVA 后端，由后端的 JWT 与 Casbin 校验权限。因此 AI 编辑器必须携带一个有效的 JWT。

推荐到 **权限管理 → API Token** 创建一个长期 Token：它与登录态 JWT 共用同一把签名密钥，唯一区别是有效期可自定义（有效期填 `-1` 表示 100 年长期有效）。

也可以在 **AI 工坊 → Mcp Tools管理** 页面直接复制当前浏览器的登录 JWT，该页面会把 Token 自动填进各编辑器的配置示例，复制即用。但这只适合临时试用：

:::warning 不要用浏览器 JWT 长期挂在编辑器里
登录态 JWT 会过期。GVA 后端通过响应头 `new-token` 下发续期令牌，而 MCP 服务并不读取这个头，于是编辑器会一直发送已过期的旧 Token，最终报「登录已过期，请重新登录」。**任何需要长期使用的编辑器配置，都请改用 API Token 页面签发的长期 Token。**
:::

<!-- 📷 截图位（待补）：权限管理 → API Token 页面的新增弹窗——需露出「有效期」字段（填 -1 长期有效）和「所属角色」，以及列表里生成后的 Token 行。图片放 docs/public/ai-generate/api-token.png -->

### 第三步：配置 AI 编辑器

各编辑器的配置格式差异较大，以下模板把 `YOUR_GVA_TOKEN` 换成上一步拿到的 Token 即可使用。**Mcp Tools管理 页面已内置这些模板，并会自动填好地址与 Token**，优先从那里复制可避免手抄出错。

::: code-group

```json [Claude Code]
// 项目级 .mcp.json，或用户级 ~/.claude.json
{
  "mcpServers": {
    "gva": {
      "type": "http",
      "url": "http://127.0.0.1:8889/mcp",
      "headers": { "x-token": "YOUR_GVA_TOKEN" }
    }
  }
}
```

```json [Cursor]
// 项目级 .cursor/mcp.json，或全局 ~/.cursor/mcp.json
// 有 url 即视为远程 HTTP 服务，无需 type 字段
{
  "mcpServers": {
    "gva": {
      "url": "http://127.0.0.1:8889/mcp",
      "headers": { "x-token": "YOUR_GVA_TOKEN" }
    }
  }
}
```

```json [VS Code]
// 工作区 .vscode/mcp.json（Copilot 智能体模式，需 VS Code 1.102+）
// 注意顶层键是 servers，不是 mcpServers
{
  "servers": {
    "gva": {
      "type": "http",
      "url": "http://127.0.0.1:8889/mcp",
      "headers": { "x-token": "YOUR_GVA_TOKEN" }
    }
  }
}
```

```toml [Codex CLI]
# ~/.codex/config.toml
# 启用 Codex 原生 Streamable-HTTP（rmcp）客户端；此行须位于 [mcp_servers.*] 之上
experimental_use_rmcp_client = true

[mcp_servers.gva]
url = "http://127.0.0.1:8889/mcp"
# 自定义静态请求头（非 Authorization），只能通过 http_headers 传递
http_headers = { "x-token" = "YOUR_GVA_TOKEN" }
```

```json [Cline]
// Cline 侧栏 → MCP Servers → Configure MCP Servers
// type 必须为 streamableHttp（驼峰），省略会退回旧版 SSE 传输而连不上
{
  "mcpServers": {
    "gva": {
      "type": "streamableHttp",
      "url": "http://127.0.0.1:8889/mcp",
      "headers": { "x-token": "YOUR_GVA_TOKEN" },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

```json [Trae]
// Trae 设置 → MCP → 手动配置，需 Trae v1.3.0+
{
  "mcpServers": {
    "gva": {
      "url": "http://127.0.0.1:8889/mcp",
      "headers": { "x-token": "YOUR_GVA_TOKEN" }
    }
  }
}
```

:::

Claude Code 也可以用命令行一步配好：

```bash
claude mcp add --transport http gva http://127.0.0.1:8889/mcp --header "x-token: YOUR_GVA_TOKEN"
```

Claude Desktop 稍有不同：它的配置文件只支持 stdio 传输，接入远程 HTTP 服务需借助 `npx mcp-remote` 桥接（要求本机装有 Node），配置模板同样可在 Mcp Tools管理 页面获取。

配置保存后重启编辑器，连接成功即可看到 GVA 提供的工具列表。

<!-- 📷 截图位（待补）：AI 编辑器中 MCP 连接成功的状态——以 Claude Code 的 /mcp 输出或 Cursor 的 Settings → MCP 为例，需露出 gva 服务为已连接（绿色）状态、以及展开后的工具列表（能看到 requirement_analyzer、gva_analyze、gva_execute 等）。图片放 docs/public/ai-generate/mcp-connected.png -->

关于模型选择：不同模型对工具调用的稳定性差异明显，实测效果排序为 claude > gemini > gpt = kimi。模型能力不足时，容易出现跳过 `gva_analyze` 直接生成、或字段设计发散的情况。