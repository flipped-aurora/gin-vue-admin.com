# AI 生成业务模块

一句话描述需求，AI 就能在 GVA 中完成数据模型定义、API 生成、路由注册与菜单权限配置，最终交付一个可直接运行的业务模块。整条链路由 GVA 内置的 MCP 工具驱动，分工非常清晰：**AI 负责理解需求、设计结构，GVA 负责把设计落成真实代码**。你无需逐步手动介入，只需盯住生成过程、审查最终产物。

本文以 GVA **3.0** 为准。自 2.9.0 起，MCP 已拆分为独立进程，不再随后端一同启动，传输方式也由 SSE 改为 Streamable HTTP；若你使用的是 2.9.0 及更早版本，请参阅 [AI助手配置](./mcp) 中的旧版说明。

本文与另外两篇 AI 文档的分工如下：

- [AI助手配置](./mcp)：介绍 MCP 服务本体，以及后台的工具模板页与调试页。本文只聚焦「用 MCP 生成业务模块」这一条工作流，所需的连接配置下文均已备齐，可直接照做。
- [AI CLI 构建](./ai-cli)：把你挑选的业务接口打包成命令行与 Skill，让 AI 在终端调用**已有**接口；本文解决的则是**从无到有生成新模块**。两者定位不同，可同时使用。
- [代码生成器使用指南](../generator/server)：同一套生成器的手工用法。AI 工作流本质上就是让 AI 替你填写代码生成器的表单，两条路径产出的代码完全一致。
- [调用场景编排](./ai-scenario)：把多条命令 / API 的调用依赖编排成流程说明交给 AI 执行；v3.0 起取代已移除的旧版 AI Workflow。

## 核心特性

- **一句话起步**：用自然语言描述需求，由 AI 推导模块拆分、字段设计与关联关系。
- **直达代码**：Model、API、Service、Router 与前端页面一次生成，并自动注入 `enter.go`、业务路由与数据迁移。
- **权限自动就位**：模块生成时自动创建 6 条 API 记录与对应菜单，无需再手动登记。
- **可回滚**：每次生成都会留下历史记录，可在后台一键回滚文件、API、菜单与数据表。
- **编辑器无关**：任何支持 MCP 的 AI 编辑器都能接入（Claude Code、Cursor、VS Code、Codex CLI、Cline、Trae）。

## 前置条件

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

## 工作流总览

连接成功后，AI 会沿下面这条链路推进。四个工具各司其职，前三步是主链路，第四步用于收尾自查：

```text
requirement_analyzer  →  gva_analyze  →  gva_execute  →  gva_review
     需求分析                现状快照         生成代码         代码自查
   拆模块 / 设计字段      有哪些包和字典     落盘 + 建表      查漏补缺
```

这里有一个关键认知：**`requirement_analyzer` 与 `gva_review` 本身不含 AI，也不读代码**。它们的作用是产出一段结构化提示词，把「该怎么想」交回给你的 AI 编辑器去思考；真正动手写文件的只有 `gva_execute`。理解这一点，也就明白了为什么生成质量取决于你所用的模型。

正常使用时，你只管用自然语言提需求，AI 会自行按顺序调用，无需记住这些工具名。下面逐步拆解，是为了让你看懂 AI 在做什么，以及该在哪一步介入检查。

### 第一步：需求分析（requirement_analyzer）

这是整条链路的入口。你只需给出一句话需求：

```text
帮我创建一个用户管理模块，包含用户列表、新增、编辑和权限分配功能。
```

工具会把这句话包装成一段「资深系统架构师」的分析提示词交还给 AI，引导它完成四件事：需求解构、模块拆分、字段设计（含数据类型与关联关系）、字典需求识别。

提示词里内置了一条重要约束，你可以据此控制 AI 的发挥空间：

> - 如果用户提供了具体字段，**必须使用**用户提供的字段
> - 如果用户提供了 SQL 文件，**严格按照** SQL 结构设计
> - **不要**随意发散，**不要**添加用户未提及的功能

因此，**需求描述得越具体，生成结果越可控**。如果你已经有了明确的表结构，直接把字段清单或建表 SQL 贴给 AI，它会照着做，而不是自由发挥。

<!-- 📷 截图位（待补）：AI 编辑器对话框——用户输入一句话需求后，AI 调用 requirement_analyzer 工具的过程。需露出用户输入的需求原文和工具调用卡片。图片放 docs/public/ai-generate/step1-requirement.png -->

### 第二步：现状快照（gva_analyze）

在动手生成之前，AI 需要先知道项目里已经有什么。这一步会返回一份全量快照：

| 返回内容 | 说明 |
| --- | --- |
| `existingPackages` | 已有的包（package / plugin）及其是否为空 |
| `predesignedModules` | 已有的模块及其模型文件路径 |
| `dictionaries` | 已有的字典类型清单 |
| `cleanupInfo` | 本次清理掉的空包信息（无清理时为空） |

AI 会拿这份快照与需求做对照，判断是复用已有的包，还是需要新建。

:::danger 这一步会真的删东西
`gva_analyze` 的名字听起来是只读的，但它同时会**清理空包**：若某个包在磁盘上找不到任何 `.go` 文件，它会直接删除对应目录，并移除包记录与生成历史。

对正常项目而言，这是无害的整理（清掉建了包却没写代码的残留）；但如果你有**刻意保留的空壳包**，请注意它会被清掉。此外，被清理掉的生成历史意味着**这些模块的回滚记录随之永久丢失**，此后再也无法回滚。
:::

### 第三步：生成代码（gva_execute）

这一步真正落盘。AI 会把前两步的结论组装成一份 `executionPlan` 提交给 GVA，由生成器写文件、建表、登记 API 与菜单。

执行顺序是固定的：**建包 → 建字典 → 建模块**。三个开关互相独立，各自决定这一步要不要做：

| 开关 | 作用 |
| --- | --- |
| `needCreatedPackage` | 创建包骨架（`enter.go` 等），并注入到顶层的 `api/v1/enter.go`、`router/enter.go`、`service/enter.go` |
| `needCreatedDictionaries` | 创建字典与字典项，先于模块执行；同名字典已存在时跳过，不会覆盖 |
| `needCreatedModules` | 创建模块，即写业务代码、登记 API 与菜单 |

当 `needCreatedModules` 为 `true` 时，每个模块会自动登记 **6 条 API 记录**（create / delete / deleteByIds / update / find / getList）和 **1 条菜单**。此时无需再让 AI 调用 `create_api` 与 `create_menu`——这些记录已经存在，再调用属于多余操作，`gva_execute` 的返回结果里也会明确提示这一点。如需调整 API 或菜单，直接到后台的 API 管理与菜单管理里改即可。

生成完成后，AI 会得到一份文件清单与目录映射。

<!-- 📷 截图位（待补）：AI 编辑器对话框——gva_execute 执行完成的输出。需露出「执行结果」JSON（success/message/paths）和下方的「📁 已生成以下文件」列表。图片放 docs/public/ai-generate/step3-execute.png -->

:::danger `success: true` 不代表全部成功
批量创建多个模块时，单个模块失败**不会中断**整体流程，也不会把 `success` 置为 `false`——失败信息只写在 `message` 字段里。生成多模块时，请务必读完 `message`，不要只看 `success`。
:::

### 第四步：代码自查（gva_review）

生成器产出的是标准 CRUD 骨架，业务逻辑、模块间跳转与交互细节仍需打磨。`gva_review` 接收「原始需求 + 已生成文件清单」，产出一份自查清单交给 AI 逐项检查，关注点包括：需求覆盖度、模块间关联、用户交互、业务流程完整性、前后端对接。

清单里也包含了让 AI 继续补齐的指引，例如：需要路由跳转时，先用 `list_all_menus` 拿到完整路由表再跳；现有页面无法满足需求时，自行编写 Vue 文件并调用 `create_menu` 登记菜单；现有接口不够时，自行补齐前后端代码并调用 `create_api` 登记。

这一步只产出提示词，**不会修改任何代码**，实际的检查与修改由 AI 完成。

## 生成了哪些文件

以 `packageType: package`、结构体 `User`、包名 `userCenter` 为例，每个模块会产出 8 个文件：

```text
server/
├─ model/userCenter/user.go                    # 数据模型
├─ model/userCenter/request/user.go            # 请求结构体
├─ api/v1/userCenter/user.go                   # API 层
├─ service/userCenter/user.go                  # Service 层
└─ router/userCenter/user.go                   # 路由定义

web/src/
├─ api/userCenter/user.js                      # 前端接口封装
└─ view/userCenter/user/
   ├─ user.vue                                 # 列表页
   └─ userForm.vue                             # 表单页
```

同时，以下文件会被**自动注入**，无需手工修改：

| 被注入的文件 | 注入内容 |
| --- | --- |
| `api/v1/{包名}/enter.go`、`router/{包名}/enter.go`、`service/{包名}/enter.go` | 本模块的 Api / Router / Service 结构体 |
| `server/initialize/router_biz.go` | 业务路由注册 |
| `server/initialize/gorm_biz.go` | 数据表自动迁移（仅当 `autoMigrate` 为 `true`） |

选择 `packageType: plugin` 时，后端代码会集中在 `server/plugin/{包名}/` 下，前端在 `web/src/plugin/{包名}/`，并额外生成 `config/`、`gen/`、`initialize/` 与插件注册文件。**用户没有特别说明时，AI 一律选用 `package`。**

<!-- 📷 截图位（待补）：生成完成后的实际效果——GVA 后台里新生成的业务模块列表页（左侧菜单已出现新菜单项，右侧是带搜索栏和表格的 CRUD 页面）。这是整篇文档的成果图，建议放最能体现「一句话 → 可运行模块」的那一张。图片放 docs/public/ai-generate/result-page.png -->

## 重要约束与注意事项

### 生成后需要重启后端

生成的是 Go 源码，必须**重新编译并重启后端**才会生效。前端在开发模式下会热更新，但新菜单需要重新登录或刷新才能看到。

### 数据表没建出来：检查 autoMigrate

`autoMigrate` 不传时默认为 `false`，此时**不会注入数据迁移，表也不会被创建**。同理，`generateWeb` 与 `generateServer` 不显式传 `true` 时，对应的前端或后端代码整棵树都会被跳过。如果 AI 生成后发现代码有了、表却没有，多半就是这个开关没给上——让它带上 `autoMigrate: true` 重新生成即可。

### 结构体名与简称不能重复

同一个包内，`structName`（结构体名）或 `abbreviation`（简称）重复都会被拒绝，报「已经创建过此数据结构,请勿重复创建!」。要重新生成同名模块，请先在后台回滚旧记录。

### 包名限制

`system` 与 `example` 是保留包名，不能使用；包名也不能是 Go 关键字。

### 回滚

每次生成都会写入一条历史记录，可以整体撤销。回滚会把生成的文件**移动**到项目根目录的 `rm_file/` 下（而非直接删除），并撤销所有代码注入，因此是可挽回的；勾选后还可同时删除 API、菜单与数据表。

回滚入口是 **编程辅助 → 自动代码管理** 页（v3.0 起该菜单默认显示，不再隐藏），也可以直接访问：

```text
http://localhost:8080/#/layout/autoCodeAdmin
```

若菜单不可见或页面打不开，请到 **权限管理 → 角色管理** 确认当前角色已勾选「自动代码管理」这个菜单。

回滚只能在后台界面操作，AI 无法通过 MCP 触发。另外要注意，`gva_analyze` 清理空包时会删除对应的历史记录，那**只删记录、不做回滚**；一旦记录被删除，该模块就再也无法回滚了。

<!-- 📷 截图位（待补）：自动代码管理页（直接访问 #/layout/autoCodeAdmin）——需露出生成历史列表、「回滚标记」列（已回滚/未回滚标签）和行内的「回滚」按钮，最好再露出点击回滚后的确认弹窗（可勾选 删除API/删除菜单/删除表）。图片放 docs/public/ai-generate/rollback.png -->

## 大模型直出：AI 辅助与 AI 页面绘制

除了经 AI 编辑器驱动的 MCP 工作流，GVA 还内置了不依赖外部编辑器的大模型直出能力，链路为「前端 → GVA 后端 → 上游大模型」，后端把上游的流式响应转发为 SSE 事件回给前端。入口有两处：

- **代码生成器的 AI 辅助**：**编程辅助 → 代码生成器**（`web/src/plugin/auto/view/autoCode/`）顶部的「使用AI创建」，用文字描述表结构、或直接粘贴图片（Ctrl+V）让 AI 生成结构定义并自动回填表单，确认后走正常的预览、落库流程。
- **AI 页面绘制**：**AI 工坊 → AI页面绘制**（页内标题「AI前端工程师」，`web/src/plugin/ai/view/picture/picture.vue`），用多轮对话流式生成前端页面，左侧为 AI 输出，右侧可切换「页面预览 / 源代码」。该功能属于授权功能。

使用前需在 `server/config.yaml` 配置 `autocode.ai-path`（到插件市场的个人中心获取，填入后重启后端生效）。

实现上，前端 `web/src/api/autoCode.js` 提供三个函数：`llmAuto`（POST `/autoCode/llmAuto`，非流式）、`llmAutoSSEStream`（POST `/autoCode/llmAutoSSE`，fetch 流式读取）、`createWebStream`（页面绘制专用，预设 `mode: newCreateWeb`）。后端的 `LLMAutoSSE`（`server/api/v1/system/sys_auto_code_sse.go`）挂在 PublicGroup（无需 JWT），强制 `response_mode=streaming` 后调用 `server/service/system/auto_code_llm.go` 请求上游大模型，再把流式响应逐段转发为 SSE 事件。

:::tip 旧版 AI Workflow 已移除
v3.0 已移除旧版「AI Workflow」（AI 工作流）页面与对应后端实现。需要让 AI 按顺序调用多个接口时，请改用 [调用场景编排](./ai-scenario)。
:::

## 附录：关键参数速查

正常使用不需要手写这些参数，AI 会自行组装。以下清单用于**看懂 AI 的调用，或在结果不对时精确指出问题**。

### executionPlan 顶层字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `packageName` | string | 包名，小写开头 |
| `packageType` | string | `package` 或 `plugin`；用户未特别说明时一律用 `package` |
| `needCreatedPackage` | boolean | 是否建包，为 `true` 时 `packageInfo` 必填 |
| `needCreatedModules` | boolean | 是否建模块，为 `true` 时 `modulesInfo` 必填 |
| `needCreatedDictionaries` | boolean | 是否建字典，为 `true` 时 `dictionariesInfo` 必填 |
| `packageInfo` | object | 包信息：`packageName` / `label` / `desc` / `template` |
| `modulesInfo` | array | 模块配置列表，支持一次创建多个模块 |
| `dictionariesInfo` | array | 字典配置列表，先于模块创建 |

三个 `needCreated*` 全为 `false` 时，工具只返回目录结构映射而不生成任何东西——这是「只告诉我代码该放哪」的用法。

### modulesInfo[] 关键开关

这几个布尔开关是最容易出问题的地方。**它们在 JSON Schema 里没有声明默认值，不传即为 `false`**，与工具描述里写的「默认为 true」并不一致：

| 字段 | 不传时的实际值 | 影响 |
| --- | --- | --- |
| `gvaModel` | `false` | 为 `true` 时自动包含 `ID` / `CreatedAt` / `UpdatedAt` / `DeletedAt`；为 `false` 时必须有且仅有一个字段标记 `primaryKey` |
| `autoMigrate` | `false` | **为 `false` 时不建表** |
| `generateServer` | `false` | 为 `false` 时不生成任何后端代码 |
| `generateWeb` | `false` | 为 `false` 时不生成任何前端代码 |
| `autoCreateApiToSql` | `false` | 是否把 6 条 API 登记进数据库 |
| `autoCreateMenuToSql` | `false` | 是否把菜单登记进数据库 |
| `autoCreateBtnAuth` | `false` | 是否生成按钮权限 |
| `autoCreateResource` | `false` | 是否创建数据权限所需的资源标识（需配合组织管理能力） |
| `onlyTemplate` | `false` | 只生成模板文件，不登记 API、不建表 |
| `isTree` | `false` | 是否生成树形结构页面 |

### fields[] 常用字段

| 字段 | 说明 |
| --- | --- |
| `fieldName` | 字段名，大写开头（如 `UserName`）；小写开头会被自动纠正 |
| `fieldDesc` | 字段中文描述，同时作为表头和表单 label |
| `fieldJson` | JSON 标签（如 `userName`） |
| `columnName` | 数据库列名，蛇形命名（如 `user_name`） |
| `fieldType` | 字段类型，见下 |
| `fieldSearchType` | 搜索条件：`=`、`!=`、`>`、`>=`、`<`、`<=`、`LIKE`、`BETWEEN`、`NOT BETWEEN`、`IN`、`NOT IN` |
| `dictType` | 关联字典类型，前端渲染为下拉选择 |
| `dataSource` | 关联表配置：`table` / `label` / `value` / `association` / `dbName` |
| `form` / `table` / `desc` / `excel` | 分别控制在表单、表格、详情、导入导出中是否出现 |
| `require` | 是否必填，自动生成前后端校验 |

`fieldType` 可选值共 14 种：`string`、`richtext`、`int`、`int64`、`bool`、`float64`、`time.Time`、`enum`、`picture`、`pictures`、`video`、`file`、`json`、`array`。

关联字段有一个容易误判的行为：`dataSource.association` 为 `1` 表示一对一、`2` 表示一对多，**配置为 `2` 时 `fieldType` 会被强制改写成 `array`**。这是预期行为，不是 AI 填错了。

### 工具速查表

MCP 共提供 17 个工具。除工作流核心的四个外，其余都是 AI 在补齐功能时按需调用的辅助工具：

| 分类 | 工具 | 作用 |
| --- | --- | --- |
| **工作流核心** | `requirement_analyzer` | 需求分析入口，产出架构设计提示词 |
| | `gva_analyze` | 返回包 / 模块 / 字典快照，并清理空包 |
| | `gva_execute` | 执行代码生成（唯一会写文件的工具） |
| | `gva_review` | 产出代码自查提示词 |
| **API 管理** | `list_all_apis` | 查询全部 API 记录和已注册路由 |
| | `create_api` | 登记 API 记录，支持单条或批量 |
| **菜单管理** | `list_all_menus` | 查询菜单树 |
| | `create_menu` | 创建菜单记录 |
| **字典** | `query_dictionaries` | 查询字典和字典项 |
| | `generate_dictionary_options` | 生成并创建字典及其选项 |
| **权限分配** | `assign_api_to_role` | 给角色追加单条 API 权限 |
| | `batch_assign_apis_to_role` | 批量追加 API 权限（单次上限 50 条） |
| | `assign_menu_to_role` | 给角色追加菜单权限，自动补全父级菜单链 |
| | `set_role_data_scope` | 设置角色数据权限档位 |
| **组织架构** | `assign_user_org` | 给用户追加部门 / 岗位归属 |
| | `query_org_members` | 按部门 / 岗位 / 角色查询成员 |
| | `query_org_structure` | 查询部门和岗位结构 |

`assign_*` 系列工具全部是**只追加、不覆盖**的设计，且都是幂等的，重复调用不会产生副作用。它们也**不提供取消授权能力**——需要回收权限请到后台的角色管理页操作。这是一条刻意的安全边界，避免 AI 误删既有权限。

`set_role_data_scope` 的档位含义：

| 档位 | 含义 |
| --- | --- |
| `1` | 全部数据，不做行级过滤 |
| `2` | 本部门及以下 |
| `3` | 本部门（不含下级） |
| `4` | 仅本人 |
| `5` | 自定义部门，需同时传 `deptIds` |

档位 `2` / `3` 的「本部门」判定依据是用户的**全部归属部门集合**（含多部门），而非只看主部门；主部门只决定新建数据时盖上的 `dept_id` 归属。接口权限走 Casbin，与数据权限档位相互独立。

## 附录：MCP 配置说明

`server/cmd/mcp/config.yaml`：

```yaml
mcp:
  name: GVA_MCP
  version: v1.0.0
  path: /mcp
  addr: 8889
  base_url: http://127.0.0.1:8889/mcp
  upstream_base_url: http://127.0.0.1:8888
  auth_header: x-token
  request_timeout: 15

autocode:
  root: ../../..
  server: server
  web: web/src
```

| 配置项 | 默认值 | 说明 |
| --- | --- | --- |
| `mcp.name` | `GVA_MCP` | MCP 服务名，握手时上报 |
| `mcp.version` | `v1.0.0` | 版本号 |
| `mcp.path` | `/mcp` | MCP 端点挂载路径 |
| `mcp.addr` | `8889` | 监听端口，只填端口号 |
| `mcp.base_url` | `http://127.0.0.1:8889/mcp` | 对外公布的地址，供后台展示和测试客户端使用，不影响实际监听 |
| `mcp.upstream_base_url` | `http://127.0.0.1:8888` | 上游 GVA 后端地址，所有工具最终都打到这里 |
| `mcp.auth_header` | `x-token` | **入站**鉴权头名称 |
| `mcp.request_timeout` | `15` | 请求上游的超时时间（秒） |
| `autocode.root` | `../../..` | 项目根目录 |
| `autocode.server` | `server` | 后端目录名，相对 `root` |
| `autocode.web` | `web/src` | 前端源码目录，相对 `root` |

`autocode.root` 的 `../../..` 是相对**配置文件所在目录**解析的，而非相对你的启动目录：`server/cmd/mcp/` 往上三层正好是项目根目录（即同时包含 `server/` 和 `web/` 的那一层）。因此无论你在哪个目录启动 MCP，路径都能正确解析；留空时会自动向上查找同时包含 `server/` 与 `web/` 的目录。

`auth_header` 只作用于**入站**方向（AI 编辑器 → MCP）。MCP 转发到后端时固定使用 `x-token`，因为后端的 JWT 中间件只认这个头。这样即便把 `auth_header` 改成非默认值，也不会导致所有工具 401。

还有一处容易改错的地方：`server/config.yaml` 中也保留了一个 `mcp:` 配置块（默认只有 `name`、`version`、`addr`、`separate` 四项）。3.0 中主服务仍会读取它，用于定位与托管独立进程（如 `addr`）；但独立进程自身启动时读的是 `server/cmd/mcp/config.yaml`，两处配置各司其职，注意保持 `addr` 一致。另外，`sse_path`、`message_path`、`url_prefix`、`separate` 这几个字段已在源码中标注 Deprecated，仅为兼容旧配置保留。

## 常见问题

- **编辑器显示连接失败**：先用 `curl http://127.0.0.1:8889/health` 确认 MCP 服务在跑；再检查配置里的顶层键是否正确（VS Code 是 `servers`，其余是 `mcpServers`）、Cline 的 `type` 是否为 `streamableHttp`。
- **工具调用报「缺少MCP鉴权请求头」**：配置里没带 `x-token`，或键名拼错。
- **工具调用报「登录已过期，请重新登录」**：用的是浏览器登录态 JWT 且已过期，改用 API Token 页面签发的长期 Token。
- **工具调用报权限不足**：MCP 不做鉴权，权限由后端 Casbin 判定。请确认该 Token 所属角色拥有对应接口的权限。
- **代码生成了但表没建**：`autoMigrate` 没给 `true`，见上文「数据表没建出来」。
- **代码生成了但接口 404**：Go 代码需要重新编译并重启后端才会生效。
- **菜单没出现**：菜单已登记但当前角色未授权，到角色管理里勾选；或重新登录刷新菜单缓存。
- **AI 跳过分析直接生成、字段设计发散**：换用工具调用更稳定的模型，或在需求里直接给出字段清单 / 建表 SQL 来收敛范围。
- **在后台新建了 MCP 工具但 AI 看不到**：动态工具只在 MCP 进程启动时注册，没有热加载。到 Mcp Tools管理 页面停止再启动，或重启 `go run ./cmd/mcp` 进程。
