<style>
/* ===== 表格样式 · 摘自 gva-docs-elements 原型 =====
   选择器带 .vp-doc 前缀提权,并逐条重置主题默认表格样式
   (斑马纹 / 单元格全边框 / display:block / 灰色表头字) ===== */
:root{
  --gva-primary:#2264F2;
  --gva-text-strong:#0B0B0F;--gva-text-body:#5A5F6B;
  --gva-bg-alt:#f7f7f7;
  --gva-border:rgba(15,23,42,.1);--gva-border-soft:rgba(15,23,42,.06);
  --gva-radius:14px;
  --gva-shadow-sm:0 1px 2px rgba(15,23,42,.04),0 4px 12px rgba(15,23,42,.05);
  --gva-mono:"SF Mono","JetBrains Mono","Fira Code",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
}

.vp-doc .table-wrap,
.table-wrap{
  border:1px solid var(--gva-border) !important;
  border-radius:var(--gva-radius);
  overflow:hidden;
  box-shadow:var(--gva-shadow-sm);
  margin:16px 0 22px;
}

/* 还原为标准表格布局,清掉主题的 display:block / 外边距 / 外框 */
.vp-doc .table-wrap table.doc-table,
.table-wrap table.doc-table{
  display:table !important;
  width:100% !important;
  border-collapse:collapse !important;
  border:0 !important;
  margin:0 !important;
  overflow:visible !important;
  font-size:13.5px;
  line-height:1.6;
}

/* 行:清掉斑马纹与行边框 */
.vp-doc .table-wrap .doc-table tr,
.vp-doc .table-wrap .doc-table tr:nth-child(2n),
.table-wrap .doc-table tr,
.table-wrap .doc-table tr:nth-child(2n){
  background:transparent !important;
  border:0 !important;
}

/* 表头:灰底 + 深色字,只留底边线 */
.vp-doc .table-wrap .doc-table th,
.table-wrap .doc-table th{
  background:var(--gva-bg-alt) !important;
  color:var(--gva-text-strong) !important;
  font-weight:600 !important;
  font-size:13.5px !important;
  text-align:left !important;
  padding:12px 14px !important;
  border:0 !important;
  border-bottom:1px solid var(--gva-border) !important;
  vertical-align:top;
}

/* 单元格:去网格线,只留软色底边线 */
.vp-doc .table-wrap .doc-table td,
.table-wrap .doc-table td{
  background:transparent !important;
  color:var(--gva-text-body) !important;
  font-size:13.5px !important;
  padding:11px 14px !important;
  border:0 !important;
  border-bottom:1px solid var(--gva-border-soft) !important;
  vertical-align:top;
  transition:background .15s ease;
}
.vp-doc .table-wrap .doc-table tbody tr:last-child td,
.table-wrap .doc-table tbody tr:last-child td{
  border-bottom:0 !important;
}
.vp-doc .table-wrap .doc-table tbody tr:hover td,
.table-wrap .doc-table tbody tr:hover td{
  background:rgba(34,100,242,.03) !important;
}

/* 首列名称:深色加重 */
.vp-doc .table-wrap .doc-table td.c-name,
.table-wrap .doc-table td.c-name{
  color:var(--gva-text-strong) !important;
  font-weight:500 !important;
}

/* 字段名:蓝色等宽,无底色 */
.vp-doc .table-wrap .doc-table .field,
.table-wrap .doc-table .field{
  font-family:var(--gva-mono) !important;
  font-size:12.5px !important;
  color:var(--gva-primary) !important;
  background:none !important;
  padding:0 !important;
  border:0 !important;
  word-break:break-word;
}

/* 行内 code:压过主题的 :not(pre)>code 规则 */
.vp-doc .table-wrap .doc-table code.icode,
.table-wrap .doc-table code.icode{
  font-family:var(--gva-mono) !important;
  font-size:.88em !important;
  background:rgba(15,23,42,.06) !important;
  color:var(--gva-text-strong) !important;
  padding:1px 6px !important;
  border:0 !important;
  border-radius:6px !important;
  word-break:break-word;
}
</style>

# 代码生成器使用指南

## 2.5.3以后需先创造package
参考视频：https://www.bilibili.com/video/BV1kv4y1g7nT?p=3

## 代码生成器

最上方的点这里从现有数据库创建代码，可以选择数据库中的表，然后生成对应的代码。

![image-20201026165650624](/generator/image-20201026165650624.png)

<div class="table-wrap">
  <table class="doc-table">
    <thead>
      <tr><th style="width:14%">界面名称</th><th style="width:15%">对应生成结构体结构体名称</th><th style="width:20%">中文说明</th><th style="width:51%">备注</th></tr>
    </thead>
    <tbody>
      <tr><td class="c-name">Struct名称</td><td><span class="field">StructName</span></td><td>结构体名称</td><td><code class="icode">server/model</code> 文件夹下的结构体文件中，结构体的名称，首字母必须<strong>大写</strong>。</td></tr>
      <tr><td class="c-name">TableName</td><td><span class="field">TableName</span></td><td>指定表名(非必填)</td><td>数据库中生成的与结构体对应的数据表名。</td></tr>
      <tr><td class="c-name">Struct简称</td><td><span class="field">Abbreviation</span></td><td>简称会作为入参对象名和路由group</td><td>用于结构体作为参数时的名称，以及路由 group 名称。这里一般与<strong>Stuct名称</strong>对应，但是首字母小写。</td></tr>
      <tr><td class="c-name">Struct中文名称</td><td><span class="field">Description</span></td><td>中文描述作为自动api描述</td><td>作为自动api描述，也是左侧菜单显示时的默认菜单名。</td></tr>
      <tr><td class="c-name">文件名称</td><td><span class="field">PackageName</span></td><td>生成文件的默认名称</td><td>使用 小驼峰 形式命名。生成后端代码时，model下的文件名会用这里的命名。</td></tr>
      <tr><td class="c-name">Package（包）</td><td><span class="field">Package</span></td><td>生成的目标包</td><td>必选，自动化代码会生成到所选的包下，自动填充enter.go等文件</td></tr>
      <tr><td class="c-name">业务库</td><td><span class="field">BusinessDB</span></td><td>选择业务库</td><td>可选，如果选中本条目，则自动生成的global.GVA_DB会被替换为global.MustGetGlobalDBByDBName(BusinessDb)。</td></tr>
      <tr><td class="c-name">使用GVA结构</td><td><span class="field">GvaModel</span></td><td>使用GVA结构</td><td>建议选中，如果不选则不会自动创建api表，需要自己去api管理里面手动增加对应路由。</td></tr>
      <tr><td class="c-name">创建资源标识</td><td><span class="field">AutoCreateResource</span></td><td>创建资源标识</td><td>可选，此功能需要配合插件市场的组织管理插件使用。</td></tr>
      <tr><td class="c-name">自动创建api</td><td><span class="field">AutoCreateApiToSql</span></td><td>自动创建api</td><td>建议选中，把自动生成的API注册进数据库。</td></tr>
      <tr><td class="c-name">自动创建菜单</td><td><span class="field">AutoCreateMenuToSql</span></td><td>自动创建菜单</td><td>建议选中，把自动生成的菜单注册进数据库。</td></tr>
      <tr><td class="c-name">自动移动文件</td><td><span class="field">AutoMoveFile</span></td><td>自动移动文件</td><td>建议选中，自动迁移生成的文件到yaml配置的对应位置。</td></tr>
    </tbody>
  </table>
</div>

## 字段界面说明

![image-20201026165813881](/generator/image-20201026165813881.png)

<div class="table-wrap">
  <table class="doc-table">
    <thead>
      <tr><th style="width:14%">组件内容名称</th><th style="width:18%">对应生成结构体结构体名称</th><th style="width:19%">中文说明</th><th style="width:49%">备注</th></tr>
    </thead>
    <tbody>
      <tr><td class="c-name">Field名称</td><td><span class="field">FieldName</span></td><td>结构体名称</td><td>struct结构体中的字段名称，首字母<strong>大写</strong></td></tr>
      <tr><td class="c-name">Field中文名</td><td><span class="field">FieldDesc</span></td><td>结构体中文名称</td><td>对应struct结构体tag中的comment字段值，也是数据列表展示表格的表头名称。</td></tr>
      <tr><td class="c-name">FieldJSON</td><td><span class="field">FieldJson</span></td><td>golang struct tag <code class="icode">json</code></td><td>对应struct结构体tag中的json字段值。在使用struct对象调用某个字段时，使用“对象.json字段值”</td></tr>
      <tr><td class="c-name">数据库字段名</td><td><span class="field">ColumnName</span></td><td>数据库字段名</td><td>对应数据库中的字段名称</td></tr>
      <tr><td class="c-name">Field数据类型</td><td><span class="field">FieldType</span></td><td>字段对应golang数据类型</td><td>对应struct结构体中的字段类型</td></tr>
      <tr><td class="c-name">数据库字段长度</td><td><span class="field">DataTypeLong</span></td><td>字段数据类型长度</td><td>对应生成的数据表中的字段长度</td></tr>
      <tr><td class="c-name">数据库字段描述</td><td><span class="field">Comment</span></td><td>数据库字段描述</td><td>数据库字段描述,会根据此属性生成前端表格的表头名称和表单的label名称</td></tr>
      <tr><td class="c-name">默认值</td><td><span class="field">DefaultValue</span></td><td>数据库字段默认值</td><td>当数据为空时，数据库录入时会自动以DefaultValue值进行填充</td></tr>
      <tr><td class="c-name">是否必填</td><td><span class="field">Require</span></td><td>是否必填</td><td>自动创建前后端必填校验</td></tr>
      <tr><td class="c-name">校验失败文案</td><td><span class="field">ErrorText</span></td><td>必填校验失败的文案</td><td>必填校验失败的文案</td></tr>
      <tr><td class="c-name">是否排序</td><td><span class="field">Sort</span></td><td>是否排序</td><td>自动创建前后端排序代码</td></tr>
      <tr><td class="c-name">前端可见</td><td><span class="field">Front</span></td><td>前端可见</td><td>前端是否创建本字端（常用于仅后端使用，前端不需要展示给用户的字段）</td></tr>
      <tr><td class="c-name">主键</td><td><span class="field">PrimaryKey</span></td><td>数据库主键</td><td>数据库主键，在不适用gva默认结构下，本字段会自动成为查询主要字段</td></tr>
      <tr><td class="c-name">是否可清空</td><td><span class="field">Clearable</span></td><td>clearable</td><td>前端输入框右侧是否出现X允许用户点击清空本字段已经输入过的内容</td></tr>
      <tr><td class="c-name">Field查询条件</td><td><span class="field">FieldSearchType</span></td><td>搜索类型</td><td>用于实现该对象数据列表的条件查询</td></tr>
      <tr><td class="c-name">关联字典</td><td><span class="field">DictType</span></td><td>关联字典标记</td><td>从字典功能中关联一个可用的字典进行数据操作，展示位下拉选择。</td></tr>
      <tr><td class="c-name">数据源配置</td><td><span class="field">dataSource:{table,label,value}</span></td><td>数据源配置</td><td>本功能用于产生一个关联字段，字段在前端展示位下拉选择（单选），字段来源取决于配置内容，数据源表为内容索取的表，展示用字段配置，则会从表取本字段用于前端下拉框的展示内容，存储用字段，则会从表取本字段用于选中后真实的赋值内容</td></tr>
    </tbody>
  </table>
</div>


## 1. 生成一步到位代码包

### 1.1 自行设计业务基础结构体模型

- 点击左侧菜单中的 **系统工具 → 代码生成器**
- 填写好 `Struct名称` ` tableName` `Struct简称` `Struct中文名称` `文件名称` 空格
- 选择好 `自动创建api` `自动移动文件` 按钮

- 点击 **新增Field** 按钮，为数据表、struct结构体创建字段,  具体请看[字段界面说明](#字段界面说明)。

### 1.2 从数据库的选择表进行生成结构体

- 点击左侧菜单中的**系统工具** > **代码生成器** ,代码生成器是用来生成CURD代码的。

- 点击 **点这里从现有数据库创建代码**

- ![image-20200915160906999](/generator/image-20200915160906999.png)

- 选择 **数据库名** 以及 **表名**

- ![image-20200915161618174](/generator/image-20200915161618174.png)

- 点击**使用此表创建**

- ![image-20200915161727520](/generator/image-20200915161727520.png)

- 自行编辑好各个`Filed`的所需的搜索条件, 需要关联的字典, 或者其他自己要修改的地方点击编辑进行修改.

- ![image-20200915161917791](/generator/image-20200915161917791.png)





### 1.3  点击生成代码按钮

:::info 注意

完成1.1或1.2步骤操作, 其中一个操作喔!

:::

代码会自动移动到前后端你所创建的package文件夹下
前端分别会移动到 `/api/${pageageName}` 和 `/view/${pageageName}` 下
后端分别会移动到 `/api/${pageageName}`、 `/service/${pageageName}` 、 `/router/${pageageName}` 下、 `/model/${pageageName}` 下

:::tip 提示
在创建自动化代码时候会自动创建enter.go 一下为关于enter.go的介绍
:::

enter.go内部将所有的相关功能模块下的结构统一为一个总结构体，然后将可以通过new这个总结构体实现对本模块的所有结构统一实例化使用 我们此处仅以api下的system分类为例（其他模块操作类似 model模块无enter.go）

我们以system这个package为例
```
enter.go
  sys_api.go
  sys_authority.go
  sys_auto_code.go
  sys_auto_code_history.go
  sys_captcha.go
  sys_casbin.go
  sys_dictionary.go
  sys_dictionary_detail.go
  sys_initdb.go
  sys_jwt_blacklist.go
  sys_menu.go
  sys_operation_record.go
  sys_system.go
  sys_user.go
```
enter.go
文件中存在如下结构

```go

package system

import "github.com/flipped-aurora/gin-vue-admin/server/service"


// 此处为功能模块的分组 表示我们这边是API模块 我们总结了当前目录下的所有结构体
type ApiGroup struct {
	DBApi	//这是当前分组下存在的模块 DBApi模块 就来自于 sys_initdb.go 下的 type DBApi struct{} 下方同理
	JwtApi
	BaseApi
	SystemApi
	CasbinApi
	AutoCodeApi
	SystemApiApi
	AuthorityApi
	DictionaryApi
	AuthorityMenuApi
	OperationRecordApi
	AutoCodeHistoryApi
	DictionaryDetailApi
}


// 此处是为了统一方便使用Service下的功能 因此统一获取做了拆解 方便api模块下所有的功能都可以通过调用此处的变量获取到对应的Service实例从而调用其方法
var (
	apiService              = service.ServiceGroupApp.SystemServiceGroup.ApiService 
	// apiService： 例如此处描述的就是 service包下的ServiceGroup示例下的SystemServiceGroup功能组的ApiService相关功能
	jwtService              = service.ServiceGroupApp.SystemServiceGroup.JwtService
	menuService             = service.ServiceGroupApp.SystemServiceGroup.MenuService
	userService             = service.ServiceGroupApp.SystemServiceGroup.UserService
	initDBService           = service.ServiceGroupApp.SystemServiceGroup.InitDBService
	casbinService           = service.ServiceGroupApp.SystemServiceGroup.CasbinService
	autoCodeService         = service.ServiceGroupApp.SystemServiceGroup.AutoCodeService
	baseMenuService         = service.ServiceGroupApp.SystemServiceGroup.BaseMenuService
	authorityService        = service.ServiceGroupApp.SystemServiceGroup.AuthorityService
	dictionaryService       = service.ServiceGroupApp.SystemServiceGroup.DictionaryService
	systemConfigService     = service.ServiceGroupApp.SystemServiceGroup.SystemConfigService
	operationRecordService  = service.ServiceGroupApp.SystemServiceGroup.OperationRecordService
	autoCodeHistoryService  = service.ServiceGroupApp.SystemServiceGroup.AutoCodeHistoryService
	dictionaryDetailService = service.ServiceGroupApp.SystemServiceGroup.DictionaryDetailService
)

```

这里我们介绍完了声明enter的过程 和使用其他包下enter的过程  然后我们找到实例化enter的过程

查看/server/api/v1/enter.go 这个文件

```go

package v1

import (
	"github.com/flipped-aurora/gin-vue-admin/server/api/v1/autocode"
	"github.com/flipped-aurora/gin-vue-admin/server/api/v1/example"
	"github.com/flipped-aurora/gin-vue-admin/server/api/v1/system"
)

type ApiGroup struct {
	SystemApiGroup   system.ApiGroup
	ExampleApiGroup  example.ApiGroup
	AutoCodeApiGroup autocode.ApiGroup
}

// 我们在此处对上方前面做过的所有声明进行了总结并且实例化为App 其他包我们通过调用 v1.ApiGroupApp.xxxx组.xxx功能.xxx方法即可
var ApiGroupApp = new(ApiGroup)


```
手动添加自动化生成代码的方式也介绍完了，此模式方便大家模块化使用，看起来比较长，但是其便于对单一分类统一管理，创建同意方法等，同样也便于项目后期拓展维护。在后续迭代中不再痛苦。

### 1.4 预览代码

:::info 注意

此功能需要在 [v2.3.9](https://github.com/flipped-aurora/gin-vue-admin/tree/v2.3.9) 之后的版本才会有喔, 不包含v2.3.9!

:::

![image-20210224151109195](/generator/image-20210224151109195.png)

效果预览

![image-20210224151320620](/generator/image-20210224151320620.png)

## 2. 注册路由和数据库表

### 2.1 注册路由 (目前版本已可自动添加)

[server/initialize/router.go](https://github.com/flipped-aurora/gin-vue-admin/blob/master/server/initialize/router.go)

```go
package initialize

import (
	_ "gin-vue-admin/docs"
	"gin-vue-admin/global"
	"gin-vue-admin/middleware"
	"gin-vue-admin/router"
	"github.com/gin-gonic/gin"
	"github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
	"net/http"
)

// 初始化总路由

func Routers() *gin.Engine {
	Router := gin.Default()

	// 如果想要不使用nginx代理前端网页，可以修改 web/.env.production 下的
	// VUE_APP_BASE_API = /
	// VUE_APP_BASE_PATH = http://localhost
	// 然后执行打包命令 npm run build。在打开下面4行注释
	// Router.LoadHTMLGlob("./dist/*.html") // npm打包成dist的路径
	// Router.Static("/favicon.ico", "./dist/favicon.ico")
	// Router.Static("/static", "./dist/assets")   // dist里面的静态资源
	// Router.StaticFile("/", "./dist/index.html") // 前端网页入口页面

	Router.StaticFS(global.GVA_CONFIG.Local.Path, http.Dir(global.GVA_CONFIG.Local.Path)) // 为用户头像和文件提供静态地址
	// Router.Use(middleware.LoadTls())  // 打开就能玩https了
	global.GVA_LOG.Info("use middleware logger")
	// 跨域，如需跨域可以打开下面的注释
	// Router.Use(middleware.Cors()) // 直接放行全部跨域请求
	//Router.Use(middleware.CorsByRules()) // 按照配置的规则放行跨域请求
	global.GVA_LOG.Info("use middleware cors")
	Router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	global.GVA_LOG.Info("register swagger handler")
	// 方便统一添加路由组前缀 多服务器上线使用

	// 获取路由组实例
	systemRouter := router.RouterGroupApp.System
	exampleRouter := router.RouterGroupApp.Example
	autocodeRouter := router.RouterGroupApp.Autocode
	// 来自router的enter.go
	PublicGroup := Router.Group("")
	{
		// 健康监测
		PublicGroup.GET("/health", func(c *gin.Context) {
			c.JSON(200, "ok")
		})
	}
	{
		systemRouter.InitBaseRouter(PublicGroup) // 注册基础功能路由 不做鉴权
		systemRouter.InitInitRouter(PublicGroup) // 自动初始化相关
	}
	PrivateGroup := Router.Group("")
	PrivateGroup.Use(middleware.JWTAuth()).Use(middleware.CasbinHandler())
	{
		systemRouter.InitApiRouter(PrivateGroup)                 // 注册功能api路由
		systemRouter.InitJwtRouter(PrivateGroup)                 // jwt相关路由
		systemRouter.InitUserRouter(PrivateGroup)                // 注册用户路由
		systemRouter.InitMenuRouter(PrivateGroup)                // 注册menu路由
		systemRouter.InitSystemRouter(PrivateGroup)              // system相关路由
		systemRouter.InitCasbinRouter(PrivateGroup)              // 权限相关路由
		systemRouter.InitAutoCodeRouter(PrivateGroup)            // 创建自动化代码
		systemRouter.InitAuthorityRouter(PrivateGroup)           // 注册角色路由
		systemRouter.InitSysDictionaryRouter(PrivateGroup)       // 字典管理
		systemRouter.InitAutoCodeHistoryRouter(PrivateGroup)     // 自动化代码历史
		systemRouter.InitSysOperationRecordRouter(PrivateGroup)  // 操作记录
		systemRouter.InitSysDictionaryDetailRouter(PrivateGroup) // 字典详情管理

		exampleRouter.InitExcelRouter(PrivateGroup)                 // 表格导入导出
		exampleRouter.InitCustomerRouter(PrivateGroup)              // 客户路由
		exampleRouter.InitFileUploadAndDownloadRouter(PrivateGroup) // 文件上传下载功能路由

		// Code generated by github.com/flipped-aurora/gin-vue-admin/server Begin; DO NOT EDIT.
		autocodeRouter.InitSysAutoCodeExampleRouter(PrivateGroup)
		// Code generated by github.com/flipped-aurora/gin-vue-admin/server End; DO NOT EDIT.
	}

	InstallPlugin(PublicGroup, PrivateGroup) // 安装插件

	global.GVA_LOG.Info("router register success")
	return Router
}
```

### 2.2 注册数据库表 (目前版本已可自动添加)

[server/initialize/gorm.go](https://github.com/flipped-aurora/gin-vue-admin/blob/master/server/initialize/gorm.go)

将你的model结构配置进入 db.AutoMigrate()内部即可

```go
package initialize

import (
	"os"

	"github.com/flipped-aurora/gin-vue-admin/server/global"
	"github.com/flipped-aurora/gin-vue-admin/server/model/autocode"
	"github.com/flipped-aurora/gin-vue-admin/server/model/example"
	"github.com/flipped-aurora/gin-vue-admin/server/model/system"

	"go.uber.org/zap"
	"gorm.io/gorm"
)

// Gorm 初始化数据库并产生数据库全局变量
// Author SliverHorn
func Gorm() *gorm.DB {
	switch global.GVA_CONFIG.System.DbType {
	case "mysql":
		return GormMysql()
	case "pgsql":
		return GormPgSql()
	default:
		return GormMysql()
	}
}

// RegisterTables 注册数据库表专用
// Author SliverHorn
func RegisterTables(db *gorm.DB) {
	err := db.AutoMigrate(
		// 系统模块表
		system.SysApi{},
		system.SysUser{},
		system.SysBaseMenu{},
		system.JwtBlacklist{},
		system.SysAuthority{},
		system.SysDictionary{},
		system.SysOperationRecord{},
		system.SysAutoCodeHistory{},
		system.SysDictionaryDetail{},
		system.SysBaseMenuParameter{},

		// 示例模块表
		example.ExaFile{},
		example.ExaCustomer{},
		example.ExaFileChunk{},
		example.ExaFileUploadAndDownload{},

		// 自动化模块表
		// Code generated by github.com/flipped-aurora/gin-vue-admin/server Begin; DO NOT EDIT.
		autocode.AutoCodeExample{},
		// Code generated by github.com/flipped-aurora/gin-vue-admin/server End; DO NOT EDIT.
	)
	if err != nil {
		global.GVA_LOG.Error("register table failed", zap.Error(err))
		os.Exit(0)
	}
	global.GVA_LOG.Info("register table success")
}

```

## 3.配置目录菜单

![image-20210224143727296](/generator/image-20210224143727296.png)

进入系统 超级管理员 → 菜单管理 菜单，点击 **新增根菜单** 按钮，配置菜单信息。

- 路由name：对应进入列表显示页面时的访问路径
- 路由path：选中后边的“添加参数”后才可以输入，对应进入列表显示页面时访问路径后的参数,具体使用方式看[视频](https://www.bilibili.com/video/BV1jk4y127yg)
- 是否隐藏：是否在系统左侧目录菜单显示时，隐藏掉该目录菜单
- 父节点Id：该目录菜单的父级目录菜单。这里是自动填充的数据，不需要自己操作
- 文件路径：对应前端项目中 /view/ [PackageName](#packagename) (自建)/[StructName](#structname).vue 文件
- 展示名称：该目录菜单显示在系统左侧目录菜单中的名称
- 图标：该目录菜单显示在系统左侧目录菜单中的图标
- 排序标记：用于调整该目录菜单在系统左侧目录菜单中显示的上下位置
- keepAlive：是否使用keepAlive缓存

以上配置好后，点击 **确定** 按钮，完成菜单配置。

## 4.配置后端接口

如果在第一步的`自动创建api`打钩了即可跳过此步

![](/generator/image-20200915163147059.png)

如果是自己写的业务代码，这里需要配置好后端接口。进入系统 `超级管理员` → api管理 菜单，点击 **新增api** 按钮，配置接口信息。

:::info 注意

如果不知道怎么写,可以看看 [代码](https://github.com/flipped-aurora/gin-vue-admin/blob/master/server/service/sys_auto_code.go#L254)

```go
//@author: [piexlmax](https://github.com/piexlmax)
//@author: [SliverHorn](https://github.com/SliverHorn)
//@function: CreateApi
//@description: 自动创建api数据,
//@param: a *model.AutoCodeStruct
//@return: error

func AutoCreateApi(a *model.AutoCodeStruct) (err error) {
	var apiList = []model.SysApi{
		{
			Path:        "/" + a.Abbreviation + "/" + "create" + a.StructName,
			Description: "新增" + a.Description,
			ApiGroup:    a.Abbreviation,
			Method:      "POST",
		},
		{
			Path:        "/" + a.Abbreviation + "/" + "delete" + a.StructName,
			Description: "删除" + a.Description,
			ApiGroup:    a.Abbreviation,
			Method:      "DELETE",
		},
		{
			Path:        "/" + a.Abbreviation + "/" + "delete" + a.StructName + "ByIds",
			Description: "批量删除" + a.Description,
			ApiGroup:    a.Abbreviation,
			Method:      "DELETE",
		},
		{
			Path:        "/" + a.Abbreviation + "/" + "update" + a.StructName,
			Description: "更新" + a.Description,
			ApiGroup:    a.Abbreviation,
			Method:      "PUT",
		},
		{
			Path:        "/" + a.Abbreviation + "/" + "find" + a.StructName,
			Description: "根据ID获取" + a.Description,
			ApiGroup:    a.Abbreviation,
			Method:      "GET",
		},
		{
			Path:        "/" + a.Abbreviation + "/" + "get" + a.StructName + "List",
			Description: "获取" + a.Description + "列表",
			ApiGroup:    a.Abbreviation,
			Method:      "GET",
		},
	}
	err = global.GVA_DB.Transaction(func(tx *gorm.DB) error {
		for _, v := range apiList {
			var api model.SysApi
			if errors.Is(tx.Where("path = ? AND method = ?", v.Path, v.Method).First(&api).Error, gorm.ErrRecordNotFound) {
				if err := tx.Create(&v).Error; err != nil { // 遇到错误时回滚事务
					return err
				}
			}
		}
		return nil
	})
	return err
}
```

:::

- 路径：就是接口路径，比如前端项目中 src → api → [PackageName](#packagename) .js 每个方法里的 url
- 请求：根据接口实际选择即可
- api分组：对应 struct 简称
- api简介：对api的简要说明

以上配置好后，点击 **确定** 按钮，完成接口配置。

## 5.配置角色权限

进入系统 `超级管理员` → `角色管理` 菜单，找到需要设置权限的角色，点击对应的 **设置权限** 按钮，配置角色相关权限。

![image-20210224144035326](/generator/image-20210224144035326.png)

角色菜单：勾选该角色可以访问的目录菜单

![image-20210224144517336](/generator/image-20210224144517336.png)

角色api：勾选该角色可以访问的接口

![image-20210224144708399](/generator/image-20210224144708399.png)

## 6：完善新增表单弹窗/页面

:::info 注意

在 [v2.3.5](https://github.com/flipped-aurora/gin-vue-admin/releases/tag/v2.3.5) 版本后,不再需要手动创建表单, 如果你要自己定义表单,可以看看!

:::

以上6个步骤完成后，我们可以在系统中看到我们所创建的结构体数据列表页面。目前，这个页面已经是可以实现 **删除**、**查询** 功能了，**新增**、**修改** 功能仍然需要我们自己完善一下弹窗表单。

进入系统 系统工具 → 表单生成器 菜单，根据自己的实际需求，将左侧组件拖拽至中间画布区域，并在右侧设置组件属性。

- 组件类型：默认是左侧选中的组件类型，这里还可以再进行调整
- 字段名：对应 Step3 中的 **FieldJSON** 字段
- 标题：即组件label
- 占位提示：。。。就是占位提示

把所有组件上边几个基本的组件属性填好以后，点击画布上方的 **复制代码** 按钮，会出现一个弹窗，让我们选择 **生成类型** 是 页面 还是 弹窗。我用的时候选的页面，具体内容应该是没差的，这里选择哪个应该不影响我们目前的需求。然后点击 **确定** 按钮，就成功复制到了我们的表单代码。

接下来，

- 随便找个记事本或者地方，把代码复制到里边。
- 在复制出来的代码中，取出 `<el-form>……</el-form>` 部分代码，覆盖掉前端项目中 src → view →  [PackageName](#packagename)(自建) → [StructName](#structname).vue 中 `此处请使用表单生成器生成form填充 表单默认绑定 formData 如手动修改过请自行修改key` 这句话。
- 在复制出来的代码中，把 js 部分`data`方法里返回的对象复制到前端项目中，上边提及的 .vue 文件的 js 部分 `data` 方法的 `return` 对象里

## Finish

至此，一个单表基本业务结构体的数据列表显示，单表数据增加、删除、查找、更新功能全部搞定。