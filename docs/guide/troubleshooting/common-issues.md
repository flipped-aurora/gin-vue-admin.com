# 常见问题排除指南

本文档收集了 Gin-Vue-Admin 项目开发和部署过程中的常见问题及解决方案。

## 🚀 安装和启动问题

### 1. 后端启动问题

#### 问题：数据库连接失败

**错误信息：**
```
failed to initialize database, got error dial tcp 127.0.0.1:3306: connect: connection refused
```

**解决方案：**

1. 检查数据库服务是否启动
```bash
# MySQL
sudo systemctl status mysql
# 或
brew services list | grep mysql

# PostgreSQL
sudo systemctl status postgresql
# 或
brew services list | grep postgresql
```

2. 检查配置文件 `config.yaml`
```yaml
mysql:
  path: 127.0.0.1
  port: "3306"
  config: charset=utf8mb4&parseTime=True&loc=Local
  db-name: gin_vue_admin
  username: root
  password: "your_password"
  prefix: ""
  singular: false
  engine: ""
  max-idle-conns: 10
  max-open-conns: 100
  log-mode: ""
  log-zap: false
```

3. 测试数据库连接
```bash
mysql -h 127.0.0.1 -P 3306 -u root -p
```

4. 创建数据库
```sql
CREATE DATABASE gin_vue_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 问题：Redis 连接失败

**错误信息：**
```
failed to ping redis, got error dial tcp 127.0.0.1:6379: connect: connection refused
```

**解决方案：**

1. 启动 Redis 服务
```bash
# Linux
sudo systemctl start redis

# macOS
brew services start redis

# 手动启动
redis-server
```

2. 检查 Redis 配置
```yaml
redis:
  db: 0
  addr: 127.0.0.1:6379
  password: ""
```

3. 测试 Redis 连接
```bash
redis-cli ping
```

#### 问题：端口被占用

**错误信息：**
```
listen tcp :8888: bind: address already in use
```

**解决方案：**

1. 查找占用端口的进程
```bash
# Linux/macOS
lsof -i :8888
netstat -tulpn | grep 8888

# Windows
netstat -ano | findstr 8888
```

2. 终止占用进程
```bash
# Linux/macOS
kill -9 <PID>

# Windows
taskkill /PID <PID> /F
```

3. 或修改配置文件中的端口
```yaml
system:
  addr: 8889  # 修改为其他端口
```

### 2. 前端启动问题

#### 问题：依赖安装失败

**错误信息：**
```
npm ERR! code ERESOLVECONFLICT
npm ERR! ERESOLVECONFLICT unable to resolve dependency tree
```

**解决方案：**

1. 清理缓存和依赖
```bash
# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 清理 npm 缓存
npm cache clean --force

# 重新安装
npm install
```

2. 使用 yarn 替代 npm
```bash
# 安装 yarn
npm install -g yarn

# 使用 yarn 安装依赖
yarn install
```

3. 使用 --legacy-peer-deps 参数
```bash
npm install --legacy-peer-deps
```

#### 问题：Node.js 版本不兼容

**错误信息：**
```
engine "node" is incompatible with this module
```

**解决方案：**

1. 检查 Node.js 版本
```bash
node --version
```

2. 安装推荐版本（Node.js 16+）
```bash
# 使用 nvm 管理 Node.js 版本
nvm install 18
nvm use 18
```

3. 或修改 package.json 中的引擎要求
```json
{
  "engines": {
    "node": ">=14.0.0"
  }
}
```

#### 问题：Vite 开发服务器启动失败

**错误信息：**
```
Error: Cannot find module '@vitejs/plugin-vue'
```

**解决方案：**

1. 重新安装 Vite 相关依赖
```bash
npm install @vitejs/plugin-vue @vitejs/plugin-vue-jsx --save-dev
```

2. 检查 vite.config.js 配置
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

## 🔧 开发问题

### 1. API 请求问题

#### 问题：跨域请求被阻止

**错误信息：**
```
Access to XMLHttpRequest at 'http://localhost:8888/api/login' from origin 'http://localhost:8080' has been blocked by CORS policy
```

**解决方案：**

1. 后端配置 CORS 中间件
```go
// middleware/cors.go
func Cors() gin.HandlerFunc {
    return gin.HandlerFunc(func(c *gin.Context) {
        method := c.Request.Method
        origin := c.Request.Header.Get("Origin")
        c.Header("Access-Control-Allow-Origin", origin)
        c.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token,X-Token,X-User-Id")
        c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE,UPDATE")
        c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type")
        c.Header("Access-Control-Allow-Credentials", "true")
        if method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }
        c.Next()
    })
}
```

2. 前端配置代理
```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

#### 问题：Token 验证失败

**错误信息：**
```
{
  "code": 7,
  "data": {},
  "msg": "token过期"
}
```

**解决方案：**

1. 检查 Token 是否正确设置
```javascript
// utils/request.js
service.interceptors.request.use(
  config => {
    const token = store.getters['user/token']
    if (token) {
      config.headers['x-token'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
```

2. 实现 Token 自动刷新
```javascript
// utils/request.js
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 7) {
      // Token 过期，尝试刷新
      return store.dispatch('user/refreshToken').then(() => {
        // 重新发送原请求
        return service(response.config)
      }).catch(() => {
        // 刷新失败，跳转登录页
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('Token 过期'))
      })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
```

### 2. 权限问题

#### 问题：权限验证失败

**错误信息：**
```
{
  "code": 7,
  "data": {},
  "msg": "权限不足"
}
```

**解决方案：**

1. 检查用户角色权限配置
```sql
-- 查看用户权限
SELECT u.username, a.authority_name, ar.authority_id, ar.path, ar.method
FROM sys_users u
JOIN sys_authorities a ON u.authority_id = a.authority_id
JOIN sys_authority_menus am ON a.authority_id = am.sys_authority_authority_id
JOIN sys_base_menus m ON am.sys_base_menu_id = m.id
JOIN casbin_rule ar ON a.authority_id = ar.v0
WHERE u.username = 'your_username';
```

2. 添加权限规则
```go
// 在系统管理 -> 角色管理 -> API权限中添加对应的权限
// 或通过代码添加
casbinService := service.ServiceGroupApp.SystemServiceGroup.CasbinService
casbinService.UpdateCasbin(authorityId, casbinInfos)
```

3. 检查 Casbin 配置
```go
// config/casbin.go
func (c *Casbin) TableName() string {
    return c.CasbinRule
}
```

### 3. 数据库问题

#### 问题：数据库迁移失败

**错误信息：**
```
Error 1071: Specified key was too long; max key length is 767 bytes
```

**解决方案：**

1. 修改 MySQL 配置
```sql
-- 设置 innodb_large_prefix
SET GLOBAL innodb_large_prefix = 1;
SET GLOBAL innodb_file_format = 'Barracuda';
SET GLOBAL innodb_file_per_table = 1;
```

2. 修改表结构
```go
// 在模型中指定索引长度
type SysUser struct {
    Username string `gorm:"index:idx_username,length:191;comment:用户登录名"`
    Email    string `gorm:"index:idx_email,length:191;comment:用户邮箱"`
}
```

#### 问题：外键约束错误

**错误信息：**
```
Error 1452: Cannot add or update a child row: a foreign key constraint fails
```

**解决方案：**

1. 检查外键关联的数据是否存在
```sql
-- 检查关联数据
SELECT * FROM sys_authorities WHERE authority_id = 'your_authority_id';
```

2. 临时禁用外键检查
```sql
SET FOREIGN_KEY_CHECKS = 0;
-- 执行你的操作
SET FOREIGN_KEY_CHECKS = 1;
```

3. 修改 GORM 配置
```go
// config/gorm.go
func GormConfig() *gorm.Config {
    return &gorm.Config{
        DisableForeignKeyConstraintWhenMigrating: true,
        // 其他配置...
    }
}
```

## 🎨 前端问题

### 1. 路由问题

#### 问题：路由跳转失败

**错误信息：**
```
Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location
```

**解决方案：**

1. 检查路由跳转逻辑
```javascript
// 避免重复跳转
if (this.$route.path !== '/target-path') {
  this.$router.push('/target-path')
}
```

2. 使用 replace 替代 push
```javascript
this.$router.replace('/target-path')
```

#### 问题：动态路由不生效

**解决方案：**

1. 检查路由注册顺序
```javascript
// router/index.js
// 确保动态路由在静态路由之后注册
const routes = [
  // 静态路由
  { path: '/login', component: Login },
  // 动态路由
  ...asyncRoutes
]
```

2. 检查权限验证逻辑
```javascript
// store/modules/router.js
const actions = {
  async GenerateRoutes({ commit }, roles) {
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    commit('SET_ROUTES', accessedRoutes)
    return accessedRoutes
  }
}
```

### 2. 组件问题

#### 问题：Element Plus 组件样式异常

**解决方案：**

1. 检查样式导入
```javascript
// main.js
import 'element-plus/dist/index.css'
```

2. 检查主题配置
```scss
// styles/element-variables.scss
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      'base': #409eff,
    ),
  )
);
```

#### 问题：组件响应式失效

**解决方案：**

1. 检查数据响应式声明
```javascript
// Vue 3 Composition API
import { ref, reactive } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const state = reactive({
      name: 'test'
    })
    
    return {
      count,
      state
    }
  }
}
```

2. 检查数组/对象更新方式
```javascript
// 错误方式
this.list[0] = newItem

// 正确方式
this.$set(this.list, 0, newItem)
// 或
this.list.splice(0, 1, newItem)
```

## 🚀 部署问题

### 1. Docker 部署问题

#### 问题：Docker 镜像构建失败

**错误信息：**
```
failed to solve with frontend dockerfile.v0: failed to read dockerfile
```

**解决方案：**

1. 检查 Dockerfile 语法
```dockerfile
# 确保 Dockerfile 格式正确
FROM golang:1.19-alpine AS builder

WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
COPY --from=builder /app/config.yaml .
CMD ["./main"]
```

2. 检查 .dockerignore 文件
```
node_modules
.git
.gitignore
README.md
Dockerfile
.dockerignore
```

#### 问题：容器启动失败

**错误信息：**
```
standard_init_linux.go: exec user process caused: no such file or directory
```

**解决方案：**

1. 检查可执行文件权限
```dockerfile
RUN chmod +x ./main
```

2. 使用正确的基础镜像
```dockerfile
# 对于 Go 程序，使用 alpine 或 scratch
FROM alpine:latest
# 或
FROM scratch
```

### 2. Nginx 配置问题

#### 问题：前端路由 404

**解决方案：**

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;
    
    # 处理前端路由
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API 代理
    location /api {
        proxy_pass http://backend:8888;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 问题：静态资源加载失败

**解决方案：**

```nginx
server {
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
    
    # 字体文件
    location ~* \.(woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public";
        add_header Access-Control-Allow-Origin "*";
    }
}
```

## 🔍 调试技巧

### 1. 后端调试

#### 启用详细日志

```yaml
# config.yaml
zap:
  level: 'debug'  # 设置为 debug 级别
  format: 'console'
  prefix: '[gin-vue-admin]'
  director: 'log'
  show-line: true
  encode-level: 'LowercaseColorLevelEncoder'
  stacktrace-key: 'stacktrace'
  log-in-console: true
```

#### 使用 Delve 调试器

```bash
# 安装 Delve
go install github.com/go-delve/delve/cmd/dlv@latest

# 启动调试
dlv debug main.go

# 在代码中设置断点
(dlv) break main.main
(dlv) continue
```

### 2. 前端调试

#### 使用 Vue DevTools

1. 安装浏览器扩展
2. 在开发环境中启用
```javascript
// main.js
if (process.env.NODE_ENV === 'development') {
  app.config.devtools = true
}
```

#### 网络请求调试

```javascript
// utils/request.js
service.interceptors.request.use(
  config => {
    console.log('Request:', config)
    return config
  }
)

service.interceptors.response.use(
  response => {
    console.log('Response:', response)
    return response
  },
  error => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)
```

## 📊 性能问题

### 1. 后端性能优化

#### 数据库查询优化

```go
// 使用索引
db.Where("username = ?", username).First(&user)

// 预加载关联数据
db.Preload("Authorities").Find(&users)

// 分页查询
db.Limit(pageSize).Offset(offset).Find(&users)

// 只查询需要的字段
db.Select("id, username, email").Find(&users)
```

#### 缓存优化

```go
// 使用 Redis 缓存
func GetUserFromCache(userID uint) (*system.SysUser, error) {
    key := fmt.Sprintf("user:%d", userID)
    cached := global.GVA_REDIS.Get(context.Background(), key).Val()
    
    if cached != "" {
        var user system.SysUser
        err := json.Unmarshal([]byte(cached), &user)
        return &user, err
    }
    
    // 从数据库查询并缓存
    var user system.SysUser
    err := global.GVA_DB.First(&user, userID).Error
    if err != nil {
        return nil, err
    }
    
    userJSON, _ := json.Marshal(user)
    global.GVA_REDIS.Set(context.Background(), key, userJSON, 30*time.Minute)
    
    return &user, nil
}
```

### 2. 前端性能优化

#### 组件懒加载

```javascript
// 路由懒加载
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/dashboard/index.vue')
  }
]

// 组件懒加载
export default {
  components: {
    HeavyComponent: () => import('@/components/HeavyComponent.vue')
  }
}
```

#### 虚拟滚动

```vue
<template>
  <el-table
    v-loading="loading"
    :data="visibleData"
    height="400"
    @scroll="handleScroll"
  >
    <!-- 表格列定义 -->
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      allData: [],
      visibleData: [],
      scrollTop: 0,
      itemHeight: 50,
      containerHeight: 400
    }
  },
  computed: {
    startIndex() {
      return Math.floor(this.scrollTop / this.itemHeight)
    },
    endIndex() {
      const visibleCount = Math.ceil(this.containerHeight / this.itemHeight)
      return Math.min(this.startIndex + visibleCount, this.allData.length)
    }
  },
  watch: {
    startIndex() {
      this.updateVisibleData()
    },
    endIndex() {
      this.updateVisibleData()
    }
  },
  methods: {
    updateVisibleData() {
      this.visibleData = this.allData.slice(this.startIndex, this.endIndex)
    },
    handleScroll(event) {
      this.scrollTop = event.target.scrollTop
    }
  }
}
</script>
```

## 📞 获取帮助

### 社区支持

- [GitHub Issues](https://github.com/flipped-aurora/gin-vue-admin/issues)
- [官方文档](https://www.gin-vue-admin.com/)
- [QQ群](https://qm.qq.com/cgi-bin/qm/qr?k=_GGNvjK6Ej8xJJhJhJhJhJhJhJhJhJhJ)
- [微信群](https://www.gin-vue-admin.com/coffee/)

### 提交 Bug 报告

提交 Bug 时请包含以下信息：

1. **环境信息**
   - 操作系统版本
   - Go 版本
   - Node.js 版本
   - 数据库版本

2. **错误描述**
   - 详细的错误信息
   - 复现步骤
   - 期望行为

3. **相关代码**
   - 最小复现代码
   - 配置文件
   - 日志信息

### 常用调试命令

```bash
# 查看 Go 版本
go version

# 查看 Node.js 版本
node --version
npm --version

# 查看数据库版本
mysql --version
redis-server --version

# 查看端口占用
lsof -i :8888
netstat -tulpn | grep 8888

# 查看进程
ps aux | grep gin-vue-admin

# 查看日志
tail -f log/server.log
journalctl -u gin-vue-admin -f

# Docker 相关
docker ps
docker logs container_name
docker exec -it container_name /bin/sh
```

## 📚 相关文档

- [快速开始](/guide/start-quickly/)
- [项目配置](/guide/server/config)
- [部署指南](/guide/deployment/)