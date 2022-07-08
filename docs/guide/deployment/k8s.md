---
id: k8s
title: k8s资源配置
---

# k8s资源配置

## 使用声明
1. 上云需要手动初始化数据库,不支持在线初始化操作 (/deployment/server/gva-server-configmap.yaml)

   ```
   自定义初始化数据库后，将配置写入/deployment/server/gva-server-configmap.yaml
   ```



## 选择访问方式



##### 1.域名访问

​    如： http://demo.gin-vue-admin.com

```
修改代码第9行为自己的域名 deploy/kubernetes/web/gva-web-ingress.yaml
```

##### 2.service访问

​    如： http://127.0.0.1:30180

```
修改代码第12行以后为如下配置即可 deploy/kubernetes/web/gva-web-service.yaml
spec:
  type: NodePort
  ports:
    - name: http
      port: 8080
      targetPort: 8080
      nodePort: 30180
  selector:
    app: gva-web
    version: gva-vue3
```



## 选择镜像



##### 1.使用gin-vue-admin官方镜像

​    前端如：image: registry.cn-hangzhou.aliyuncs.com/gva/web:latest

```
修改代码第26行为需要部署的镜像 deploy/kubernetes/web/gva-web-deploymemt.yaml
```

​    后端如：image: registry.cn-hangzhou.aliyuncs.com/gva/server:latest

```
修改代码第26行为需要部署的镜像 deploy/kubernetes/server/gva-server-deployment.yaml
```



##### 2.使用自定义镜像

```
可参考docker页面制作自定义镜像，上传至镜像仓库后，按照步骤一修改yaml文件即可。
```



## 开始部署

```
# 使用默认namespace
kubectl apply  -f deploy/kubernetes/server/ -f deploy/kubernetes/web/

# 指定namespace
kubectl apply  -f deploy/kubernetes/server/ -f deploy/kubernetes/web/ -n namespace

# 重启server服务
kubectl -n namespace rollout restart deployment gva-server

# 扩容server服务
kubectl -n namespace scale deployment gva-server --replicas 2

# 清除gva服务
kubectl delete  -f deploy/kubernetes/server/ -f deploy/kubernetes/web/ -n namespace
```



