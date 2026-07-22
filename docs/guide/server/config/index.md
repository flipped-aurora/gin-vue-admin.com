# 配置总览

本文对应 v3.0.0 的 `server/config.yaml` 与 `server/config` 包结构体。

::: warning 特别说明
v3.0 的 config 包中**没有** cache、security、trace 配置节：

- 缓存由 `initialize/gva_cache.go` 按 `GVA_REDIS` 是否初始化自动选择后端：有 Redis 用 Redis，否则用内存后端，无需配置。
- 安全配置（登录锁定、密码策略等）是数据库表 `sys_security_config`，在后台"安全中心"页面管理，不走 yaml。
- 链路追踪零配置，由 `middleware/request_meta.go` 中间件实现。
:::

## 配置文件位置与加载优先级

配置文件由 `core/viper.go` 加载，路径按以下优先级确定（见 `getConfigPath()`）：

1. 命令行参数 `-c` 指定的路径；
2. 环境变量 `GVA_CONFIG` 指定的路径；
3. 按 gin 运行模式选择：`debug` 模式用 `config.debug.yaml`，`release` 模式用 `config.release.yaml`，`test` 模式用 `config.test.yaml`；
4. 上述文件不存在时兜底使用 `config.yaml`。

加载后内容被 Unmarshal 到全局变量 `global.GVA_CONFIG`（类型为 `config.Server`）。

## 热更新

`core/viper.go` 中调用了 `v.WatchConfig()`：配置文件发生变化时会触发 `OnConfigChange` 回调，重新 Unmarshal 到 `global.GVA_CONFIG`，无需重启即可生效。

## 配置节一览

| 配置节 | 说明 | 详细文档 |
| :----- | :--- | :------- |
| jwt | JWT 签名、过期与缓冲续期 | [JWT 配置](./jwt) |
| zap | zap 日志（级别、输出、访问日志记录等） | [日志配置](./zap) |
| redis / redis-list | Redis 单实例/集群与多实例 | [Redis 配置](./redis) |
| mongo | MongoDB 连接 | [MongoDB 配置](./mongo) |
| email | 邮件发送（SMTP） | [Email 配置](./email) |
| system | 系统级开关（端口、数据库类型、限流等） | [System 系统配置](./system) |
| captcha | 登录验证码与防爆破 | [Captcha 验证码](./captcha) |
| mysql / pgsql / mssql / oracle / sqlite / db-list | 数据库连接与多数据库 | [数据库配置](./database) |
| local / qiniu / aliyun-oss / tencent-cos / aws-s3 / cloudflare-r2 / hua-wei-obs / minio | 对象存储 | [对象存储配置](./oss) |
| autocode | 代码生成器路径 | [AutoCode 配置](./autocode) |
| media | 大文件分片上传（v3.0 新增） | [Media 配置](./media) |
| cors | 跨域放行模式与白名单 | [CORS 跨域](./cors) |
| mcp | MCP 服务 | [MCP 配置](./mcp) |
| app / excel / disk-list | 应用身份、excel 路径、磁盘监控挂载点 | [其他配置](./other) |
