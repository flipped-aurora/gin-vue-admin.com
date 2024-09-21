# 项目介绍

GIN-VUE-ADMIN 是一款基于GIN+VUE+ElementPlus开发的全栈基础开发平台

* GitHub地址: [https://github.com/flipped-aurora/gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin)
* GitCode地址: [https://gitCode.com/flipped-aurora/gin-vue-admin](https://gitCode.com/flipped-aurora/gin-vue-admin)
* Gitee地址: [https://gitee.com/pixelmax/gin-vue-admin](https://gitee.com/pixelmax/gin-vue-admin)
* 在线测试地址: [http://demo.gin-vue-admin.com/](http://demo.gin-vue-admin.com/)
* 用户名：`admin`
* 密码： `123456`

GIN-VUE-ADMIN是一个基于vue和gin开发的全栈前后端分离的开发基础平台，拥有jwt鉴权，动态路由，动态菜单，casbin鉴权，表单生成器，代码生成器等功能，提供了多种示例文件，让大家把更多时间专注在业务开发上。


## 技术选型

::: warning 需要本地具有 `git` `node` `go` 环境
如果您使用 mysql 作为数据库的话 虽然我们并不禁止您使用 `phpstudy` `小皮` 这样的集成环境创建的数据库，但请注意，请将数据引擎改为innoDB

我们推荐您使用 docker 创建 mysql 数据库
:::
- 前端：用基于`vue3`的`Element-Plus`构建基础页面。
- 后端：用`Gin`快速搭建基础API，`Gin`是一个go语言编写的Web框架。
- 数据库：采用`MySql`>5.7版本,数据库引擎 innoDB<Badge type="danger" class="bg-red-600 font-medium dark:bg-red-500" text="important" />，使用`gorm`实现对数据库的基本操作,目前已支持`Sqlite`,`PostgreSQL(人大金仓)`,`Mysql`,`Oracle`。
- 缓存：使用`Redis`进行一系列缓存操作，默认关闭，如果需要可自行到配置中开启。
- API文档：使用`Swagger`构建自动化文档。
- 配置文件：使用`fsnotify`和`viper`实现`yaml`格式的配置文件。
- 日志：使用`zap`实现日志记录。

## 主要功能
- 插件中心 <Badge type="tip" text="NEW" class="bg-indigo-600 font-medium dark:bg-indigo-500" /> :基于 `Gva`自己的一套设计风格，独创 `go`的插件中心，现已支持 ：`微信支付、登录等`，`K8s相关操作` ，`第三方登录` 等等插件
- 权限管理：基于`jwt`和`casbin`实现的权限管理
- 文件上传下载：支持`本地`、`七牛云`、`阿里云`、`腾讯云`等文件上传下载
- 用户管理：系统管理员分配用户角色和角色权限。
- 角色管理：创建权限控制的主要对象，可以给角色分配不同api权限，菜单权限，按钮权限。
- 菜单管理：实现用户动态菜单配置，按钮权限，实现不同角色不同菜单。
- api管理：不同用户可调用的api接口的权限不同。
- 配置管理：配置文件可前台修改（测试环境不开放此功能）。
- 富文本编辑器：MarkDown编辑器功能嵌入。
- 条件搜索：增加条件搜索示例。
- restful示例：可以参考用户管理模块中的示例API。
- 多点登录限制：需要在`config.yaml`中把`system`中的`useMultipoint`修改为true(需要自行配置Redis和Config中的Redis参数，测试阶段，有bug请及时反馈)。
- 分片长传：提供文件分片上传和大文件分片上传功能示例。
- 表单生成器：表单生成器借助 [Variant Form](https://www.vform666.com/)。
- 代码生成器：后台基础逻辑以及简单curd的代码生成器。

## 如何贡献

在以任何形式的参与前，请先阅读开发指南。如有任何的意见或建议，欢迎您通过创建 [Issue](https://github.com/flipped-aurora/gin-vue-admin/issues)或 [PR](https://github.com/flipped-aurora/gin-vue-admin/pulls)的方式告知我们。也可以选择gva [官方讨论组](https://plugin.gin-vue-admin.com/#/layout/vip)
::: warning 🧁
强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way) 和 [《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) ，更好的问题更容易获得帮助。
:::

## 项目架构

### 系统架构图

![系统架构图](/introduce/gin-vue-admin.png)

### 前端详细设计图 （提供者:<a href="https://github.com/baobeisuper">baobeisuper</a>）

![前端详细设计图](/introduce/naotu.png)
