# env环境变量

## .env.development

```
ENV = 'development'  // 标识 不要管

VITE_CLI_PORT = 8080
VITE_SERVER_PORT = 8888
VITE_BASE_API = /api
VITE_FILE_API = /api
VITE_BASE_PATH = http://127.0.0.1
VITE_POSITION = close  // open为开启代码定位功能，close为关闭代码定位功能
VITE_EDITOR = vscode  // 可选 vscode webstorm
// VITE_EDITOR = webstorm 如果使用webstorm开发且要使用dom定位到代码行功能 请先自定添加 webstorm到环境变量 再将VITE_EDITOR值修改为webstorm
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
