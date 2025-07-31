# 项目初始化

本指南将详细介绍如何初始化和启动 Gin-Vue-Admin 项目，包括后端服务、前端应用和数据库的配置。

::: tip 📺 视频教程
如果您更喜欢视频学习，可以观看我们的[视频教程](https://www.bilibili.com/video/BV1kv4y1g7nT?p=3)。
:::

## 📋 前置条件

在开始之前，请确保您已经完成：

- ✅ [环境准备](/guide/start-quickly/env) - 安装 Node.js、Go、MySQL 等必要环境
- ✅ 克隆项目代码到本地
- ✅ 数据库服务正常运行

## 🚀 快速启动

### 1. 克隆项目

```bash
# 克隆主分支代码
git clone https://github.com/flipped-aurora/gin-vue-admin.git

# 进入项目目录
cd gin-vue-admin
```

### 2. 项目结构概览

```
gin-vue-admin/
├── server/          # 后端 Go 项目
│   ├── main.go      # 程序入口
│   ├── config.yaml  # 配置文件
│   └── ...
├── web/             # 前端 Vue 项目
│   ├── src/         # 源代码
│   ├── package.json # 依赖配置
│   └── ...
└── README.md        # 项目说明
```

## 📚 详细教程视频

::: tip 💡 学习建议
强烈建议观看以下分集视频教程，虽然新版UI样式有些许差别，但基础操作无变化。
:::

### 基础入门

- [1. 克隆项目和安装依赖](https://www.bilibili.com/video/BV1jx4y1s7xx)
- [2. 初始化项目](https://www.bilibili.com/video/BV1sr421K7sv)
- [3. 开启调试工具+创建初始化包](https://www.bilibili.com/video/BV1iH4y1c7Na)

### 功能开发

- [4. 手动使用自动化创建功能](https://www.bilibili.com/video/BV1UZ421T7fV)
- [5. 使用已有表格创建业务](https://www.bilibili.com/video/BV1NE4m1977s)
- [6. 使用AI创建业务和创建数据源模式的可选项](https://www.bilibili.com/video/BV17i421a7DE)
- [7. 创建自己的后端方法](https://www.bilibili.com/video/BV1Yw4m1k7fg)

### 前端开发

- [8. 新增一个前端页面](https://www.bilibili.com/video/BV12y411i7oE)
- [9. 配置一个前端二级页面](https://www.bilibili.com/video/BV1ZM4m1y7i3)
- [10. 配置一个前端菜单参数](https://www.bilibili.com/video/BV1WS42197DZ)
- [11. 菜单参数实战+动态菜单标题+菜单高亮配置](https://www.bilibili.com/video/BV1NE4m1979c)
- [12. 增加菜单可控按钮](https://www.bilibili.com/video/BV1Sw4m1k746)

### 高级配置

- [14. 新增客户角色和其相关配置教学](https://www.bilibili.com/video/BV1Ki421a7X2)
- [15. 发布项目上线](https://www.bilibili.com/video/BV1Lx4y1s77D)

## 🔧 后端服务启动

### 1. 打开后端项目

使用 GoLand 或 VS Code 打开 `server` 文件夹：

```bash
# 进入后端目录
cd server

# 使用 GoLand 打开（如果已安装）
goland .

# 或使用 VS Code 打开
code .
```

### 2. 安装依赖

在项目根目录下运行以下命令安装 Go 模块依赖：

```bash
# 下载并整理依赖
go mod tidy
```

::: details 🔍 命令说明
- `go mod tidy`: 添加缺失的模块依赖，移除未使用的依赖
- 该命令会根据 `go.mod` 文件下载所需的第三方包
:::

### 3. 启动后端服务

#### 方式一：命令行启动

```bash
# 在 server 目录下运行
go run main.go
```

#### 方式二：GoLand 启动

1. 在 GoLand 中打开 `main.go` 文件
2. 点击行号旁的绿色三角形按钮
3. 或使用快捷键 `Ctrl+Shift+F10` (Windows/Linux) 或 `Cmd+Shift+R` (macOS)

#### 方式三：VS Code 启动

1. 按 `F5` 或点击调试按钮
2. 选择 "Go: Launch Package"

### 4. 验证后端启动

如果看到以下输出，说明后端服务启动成功：

```
[GIN-debug] Listening and serving HTTP on :8888
```

访问 [http://localhost:8888/health](http://localhost:8888/health) 检查服务状态。

## 🎨 前端应用启动

### 1. 打开前端项目

使用 VS Code 打开 `web` 文件夹：

```bash
# 进入前端目录
cd web

# 使用 VS Code 打开
code .
```

### 2. 安装依赖

::: warning ⚠️ Node.js 版本要求
确保您的 Node.js 版本 >= 18.16.2
:::

```bash
# 安装项目依赖
npm install

# 或使用 yarn（如果已安装）
yarn install

# 或使用 pnpm（推荐，速度更快）
pnpm install
```

### 3. 启动开发服务器

```bash
# 启动开发服务器
npm run serve

# 或使用其他包管理器
yarn serve
pnpm serve
```

### 4. 验证前端启动

如果看到以下输出，说明前端应用启动成功：

```
  App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.1.100:8080/
```

## 🗄️ 数据库初始化

### 1. 访问初始化页面

在浏览器中访问：[http://localhost:8080/#/init](http://localhost:8080/#/init)

### 2. 配置数据库信息

在初始化页面填写数据库连接信息：

- **数据库类型**: 选择 MySQL
- **主机地址**: `127.0.0.1`
- **端口**: `3306`
- **用户名**: `root`
- **密码**: 您的数据库密码
- **数据库名**: `gva`（如果不存在会自动创建）

### 3. 执行初始化

1. 确认所有信息无误
2. 点击 "立即初始化" 按钮
3. 等待初始化完成

![数据库初始化](https://qmplusimg.henrongyi.top/gva/gin-vue-admin.png)

### 4. 初始化完成

初始化成功后，系统会：

- ✅ 创建所有必要的数据表
- ✅ 插入基础数据（管理员账号、菜单、权限等）
- ✅ 自动跳转到登录页面

**默认管理员账号**：
- 用户名：`admin`
- 密码：`123456`

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
