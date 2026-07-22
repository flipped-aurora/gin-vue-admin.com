# 对象存储

当前支持本地、七牛云、腾讯云 COS、阿里云 OSS、华为云 OBS、AWS S3、Cloudflare R2、MinIO 八种对象存储方式，可根据实际情况进行配置。

v3.0 起，文件上传相关功能从 example 组迁入独立的 media 顶层组（`server/api/v1/media/`），统一提供文件上传下载、附件分类与大文件分片上传能力。

## OSS 接口

所有存储实现统一抽象在 `server/utils/upload/upload.go` 的 `OSS` 接口中：

```go
type OSS interface {
	UploadFile(ctx context.Context, file *multipart.FileHeader) (url, key string, err error)
	DeleteFile(ctx context.Context, key string) error
	// DeleteFiles 批量删除，返回逐个失败项；整体 err 仅用于鉴权失败等致命错误。
	DeleteFiles(ctx context.Context, keys []string) (failed []DeleteFailure, err error)
	// ListFiles 按前缀列举存储对象，cursor 为不透明分页游标（实现内部映射到各 SDK 的 marker/token）。
	ListFiles(ctx context.Context, prefix, cursor string, limit int) (files []FileInfo, nextCursor string, hasMore bool, err error)
	// Exists 检查对象是否存在，"不存在"统一降级为 (false, nil)。
	Exists(ctx context.Context, key string) (bool, error)
}
```

通过 `config.yaml` 中 `system.oss-type` 选择具体实现，`NewOss()` 按该值分派：

| oss-type | 实现 |
| --- | --- |
| local | 本地存储（缺省兜底） |
| qiniu | 七牛云 |
| tencent-cos | 腾讯云 COS |
| aliyun-oss | 阿里云 OSS |
| huawei-obs | 华为云 OBS |
| aws-s3 | AWS S3 |
| cloudflare-r2 | Cloudflare R2 |
| minio | MinIO |

每种实现对应 `config.yaml` 中的同名配置节（华为云为 `hua-wei-obs`）。

## 配置

```yaml
local:
    path: uploads/file
    store-path: uploads/file
```

```yaml
aliyun-oss:
    endpoint: yourEndpoint
    access-key-id: yourAccessKeyId
    access-key-secret: yourAccessKeySecret
    bucket-name: yourBucketName
    bucket-url: yourBucketUrl
    base-path: yourBasePath
```

```yaml
aws-s3:
    bucket: xxxxx-10005608
    region: ap-shanghai
    endpoint: ""
    secret-id: your-secret-id
    secret-key: your-secret-key
    base-url: https://gin.vue.admin
    path-prefix: github.com/flipped-aurora/gin-vue-admin/server
    s3-force-path-style: false
    disable-ssl: false
```

```yaml
qiniu:
    zone: ZoneHuaDong
    bucket: ""
    img-path: ""
    access-key: ""
    secret-key: ""
    use-https: false
    use-cdn-domains: false
```

```yaml
tencent-cos:
    bucket: xxxxx-10005608
    region: ap-shanghai
    secret-id: your-secret-id
    secret-key: your-secret-key
    base-url: https://gin.vue.admin
    path-prefix: github.com/flipped-aurora/gin-vue-admin/server
```

```yaml
hua-wei-obs:
    path: you-path
    bucket: you-bucket
    endpoint: you-endpoint
    access-key: you-access-key
    secret-key: you-secret-key
```

```yaml
cloudflare-r2:
    bucket: xxxx0bucket
    base-url: https://gin.vue.admin.com
    path: uploads
    account-id: xxx_account_id
    access-key-id: xxx_key_id
    secret-access-key: xxx_secret_key
```

```yaml
minio:
    endpoint: yourEndpoint
    access-key-id: yourAccessKeyId
    access-key-secret: yourAccessKeySecret
    bucket-name: yourBucketName
    use-ssl: false
    base-path: ""
    bucket-url: "http://host:9000/yourBucketName"
```

### 媒体配置

`server/config/media.go` 定义了媒体库相关配置项（`config.yaml` 默认未写出该节，可按需添加）：

```yaml
media:
    chunk-dir: uploads/chunks  # 分片暂存目录，代码兜底 uploads/chunks
    max-file-size: 0           # 单文件最大字节，0 表示不限
    session-ttl: 24            # 上传会话过期小时数（清理用）
```

## 媒体库

v3.0 的媒体功能位于独立的 media 顶层组，按职责拆分为三个文件：

- `server/api/v1/media/media_file_upload_download.go`：文件上传下载
- `server/api/v1/media/media_attachment_category.go`：附件分类树
- `server/api/v1/media/media_upload.go`：大文件分片上传

### 数据模型

| 模型 | 表名 | 说明 |
| --- | --- | --- |
| FileUploadAndDownload | media_file_upload_and_downloads | 文件记录，v3.0 由 exa_file_upload_and_downloads 更名而来，新增 Size、Mime、Md5、UserID 字段 |
| AttachmentCategory | media_attachment_category | 树形附件分类 |
| MediaUpload | media_uploads | 大文件上传会话，状态为 uploading / merging / completed / failed |
| MediaUploadChunk | media_upload_chunks | 分片收讫记录 |

### 路由

| 路由组 | 说明 |
| --- | --- |
| /fileUploadAndDownload/* | 文件上传、列表、删除、批量删除、重命名、URL 导入、列举存储桶文件等 |
| /attachmentCategory/* | 附件分类的查询、新增/编辑、删除 |
| /mediaUpload/* | 大文件分片上传 |

## 大文件分片上传

分片上传接口：

| 接口 | 方法 | 说明 |
| --- | --- | --- |
| /mediaUpload/init | POST | 初始化上传会话，支持秒传探测 |
| /mediaUpload/chunk | POST | 上传单个分片 |
| /mediaUpload/complete | POST | 合并分片 |
| /mediaUpload/:uploadId | DELETE | 取消上传 |

断点续传由 `server/utils/upload/chunk.go` 实现：

- `SaveChunkFile`：写入分片（覆盖写，幂等）
- `MergeChunks`：按序流式合并，合并过程同时计算整文件 MD5 用于校验
- `ReceivedIndexes`：扫描暂存目录中已收到的分片索引，用于机会式恢复

前端对应 `web/src/api/media.js`（旧的 `api/breakpoint.js` 已删除），页面为 `web/src/view/media/chunkUpload.vue`。

## 手机扫码上传

媒体库另提供手机扫码上传页面 `web/src/view/media/scanUpload.vue`，通过前端静态路由 `/scanUpload` 访问。
