# 代码生成器

Gin-Vue-Admin 提供强大的代码生成器，支持根据数据库表结构自动生成完整的 CRUD 代码，包括后端 API、前端页面、路由配置等，大幅提升开发效率。

v3.0 对 AutoCode 进行了重构：代码在 system 组内按子域拆分为多个文件，数据库元数据查询支持 mysql、pgsql、mssql、oracle、sqlite 五种方言，并新增模板包、插件、MCP Tool 与大模型辅助生成能力。

## 功能概述

### 生成内容

- **后端代码**：Model、Service、API、Router
- **前端代码**：Vue 页面、API 接口、路由配置
- **数据库**：自动建表、字段验证
- **权限配置**：API 权限、菜单权限、按钮权限

### 支持特性

- **增删改查**：完整的 CRUD 操作
- **条件查询**：支持多字段条件筛选
- **分页查询**：自动分页处理
- **文件上传**：支持文件字段处理
- **数据源关联**：支持字典与关联表数据源
- **自定义模板**：模板包机制，可自定义代码模板
- **一键初始化**：生成后可一键初始化菜单、API、字典
- **生成历史**：支持回滚与重放
- **插件集成**：生成内容可打包为插件，支持安装、发布与移除
- **MCP Tool**：可创建 MCP Tool 并管理独立 MCP 服务
- **大模型辅助**：支持 LLM 辅助生成（SSE 流式）

## 使用方式

### 1. Web 界面生成

访问系统工具 → 代码生成器，通过可视化界面配置：

```
系统工具 → 代码生成器 → 新增
```

#### 配置步骤

1. **基础信息配置**
   - 表名称
   - 表描述
   - 结构体名称
   - 包名
   - 文件名

2. **字段配置**
   - 字段名称
   - 字段类型
   - 数据库类型
   - 字段描述
   - 是否必填
   - 查询条件
   - 字典类型

3. **生成选项**
   - 生成模块
   - 生成路径
   - 是否覆盖

### 2. API 接口生成

```bash
# 使用 curl 调用生成接口
curl -X POST "http://localhost:8888/autoCode/createTemp" \
  -H "Content-Type: application/json" \
  -d '{
    "structName": "User",
    "tableName": "sys_users",
    "packageName": "system",
    "fields": [
      {
        "fieldName": "Name",
        "fieldDesc": "用户名",
        "fieldType": "string",
        "fieldJson": "name",
        "require": true,
        "errorText": "请输入用户名"
      }
    ]
  }'
```

::: tip
服务端启动参数仅有 `-c`（指定配置文件），没有命令行生成入口，代码生成请通过 Web 界面或上述接口进行。
:::

## 配置详解

### 请求结构

v3.0 的生成请求结构为 `server/model/system/request/sys_auto_code.go` 中的 `AutoCode`：

```go
type AutoCode struct {
	Package             string           `json:"package"`           // 完整包路径
	TableName           string           `json:"tableName"`         // 表名
	BusinessDB          string           `json:"businessDB"`        // 业务数据库
	StructName          string           `json:"structName"`        // Struct名称
	PackageName         string           `json:"packageName"`       // 文件名称
	Description         string           `json:"description"`       // Struct中文名称
	Abbreviation        string           `json:"abbreviation"`      // Struct简称
	HumpPackageName     string           `json:"humpPackageName"`   // go文件名称
	GvaModel            bool             `json:"gvaModel"`          // 是否使用gva默认Model
	AutoMigrate         bool             `json:"autoMigrate"`       // 是否自动迁移表结构
	AutoCreateResource  bool             `json:"autoCreateResource"`  // 是否自动创建资源标识
	AutoCreateApiToSql  bool             `json:"autoCreateApiToSql"`  // 是否自动创建api
	AutoCreateMenuToSql bool             `json:"autoCreateMenuToSql"` // 是否自动创建menu
	AutoCreateBtnAuth   bool             `json:"autoCreateBtnAuth"`   // 是否自动创建按钮权限
	OnlyTemplate        bool             `json:"onlyTemplate"`      // 是否只生成模板
	IsTree              bool             `json:"isTree"`            // 是否树形结构
	Fields              []*AutoCodeField `json:"fields"`            // 字段列表
	GenerateWeb         bool             `json:"generateWeb"`       // 是否生成web
	GenerateServer      bool             `json:"generateServer"`    // 是否生成server
	PrimaryField        *AutoCodeField   `json:"primaryField"`      // 主键字段
	// ...
}
```

### 字段配置结构

```go
type AutoCodeField struct {
	FieldName       string      `json:"fieldName"`       // Field名
	FieldDesc       string      `json:"fieldDesc"`       // 中文名
	FieldType       string      `json:"fieldType"`       // Field数据类型
	FieldJson       string      `json:"fieldJson"`       // FieldJson
	DataTypeLong    string      `json:"dataTypeLong"`    // 数据库字段长度
	Comment         string      `json:"comment"`         // 数据库字段描述
	ColumnName      string      `json:"columnName"`      // 数据库字段
	FieldSearchType string      `json:"fieldSearchType"` // 搜索条件
	FieldSearchHide bool        `json:"fieldSearchHide"` // 是否隐藏查询条件
	DictType        string      `json:"dictType"`        // 字典
	Form            bool        `json:"form"`            // 是否前端新建/编辑
	Table           bool        `json:"table"`           // 是否前端表格列
	Desc            bool        `json:"desc"`            // 是否前端详情
	Excel           bool        `json:"excel"`           // 是否导入/导出
	Require         bool        `json:"require"`         // 是否必填
	DefaultValue    string      `json:"defaultValue"`    // 默认值
	ErrorText       string      `json:"errorText"`       // 校验失败文字
	Clearable       bool        `json:"clearable"`       // 是否可清空
	Sort            bool        `json:"sort"`            // 是否增加排序
	PrimaryKey      bool        `json:"primaryKey"`      // 是否主键
	DataSource      *DataSource `json:"dataSource"`      // 数据源
	CheckDataSource bool        `json:"checkDataSource"` // 是否检查数据源
	FieldIndexType  string      `json:"fieldIndexType"`  // 索引类型
}
```

### autocode 配置节

`config.yaml` 中的 `autocode` 节控制生成路径与模块信息：

```yaml
autocode:
    web: web/src
    root: "" # root 自动适配项目根目录, 请不要手动配置,他会在项目加载的时候识别出根路径
    server: server
    module: 'github.com/flipped-aurora/gin-vue-admin/server'
    ai-path: ""  # AI服务路径
```

## 模板系统

### 模板目录结构

v3.0 的模板资源位于 `server/resource/` 下：

```
server/resource/
├── package/             # 代码生成模板包
│   ├── server/          # 后端模板
│   │   ├── api/         # api.go.tpl、enter.go.tpl
│   │   ├── model/       # model.go.tpl、request/request.go.tpl
│   │   ├── router/      # router.go.tpl、enter.go.tpl
│   │   └── service/     # service.go.tpl、enter.go.tpl
│   └── web/             # 前端模板
│       ├── api/         # api.js.tpl
│       └── view/        # table.vue.tpl、form.vue.tpl
├── mcp/
│   └── tools.tpl        # MCP Tool 模板
├── api_cli/
│   └── bash.tpl         # API 命令行脚本模板
└── plugin/              # 插件模板
```

模板基于 Go template 语法，自定义模板函数（如 `GenerateField`、`GenerateSearchFormItem`、`GenerateTableColumn`、`GenerateFormItem` 等）定义在 `server/utils/autocode/template_funcs.go`；生成代码向既有文件的路由注册、仓库注册等注入由 `server/utils/ast/` 的 AST 注入完成。

### 自定义模板

#### 后端模板示例（resource/package/server/model/model.go.tpl 节选）

```go
// 自动生成模板{{.StructName}}
package {{.Package}}

{{- if not .OnlyTemplate}}
import (
	{{- if .GvaModel }}
	"{{.Module}}/global"
	{{- end }}
	{{- if or .HasTimer }}
	"time"
	{{- end }}
	{{- if .NeedJSON }}
	"gorm.io/datatypes"
	{{- end }}
)
{{- end }}

// {{.Description}} 结构体  {{.StructName}}
type {{.StructName}} struct {
{{- if not .OnlyTemplate}}
{{- if .GvaModel }}
    global.GVA_MODEL
{{- end }}
```

#### 前端模板示例（resource/package/web/view/table.vue.tpl 节选）

```vue
{{- $global := . }}
{{- $templateID := printf "%s_%s" .Package .StructName }}
{{- if .IsAdd }}

// 请在搜索条件中增加如下代码
{{- range .Fields}}
    {{- if .FieldSearchType}}
{{ GenerateSearchFormItem .}}
    {{ end }}
{{ end }}


// 表格增加如下列代码

{{- range .Fields}}
    {{- if .Table}}
       {{ GenerateTableColumn . }}
    {{- end }}
{{- end }}
```

## v3.0 代码结构

v3.0 的 AutoCode 在 `server/api/v1/system/` 按子域拆分为多个文件：

| 文件 | 职责 |
| --- | --- |
| sys_auto_code.go | getDB / getTables / getColumn 元数据查询，llmAuto 大模型辅助 |
| auto_code_template.go | preview 预览、createTemp 生成、addFunc 追加方法 |
| auto_code_package.go | 模板包管理（getPackage / createPackage / delPackage / getTemplates） |
| auto_code_history.go | 生成历史（回滚 / 重放 / 删除历史） |
| auto_code_plugin.go | installPlugin / pubPlug / getPluginList / removePlugin 插件管理，initMenu / initAPI / initDictionary 一键初始化 |
| auto_code_mcp.go | MCP Tool 创建与独立服务管理 |
| sys_auto_code_sse.go | llmAutoSSE 大模型流式生成 |

service 层（`server/service/system/`）对应拆分，其中数据库元数据查询按方言独立为 `sys_auto_code_mysql.go`、`sys_auto_code_pgsql.go`、`sys_auto_code_mssql.go`、`sys_auto_code_oracle.go`、`sys_auto_code_sqlite.go`，对应五种数据库。

## 自动注册与一键初始化

- 生成请求中的 `autoCreateApiToSql`、`autoCreateMenuToSql`、`autoCreateBtnAuth` 开关，可在生成时自动向 sys_apis、sys_base_menus 等表注册 API、菜单与按钮权限。
- 生成后也可通过 `/autoCode/initMenu`、`/autoCode/initAPI`、`/autoCode/initDictionary` 一键初始化菜单、API、字典。

## 生成历史与回滚

每次生成都会写入 `sys_auto_code_histories` 历史记录（request 结构化信息、templates 模板信息、injections 注入路径、api_ids 注册内容、menu_id 等），`flag` 标记状态（0 代表创建，1 代表回滚）。

相关接口：

| 接口 | 说明 |
| --- | --- |
| /autoCode/getSysHistory | 获取回滚记录分页 |
| /autoCode/getMeta | 根据 id 获取 meta 信息 |
| /autoCode/rollback | 回滚（删除生成文件、撤销注入与注册的 API） |
| /autoCode/delSysHistory | 删除回滚记录 |

历史记录支持回滚与重放，回滚基于记录中的 templates 与 injections 元数据精确定位生成文件与注入点。

## 插件与 MCP

- **插件**：模板包可通过 `/autoCode/pubPlug` 打包发布，`/autoCode/installPlugin` 安装，`/autoCode/getPluginList`、`/autoCode/removePlugin` 查询与移除。
- **MCP**：`/autoCode/mcp`、`/autoCode/mcpStart`、`/autoCode/mcpStop`、`/autoCode/mcpStatus`、`/autoCode/mcpList`、`/autoCode/mcpRoutes`、`/autoCode/mcpTest` 提供 MCP Tool 创建与独立服务管理，Tool 模板为 `server/resource/mcp/tools.tpl`。

## 大模型辅助生成

`/autoCode/llmAuto` 与 `/autoCode/llmAutoSSE`（SSE 流式）提供大模型辅助生成能力，AI 服务路径由 `autocode` 配置节的 `ai-path` 指定。

## 常见问题

### Q: 生成的代码编译失败？
A: 检查字段类型配置是否正确，确保 Go 类型和数据库类型匹配。

### Q: 前端页面显示异常？
A: 检查字段的前端显示配置（form、table、desc 等），确保必要的字段已设置为前端显示。

### Q: 如何自定义生成模板？
A: 修改 `server/resource/package/` 目录下的模板文件，重启服务即可生效。

### Q: 生成后如何添加自定义逻辑？
A: 在生成的代码基础上添加自定义方法，避免直接修改生成的核心 CRUD 方法；也可以通过 `/autoCode/addFunc` 向既有包追加方法。

## 相关文档

- [数据库设计](./database-design.md)
- [服务端配置](./config/index.md)
- [前端开发指南](../web/index.md)
- [代码生成器](../generator/server.md)
