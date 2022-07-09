# 生成swagger自动化API文档

## 1 安装 swagger

- 可以翻墙
````
go install github.com/swaggo/swag/cmd/swag@latest
````

- 无法翻墙
  由于国内没法安装 go.org/x 包下面的东西，推荐使用 [goproxy.cn](https://goproxy.cn/zh/) 或者 [goproxy.cn/](https://goproxy.cn/)

```bash
# Go 版本 是 1.16 ~ 最新版 可以忽略以下步骤一
# 步骤一、启用 Go Modules 功能
go env -w GO111MODULE=on 
# 步骤二、配置 GOPROXY 环境变量
go env -w GOPROXY=https://goproxy.cn,direct

# 使用如下命令下载swag
go install github.com/swaggo/swag/cmd/swag@latest
```

## 2 生成API文档

````
cd server
swag init
````
执行上面的命令后，server目录下会出现docs文件夹，打开浏览器输入 `localhost:8888/swagger/index.html`，即可查看swagger文档

## 3 swagger 文档

遇到问题请认真观看[文档地址](https://github.com/swaggo/swag/blob/master/README_zh-CN.md)