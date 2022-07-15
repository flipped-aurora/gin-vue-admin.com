# 常见问题

## 前端无验证码
 确保后端已经启动，并且通过系统提供的初始化，初始化了系统。

## 初始化的时候出现 `time-out`等字样
 尝试在前端和后端分别设置 超时时间。

## 自定义接口返回 `404`
请尝试重新启动后端项目，如果还是出现`404`，则需要查看启动时，命令行打印的log，如果您注册了您自定义的路由，下放会打印。具体注册路由的方法，请前往路由模块查看

## 前端访问路由发现路由前缀并非定义的前缀
为了防止浏览器跨域问题的存在，gva在前端通过`vite`(老版本为`webpack`)进行了路由代理。

## 前端打包出现了 `vite.createFilter is not a function`等错误字样
如果使用yarn 安装，不会在安装的时候报错，它只会在运行的时候报错` vite.createFilter is not a function`
如果使用npm 安装，则会出现 `vitejs/plugin-vue ` 和 `vite` 版本不一致。

<img width="895" alt="image" src="https://user-images.githubusercontent.com/56402715/179184409-a3eafab6-52b5-48f1-8e99-c94efb7c016d.png">



其原因是因为7月12号左右 vite 官方发版本，导致 `vite`、`vitejs/plugin-vue `升级了一个大版本。但是Gva 的前端package.json 包里面的`vitejs/plugin-vue `使用的是 lastest ，但是vite 限制了大版本。导致出现了版本不匹配。

解决方法是： 将web目录下的`vitejs/plugin-vue` 后面的 `lastest` 改成`^2.3.3`
