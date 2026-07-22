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

除命令行外，**AI 工坊 → Mcp Tools管理** 页面也提供了「启动 / 停用」按钮，效果等同于上述命令（后台会先 `go build` 再拉起独立进程，因此运行 GVA 后端的机器上需装有 Go）。若 MCP 是你自己在终端启动的，页面会显示为「外部服务运行中」状态，此时无法从页面停用。

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

## 架构与组件

v3.0 中 MCP 是一个**独立进程**，不再随主后端一同启动，传输方式为 Streamable HTTP：

| 组件 | 位置 | 说明 |
| --- | --- | --- |
| 独立服务入口 | `server/cmd/mcp/` | 基于 mark3labs/mcp-go 的 `NewStreamableHTTPServer`，监听 `mcp.addr`（默认 `8889`），端点路径为 `mcp.path`（默认 `/mcp`），同端口提供 `/health` 健康检查 |
| 工具包 | `server/mcp/` | 全部内置工具，以及动态工具 / 动态 prompt 的注册逻辑；`NewMCPServer()` 创建服务实例并赋值给全局对象 `global.GVA_MCP_SERVER`（`*server.MCPServer`） |
| 管理接口 | `server/api/v1/system/auto_code_mcp.go` | 主服务提供的 `/autoCode/mcp*` 接口（需登录鉴权），供后台页面创建工具、查询独立服务状态、启停与测试 |
| 后台页面 | `web/src/plugin/ai/view/mcp/` | v3.0 起从 `plugin/auto` 迁到 `plugin/ai`：「Mcp Tools模板」（`mcp.vue`，定义工具的名称 / 描述 / 参数 / 代码）与「Mcp Tools管理」（`mcpTest.vue`，独立服务启停与测试，`clientConfigTemplates.js` 内置各 AI 客户端配置模板） |

MCP 进程启动时还会回打主服务的公开接口，把「AI MCP构建」中绑定的 API 注册为动态工具、把调用场景编排注册为动态 prompt（详见 [调用场景编排](./ai-scenario)），因此这类动态内容的增删需要重启 MCP 服务才对 AI 生效。

## 内置工具

`server/mcp/enter.go` 维护工具注册表：每个工具在 `init()` 中调用 `RegisterTool` 注册，重名会直接 panic，让冲突在启动期即暴露。v3.0 内置 17 个工具：

| 分类 | 工具 | 作用 |
| --- | --- | --- |
| 工作流核心 | `requirement_analyzer`、`gva_analyze`、`gva_execute`、`gva_review` | 需求分析、现状快照、代码生成、代码自查（详见 [AI 生成业务模块](./ai-generate)） |
| API 管理 | `list_all_apis`、`create_api` | 查询 / 登记 API 记录 |
| 菜单管理 | `list_all_menus`、`create_menu` | 查询菜单树 / 创建菜单 |
| 字典 | `query_dictionaries`、`generate_dictionary_options` | 查询字典 / 生成并创建字典及选项 |
| 权限分配 | `assign_api_to_role`、`batch_assign_apis_to_role`、`assign_menu_to_role`、`set_role_data_scope` | 给角色追加 API、菜单权限，设置数据权限档位 |
| 组织架构 | `query_org_structure`、`query_org_members`、`assign_user_org` | 查询部门与岗位结构、按维度查询成员、给用户追加部门 / 岗位归属 |

除内置工具外，`server/mcp/` 下的 `dynamic_register.go`、`dynamic_schema.go`、`dynamic_prompt.go`、`http_client.go`、`client/` 等文件支撑动态工具注册与向上游的请求转发。

## 后台管理接口

主服务暴露以下 `/autoCode/mcp*` 接口（处理函数在 `server/api/v1/system/auto_code_mcp.go`，需登录鉴权），「Mcp Tools模板」与「Mcp Tools管理」两个页面即建立在这些接口之上：

| 接口 | 功能 |
| --- | --- |
| `POST /autoCode/mcp` | 按模板生成一个 MCP Tool 的 Go 源码文件 |
| `POST /autoCode/mcpStatus` | 查询独立服务状态与客户端连接配置 |
| `POST /autoCode/mcpStart`、`POST /autoCode/mcpStop` | 启动 / 停止托管的独立服务进程 |
| `POST /autoCode/mcpList` | 连接独立服务，列出其已注册的工具 |
| `POST /autoCode/mcpRoutes` | 返回主服务已注册的路由清单 |
| `POST /autoCode/mcpTest` | 按工具名与参数测试调用某个工具 |

## 配置说明

MCP 相关配置有两处，注意别改错文件：

- `server/cmd/mcp/config.yaml`：**独立进程自身**的完整配置，`go run ./cmd/mcp` 启动时读这份（本文开头的示例）。
- `server/config.yaml` 中的 `mcp:` 块：主服务用它来**定位与托管**独立进程，默认只写 `name`、`version`、`addr`、`separate` 四项（`addr` 默认 `8889`）。

`server/config/mcp.go` 定义的字段如下：

| 配置项 | 默认值 | 说明 |
| --- | --- | --- |
| `name` | `GVA_MCP` | MCP 服务名，握手时上报 |
| `version` | `v1.0.0` | 版本号 |
| `path` | `/mcp` | MCP 端点挂载路径 |
| `addr` | `8889` | 监听端口，只填端口号 |
| `base_url` | 由 `addr` 与 `path` 拼出（如 `http://127.0.0.1:8889/mcp`） | 对外公布的地址，供后台展示和测试客户端使用，不影响实际监听 |
| `upstream_base_url` | `http://127.0.0.1:8888` | 上游 GVA 后端地址，所有工具最终都打到这里 |
| `auth_header` | `x-token` | 入站鉴权头名称（AI 编辑器 → MCP）；MCP 转发到后端时固定使用 `x-token` |
| `request_timeout` | `15` | 请求上游的超时时间（秒） |

`sse_path`、`message_path`、`url_prefix`、`separate` 四个字段已在源码中标注 Deprecated，仅为兼容旧配置保留，不要再使用。