# env环境变量

## .env.development

ENV = 'development'  // 标识 不要管

```
VITE_CLI_PORT = 8080  // 开发阶段前端运行的端口
VITE_SERVER_PORT = 8888 //  开发阶段后端运行的端口
VITE_BASE_API = /api  // 代理前缀用于跨域转发
#下方修改为你的线上ip
VITE_BASE_PATH = https://demo.gin-vue-admin.com // 开发阶段为本地后端
```

## .env.production


ENV = 'production'  // 标识 不要管

```
VITE_CLI_PORT = 8080  // 开发阶段前端运行的端口（上线可以无视）
VITE_SERVER_PORT = 8888 //  开发阶段后端运行的端口（上线可以无视）
VITE_BASE_API = /api  // 代理前缀用于跨域转发（搭配proxy工具例如nginx）
#下方修改为你的线上ip
VITE_BASE_PATH = https://demo.gin-vue-admin.com // 主要是保证ifream的可用性 不会影响主体业务
```