# Docker 快速开发

## Docker   &   Docker-compose 环境

1. 前往 [Docker Desktop for Windows by Docker | Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-windows/)下载最新版本 Docker
2. 前往 [Release v2.3.3 · docker/compose (github.com)](https://github.com/docker/compose/releases/tag/v2.3.3)下载最新版本 Docker-Compose

## 一、要使用docker快速开发，需要进行两处项目文件修改

1. 打开前端目录下的文件  web/vite.config.js，大约第57行。

   ```
      server: {
         // 如果使用docker-compose开发模式，设置为false
         open: false,
         port: process.env.VITE_CLI_PORT,
   ```

   

2. 打开前端目录下的文件  web/.env.development，大约第6行。

   ```
   ENV = 'development'
   VITE_CLI_PORT = 8080
   VITE_SERVER_PORT = 8888
   VITE_BASE_API = /api
   // VITE_BASE_PATH = http://127.0.0.1         //同时注销这一行
   // 如果使用docker-compose开发模式，设置为下面的地址，或者物理机IP
   VITE_BASE_PATH = http://177.7.0.12             
   ```

   


### 二、一键启动

1. 进入项目目录，指定 docker-compose 开发配置文件 docker-compose-dev.yaml 启动

   ```
   // 启动, 第一次启动可能会稍微慢一点
   docker-compose -f deploy/docker-compose/docker-compose-dev.yaml  up
   
   // 后台启动
   docker-compose -f deploy/docker-compose/docker-compose-dev.yaml  up  -d
   
   // 停止
   docker-compose -f deploy/docker-compose/docker-compose-dev.yaml  stop
   ```

2. 启动完成请打开浏览器访问

   ```
   http://127.0.0.1:8080
   ```




### 三、初始化

1.  请使用下面的数据进行初始化，具体配置参考 docker-compose-dev.yaml ，若要直接使用请修改 server/config.yaml

![image-20220310173721432](/deployment/image-20220310173721432.png)

