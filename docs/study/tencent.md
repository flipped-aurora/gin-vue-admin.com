# 腾讯云对象存储

1. 获取 `Bucket` 和 `Domain` 信息
- [创建存储桶](https://console.cloud.tencent.com/cos/bucket)
![创建存储桶](/study/tencent/create_bucket.png)
- 填写存储桶基本信息
![填写存储桶信息](/study/tencent/create_bucket_info.png)
- 填写存储桶高级可选配置(自己根据自己需要自己选)
![填写存储桶高级可选配置](/study/tencent/create_bucket_options.png)
- 确认配置
![确认配置](/study/tencent/create_bucket_confirm_configuration.png)
- 创建存储桶成功
![创建存储桶成功](/study/tencent/create_bucket_success.png)
- 得到 `Bucket` 和 `Domain`
![存储桶信息](/study/tencent/bucket.png)

2. 获取 `SecretId` 和 `SecretKey`

2.1 [进入用户列表](https://console.cloud.tencent.com/cam)

2.2 新建用户
- ![用户列表](/study/tencent/user.png)

2.3 快速创建
![快速创建](/study/tencent/create_user_2_3.png)
2.4 填写用户名, 编辑访问方式, 编辑用户权限
![填写用户名, 编辑访问方式, 编辑用户权限](/study/tencent/create_user_2_4.png)
2.4.1 勾选访问方式为编程访问,腾讯云控制台访问根据需求选择
![勾选访问方式为编程访问,腾讯云控制台访问根据自身情况选择](/study/tencent/create_user_2_4_1.png)
2.4.2 勾选用户权限,根据需求选择
![勾选用户权限,根据需求选择](/study/tencent/create_user_2_4_2.png)
2.4.3 完成用户名, 编辑访问方式, 编辑用户权限的选择
![完成用户名, 编辑访问方式, 编辑用户权限的选择](/study/tencent/create_user_2_4_3.png)
2.5 创建用户成功
![img.png](/study/tencent/create_user_success.png)

3. 根据上诉操作得到配置文件
```yaml
# tencent cos configuration
TencentCos:
  # Path 文件存储文件夹
  Path: 'gva'
  # Prefix 自定义文件名前缀, 可以不写为空了
  Prefix: 'oss_'
  # Bucket 存储桶名称
  Bucket: 'gva-1304136212'
  # Domain 访问域名
  Domain: 'https://gva-1304136212.cos.ap-guangzhou.myqcloud.com'
  # SecretId 访问密钥 Id
  SecretId: 'AKIDCG6g3B2ez3qMbZGiz0kDQM1QZR5SaGiv'
  # SecretKey 访问密钥 Secret
  SecretKey: '0kDPLnLhphKiqvqWTDj5FBuNZU8pJZbP'
```
