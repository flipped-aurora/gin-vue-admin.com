---
id: k8s
title: k8s资源配置
---

# k8s资源配置

## 使用声明
1. 上云需要手动初始化数据库,不支持在线初始化操作 (/deployment/server/gva-server-configmap.yaml)


## 操作
```shell
# 使用默认namespace
kubectl apply  -f server/ -f web/
# 指定namespace
kubectl apply  -f server/ -f web/ -n namespace
```