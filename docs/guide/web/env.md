# env环境变量

## 变量说明

| 变量 | 作用 | 开发环境默认值 |
| --- | --- | --- |
| VITE_CLI_PORT | 前端开发服务器端口 | 8080 |
| VITE_SERVER_PORT | 后端服务端口 | 8888 |
| VITE_BASE_API | 后端接口前缀（开发环境为 vite 代理路径） | /api |
| VITE_FILE_API | 文件/图片访问前缀（utils/image.js 拼接图片地址时使用） | /api |
| VITE_BASE_PATH | 代理目标主机 | http://127.0.0.1 |
| VITE_POSITION | 置为 open 时启用 vite-plugin-vue-devtools（含代码定位功能） | close |
| VITE_EDITOR | devtools 代码定位使用的编辑器（launchEditor） | vscode |

开发环境下，vite 会把 `VITE_BASE_API` 代理到 `${VITE_BASE_PATH}:${VITE_SERVER_PORT}/` 并重写掉前缀；另外内置一个固定代理 `/plugin -> https://plugin.gin-vue-admin.com/api/`（插件市场），无需配置。

## .env.development

```
ENV = 'development'  // 标识 不要管

VITE_CLI_PORT = 8080
VITE_SERVER_PORT = 8888
VITE_BASE_API = /api
VITE_FILE_API = /api
VITE_BASE_PATH = http://127.0.0.1
VITE_POSITION = close  // open为开启vite-plugin-vue-devtools（含代码定位功能），close为关闭
VITE_EDITOR = vscode  // 可选 vscode webstorm
// VITE_EDITOR = webstorm 如果使用webstorm开发且要使用dom定位到代码行功能 请先自行添加 webstorm到环境变量 再将VITE_EDITOR值修改为webstorm
// 如果使用docker-compose开发模式，设置为下面的地址或本机主机IP
// VITE_BASE_PATH = http://177.7.0.12

// 打开代码定位功能的情况下，在web页面按住键盘的shift+alt+鼠标左键点击代码行，即可在编辑器中打开对应的代码文件
```

## .env.production

```
ENV = 'production'  // 标识 不要管

#下方为上线需要用到的程序代理前缀，一般用于nginx代理转发
VITE_BASE_API = /api
VITE_FILE_API = /api
#下方修改为你的线上ip（如果需要在线使用表单构建工具时使用，其余情况无需使用以下环境变量）
VITE_BASE_PATH = https://demo.gin-vue-admin.com
```
