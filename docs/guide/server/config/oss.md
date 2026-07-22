# 对象存储配置

本地与七种云存储的配置，由 `system.oss-type` 选择使用哪一节，`utils/upload/upload.go` 中的 `NewOss()` 按此实例化对应实现（未匹配时兜底为本地存储）。

## oss-type 与配置节对应关系

| oss-type 值 | 配置节 | 说明 |
| :---------- | :----- | :--- |
| local | local | 本地存储（默认） |
| qiniu | qiniu | 七牛云 |
| tencent-cos | tencent-cos | 腾讯云 COS |
| aliyun-oss | aliyun-oss | 阿里云 OSS |
| huawei-obs | hua-wei-obs | 华为云 OBS |
| aws-s3 | aws-s3 | AWS S3（兼容 minio） |
| cloudflare-r2 | cloudflare-r2 | Cloudflare R2 |
| minio | minio | Minio |

共 8 种实现，`NewOss()` 中 `oss-type` 未匹配任何值时返回本地存储。

## Local

### yaml

```yaml
# local configuration
local:
  path: 'uploads/file'
  store-path: 'uploads/file'
```

### struct

```go
type Local struct {
	Path      string `mapstructure:"path" json:"path" yaml:"path"`                   // 本地文件访问路径
	StorePath string `mapstructure:"store-path" json:"store-path" yaml:"store-path"` // 本地文件存储路径
}
```

### description

| 配置名     | 类型   | 默认值 | 说明             |
| ---------- | ------ | ------ | ---------------- |
| path       | string | uploads/file | 本地文件访问路径 |
| store-path | string | uploads/file | 本地文件存储路径 |

## Qiniu

### yaml

```yaml
# qiniu configuration (请自行七牛申请对应的 公钥 私钥 bucket 和 域名地址)
qiniu:
  zone: '你的空间区域'
  bucket: '你的空间名'
  img-path: '你的oss域名'
  use-https: false
  access-key: 'xxxxxxxxxxxxxxxxxxxxxxxxx'
  secret-key: 'xxxxxxxxxxxxxxxxxxxxxxxxx'
  use-cdn-domains: false
```

### struct

```go
type Qiniu struct {
	Zone          string `mapstructure:"zone" json:"zone" yaml:"zone"`                                  // 存储区域
	Bucket        string `mapstructure:"bucket" json:"bucket" yaml:"bucket"`                            // 空间名称
	ImgPath       string `mapstructure:"img-path" json:"img-path" yaml:"img-path"`                      // CDN加速域名
	AccessKey     string `mapstructure:"access-key" json:"access-key" yaml:"access-key"`                // 秘钥AK
	SecretKey     string `mapstructure:"secret-key" json:"secret-key" yaml:"secret-key"`                // 秘钥SK
	UseHTTPS      bool   `mapstructure:"use-https" json:"use-https" yaml:"use-https"`                   // 是否使用https
	UseCdnDomains bool   `mapstructure:"use-cdn-domains" json:"use-cdn-domains" yaml:"use-cdn-domains"` // 上传是否使用CDN上传加速
}
```

### description

| 配置名          | 类型   | 默认值 | 说明                                                         |
| --------------- | ------ | ------ | ------------------------------------------------------------ |
| zone            | string | - | 存储区域 [Zone](https://github.com/qiniu/api.v7/blob/master/storage/zone.go) ,可配置选项为 `ZoneHuadong` / `ZoneHuabei` / `ZoneHuanan` / `ZoneBeimei` / `ZoneXinjiapo` |
| bucket          | string | - | 存储空间                                                     |
| img-path        | string | - | CDN 加速域名                                                 |
| use-https       | bool   | false | 是否使用https                                                |
| access-key      | string | - | 秘钥AK                                                       |
| secret-key      | string | - | 秘钥SK                                                       |
| use-cdn-domains | bool   | false | 上传是否使用CDN上传加速                                      |

## 其他云存储

v3.0 除七牛云外还内置六种云存储配置节：`aliyun-oss`（阿里云OSS）、`tencent-cos`（腾讯云COS）、`aws-s3`（兼容 minio）、`cloudflare-r2`、`hua-wei-obs`（华为云OBS）、`minio`。yaml 示例如下，字段含义以键名为准：

```yaml
# minio oss configuration
minio:
  endpoint: yourEndpoint
  access-key-id: yourAccessKeyId
  access-key-secret: yourAccessKeySecret
  bucket-name: yourBucketName
  use-ssl: false
  base-path: ""
  bucket-url: "http://host:9000/yourBucketName"

# aliyun oss configuration
aliyun-oss:
  endpoint: yourEndpoint
  access-key-id: yourAccessKeyId
  access-key-secret: yourAccessKeySecret
  bucket-name: yourBucketName
  bucket-url: yourBucketUrl
  base-path: yourBasePath

# tencent cos configuration
tencent-cos:
  bucket: xxxxx-10005608
  region: ap-shanghai
  secret-id: your-secret-id
  secret-key: your-secret-key
  base-url: https://gin.vue.admin
  path-prefix: github.com/flipped-aurora/gin-vue-admin/server

# aws s3 configuration (minio compatible)
aws-s3:
  bucket: xxxxx-10005608
  region: ap-shanghai
  endpoint: ""
  s3-force-path-style: false
  disable-ssl: false
  secret-id: your-secret-id
  secret-key: your-secret-key
  base-url: https://gin.vue.admin
  path-prefix: github.com/flipped-aurora/gin-vue-admin/server

# cloudflare r2 configuration
cloudflare-r2:
  bucket: xxxx0bucket
  base-url: https://gin.vue.admin.com
  path: uploads
  account-id: xxx_account_id
  access-key-id: xxx_key_id
  secret-access-key: xxx_secret_key

# huawei obs configuration
hua-wei-obs:
  path: you-path
  bucket: you-bucket
  endpoint: you-endpoint
  access-key: you-access-key
  secret-key: you-secret-key
```

### struct

```go
type AliyunOSS struct {
	Endpoint        string `mapstructure:"endpoint" json:"endpoint" yaml:"endpoint"`
	AccessKeyId     string `mapstructure:"access-key-id" json:"access-key-id" yaml:"access-key-id"`
	AccessKeySecret string `mapstructure:"access-key-secret" json:"access-key-secret" yaml:"access-key-secret"`
	BucketName      string `mapstructure:"bucket-name" json:"bucket-name" yaml:"bucket-name"`
	BucketUrl       string `mapstructure:"bucket-url" json:"bucket-url" yaml:"bucket-url"`
	BasePath        string `mapstructure:"base-path" json:"base-path" yaml:"base-path"`
}

type TencentCOS struct {
	Bucket     string `mapstructure:"bucket" json:"bucket" yaml:"bucket"`
	Region     string `mapstructure:"region" json:"region" yaml:"region"`
	SecretID   string `mapstructure:"secret-id" json:"secret-id" yaml:"secret-id"`
	SecretKey  string `mapstructure:"secret-key" json:"secret-key" yaml:"secret-key"`
	BaseURL    string `mapstructure:"base-url" json:"base-url" yaml:"base-url"`
	PathPrefix string `mapstructure:"path-prefix" json:"path-prefix" yaml:"path-prefix"`
}

type AwsS3 struct {
	Bucket           string `mapstructure:"bucket" json:"bucket" yaml:"bucket"`
	Region           string `mapstructure:"region" json:"region" yaml:"region"`
	Endpoint         string `mapstructure:"endpoint" json:"endpoint" yaml:"endpoint"`
	SecretID         string `mapstructure:"secret-id" json:"secret-id" yaml:"secret-id"`
	SecretKey        string `mapstructure:"secret-key" json:"secret-key" yaml:"secret-key"`
	BaseURL          string `mapstructure:"base-url" json:"base-url" yaml:"base-url"`
	PathPrefix       string `mapstructure:"path-prefix" json:"path-prefix" yaml:"path-prefix"`
	S3ForcePathStyle bool   `mapstructure:"s3-force-path-style" json:"s3-force-path-style" yaml:"s3-force-path-style"`
	DisableSSL       bool   `mapstructure:"disable-ssl" json:"disable-ssl" yaml:"disable-ssl"`
}

type CloudflareR2 struct {
	Bucket          string `mapstructure:"bucket" json:"bucket" yaml:"bucket"`
	BaseURL         string `mapstructure:"base-url" json:"base-url" yaml:"base-url"`
	Path            string `mapstructure:"path" json:"path" yaml:"path"`
	AccountID       string `mapstructure:"account-id" json:"account-id" yaml:"account-id"`
	AccessKeyID     string `mapstructure:"access-key-id" json:"access-key-id" yaml:"access-key-id"`
	SecretAccessKey string `mapstructure:"secret-access-key" json:"secret-access-key" yaml:"secret-access-key"`
}

type HuaWeiObs struct {
	Path      string `mapstructure:"path" json:"path" yaml:"path"`
	Bucket    string `mapstructure:"bucket" json:"bucket" yaml:"bucket"`
	Endpoint  string `mapstructure:"endpoint" json:"endpoint" yaml:"endpoint"`
	AccessKey string `mapstructure:"access-key" json:"access-key" yaml:"access-key"`
	SecretKey string `mapstructure:"secret-key" json:"secret-key" yaml:"secret-key"`
}

type Minio struct {
	Endpoint        string `mapstructure:"endpoint" json:"endpoint" yaml:"endpoint"`
	AccessKeyId     string `mapstructure:"access-key-id" json:"access-key-id" yaml:"access-key-id"`
	AccessKeySecret string `mapstructure:"access-key-secret" json:"access-key-secret" yaml:"access-key-secret"`
	BucketName      string `mapstructure:"bucket-name" json:"bucket-name" yaml:"bucket-name"`
	UseSSL          bool   `mapstructure:"use-ssl" json:"use-ssl" yaml:"use-ssl"`
	BasePath        string `mapstructure:"base-path" json:"base-path" yaml:"base-path"`
	BucketUrl       string `mapstructure:"bucket-url" json:"bucket-url" yaml:"bucket-url"`
}
```

### 注意事项

- `oss-type` 填 `huawei-obs`，但对应的 yaml 配置节名是 `hua-wei-obs`，两者拼写不同，注意区分。
- 切换 `oss-type` 后需确保对应配置节填写完整，否则上传会失败；`oss-type` 未匹配时 `NewOss()` 兜底返回本地存储。
