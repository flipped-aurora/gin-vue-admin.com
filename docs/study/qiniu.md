# 七牛云 Kodo

1.[空间管理](https://portal.qiniu.com/kodo/bucket)

![空间管理](/study/qiniu/bucket.png)

1.1 创建空间
![创建空间](/study/qiniu/create_bucket.png)

1.2 得到测试域名 `Domain`
![得到测试域名](/study/qiniu/domain.png)

2. [秘钥管理](https://portal.qiniu.com/user/key)

![秘钥管理](/study/qiniu/key.png)

2.1 创建秘钥成功 得到 `AccessKey` `SecretKey`
![创建秘钥成功](/study/qiniu/create_key_success.png)

3. 得到配置文件
```yaml
# qiniu configuration (请自行七牛申请对应的 公钥 私钥 bucket 和 域名地址)
QiniuKodo:
  # Path 文件存储文件夹
  Path: 'gva'
  # Prefix 自定义文件名前缀, 可以不写为空了
  Prefix: 'oss_'
  # Bucket 存储桶名称
  Bucket: 'gva-1'
  # Domain 访问域名
  Domain: 'rf5bfe2uo.hn-bkt.clouddn.com'
  # AccessKey 访问密钥 AccessKey
  AccessKey: 'eAM1JaXHRJL_-Ue52tYLYw5gijt6r9ORgcG4dmLt'
  # SecretKey 访问密钥 SecretKey
  SecretKey: 'GQtW43BUPBoj9HS99fTU7-xsPhQHLI70FvCAMHJ2'
  # UseHttps 是否使用https
  UseHttps: false
  # UseCdnDomains 是否使用cdn域名
  UseCdnDomains: false
```
