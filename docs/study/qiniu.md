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
qiniu:
  # Zone 存储区域
  zone: ZoneHuaDong
  # Bucket 存储桶名称
  bucket: 'gva-1'
  # ImgPath 访问域名
  img-path: 'rf5bfe2uo.hn-bkt.clouddn.com'
  # AccessKey 访问密钥 AccessKey
  access-key: 'your-access-key'
  # SecretKey 访问密钥 SecretKey
  secret-key: 'your-secret-key'
  # UseHttps 是否使用https
  use-https: false
  # UseCdnDomains 是否使用cdn域名
  use-cdn-domains: false
```
