# strictAuth 严格角色模式

## 介绍

开启严格角色模式后，用户只能访问其拥有的角色权限，无法访问其他角色的权限。

## 配置

```yaml
system:
  db-type: mysql
  oss-type: local
  router-prefix: ""
  addr: 8888
  iplimit-count: 15000
  iplimit-time: 3600
  use-multipoint: false
  use-redis: false
  use-mongo: false
  use-strict-auth: true  # 这里修改为true
```

## 使用
如果为顶级角色 则可以看到自己的角色且可以分配自己角色的相关api权限和菜单权限
如果为子角色 则无法看到自己角色，能看到自己角色的下级所有角色，且可以对下级以及下级的所有角色做权限分配，分配范围为自己所有用的角色的所有权限
```
