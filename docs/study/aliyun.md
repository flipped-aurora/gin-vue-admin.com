# 阿里云对象存储

1. [Bucket](https://oss.console.aliyun.com/bucket) 获取 `bucket`、`domain`、`endpoint`

- 创建Bucket
![img.png](/study/aliyun/create_bucket.png)

- 创建Bucket成功
![img.png](/study/aliyun/create_bucket_success.png)

- 点击 `sliver-horn` 进入,点击 概览
![img.png](/study/aliyun/bucket.png)

2.[RAM 访问控制](https://ram.console.aliyun.com/users/new) 获取 `AccessKeyId` 和 `AccessKeySecret`

- 创建用户
![user.png](/study/aliyun/user_new.png)

- 创建用户成功
![img.png](/study/aliyun/user_new_succes.png)

- 添加权限 
![img.png](/study/aliyun/assign_permissions.png)

- 添加权限成功
![img.png](/study/aliyun/assign_permissions_success.png)

- 进入[用户界面](https://ram.console.aliyun.com/users) 
![img.png](/study/aliyun/user.png)

- 创建AccessKey
![img.png](/study/aliyun/user_create_access_key.png)

- 创建AccessKey成功
![img_1.png](/study/aliyun/user_create_access_key_success.png)

4. 根据上诉操作得到配置文件
```yaml
# aliyun oss configuration
AliyunOss:
  # 文件存储文件夹
  Path: 'gva'
  # 自定义文件名前缀, 可以不写为空了
  Prefix: 'oss_'
  # Bucket 域名
  Domain: 'https://sliver-horn.oss-cn-shenzhen.aliyuncs.com'
  # Bucket 名称
  Bucket: 'sliver-horn'
  # 地域节点
  Endpoint: 'oss-cn-shenzhen.aliyuncs.com'
  # 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  AccessKeyId: 'LTAI5t7dSHRh2MHhaAo3gSGR'
  AccessKeySecret: 'V4dc2lXiaJhGi40e7FcdiaLDDGtQ35'
```