# 缓存体系

v3.0 新增统一缓存抽象 `global.GVA_CACHE`，为 JWT 黑名单、验证码、限流计数、登录失败锁定等能力提供统一的缓存入口：有 Redis 用 Redis 后端，无 Redis 自动降级为进程内内存后端，业务代码无需关心底层差异。

## 接口契约

接口定义在 `server/utils/gva_cache/cache.go`：

```go
// Cache 通用缓存抽象：有 Redis 用 Redis 后端，无 Redis 用内存后端。
// 该接口为跨计划钉死契约，不得改名 / 改签名。
type Cache interface {
    Get(key string) (any, bool)
    Set(key string, value any, ttl time.Duration)
    SetDefault(key string, value any)
    Increment(key string, n int64) (int64, error)
    IncrementWithExpire(key string, n int64, ttl time.Duration) (int64, error)
    Exists(key string) bool
    Delete(key string)
}
```

| 方法 | 说明 |
|------|------|
| `Get` | 读取键值，返回 (值, 是否命中) |
| `Set` | 写入键值并指定 TTL |
| `SetDefault` | 写入键值，使用初始化时的默认过期时间 |
| `Increment` | 计数自增 |
| `IncrementWithExpire` | 计数自增，首次计数时设置过期时间，形成滚动窗口 |
| `Exists` | 判断键是否存在 |
| `Delete` | 删除键 |

::: warning 契约稳定
该接口为跨模块钉死的契约，注释明确要求不得改名、不得改签名，扩展缓存能力时请新增方法而非修改现有签名。
:::

## 双实现

| 实现 | 文件 | 说明 |
|------|------|------|
| 内存后端 | `server/utils/gva_cache/memory_cache.go` | 基于 `songzhibin97/gkit` 的本地缓存，`NewMemoryCache(defaultExpire)` 创建 |
| Redis 后端 | `server/utils/gva_cache/redis_cache.go` | `NewRedisCache(redis.UniversalClient)` 创建；写操作错误仅告警不中断；`IncrementWithExpire` 在首次计数时设置过期形成窗口 |

## 初始化

初始化函数为 `server/initialize/gva_cache.go` 的 `InitGvaCache()`，在 `core/server.go` 中于 Redis 初始化之后调用：

```go
// 初始化通用缓存（必须在 Redis 之后：有 Redis 用 Redis，否则用内存）
initialize.InitGvaCache()
```

选择规则：

- `global.GVA_REDIS` 已初始化（`config.yaml` 中 `system.use-redis: true` 且连接成功）时，使用 Redis 后端
- 否则使用内存后端，默认过期时间取自 `jwt.expires-time`
- 没有独立的 `cache` 配置节，后端选择完全由 `system.use-redis` 决定

## 已迁入 GVA_CACHE 的能力

| 能力 | 键 / 前缀 | 说明 |
|------|-----------|------|
| JWT 黑名单 | JWT 字符串本身 | `JsonInBlacklist` 写库后 `SetDefault` 灌缓存，启动时 `LoadAll` 全量加载，中间件判定直接走缓存 |
| 验证码存储 | `CAPTCHA_` 前缀 | `server/utils/captcha/cache_store.go` 实现 base64Captcha 的 `Store` 接口，TTL 180 秒，校验通过即焚 |
| 验证码防爆破计数 | 客户端 IP | 达到 `CaptchaOpen` 阈值后要求验证码 |
| 登录失败计数与锁定 | `login_fail:<用户名>` / `login_lock:<用户名>` | 见 [安全中心](./security.md) |
| 登录 / IP 限流计数 | `GVA_SecLimit`、`GVA_Limit` 前缀 | 见 [安全中心](./security.md) 与 `middleware/limit_ip.go` |

::: tip BlackCache 已移除
旧版本的 `global.BlackCache` 已彻底移除，JWT 黑名单等场景统一改用 `global.GVA_CACHE`。
:::

## 测试支持

`server/internal/testutil` 提供 `InitMemoryCache(t, defaultExpire)`：用纯内存后端初始化 `global.GVA_CACHE`，并在 `t.Cleanup` 中自动还原全局旧值，适用于依赖缓存但无需真实 Redis 的单元测试。

```go
func TestFoo(t *testing.T) {
    c := testutil.InitMemoryCache(t, 0)
    _ = c // global.GVA_CACHE 已同步赋值
}
```

## 使用建议

业务代码中的计数、黑名单、短期状态等场景，请通过 `global.GVA_CACHE` 读写，不要直接操作 `global.GVA_REDIS`：直接操作 Redis 会在未启用 Redis 的部署（内存后端）下失效，而 `GVA_CACHE` 在两种部署下行为一致。

## 相关文档

- [安全中心](./security.md)
- [认证系统](./authentication.md)
