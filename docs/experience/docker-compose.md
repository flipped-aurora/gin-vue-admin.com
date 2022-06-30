## 本地使用 Docker-compose

### 安装 docker-compose, 参考[官方文档](https://docs.docker.com/compose/install/)

<details>
<summary>如何在 Linux、Mac、Windows 安装 docker-compose， 点击展开查看</summary>

#### 在Linux安装

```shell
# 1.1 运行此命令以下载Docker Compose的当前稳定版本
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 1.2 将可执行权限应用于二进制文件
sudo chmod +x /usr/local/bin/docker-compose 
```

#### 使用 Python 的 pip 安装

```shell
pip3 install docker-compose -i https://pypi.tuna.tsinghua.edu.cn/simple
```

#### 使用 Docker Desktop

- Windows: https://hub.docker.com/editions/community/docker-ce-desktop-windows
- Mac: https://hub.docker.com/editions/community/docker-ce-desktop-mac/

</details>

### 使用 Git 克隆并进入本项目

```shell
git clone https://github.com/flipped-aurora/gin-vue-admin.git && cd gin-vue-admin
```

### 使用 docker-compose up 一键启动项目

```shell
# 使用 docker-compose 启动四个容器
docker-compose up
# 如果您修改了某些配置选项, 可以使用此命令重新打包镜像
docker-compose up --build
# 使用docker-compose 后台启动
docker-compose up -d
# 使用 docker-compose 重新打包镜像并后台启动
docker-compose up --build -d
# 服务都启动成功后, 使用此命令行可清除 none 镜像
docker system prune
```

- web项目预览 [http://127.0.0.1:8000](http://127.0.0.1:8000)
- swagger文档 [http://127.0.0.1:8888/swagger/index.html](http://127.0.0.1:8888/swagger/index.html)

## 注意事项

### 使用 docker-compose 体验时需注意的问题

1. 在初始化数据页面中
- ip 请填写 [docker-compose56.yaml](https://github.com/flipped-aurora/gin-vue-admin/blob/master/docker-compose.yaml#L56) 的第 56 行的 ip
- 端口为 `3306`
- 用户名为 `root`
- 密码为 [docker-compose.yaml](https://github.com/flipped-aurora/gin-vue-admin/blob/master/docker-compose.yaml#L53) 的 52行定义的数据库密码

2. 如果 server 的 177.7.0.12 这个容器内部ip被占用了, 需要修改地方为
- [docker-compose.yaml](https://github.com/flipped-aurora/gin-vue-admin/blob/master/docker-compose.yaml#L42) 的第 42 行的 177.7.0.12 更换为你想要的 ip
- [web/.docker-compose/nginx/conf.d/my.conf](https://github.com/flipped-aurora/gin-vue-admin/blob/master/web/.docker-compose/nginx/conf.d/my.conf#L20) 的第 20 行的 177.7.0.12 更换为你想要的 ip


### 使用 docker-compose 部署时需注意的问题

1. docker-compose 使用自定义的一个 docker 网络

    - ```
		networks:
		  network:
		    ipam:
		      driver: default
		      config:
		        - subnet: '177.7.0.0/16' 
		```

    - 子网地址, 默认网关是 177.7.0.1 (docker-compose V2 需要写, V3 则不需要), 具体信息看[官方文档](https://docs.docker.com/compose/compose-file/#ipv4_address-ipv6_address)

    - 默认的 network 名为 gin-vue-admin_network, 默认是 bridge 模式

    - 如果修改了子网,对应的每个 service 的 ipv4_address 都需要修改, 还有[web/.docker-compose/nginx/conf.d/my.conf](https://github.com/flipped-aurora/gin-vue-admin/blob/master/web/.docker-compose/nginx/conf.d/my.conf#L20) 的第 20 行的 server 的 ip 也需要修改

2. [server/Dockerfile](https://github.com/flipped-aurora/gin-vue-admin/blob/master/server/Dockerfile) 使用了多阶段构建，这是 docker 17.05 后引入的，因此安装的docker版本需要高于 17.05
3. mysql 数据库请使用装在服务器磁盘的本地数据库
    - 避免使用 docker 容器内的 mysql, 可能会出现写入的问题, io 比宿主机低  docker 的持久化机制问题.
4. 使用本项目的 docker-compose 进行部署时, 请修改[docker-compose.yaml](https://github.com/flipped-aurora/gin-vue-admin/blob/master/docker-compose.yaml) 对应的 [nginx配置](https://github.com/flipped-aurora/gin-vue-admin/blob/master/web/.docker-compose/nginx/conf.d/my.conf), mysql 配置, networks 配置,redis配置,按需自行更改.

