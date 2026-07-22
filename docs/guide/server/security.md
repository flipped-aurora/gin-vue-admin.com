# 安全中心

v3.0 新增安全中心，将验证码、密码复杂度、登录限流、失败锁定、密码过期五组安全策略收拢为统一的可视化配置，全部保存在数据库中并支持热更新，无需修改 `config.yaml` 和重启服务。

## 配置存储与热更新

安全配置持久化在数据库表 `sys_security_config`（单行，固定 `id=1`），由 `server/service/system/sys_security_config.go` 的 `SecurityConfigService` 统一管理：

| 方法 | 说明 |
|------|------|
| `Get` | 读取单行配置，不存在则按 `config.yaml` 默认值创建并返回 |
| `Set` | 持久化配置并刷新进程内缓存，保存即热更新 |
| `Current` | 返回进程内当前生效配置，未加载时惰性 `Get` |
| `LoadAll` | 启动时加载配置入进程内缓存 |
| `CurrentLimit` | 供中间件读取限流配置，返回 `enable/window/count` |

进程内缓存基于 `atomic.Value` 实现，读取无锁、热更新即时生效。

首次启动（初始化数据库）时，`server/source/system/security_config.go` 会按 `config.yaml` 的 `captcha` 节生成默认配置写入该行，此后以数据库中的配置为准。

::: warning 配置来源变化
v3.0 起验证码等行为以安全中心的数据库配置为准，`config.yaml` 的 `captcha` 节仅在首次初始化时用于生成默认值。
:::

## 五组配置项

配置模型定义在 `server/model/system/sys_security_config.go` 的 `SysSecurityConfig`：

### 验证码

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `CaptchaOpen` | 错误 N 次后出验证码，0 = 每次都需要 | 0 |
| `CaptchaTimeout` | 防爆破计数缓存超时（秒） | 3600 |
| `KeyLong` | 验证码长度 | 6 |
| `ImgWidth` | 验证码宽度 | 240 |
| `ImgHeight` | 验证码高度 | 80 |

### 密码复杂度

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `PwdMinLength` | 密码最小长度 | 8 |
| `PwdRequireUpper` | 需大写字母 | false |
| `PwdRequireLower` | 需小写字母 | false |
| `PwdRequireDigit` | 需数字 | false |
| `PwdRequireSpecial` | 需特殊字符 | false |

### 登录限流

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `LimitEnable` | 是否开启限流 | false |
| `LimitWindow` | 限流窗口（秒） | 60 |
| `LimitCount` | 窗口内最大次数 | 30 |

### 失败锁定

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `LockEnable` | 是否开启失败锁定 | false |
| `LockThreshold` | 失败次数阈值 | 5 |
| `LockDuration` | 锁定时长（分钟） | 30 |

### 密码过期

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `PwdExpireEnable` | 是否开启密码过期 | false |
| `PwdExpireDays` | 密码有效天数 | 90 |

## 管理接口与前端页面

管理接口（需登录与 API 权限）：

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/securityConfig/getSecurityConfig` | 获取安全配置 |
| POST | `/securityConfig/setSecurityConfig` | 设置安全配置 |

前端页面位于 `web/src/view/system/security/index.vue`，菜单入口为「系统设置 → 安全配置」，页面按 验证码 / 密码复杂度 / 限流 / 失败锁定 / 密码过期 分为 5 个 Tab；前端 API 封装在 `web/src/api/securityConfig.js`。

## 登录失败锁定

实现位于 `server/service/system/security_lock.go`，基于统一缓存 `global.GVA_CACHE`：

- 计数键：`login_fail:<用户名>`，锁定键：`login_lock:<用户名>`
- `RecordLoginFail`：登录失败时按滚动窗口计数（窗口 TTL 取锁定时长），达到阈值后写入锁定键，锁定指定分钟数
- `IsAccountLocked`：查询账号是否处于锁定状态
- `ClearLoginFail`：登录成功后清除失败计数与锁
- `IsPasswordExpired`：纯函数，判定密码是否过期

## 登录与验证码限流

`server/middleware/limit_ip.go` 提供两级限流：

- `SecurityLimit()`：读取数据库安全配置（`CurrentLimit`），按 `IP + 路由模板` 对请求计数限流，挂在 `login` 与 `captcha` 路由上（`server/router/system/sys_base.go`）；未开启限流时直接放行
- `DefaultLimit()`：使用 `config.yaml` 的 `system.iplimit-count` / `system.iplimit-time` 做全局限流

::: tip 异常放行策略
限流计数基于 `global.GVA_CACHE`，缓存异常时仅记录日志并放行（fail-open），不会因缓存故障阻塞登录。
:::

## 密码复杂度校验

`server/utils/password_complexity.go` 的 `ValidatePasswordComplexity` 按当前安全配置校验密码，在注册、修改密码、重置密码三处统一生效，不满足时返回可读错误（如“密码长度不能少于 8 位”“密码必须包含大写字母、数字”）。

## 密码过期与强制改密

- `SysUser.PasswordUpdatedAt` 记录密码最后修改时间；开启密码过期时，由关变开会自动回填存量 `PasswordUpdatedAt` 为 `NULL` 的用户
- 登录时若判定密码已过期，签发的 claims 携带 `MustChangePwd=true`
- `server/middleware/must_change_pwd.go` 的 `MustChangePwdGuard` 仅放行 `/user/changePassword`、`/user/getUserInfo`、`/jwt/jsonInBlacklist`，其余请求返回 403 及 `needChangePassword`
- 前端 `web/src/utils/request.js` 拦截该响应后跳转 `/forceChangePassword` 强制改密页（`web/src/view/system/security/forceChangePassword.vue`），改密完成后重新登录即可正常使用

## 相关能力

- API Token：模型 `SysApiToken`，接口 `/sysApiToken/*`，前端入口「权限管理 → API Token」，用于开放接口的令牌认证
- 登录日志：模型 `SysLoginLog`，接口 `/sysLoginLog/*`，前端入口「运维监控 → 登录日志」，记录登录成功与失败轨迹
- 统一缓存 `GVA_CACHE`：失败计数、限流计数、验证码存储的底层支撑，见 [缓存体系](./cache.md)
- JWT 认证与黑名单：见 [认证系统](./authentication.md)
