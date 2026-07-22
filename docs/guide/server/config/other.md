# 其他配置

app、excel、disk-list 三个小配置节。

## App

v3.0 新增，应用身份配置，在 `core/zap.go` 中作为静态字段（node/app_id/env）注入到每条日志中。yaml 默认未写出，代码有兜底（空字符串），可按需添加。

### yaml

```yaml
# app configuration（默认未写出，代码有兜底，可按需添加）
app:
  node: ''
  app-id: ''
  env: ''
```

### struct

```go
type App struct {
	Node  string `mapstructure:"node" json:"node" yaml:"node"`       // 节点标识
	AppID string `mapstructure:"app-id" json:"app-id" yaml:"app-id"` // 应用标识
	Env   string `mapstructure:"env" json:"env" yaml:"env"`          // 环境：dev/test/prod
}
```

### description

| 配置名 | 类型   | 默认值 | 说明                  |
| ------ | ------ | ------ | --------------------- |
| node   | string | 空 | 节点标识              |
| app-id | string | 空 | 应用标识              |
| env    | string | 空 | 环境：dev/test/prod   |

### 注意事项

- v3.0 起 `system.env` 已从 `System` 结构体移除，yaml 中残留的该行不再生效；应用环境身份请使用本节的 `app.env`，见 [System 系统配置](./system)。

## Excel

excel 导入导出默认路径配置。

### yaml

```yaml
# excel configuration
excel:
  dir: './resource/excel/'
```

### struct

```go
type Excel struct {
	Dir string `mapstructure:"dir" json:"dir" yaml:"dir"`
}
```

### description

| 配置名 | 类型   | 默认值 | 说明                 |
| ------ | ------ | ------ | -------------------- |
| dir    | string | ./resource/excel/ | excel 导入导出默认路径 |

## Disk-list

服务器监控（`utils/server.go`）需要统计的磁盘挂载点列表。

### yaml

```yaml
# disk usage configuration
disk-list:
  - mount-point: "/"
```

### struct

```go
type Disk struct {
	MountPoint string `mapstructure:"mount-point" json:"mount-point" yaml:"mount-point"`
}

type DiskList struct {
	Disk `yaml:",inline" mapstructure:",squash"`
}
```

### description

| 配置名      | 类型   | 默认值 | 说明       |
| ----------- | ------ | ------ | ---------- |
| mount-point | string | / | 磁盘挂载点 |
