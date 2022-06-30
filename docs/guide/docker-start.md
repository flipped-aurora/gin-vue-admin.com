# 使用 Docker 搭建 Gva

## Docker-compose

### 安装 docker-compose [官方文档](https://docs.docker.com/compose/install/)

#### 在Linux安装

```shell
# 1.1 运行此命令以下载Docker Compose的当前稳定版本
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 1.2 将可执行权限应用于二进制文件
sudo chmod +x /usr/local/bin/docker-compose 
```

#### 使用Python的pip安装

```shell
pip3 install docker-compose -i https://pypi.tuna.tsinghua.edu.cn/simple
```

#### 使用 Docker Desktop

- Windows: https://hub.docker.com/editions/community/docker-ce-desktop-windows
- Mac: https://hub.docker.com/editions/community/docker-ce-desktop-mac/

### 使用git克隆本项目

```shell
git clone https://github.com/flipped-aurora/gin-vue-admin.git
```

### 使用docker-compose up一键启动启动项目

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

- web项目预览 [http://127.0.0.1:8000](http://127.0.0.1:8000)
- swagger文档 [http://127.0.0.1:8888/swagger/index.html](http://127.0.0.1:8888/swagger/index.html)

## 使用docker-compose进行体验本项目需注意的问题

- 在初始化数据页面中
    - ip 请填写 [docker-compose56.yaml](https://github.com/flipped-aurora/gin-vue-admin/blob/master/docker-compose.yaml#L56) 的 第56行的ip
    - 端口为 `3306`
    - 用户名为 `root`
    - 密码为 [docker-compose.yaml](https://github.com/flipped-aurora/gin-vue-admin/blob/master/docker-compose.yaml#L53) 的 52行定义的数据库密码

- 如果server的177.7.0.12这个容器内部ip被占用了,需要修改地方为
    - [docker-compose.yaml](https://github.com/flipped-aurora/gin-vue-admin/blob/master/docker-compose.yaml#L42)的第42行的177.7.0.12更换为你想要的ip
    - [web/.docker-compose/nginx/conf.d/my.conf](https://github.com/flipped-aurora/gin-vue-admin/blob/master/web/.docker-compose/nginx/conf.d/my.conf#L20)的第20行的177.7.0.12更换为你想要的ip

## 使用docker-compose进行部署本项目需注意的问题

- docker-compose使用自定义的一个docker网络

    ```
    networks:
      network:
        ipam:
          driver: default
          config:
            - subnet: '177.7.0.0/16' 
    ```

    - 子网地址, 默认网关是177.7.0.1(docker-compose V2需要写,V3则不需要),具体信息看[官方文档](https://docs.docker.com/compose/compose-file/#ipv4_address-ipv6_address)

    - 默认的network名为gin-vue-admin_network,默认是bridge模式

    - 如果修改了子网,对应的每个service的ipv4_address都需要修改,还有[web/.docker-compose/nginx/conf.d/my.conf](https://github.com/flipped-aurora/gin-vue-admin/blob/master/web/.docker-compose/nginx/conf.d/my.conf#L20)的第20行的server的ip也需要修改

    - [server/Dockerfile](https://github.com/flipped-aurora/gin-vue-admin/blob/master/server/Dockerfile)使用了多阶段构建，这是docker 17.05后引入的，因此安装的docker版本需要高于17.05
    - mysql数据库请使用装在服务器磁盘的本地数据库.
        - 避免使用docker容器内的mysql,可能会出现写入的问题, io比宿主机低  docker的持久化机制问题
    - 使用本项目的docker-compose进行部署时,请修改[docker-compose.yaml](https://github.com/flipped-aurora/gin-vue-admin/blob/master/docker-compose.yaml)对应的[nginx配置](https://github.com/flipped-aurora/gin-vue-admin/blob/master/web/.docker-compose/nginx/conf.d/my.conf),mysql配置,networks配置,redis配置,按需自行更改.


