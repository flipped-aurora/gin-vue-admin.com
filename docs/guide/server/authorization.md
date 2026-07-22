# 权限系统

Gin-Vue-Admin 采用 Casbin 实现基于角色的访问控制 (RBAC)，提供灵活、强大的权限管理机制，支持多层级权限控制。v3.0 使用 `github.com/casbin/casbin/v3`，并新增了基于组织架构（部门/岗位）的行级**数据权限**。

## 权限模型概述

### RBAC 权限模型

```
用户 (User) ──┐
              ├─→ 角色 (Role) ──→ 权限 (Permission) ──→ 资源 (Resource)
用户组 (Group) ┘
```

### 权限层级结构

```mermaid
graph TD
    A[超级管理员] --> B[系统管理员]
    A --> C[业务管理员]
    B --> D[普通用户]
    C --> D
    
    B --> E[用户管理权限]
    B --> F[系统配置权限]
    C --> G[业务数据权限]
    D --> H[基础查看权限]
    
    E --> I[API: /user/*]
    F --> J[API: /system/*]
    G --> K[API: /business/*]
    H --> L[API: /base/*]
```

## Casbin 配置

### 模型定义

v3.0 起 Casbin 模型不再使用 `resource/rbac_model.conf` 配置文件，而是内嵌在 `server/utils/casbin_util.go` 中：

```ini
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = r.sub == p.sub && keyMatch2(r.obj,p.obj) && r.act == p.act
```

### 配置参数说明

| 配置项 | 说明 |
|--------|------|
| `request_definition` | 请求定义：主体(sub)、对象(obj)、动作(act) |
| `policy_definition` | 策略定义：权限规则格式 |
| `role_definition` | 角色定义：角色继承关系 |
| `policy_effect` | 策略效果：允许访问的条件 |
| `matchers` | 匹配器：权限验证逻辑，`keyMatch2` 支持 RESTful 路径通配（如 `/user/:id`） |

### Enforcer 实例

`utils.GetCasbin()` 以 `sync.Once` 单例返回 `*casbin.SyncedCachedEnforcer`（并发安全、带决策缓存，缓存过期时间 3600 秒），策略通过 gorm-adapter 持久化到 `casbin_rule` 表。

## 核心组件

### Casbin 中间件

位置：`server/middleware/casbin_rbac.go`

```go
// CasbinHandler 拦截器
func CasbinHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		waitUse, _ := utils.GetClaims(c)
		//获取请求的PATH
		path := c.Request.URL.Path
		obj := strings.TrimPrefix(path, global.GVA_CONFIG.System.RouterPrefix)
		// 获取请求方法
		act := c.Request.Method
		// 获取用户的角色
		sub := strconv.Itoa(int(waitUse.AuthorityId))
		e := utils.GetCasbin() // 判断策略中是否存在
		success, _ := e.Enforce(sub, obj, act)
		if !success {
			response.FailWithDetailed(gin.H{}, "权限不足", c)
			c.Abort()
			return
		}
		c.Next()
	}
}
```

要点：从 claims 取 `AuthorityId` 作 sub，请求路径（去掉 `router-prefix` 全局前缀）作 obj、请求方法作 act。

### Casbin 服务

位置：`server/service/system/sys_casbin.go`

```go
type CasbinService struct{}

// UpdateCasbin 更新Casbin权限（先校验角色上下级，严格模式下校验 API 是否在权限列表内）
func (casbinService *CasbinService) UpdateCasbin(ctx context.Context, adminAuthorityID, AuthorityID uint, casbinInfos []request.CasbinInfo) error {
	err := AuthorityServiceApp.CheckAuthorityIDAuth(ctx, adminAuthorityID, AuthorityID)
	if err != nil {
		return err
	}
	// ... UseStrictAuth 严格模式校验 ...
	authorityId := strconv.Itoa(int(AuthorityID))
	casbinService.ClearCasbin(0, authorityId)
	// ... 权限去重后 AddPolicies ...
	e := utils.GetCasbin()
	success, err := e.AddPolicies(rules)
	// ...
}
```

其他常用方法：

| 方法 | 说明 |
| ---- | ---- |
| `UpdateCasbinApi(ctx, oldPath, newPath, oldMethod, newMethod)` | API 路径/方法更新时同步 casbin_rule 并重新加载策略 |
| `GetPolicyPathByAuthorityId(AuthorityID)` | 获取角色的权限列表 |
| `ClearCasbin(v, p...)` | 清除权限 |
| `FreshCasbin()` | 重新加载策略（`LoadPolicy`） |
| `GetAuthoritiesByApi(ctx, path, method)` | 反查拥有某 API 的角色 |
| `SetApiAuthorities(ctx, path, method, authorityIds)` | 以 API 为视角设置拥有它的角色集 |

## 权限数据结构

### 角色表 (sys_authorities)

```go
type SysAuthority struct {
	CreatedAt     time.Time
	UpdatedAt     time.Time
	DeletedAt     *time.Time     `sql:"index"`
	AuthorityId   uint           `json:"authorityId" gorm:"not null;unique;primary_key;comment:角色ID;size:90"` // 角色ID
	AuthorityName string         `json:"authorityName" gorm:"comment:角色名"`                                    // 角色名
	ParentId      *uint          `json:"parentId" gorm:"comment:父角色ID"`                                       // 父角色ID
	Children      []SysAuthority `json:"children" gorm:"-"`
	SysBaseMenus  []SysBaseMenu  `json:"menus" gorm:"many2many:sys_authority_menus;"`
	Users         []SysUser      `json:"-" gorm:"many2many:sys_user_authority;"`
	DataScope     int            `json:"dataScope" gorm:"default:1;comment:数据范围 1全部 2本部门及子级 3本部门 4仅本人"` // 数据范围(数据权限)
	DefaultRouter string         `json:"defaultRouter" gorm:"comment:默认菜单;default:dashboard"`                  // 默认菜单(默认dashboard)
}
```

::: warning 注意
v3.0 起 `AuthorityId` 为 `uint` 类型（旧版本为 string）；`DataScope` 为 v3.0 新增的数据范围字段，详见下文[数据权限](#数据权限-v3-0-新增)。
:::

### 权限规则表 (casbin_rule)

```go
type CasbinRule struct {
	ID    uint   `gorm:"primaryKey;autoIncrement"`
	Ptype string `gorm:"size:512;uniqueIndex:unique_index"`
	V0    string `gorm:"size:512;uniqueIndex:unique_index"`
	V1    string `gorm:"size:512;uniqueIndex:unique_index"`
	V2    string `gorm:"size:512;uniqueIndex:unique_index"`
	V3    string `gorm:"size:512;uniqueIndex:unique_index"`
	V4    string `gorm:"size:512;uniqueIndex:unique_index"`
	V5    string `gorm:"size:512;uniqueIndex:unique_index"`
}
```

### API 权限表 (sys_apis)

```go
type SysApi struct {
	global.GVA_MODEL
	Path        string `json:"path" gorm:"comment:api路径"`
	Description string `json:"description" gorm:"comment:api中文描述"`
	ApiGroup    string `json:"apiGroup" gorm:"comment:api组"`
	Method      string `json:"method" gorm:"default:POST;comment:方法"`
}
```

## 数据权限（v3.0 新增）

v3.0 在 RBAC（接口级权限）之上新增**行级数据权限**：同一接口，不同角色的用户看到的数据行范围不同，由角色上的 `DataScope` 字段与组织架构（部门/岗位）共同决定。

### 数据范围五档

常量定义在 `server/utils/datascope/datascope.go`：

| 档位 | 常量 | 说明 |
| ---- | ---- | ---- |
| 1 | `ScopeAll` | 全部数据 |
| 2 | `ScopeDeptAndChild` | 本部门及以下（含子部门） |
| 3 | `ScopeDept` | 本部门（不含子级） |
| 4 | `ScopeSelf` | 仅本人 |
| 5 | `ScopeCustom` | 自定义部门集 |

### 新增模型

| 模型 | 说明 |
| ---- | ---- |
| `SysDepartment` | 部门（组织架构树），维护 `Ancestors` 祖级链（逗号分隔，如 `0,1,5`），便于快速取子树 |
| `SysPosition` | 岗位 |
| `SysUserDepartment` | 用户-部门多对多关联 |
| `SysUserPosition` | 用户-岗位多对多关联 |
| `SysAuthorityDepartment` | 角色-部门关联，即"自定义部门集"档的部门集合 |
| `SysDataAccessLog` | 数据访问审计日志（`sys_data_access_logs`），事件类型如 `no_identity`（无身份访问）、`blocked_write`（疑似越权写） |

### 运行链路

```
请求 → JWTAuth → MustChangePwdGuard → CasbinHandler → DataScope 中间件
                                                        │
                          BuildIdentity 构建身份并注入 request.Context()
                                                        │
              Service 层 WithContext(ctx) 透传 → GORM 回调做行级过滤/盖章/审计
```

1. **身份构建**（`server/middleware/data_scope.go`）：在 JWT 之后调用 `DataScopeService.BuildIdentity(ctx, userID, authorityID)`，聚合以下信息构建本次请求的数据权限身份，注入 `request.Context()`：
   - 角色数据范围档位（查不到或未配置时默认"全部"）；
   - 用户主部门（`sys_users.dept_id`）；
   - 用户全部归属部门（`SysUserDepartment` 多部门）；
   - 可见部门 = 所有归属部门子树的并集（内存 BFS 计算，供"本部门及以下"档使用）；
   - 自定义部门集（档位为 5 时查 `SysAuthorityDepartment`，直接集合不展开子树）。
   
   构建过程中的内部查询统一带 `data_scope:skip` 标记旁路过滤，避免回调递归。

2. **行级过滤与盖章**（`server/utils/datascope` 的 GORM 回调，由 `server/initialize/data_scope.go` 注册，覆盖主库 `GVA_DB` 与多库 `GVA_DBList`）：
   - 查询时按身份自动追加行级过滤条件；
   - 写入时自动盖章 `created_by`/`updated_by`/`deleted_by`；
   - 审计事件异步写入 `sys_data_access_logs`；
   - `sys_` 前缀的系统表自动跳过，防止递归。

### 管理接口与页面

- 后端接口：`/department/*`（部门管理）、`/position/*`（岗位管理）、`/dataAccessLog/*`（数据访问日志）。
- 前端页面：**超级管理员** 下的 **部门管理**、**岗位管理**、**数据访问日志**；数据范围在 **角色管理** 中按角色设置（setDataScope）。旧版本的"数据权限"独立页面已删除。

## 权限管理功能

### 1. 角色管理

#### 角色继承

```go
// 设置角色继承关系
e := utils.GetCasbin()
e.AddRoleForUser("user1", "role1")  // 用户继承角色
e.AddRoleForUser("role1", "role2")  // 角色继承角色
```

### 2. API 权限管理

#### 分配 API 权限

```go
// UpdateCasbinApi 更新API权限
func (casbinService *CasbinService) UpdateCasbinApi(ctx context.Context, oldPath string, newPath string, oldMethod string, newMethod string) error {
	err := global.GVA_DB.WithContext(ctx).Model(&gormadapter.CasbinRule{}).Where("v1 = ? AND v2 = ?", oldPath, oldMethod).Updates(map[string]interface{}{
		"v1": newPath,
		"v2": newMethod,
	}).Error
	e := utils.GetCasbin()
	err = e.LoadPolicy()
	return err
}
```

### 3. 菜单权限管理

#### 菜单权限表 (sys_base_menus)

```go
type SysBaseMenu struct {
	global.GVA_MODEL
	MenuLevel     uint                                     `json:"-"`
	ParentId      string                                   `json:"parentId" gorm:"comment:父菜单ID"`
	Path          string                                   `json:"path" gorm:"comment:路由path"`
	Name          string                                   `json:"name" gorm:"comment:路由name"`
	Hidden        bool                                     `json:"hidden" gorm:"comment:是否在列表隐藏"`
	Component     string                                   `json:"component" gorm:"comment:对应前端文件路径"`
	Sort          int                                      `json:"sort" gorm:"comment:排序标记"`
	Meta          `json:"meta" gorm:"embedded;comment:附加属性"`
	SysAuthoritys []SysAuthority                          `json:"authoritys" gorm:"many2many:sys_authority_menus;"`
	Children      []SysBaseMenu                           `json:"children" gorm:"-"`
	Parameters    []SysBaseMenuParameter                  `json:"parameters"`
	MenuBtn       []SysBaseMenuBtn                        `json:"menuBtn"`
}
```

#### 动态菜单生成

```go
// GetMenuTree 获取动态菜单树
func (menuService *MenuService) GetMenuTree(authorityId string) (menus []system.SysMenu, err error) {
	menuTree, err := menuService.getMenuTreeMap(authorityId)
	menus = menuTree["0"]
	for i := 0; i < len(menus); i++ {
		err = menuService.getChildrenList(&menus[i], menuTree)
	}
	return menus, err
}
```

### 4. 按钮权限管理

#### 按钮权限表 (sys_base_menu_btns)

```go
type SysBaseMenuBtn struct {
	global.GVA_MODEL
	Name          string `json:"name" gorm:"comment:按钮关键key"`
	Desc          string `json:"desc" gorm:"comment:按钮备注"`
	SysBaseMenuID uint   `json:"sysBaseMenuID" gorm:"comment:菜单ID"`
}
```

#### 前端按钮权限控制

```vue
<template>
  <!-- 使用 v-auth 指令控制按钮显示 -->
  <el-button v-auth="'user:create'" @click="createUser">
    创建用户
  </el-button>
  
  <el-button v-auth="'user:delete'" @click="deleteUser">
    删除用户
  </el-button>
</template>

<script>
// 权限指令实现
app.directive('auth', {
  mounted(el, binding) {
    const { value } = binding
    const userStore = useUserStore()
    
    if (!userStore.hasPermission(value)) {
      el.style.display = 'none'
    }
  }
})
</script>
```

## 权限同步机制

### 权限变更后刷新

```go
// 权限变更时重新加载策略
func (casbinService *CasbinService) FreshCasbin() (err error) {
	e := utils.GetCasbin()
	err = e.LoadPolicy()
	return err
}
```

`utils.GetCasbin()` 返回的 `SyncedCachedEnforcer` 自带决策缓存（过期时间 3600 秒），`Enforce` 高频调用不会每次都查库；权限策略变更后调用 `FreshCasbin()` 重新加载即可。

## 前端权限集成

### 路由权限控制

```javascript
// router/permission.js
import { useUserStore } from '@/pinia/modules/user'

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  
  // 检查登录状态
  if (!userStore.token) {
    if (to.path !== '/login') {
      return next('/login')
    }
    return next()
  }
  
  // 检查路由权限
  if (to.meta.requiresAuth) {
    const hasPermission = await userStore.checkRoutePermission(to.path)
    if (!hasPermission) {
      return next('/403')
    }
  }
  
  next()
})
```

### API 权限拦截

```javascript
// utils/request.js
import axios from 'axios'
import { useUserStore } from '@/pinia/modules/user'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    
    // 添加 Token
    if (userStore.token) {
      config.headers['x-token'] = userStore.token
    }
    
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403) {
      // 权限不足处理
      ElMessage.error('权限不足')
      return Promise.reject(error)
    }
    
    if (error.response?.status === 401) {
      // Token 过期处理
      const userStore = useUserStore()
      userStore.logout()
      router.push('/login')
    }
    
    return Promise.reject(error)
  }
)
```

## 安全最佳实践

### 1. 最小权限原则
- 用户只获得完成工作所需的最小权限
- 定期审查和清理不必要的权限
- 实现权限的时效性控制

### 2. 权限分离
- 管理权限与业务权限分离
- 读权限与写权限分离
- 敏感操作需要额外验证

### 3. 审计日志
- 接口级：操作记录（operation 中间件）记录每个请求的入参与响应。
- 数据级：数据权限的审计事件（无身份访问、疑似越权写等）异步写入 `sys_data_access_logs`，可在后台"数据访问日志"页面查看。

## 常见问题

### Q: 权限修改后不生效？
A: 需要调用 `e.LoadPolicy()` 重新加载权限策略，或重启应用。

### Q: 如何实现数据权限控制？
A: v3.0 已内置：在角色管理中为角色设置数据范围（全部/本部门及子级/本部门/仅本人/自定义部门集），配合部门管理与用户部门归属即可实现行级数据过滤，详见上文[数据权限](#数据权限-v3-0-新增)。

### Q: 权限验证性能如何优化？
A: `utils.GetCasbin()` 返回带缓存的 `SyncedCachedEnforcer`，决策结果有缓存（过期时间 3600 秒），一般无需额外缓存。

### Q: 数据权限为什么对某些表不生效？
A: `sys_` 前缀的系统表会被数据权限回调自动跳过（防递归）；业务表需要 Service 层用 `WithContext(ctx)` 透传请求上下文，身份才能生效。

## 相关文档

- [认证系统](./authentication.md)
- [常见问题](../manual/qa.md)
- [服务端配置](./config/index.md)
- [Casbin 官方文档](https://casbin.org/)
