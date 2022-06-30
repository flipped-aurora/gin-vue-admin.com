# 初始化

## 视频教程

[【gin-vue-admin】手把手教你使用gin-vue-admin(分P合集)](https://www.bilibili.com/video/BV1kv4y1g7nT)

- [项目的下载与依赖安装](https://www.bilibili.com/video/BV1kv4y1g7nT?p=1)
- [项目的初始化](https://www.bilibili.com/video/BV1kv4y1g7nT?p=2)
- [自动化pkg+自动化代码使用](https://www.bilibili.com/video/BV1kv4y1g7nT?p=3)
- [项目创建前端一级页面](https://www.bilibili.com/video/BV1kv4y1g7nT?p=4)
- [项目创建一个二级页面](https://www.bilibili.com/video/BV1kv4y1g7nT?p=5)
- [项目手动创建后端api router service](https://www.bilibili.com/video/BV1kv4y1g7nT?p=6)
- [项目手动添加api记录（补）](https://www.bilibili.com/video/BV1kv4y1g7nT?p=7)
- [项目添加一个角色](https://www.bilibili.com/video/BV1kv4y1g7nT?p=8)
- [项目添加菜单参数](https://www.bilibili.com/video/BV1kv4y1g7nT?p=9)
- [项目添加动态参数](https://www.bilibili.com/video/BV1kv4y1g7nT?p=10)
- [菜单可控按钮操作简介](https://www.bilibili.com/video/BV1kv4y1g7nT?p=11)
- [如何使用字典](https://www.bilibili.com/video/BV1kv4y1g7nT?p=12)
- [2.5.1插件模板功能使用介绍](https://www.bilibili.com/video/BV1kv4y1g7nT?p=13)
- [前端插件的使用和创建](https://www.bilibili.com/video/BV1kv4y1g7nT?p=14)
- [如何关联到一个已经初始化过或者开发过的数据库](https://www.bilibili.com/video/BV1kv4y1g7nT?p=15)
- [打包部署](https://www.bilibili.com/video/BV1kv4y1g7nT?p=16)

## 1.server

### 1.1 Goland打开server文件夹

- ![image-20210709230701840](/first/image-20210709230701840.png)
- ![image-20210710082408883](/first/image-20210710082408883.png)

### 1.2 启动server项目

- 打开终端工具, 输入以下命令

```go
go mod tidy
# 选择上下命令其一执行即可
go generate -x // -x 显示并执行命令
```

> [Go编译工具命令](https://www.cnblogs.com/binHome/p/14845617.html)

2. 启动server项目

   ![image-20210710084944467](/first/image-20210710084944467.png)

- 启动成功

  ![image-20210710085458536](/first/image-20210710085458536.png)


## 2 web 项目

### 2.1 安装nodejs

[Node.js (nodejs.org)](https://nodejs.org/zh-cn/)

### 2.2 使用 `vscode` 打开 `web` 项目

![image-20210710090346568](/first/image-20210710090346568.png)

![image-20210710090522820](/first/image-20210710090522820.png)

### 2.3 npm i 安装依赖

> 如果你执行了2.3

- 打开终端

![image-20210710091242940](/first/image-20210710091242940.png)

- `npm i` 安装依赖

![image-20210710092133461](/first/image-20210710092133461.png)

- `npm i` 安装依赖成功

![image-20210710092230558](/first/image-20210710092230558.png)

### 2.4 启动项目

- 使用 `npm run serve` 命令启动项目

![image-20210710092334248](/first/image-20210710092334248.png)

### 1.3 启动成功

![image-20210710092428018](/first/image-20210710092428018.png)

如果没有正常打开此页面, 请手动打开浏览器 输入网址 `http://localhost:8080/` 或者 `http://127.0.0.1:8080/`


## 3 init

### 3.1 初始化数据

- 前往初始化页面

![image-20210710093437964](/first/image-20210710093437964.png)

- 点击我已确认

![image-20210710093531537](/first/image-20210710093531537.png)

- 输入对应mysql数据库信息

![image-20210710093620817](/first/image-20210710093620817.png)

- 点击立即初始化

![image-20210710093756700](/first/image-20210710093756700.png)

- 正在初始化数据库,请稍候

![image-20210710093842228](/first/image-20210710093842228.png)

- 操作成功

![image-20210710094141115](/first/image-20210710094141115.png)

- 输入验证码后, 点击登录按钮

![image-20210710094329635](/first/image-20210710094329635.png)

- 成功打开仪表盘页面

![image-20210710094356041](/first/image-20210710094356041.png)

## 4. 使用Goland运行web项目

### 4.1 编辑配置

![image-20210710094929206](/first/image-20210710094929206.png)

### 4.2 添加npm启动项

![image-20210710095126844](/first/image-20210710095126844.png)

### 4.3 配置

![image-20210710095356257](/first/image-20210710095356257.png)

### 4.4 配置完成

![image-20210710095715145](/first/image-20210710095715145.png)

### 4.4 启动web项目

![image-20210710095814641](/first/image-20210710095814641.png)

### 4.5 启动web项目成功

![image-20210710095838176](/first/image-20210710095838176.png)

## 5. gin-vue-admin 版本更新介绍

- [【gin-vue-admin】增加前端插件2.5.3(2022/06/19)--前端支持插件化，让生态活跃起来（1010工作室出品）](https://www.bilibili.com/video/BV1Ar4y1G7WF)

- [【gin-vue-admin】最新大版本2.5.1--自动化插件模板功能以及插件广场开放测试（1010工作室出品）](https://www.bilibili.com/video/BV1RR4y1A7Ve)
- [【gin-vue-admin】V2.5.1新版本自动化创建包和可分包的自动化代码操作](https://www.bilibili.com/video/BV1uF411W7qG)

- [【gin-vue-admin】话越少，事越大，前端升级为vue3，后端建立了插件仓库](https://www.bilibili.com/video/BV1tf4y1N7cu)
- [【gin-vue-admin】V2.4.5A测：加入插件模式，寻求插件开发者](https://www.bilibili.com/video/BV1BA411A74X)
- [【gin-vue-admin】v2.4.4版本模块化结构介绍以及多角色功能（1010工作室出品）](https://www.bilibili.com/video/BV1x44y117TT)
- [2.4.3版本介绍](https://www.bilibili.com/video/BV1Rg411u7xH?p=1)

- [【gin-vue-admin】最新大版本2.4.0(2021/03/07)--从0开始到部署教学--新版本遵循测视频请勿食用旧版视频（1010工作室出品）](https://www.bilibili.com/video/BV1Mb4y197RR)
- [【gin-vue-admin】06/07更新：UI美化，插件功能，自动化代码增加搜索条件 字段描述 结构体中文描述（1010工作室出品）](https://www.bilibili.com/video/BV1wa4y1Y7oX)
- [【gin-vue-admin】09/20更新：大版本2.3.1发布，gorm更新为v2，项目初始化更加便捷，更多通用功能加入（1010工作室出品）](https://www.bilibili.com/video/BV1Jy4y1k75Z)
- [【gin-vue-admin】10/25更新：增加更多便于新手使用的工具，初始化更加简单，工作流预告（1010工作室出品）](https://www.bilibili.com/video/BV1Ca4y1L7JM)
- [【gin-vue-admin】从部署到发布：手把手带你使用GIN-VUE-ADMIN《2.3.5版本》（1010工作室出品）](https://www.bilibili.com/video/BV1fV411y7dT)
- [【gin-vue-admin】11/28更新：审批流介绍以及简单使用教学（1010工作室出品）](https://www.bilibili.com/video/BV1Ka411F7Ji)
- [【gin-vue-admin】V2.2.0更新：增加日志功能,增加v-auth指令,增加一键打包二进制，增加菜单参数，增加令牌续期（1010工作室出品）](https://www.bilibili.com/video/BV1jk4y127yg)
- [【gin-vue-admin】V2.1.0大更新：增加字典管理，用户操作日志，从数据库一键创建CURD让自动化更加完善（1010工作室出品）](https://www.bilibili.com/video/BV1hC4y1h7PT)
- [【gin-vue-admin】部署教程：gin-vue-admin本地环境线上环境部署配置教学（1010工作室出品）](https://www.bilibili.com/video/BV1y5411s75A)
- [【开源项目教学】gin-vue-admin 2.0目录介绍和自动化开发模式（1010工作室出品）](https://www.bilibili.com/video/BV1aV411d7Gm)
- [【gin-vue-admin】开发示例：基础开发平台gin-vue-admin简介及开发示例（1010工作室出品）](https://www.bilibili.com/video/BV16K4y1r7BD)
- [【gin-vue-admin】环境搭建：基础开发平台gin-vue-admin环境搭建视频（1010工作室出品）](https://www.bilibili.com/video/BV1Fg4y187Bw)



