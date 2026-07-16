# AI CLI 构建

在管理后台选择要开放的接口，GVA 会读取 Swagger 自动生成一套命令行工具（CLI），并打包成 Skill 供 Claude Code 等 AI 助手使用。完成一次 `login` 鉴权后，AI 就能在终端直接调用这些接口，不需要再逐个说明接口的用法。

:::tip 与 MCP 的关系
[MCP](./mcp) 解决的是让 AI 工具接入 GVA、调用其中的内置工具。AI CLI 面向的是另一层需求：把你自己挑选的业务接口生成为命令行和 Skill，让 AI 在终端里直接执行。两者定位不同，可以同时使用。
:::

:::warning 编译前提
后台的「编译下载」依赖 Go 工具链：运行 GVA 后端的服务器上需要装有 Go（`go` 命令在 PATH 中），且后端工作目录为 `server/`。如果只用「获取 Manifest」，则不需要 Go。
:::

## 核心特性

- **接口即命令**：每个勾选的接口生成一个子命令，参数由 Swagger 推导。
- **交叉编译**：指定目标平台和架构，后台编译出一个可执行文件，下载即可运行。
- **打包为 Skill**：生成带 `SKILL.md` 的 Skill 包，解压后放入 Claude Code 即可被 AI 调用。
- **一次登录**：`login` 会把 JWT 保存在本地，此后每条命令自动携带鉴权信息。
- **脱离开发环境**：编译产物内嵌命令清单（manifest），可以独立部署到生产。

## 在后台构建 CLI

入口：**系统工具 → AI CLI 构建**。

<!-- 📷 截图位（待补）：AI CLI构建 列表页——露出「新增CLI」+ 行内「管理API / 管理场景 / 预览命令」。图片放 docs/public/cli/cli-list.png -->

### 第一步：新增 CLI

点击「新增 CLI」，填写基础信息：

| 字段 | 说明 |
| --- | --- |
| 主命令 | CLI 的程序名，例如 `opsctl`。生成的可执行文件和 Skill 都以它命名。 |
| 名称 / 显示名称 / 版本 / 描述 | CLI 的标识信息。 |
| Skill 名称 / Skill 描述 | 写入 Skill 包 `SKILL.md` 的 frontmatter，供 AI 助手识别。 |

<!-- 📷 截图位（待补）：「新增CLI」表单弹窗。图片放 docs/public/cli/cli-new.png -->

### 第二步：绑定要开放的接口

在列表中点击该 CLI 的「管理 API」，从左侧「可选 API」勾选要开放给 AI 的接口，移到「已选 API」后保存。每个接口会对应生成一个命令。

<!-- 📷 截图位（待补）：「管理API」穿梭框（可选API → 已选API）。图片放 docs/public/cli/cli-bindapi.png -->

### 第三步：预览命令并生成产物

点击「预览命令」，打开命令预览抽屉：

- 顶部可以设置 **API 地址**、**目标平台**（Windows / Linux / macOS）和**架构**（amd64 / arm64）。API 地址留空时使用后台默认地址，该地址会被编译进产物内部。
- 「执行操作」提供三种产物：

| 按钮 | 产物 | 用途 |
| --- | --- | --- |
| 编译 CLI 可执行程序 | `opsctl`（Windows 为 `opsctl.exe`） | 单个二进制文件，内嵌 manifest，下载即用 |
| 生成并下载 Skill 包 | `opsctl-skill.zip` | 放入 Claude Code 等 AI 助手 |
| 获取 Manifest 文件 | `opsctl.manifest.json` | 配合手动编译的 `gva` 使用 |

- 下方「命令列表」可以展开，查看每个命令的 method、path 和参数。

<!-- 📷 截图位（待补）：「命令预览」抽屉——平台/架构选择 + 三个操作按钮 + 命令列表。图片放 docs/public/cli/cli-preview.png -->

:::tip 只需在开发环境操作
下载和编译只需在开发环境完成。生成的 Skill 和 CLI 都是独立运行版本，可以直接部署到生产，不再依赖开发环境。
:::

## 装进 AI 助手（Claude Code）

将「生成并下载 Skill 包」得到的 `opsctl-skill.zip` 解压，会得到一个标准的 Skill 目录：

```text
opsctl-cli/
├─ SKILL.md            # 含 name / description，Claude Code 据此识别为一个 skill
├─ opsctl(.exe)        # 编译好的 CLI，与 SKILL.md 同级
└─ references/
   ├─ README.md        # 命令使用说明
   └─ manifest.json    # 命令清单
```

把整个 `opsctl-cli/` 目录放进 Claude Code 的 skills 目录（全局 `~/.claude/skills/`，或项目内 `.claude/skills/`），重新加载后，AI 助手就能按 `SKILL.md` 调用其中的 CLI。

<!-- 📷 截图位（待补）：解压后的 skill 目录结构，或 Claude Code 中该 skill 已加载。图片放 docs/public/cli/cli-skill.png -->

## 使用命令行

下面的示例以**后台编译版**为准，主命令用 `opsctl`。如果你用的是手动编译版，程序名为 `gva`，并且需要用 `--manifest` 指定命令清单，具体见各步的补充说明。

### 1. 登录（保存登录态，只需一次）

```bash
opsctl login --token <你的JWT>
```

JWT 在登录 GVA 后获得，也可以在系统工具的 API Token 页面复制（`http://localhost:8080/#/layout/systemTools/mcpTest`）。登录信息会写入 `~/.gva/config.json`。

手动编译版需要带上清单：

```bash
gva --manifest opsctl.manifest.json login --token <JWT>
```

### 2. 查看可用命令

```bash
opsctl --help          # 列出全部命令
opsctl <命令> --help    # 查看某个命令需要哪些参数
```

### 3. 调用命令

```bash
opsctl user-list --page 1 --pageSize 10
```

命令会按 manifest 中定义的 method 和 path 请求配置好的服务地址，并把返回内容原样打印到终端。

<!-- 📷 截图位（待补）：终端里 login 成功 + user-list 的返回输出。图片放 docs/public/cli/cli-terminal.png -->

## 两种运行模式

manifest（命令清单）决定了 CLI 能调用哪些接口，它的加载方式有两种：

- **内嵌模式**：使用后台「编译下载」版或 Skill 包时，manifest 已经编进二进制，`login` 之后直接使用命令即可，不需要 `--manifest`。
- **文件模式**：使用手动编译的 `gva`（`cd server && go build -o gva ./cmd/gva`）时，运行时用 `--manifest opsctl.manifest.json` 加载清单。首次带 `--manifest` 执行 `login` 后，路径会写入配置文件，之后可以省略。

## 配置文件说明

登录和运行相关的参数都保存在 `~/.gva/config.json`：

| 字段 | 说明 |
| --- | --- |
| `baseURL` | 后台服务地址，优先取 manifest 中的 `server.baseURL` |
| `token` | JWT，执行 `login` 时写入 |
| `authHeader` | 认证头名称，默认 `x-token` |
| `manifestPath` | manifest 文件路径，文件模式下由 `login` 写入 |

命令行全局参数：

| 参数 | 作用 |
| --- | --- |
| `--manifest` | 指定 manifest 文件路径 |
| `--base-url` | 覆盖服务地址 |
| `--auth-header` | 覆盖认证头名称 |

## 进阶：调用场景编排

如果一个任务需要 AI 按顺序调用多个命令，可以在 CLI 列表点击「管理场景」，用可视化画布把命令编排成一个「场景」：

- **命令节点**：对应一个命令，可标注别名、入参来源和说明。
- **判断节点**：不执行命令，通过出边条件实现分支。
- **连线**：拖动锚点连线，填写分支条件（用自然语言描述，可引用 `别名.字段`）。

编排结果会写入 Skill 说明，指导 AI 按流程分步调用，减少反复试错。

<!-- 📷 截图位（待补）：「管理场景」调用场景编排画布（命令节点 + 判断节点 + 连线）。图片放 docs/public/cli/cli-scenario.png -->

## 常见问题

- **「编译 CLI 可执行程序」失败**：确认运行 GVA 后端的服务器已安装 Go 工具链、后端工作目录为 `server/`。若没有 Go 环境，可改用「获取 Manifest 文件」加手动编译。
- **命令返回鉴权失败**：通常是 JWT 过期，重新执行 `login` 即可。
- **连不上服务地址**：用 `--base-url` 覆盖，或在「命令预览」页设置 API 地址后重新生成产物。