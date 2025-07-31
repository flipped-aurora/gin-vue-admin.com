# 常见问题

本文档收集了 Gin-Vue-Admin 使用过程中的常见问题和解决方案，帮助您快速定位和解决问题。

## 快速导航

- [系统初始化问题](#系统初始化问题)
- [前端相关问题](#前端相关问题)
- [后端相关问题](#后端相关问题)
- [权限管理问题](#权限管理问题)
- [部署相关问题](#部署相关问题)
- [数据库相关问题](#数据库相关问题)

## 系统初始化问题

### 前端无验证码显示

**问题描述：** 登录页面验证码图片无法显示或显示空白

**解决方案：**
1. **检查后端服务状态**
   ```bash
   # 确认后端服务是否正常启动
   curl http://localhost:8888/api/base/captcha
   ```

2. **确认系统初始化**
   - 确保已通过系统初始化页面完成数据库初始化
   - 检查数据库连接是否正常
   - 验证配置文件 `config.yaml` 中的数据库配置

3. **检查网络连接**
   - 确认前后端网络连通性
   - 检查防火墙设置
   - 验证代理配置是否正确

### 初始化超时问题

**问题描述：** 初始化过程中出现 `time-out` 等超时错误

**解决方案：**
1. **调整前端超时设置**
   ```javascript
   // 在 requset.js 配置中增加超时时间
   timeout = 30000; // 30秒
   ```

2. **调整后端超时设置**
 在core/server.go配置时间

3. **检查数据库性能**
   - 确认数据库服务器性能
   - 检查网络延迟
   - 优化数据库配置

### 数据库引擎错误

**问题描述：** 初始化时出现 `Error 1071: Specified key was too long; max key length is 1000 bytes`

**解决方案：**
1. **修改数据库默认引擎**
   ```sql
   -- 修改数据库默认引擎为 InnoDB
   ALTER DATABASE your_database_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **单独修改 casbin 表引擎**
   ```sql
   -- 修改 casbin_rule 表引擎
   ALTER TABLE casbin_rule ENGINE=InnoDB;
   ```

3. **创建数据库时指定引擎**
   ```sql
   CREATE DATABASE gin_vue_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

## 前端相关问题

### 路由前缀问题

**问题描述：** 前端访问路由时发现路由前缀与定义的不一致

**解决方案：**
- **原因说明**：为防止浏览器跨域问题，GVA 在前端通过 Vite（老版本为 Webpack）进行了路由代理
- **配置检查**：
  ```javascript
  // vite.config.js
  export default {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8888',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
  ```

### Vite 版本兼容问题

**问题描述：** 前端打包时出现 `vite.createFilter is not a function` 错误

**问题原因：**
- Vite 官方版本更新导致 `@vitejs/plugin-vue` 与 `vite` 版本不匹配
- package.json 中使用 `latest` 版本导致版本冲突

**解决方案：**
1. **修改 package.json**
   ```json
   {
     "devDependencies": {
       "@vitejs/plugin-vue": "^2.3.3",
       "vite": "^3.0.0"
     }
   }
   ```

2. **重新安装依赖**
   ```bash
   # 删除 node_modules 和 package-lock.json
   rm -rf node_modules package-lock.json
   
   # 重新安装
   npm install
   ```

3. **使用固定版本**
   - 避免使用 `latest` 标签
   - 使用具体版本号或兼容版本范围

### Node.js 版本问题

**问题描述：** 前端运行时出现 `node:***` 等字段错误

**解决方案：**
1. **检查 Node.js 版本**
   ```bash
   node --version
   # 确保版本 >= 14.18 或 >= 16.0
   ```

2. **升级 Node.js**
   ```bash
   # 使用 nvm 管理 Node.js 版本
   nvm install 16
   nvm use 16
   ```

3. **版本要求说明**
   - Vite 3 要求 Node.js 版本 >= 14.18+ 或 16+
   - 建议使用 LTS 版本以确保稳定性

### 前端白屏问题

**问题描述：** 前端界面白屏，一直处于加载状态，无错误提示

**排查步骤：**
1. **检查控制台错误**
   - 打开浏览器开发者工具
   - 查看 Console 和 Network 选项卡
   - 检查是否有 JavaScript 错误

2. **检查导入路径**
   ```javascript
   // 检查所有 import 语句的路径是否正确
   import Component from '@/components/Component.vue' // 确保路径存在
   ```

3. **检查第三方包**
   ```bash
   # 重新安装依赖
   npm install
   
   # 检查包版本兼容性
   npm ls
   ```

4. **逐步排查**
   - 注释掉可疑的导入语句
   - 逐个恢复，定位问题代码

## 后端相关问题

### 自定义接口 404 错误

**问题描述：** 自定义接口返回 404 错误

**解决方案：**
1. **重启后端服务**
   ```bash
   # 停止服务
   Ctrl + C
   
   # 重新启动
   go run main.go
   ```

2. **检查路由注册**
   - 查看启动日志中的路由注册信息
   - 确认自定义路由是否正确注册
   - 参考 [路由模块文档](../server/router.md)

3. **验证路由配置**
   ```go
   // 确保路由正确注册
   func InitRouter() {
       Router.POST("/api/custom/endpoint", customHandler)
   }
   ```

## 权限管理问题

### 权限不足错误

**问题描述：** 访问接口时提示权限不足

**排查步骤：**

1. **检查 API 管理配置**
   - 进入 `系统管理` → `API 管理`
   - 检查目标接口的路径和请求方式
   - **重要**：确保路径和请求方式中没有多余空格
   - 保存修改后，重新分配角色权限

2. **检查角色权限分配**
   - 进入 `系统管理` → `角色管理`
   - 为相应角色重新分配 API 权限
   - 确认权限保存成功

3. **数据库权限规则检查**
   ```sql
   -- 查询权限规则是否存在
   SELECT * FROM casbin_rule 
   WHERE v0='角色ID' AND v1='请求路由' AND v2='请求方式';
   ```

4. **手动添加权限规则**
   ```sql
   -- 如果规则不存在，手动添加
   INSERT INTO casbin_rule (p_type, v0, v1, v2, v3, v4, v5) 
   VALUES ('p', '角色ID', '请求路由', '请求方式', null, null, null);
   ```

### 菜单不显示问题

**问题描述：** 添加菜单后左侧导航栏没有显示

**解决方案：**
1. **检查菜单权限**
   - 进入 `系统管理` → `角色管理`
   - 找到对应角色，编辑权限
   - 在菜单权限中勾选新添加的菜单
   - 保存权限设置

2. **检查菜单配置**
   - 确认菜单状态为启用
   - 检查菜单层级关系
   - 验证路由配置是否正确

3. **刷新权限缓存**
   - 重新登录系统
   - 或清除浏览器缓存

## 部署相关问题

### 静态资源访问问题

**问题描述：** 宝塔部署后图片等静态资源无法访问

**解决方案：**
1. **检查 Nginx 配置**
   ```nginx
   # 删除对静态资源的拦截规则
   # 注释或删除类似以下的配置
   # location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
   #     deny all;
   # }
   ```

2. **配置静态资源服务**
   ```nginx
   location /uploads/ {
       alias /path/to/gin-vue-admin/uploads/;
       expires 30d;
   }
   ```

3. **后端资源配置**
   - 确保后端静态资源放在 `public` 目录下
   - 检查文件权限设置

## 数据库相关问题

### 时区问题

**问题描述：** 时间比真实时间少 8 小时

**排查步骤：**
1. **检查系统时区**
   ```bash
   # 查看系统时区
   date
   timedatectl status
   ```

2. **检查 Docker 时区**
   ```dockerfile
   # Dockerfile 中设置时区
   ENV TZ=Asia/Shanghai
   RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
   ```

3. **数据库时区配置**
   
   **MySQL：**
   ```sql
   -- 查看时区
   SELECT @@global.time_zone, @@session.time_zone;
   
   -- 设置时区
   SET GLOBAL time_zone = '+8:00';
   SET SESSION time_zone = '+8:00';
   ```
   
   **PostgreSQL：**
   ```sql
   -- 设置时区
   ALTER SYSTEM SET timezone TO 'Asia/Shanghai';
   SELECT pg_reload_conf();
   SHOW TIMEZONE;
   ```

4. **应用程序时区配置**
   ```go
   // 在 main.go 中设置时区
   import "time"
   
   func init() {
       loc, _ := time.LoadLocation("Asia/Shanghai")
       time.Local = loc
   }
   ```

### 重新初始化数据库

**问题描述：** 需要重新初始化数据库

**操作步骤：**
1. **临时断开数据库连接**
   ```yaml
   # 修改 config.yaml，使后端无法连接数据库
   mysql:
     path: "wrong_host:3306"  # 故意填写错误的主机
     db-name: "wrong_db"      # 故意填写错误的数据库名
   ```

2. **重启后端服务**
   ```bash
   # 重启后端
   go run main.go
   ```

3. **执行重新初始化**
   - 访问前端初始化页面
   - 填写正确的数据库配置
   - 点击初始化按钮

4. **恢复正确配置**
   - 初始化完成后，恢复 `config.yaml` 中的正确配置
   - 重启服务

## 调试技巧

### 日志查看

1. **后端日志**
   ```bash
   # 查看实时日志
   tail -f logs/server.log
   
   # 查看错误日志
   grep "ERROR" logs/server.log
   ```

2. **前端调试**
   - 使用浏览器开发者工具
   - 检查 Network 选项卡中的请求响应
   - 查看 Console 中的错误信息

### 常用调试命令

```bash
# 检查端口占用
netstat -tulpn | grep :8888

# 检查进程状态
ps aux | grep gin-vue-admin

# 检查磁盘空间
df -h

# 检查内存使用
free -h
```

## 获取帮助

如果以上解决方案无法解决您的问题，可以通过以下方式获取帮助：

- **官方文档**：查阅详细的技术文档
- **GitHub Issues**：[提交问题报告](https://github.com/flipped-aurora/gin-vue-admin/issues)
- **社区论坛**：[参与讨论](https://github.com/flipped-aurora/gin-vue-admin/discussions)
- **QQ 群**：加入官方 QQ 群交流
- **微信群**：关注官方微信获取群二维码

## 相关文档

- [快速开始](../start-quickly/index.md) - 项目快速启动指南
- [部署指南](../deployment/index.md) - 生产环境部署
- [故障排除](../troubleshooting/index.md) - 详细故障排除指南
- [最佳实践](../best-practices/index.md) - 开发最佳实践
