# 常见问题

## 前端无验证码
 确保后端已经启动，并且通过系统提供的初始化，初始化了系统。

## 初始化的时候出现 `time-out`等字样
 尝试在前端和后端分别设置 超时时间。

## 初始化的时候出现 `github.com/casbin/gorm-adapter/v3@v3.7.3/adapter.go:389 Error 1071: Specified key was too long; max key length is 1000 bytes`字样
修改数据库默认引擎为 innoDB 或者单独修改 `casbin` 表的引擎为 innoDB

## 自定义接口返回 `404`
请尝试重新启动后端项目，如果还是出现`404`，则需要查看启动时，命令行打印的log，如果您注册了您自定义的路由，下放会打印。具体注册路由的方法，请前往路由模块查看

## 前端访问路由发现路由前缀并非定义的前缀
为了防止浏览器跨域问题的存在，gva在前端通过`vite`(老版本为`webpack`)进行了路由代理。

## 前端打包出现了 `vite.createFilter is not a function`等错误字样
如果使用yarn 安装，不会在安装的时候报错，它只会在运行的时候报错` vite.createFilter is not a function`
如果使用npm 安装，则会出现 `vitejs/plugin-vue ` 和 `vite` 版本不一致。

<img width="895" alt="image" src="https://user-images.githubusercontent.com/56402715/179184409-a3eafab6-52b5-48f1-8e99-c94efb7c016d.png">


其原因是因为7月12号左右 vite 官方发版本，导致 `vite`、`vitejs/plugin-vue `升级了一个大版本。Gva 的前端package.json 包里面的`vitejs/plugin-vue `使用的是 lastest ，但是vite 限制了大版本。导致出现了版本不匹配。

解决方法是： 将web目录下的`vitejs/plugin-vue` 后面的 `lastest` 改成`^2.3.3`

## 权限不足排查方案

1. 前往`超级管理员>api管理` 菜单里进行检查, 检查目标接口的路径和请求方式数据是否含有空格, 去掉空格并保存, 然后到`超级管理员>角色管理` 菜单对需要改接口的角色重新分配api权限
2. 检查 casbin_rule 是否存在规则, 请求路由，请求方式，角色id，去casbin_rule表查，v0=角色id，v1=请求路由，v2=请求方式
```sql
SELECT * FROM casbin_rule WHERE v0='角色id' AND v1='请求路由' AND v2='请求方式'
```
没有就手动填上去
```sql
INSERT INTO zy_ad_ms.casbin_rule (p_type, v0, v1, v2, v3, v4, v5) VALUES ('p', '角色id', '请求路由', '请求方式', null, null, null);
```


## 前端运行出现 `node:***` 等字段错误
由于新版gva 前端使用vite最新的vite3版本，vite 官方文档强制 vite版本为 `Vite requires Node.js version 14.18+, 16+. `
vite 官方强制原文为`Vite requires Node.js version 14.18+, 16+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.` [vitejs](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) 请悉知！如果您的版本不正确，请先升级版本。
