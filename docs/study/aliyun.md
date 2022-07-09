# 阿里云对象存储

1. 获取 `Bucket`、`Domain`、`Endpoint` 信息

- [创建Bucket](https://oss.console.aliyun.com/bucket)
  ![img.png](/study/aliyun/create_bucket.png)

- 创建Bucket成功
![创建Bucket成功](/study/aliyun/create_bucket_success.png)

- 点击 `sliver-horn` 进入,点击 概览
![Bucket概览](/study/aliyun/bucket.png)

2.[RAM 访问控制](https://ram.console.aliyun.com/users/new) 获取 `AccessKeyId` 和 `AccessKeySecret`

- 创建用户
![创建用户](/study/aliyun/user_new.png)

- 创建用户成功
![创建用户成功](/study/aliyun/user_new_succes.png)

- 添加权限 
![添加权限](/study/aliyun/assign_permissions.png)

- 添加权限成功
![添加权限成功](/study/aliyun/assign_permissions_success.png)

- 进入[用户界面](https://ram.console.aliyun.com/users) 
![进入用户界面](/study/aliyun/user.png)

- 创建AccessKey
![创建AccessKey](/study/aliyun/user_create_access_key.png)

- 创建AccessKey成功
![创建AccessKey成功](/study/aliyun/user_create_access_key_success.png)

4. 根据上诉操作得到配置文件
```yaml
# aliyun oss configuration
AliyunOss:
  # Path 文件存储文件夹
  Path: 'gva'
  # Prefix 自定义文件名前缀, 可以不写为空了
  Prefix: 'oss_'
  # Bucket 存储桶名称
  Bucket: 'sliver-horn'
  # Domain 访问域名
  Domain: 'https://sliver-horn.oss-cn-shenzhen.aliyuncs.com'
  # Endpoint 地域节点
  Endpoint: 'oss-cn-shenzhen.aliyuncs.com'
  # AccessKeyId 访问密钥 Id
  AccessKeyId: 'LTAI5t7dSHRh2MHhaAo3gSGR'
  # AccessKeySecret 访问密钥 Secret
  AccessKeySecret: 'V4dc2lXiaJhGi40e7FcdiaLDDGtQ35'
```