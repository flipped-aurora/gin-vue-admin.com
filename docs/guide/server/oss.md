# 对象存储 
当前支持本地、阿里云、腾讯云、七牛云、AWS S3、华为云、Cloudflare R2 七种对象存储方式，可根据实际情况进行配置。

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