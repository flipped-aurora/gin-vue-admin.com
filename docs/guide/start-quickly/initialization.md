# 初始化

## 视频教程

::: tip
强烈建议将本分P视频看完后再进行开发，新版UI样式有些许差别，但基础操作无变化。
:::

[1.clone项目和安装依赖](https://www.bilibili.com/video/BV1jx4y1s7xx)

[2.初始化项目](https://www.bilibili.com/video/BV1sr421K7sv)

[3.开启调试工具+创建初始化包](https://www.bilibili.com/video/BV1iH4y1c7Na)

[4.手动使用自动化创建功能](https://www.bilibili.com/video/BV1UZ421T7fV)

[5.使用已有表格创建业务](https://www.bilibili.com/video/BV1NE4m1977s)

[6.使用AI创建业务和创建数据源模式的可选项](https://www.bilibili.com/video/BV17i421a7DE)

[7.创建自己的后端方法](https://www.bilibili.com/video/BV1Yw4m1k7fg)

[8.新增一个前端页面](https://www.bilibili.com/video/BV12y411i7oE)

[9.配置一个前端二级页面](https://www.bilibili.com/video/BV1ZM4m1y7i3)

[10.配置一个前端菜单参数](https://www.bilibili.com/video/BV1WS42197DZ)

[11.菜单参数实战+动态菜单标题+菜单高亮配置](https://www.bilibili.com/video/BV1NE4m1979c)

[12.增加菜单可控按钮](https://www.bilibili.com/video/BV1Sw4m1k746)

[14.新增客户角色和其相关配置教学](https://www.bilibili.com/video/BV1Ki421a7X2)

[15.发布项目上线](https://www.bilibili.com/video/BV1Lx4y1s77D)

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

### 2.5 启动成功

![image-20210710093437964](/first/image-20210710093437964.png)

如果没有正常打开此页面, 请手动打开浏览器 输入网址 `http://localhost:8080/` 或者 `http://127.0.0.1:8080/`


## 3 init

### 3.1 初始化数据

- 前往初始化页面

![image-init](/first/image-init.png)

- 点击我已确认

::: tip
需要保证数据库驱动为innodb
:::

- 点击立即初始化

![image-20210710093531537](/first/image-20210710093531537.png)

- 正在初始化数据库,请稍候

![image-20210710093842228](/first/image-20210710093842228.png)

- 初始化成功
上一步执行完成后，会自动跳转到登录页面，输入账号密码即可登录

## 附. 使用Goland运行web项目

### 附.1 编辑配置

![image-20210710094929206](/first/image-20210710094929206.png)

### 附.2 添加npm启动项

![image-20210710095126844](/first/image-20210710095126844.png)

### 附.3 配置

![image-20210710095356257](/first/image-20210710095356257.png)

### 附.4 配置完成

![image-20210710095715145](/first/image-20210710095715145.png)

### 附.5 启动web项目

![image-20210710095814641](/first/image-20210710095814641.png)

### 附.6 启动web项目成功

![image-20210710095838176](/first/image-20210710095838176.png)
