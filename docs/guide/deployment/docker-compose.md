---
id: docker-compose
title: docker-compose
---

## Web使用Docker打包示例

- 使用 `nginx` 镜像

`my.conf` 来源于 [gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin) 的[my.conf](https://github.com/flipped-aurora/gin-vue-admin/blob/master/web/.docker-compose/nginx/conf.d/my.conf)

 ```shell
server {
    listen       8080;
    server_name localhost;

    #charset koi8-r;
    #access_log  logs/host.access.log  main;

    location / {
        root /usr/share/nginx/html;
        add_header Cache-Control 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_set_header Host $http_host;
        proxy_set_header  X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        rewrite ^/api/(.*)$ /$1 break;  #重写
        proxy_pass http://177.7.0.12:8888; # 设置代理服务器的协议和地址
     }

    location /api/swagger/index.html {
        proxy_pass http://127.0.0.1:8888/swagger/index.html;
     }
 }
 ```

`Dockerfile` 来源于 [gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin) 的[Dockerfile](https://github.com/flipped-aurora/gin-vue-admin/blob/master/web/Dockerfile)

```
# 声明镜像来源为node:12.16.1
FROM node:12.16.1

# 声明工作目录
WORKDIR /gva_web/

# 拷贝整个web项目到当前工作目录
COPY . .

# 通过npm下载cnpm
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

# 使用cnpm进行安装依赖
RUN cnpm install || npm install

# 使用npm run build命令打包web项目
RUN npm run build
# ===================================================== 以下为多阶段构建 ==========================================================

# 声明镜像来源为nginx:alpine, alpine 镜像小
FROM nginx:alpine

# 镜像编写者及邮箱
LABEL MAINTAINER="SliverHorn@sliver_horn@qq.com"

# 从.docker-compose/nginx/conf.d/目录拷贝my.conf到容器内的/etc/nginx/conf.d/my.conf
COPY .docker-compose/nginx/conf.d/my.conf /etc/nginx/conf.d/my.conf

# 从第一阶段进行拷贝文件
COPY --from=0 /gva_web/dist /usr/share/nginx/html

# 查看/etc/nginx/nginx.conf文件
RUN cat /etc/nginx/nginx.conf

# 查看 /etc/nginx/conf.d/my.conf
RUN cat /etc/nginx/conf.d/my.conf

# 查看 文件是否拷贝成功
RUN ls -al /usr/share/nginx/html
```

## Server使用Docker打包示例

- `mysql` -> `path` 的 `mysql` 会自动获取mysql服务的容器内部ip及端口
- `redis` -> `path` 的 `redis` 会自动获取redis服务的容器内部ip

`Dockerfile` 来源于 [gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin) 的 [Dockerfile](https://github.com/flipped-aurora/gin-vue-admin/blob/master/server/Dockerfile)

```
# 声明镜像来源为golang:alpine
FROM golang:alpine

# 声明工作目录
WORKDIR /go/src/gin-vue-admin

# 拷贝整个server项目到工作目录
COPY . .

# go generate 编译前自动执行代码
# go env 查看go的环境变量
# go build -o server . 打包项目生成文件名为server的二进制文件
RUN go generate && go env && go build -o server .

# ==================================================== 以下为多阶段构建 ==========================================================

# 声明镜像来源为alpine:latest
FROM alpine:latest

# 镜像编写者及邮箱
LABEL MAINTAINER="SliverHorn@sliver_horn@qq.com"

# 声明工作目录
WORKDIR /go/src/gin-vue-admin

# 把/go/src/gin-vue-admin整个文件夹的文件到当前工作目录
COPY --from=0 /go/src/gin-vue-admin ./

EXPOSE 8888

# 运行打包好的二进制 并用-c 指定config.docker.yaml配置文件
ENTRYPOINT ./server -c config.docker.yaml
```

## docker-compose.yaml详解

`dockerfile-compose.yaml` 来源于 [gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin) 的 [dockerfile-compose.yaml](https://github.com/flipped-aurora/gin-vue-admin/blob/master/docker-compose.yaml)

```yaml
version: "3"

# 声明一个名为network的networks,subnet为network的子网地址,默认网关是177.7.0.1
networks:
  network:
    ipam:
      driver: default
      config:
        - subnet: '177.7.0.0/16'

services:
  # web服务
  web:
    build:
      context: ./web
      # 指定dockerfile启动容器
      dockerfile: ./Dockerfile
    # 自定义容器名
    container_name: gva-web
    # 容器启动失败是否重启
    restart: always
    # 映射端口
    ports:
      - '8080:8080'
    # web服务依赖于server服务
    depends_on:
      - server
    command: [ 'nginx-debug', '-g', 'daemon off;' ]
    networks:
      network:
        # 在network网络下的容器内部的Ipv4地址
        ipv4_address: 177.7.0.11

  # server服务
  server:
    build:
      context: ./server
      # 指定dockerfile启动容器
      dockerfile: ./Dockerfile
    # 自定义容器名
    container_name: gva-server
    # 容器启动失败是否重启
    restart: always
    # 映射端口
    ports:
      - '8888:8888'
    # server服务依赖于mysql服务于redis服务
    depends_on:
      - mysql
      - redis
    networks:
      network:
      	# 在network网络下的容器内部的Ipv4地址
        ipv4_address: 177.7.0.12

  mysql:
    # 指定mysql镜像版本
    # 如果您是 arm64 架构：如 MacOS 的 M1，请修改镜像为 image: mysql/mysql-server:8.0.21
    image: mysql:8.0.21
    # 自定义容器名
    container_name: gva-mysql
    # 设置utf8字符集
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci 
    # 容器启动失败是否重启
    restart: always
    # 映射端口
    ports:
      - "13306:3306"  # host物理直接映射端口为13306
    # 系统环境变量
    environment:
      MYSQL_DATABASE: 'qmPlus' # 初始化启动时要创建的数据库的名称
      MYSQL_ROOT_PASSWORD: 'Aa@6447985' # root管理员用户密码
    # 映射数据卷到数据库
    volumes:
      - '.docker-compose/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d'
    networks:
      network:
        # 在network网络下的容器内部的Ipv4地址
        ipv4_address: 177.7.0.13

  # redis服务
  redis:
    # 指定redis镜像版本
    image: redis:6.0.6
    # 自定义容器名
    container_name: gva-redis # 容器名
    # 容器启动失败是否重启
    restart: always
    # 映射端口
    ports:
      - '6379:6379'
    networks:
      network:
        # 在network网络下的容器内部的Ipv4地址
        ipv4_address: 177.7.0.14
```

## 常用命令

```shell
# 使用docker-compose启动四个容器
docker-compose up
# 如果您修改了某些配置选项,可以使用此命令重新打包镜像
docker-compose up --build
# 使用docker-compose 后台启动
docker-compose up -d
# 使用docker-compose 重新打包镜像并后台启动
docker-compose up --build -d
# 服务都启动成功后,使用此命令行可清除none镜像
docker system prune
```





















































