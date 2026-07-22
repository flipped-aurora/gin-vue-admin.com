# Media 配置

v3.0 新增，大文件分片上传相关配置，在 `utils/upload/chunk.go`（分片暂存目录）、`service/media/media_upload.go`（分片合并）与 `initialize/timer.go`（过期会话清理）中被消费。yaml 默认未写出，代码有兜底（如分片暂存目录默认 `uploads/chunks`）。

### yaml

```yaml
# media configuration（默认未写出，代码有兜底，可按需添加）
media:
  chunk-dir: 'uploads/chunks'
  max-file-size: 0
  session-ttl: 0
```

### struct

```go
type Media struct {
	ChunkDir    string `mapstructure:"chunk-dir" json:"chunk-dir" yaml:"chunk-dir"`             // 分片暂存目录
	MaxFileSize int64  `mapstructure:"max-file-size" json:"max-file-size" yaml:"max-file-size"` // 单文件最大字节,0=不限
	SessionTTL  int    `mapstructure:"session-ttl" json:"session-ttl" yaml:"session-ttl"`       // 会话过期小时数(清理用)
}
```

### description

| 配置名        | 类型  | 默认值 | 说明                             |
| ------------- | ----- | ------ | -------------------------------- |
| chunk-dir     | string | uploads/chunks | 分片暂存目录，默认 uploads/chunks |
| max-file-size | int64 | 0 | 单文件最大字节数，0 表示不限     |
| session-ttl   | int   | 0 | 分片上传会话过期小时数（清理用） |

### 注意事项

- `chunk-dir` 为空字符串时，`utils/upload/chunk.go` 兜底使用 `uploads/chunks`。
- `session-ttl` 由 `initialize/timer.go` 中的定时任务用于清理过期分片会话。
