# 开发规范指南

本文档定义了 Gin-Vue-Admin 项目的开发规范，包括代码规范、Git 工作流、团队协作等方面的最佳实践。

## 📝 代码规范

### 1. Go 代码规范

#### 命名规范

```go
// 包名：小写，简短，有意义
package user
package system

// 常量：大写，下划线分隔
const (
    MAX_RETRY_COUNT = 3
    DEFAULT_TIMEOUT = 30
    API_VERSION     = "v1"
)

// 变量：驼峰命名
var (
    userService    *UserService
    configFilePath string
    isDebugMode    bool
)

// 函数：大写开头（公开），小写开头（私有）
func GetUserList() []User {}
func createUser() error {}

// 结构体：大写开头，驼峰命名
type UserService struct {
    db    *gorm.DB
    redis *redis.Client
}

// 接口：以 -er 结尾或描述性名称
type UserRepository interface {
    Create(user *User) error
    GetByID(id uint) (*User, error)
}

type Validator interface {
    Validate() error
}
```

#### 注释规范

```go
// Package user 提供用户管理相关功能
// 包括用户的增删改查、权限验证等操作
package user

// UserService 用户服务，负责处理用户相关的业务逻辑
type UserService struct {
    db    *gorm.DB
    redis *redis.Client
}

// NewUserService 创建用户服务实例
// 参数:
//   db: 数据库连接
//   redis: Redis连接
// 返回:
//   *UserService: 用户服务实例
func NewUserService(db *gorm.DB, redis *redis.Client) *UserService {
    return &UserService{
        db:    db,
        redis: redis,
    }
}

// GetUserByID 根据用户ID获取用户信息
// 该方法会先从缓存中查找，如果缓存中不存在则从数据库查询
// 参数:
//   id: 用户ID
// 返回:
//   *User: 用户信息，如果用户不存在则返回nil
//   error: 错误信息
func (s *UserService) GetUserByID(id uint) (*User, error) {
    // 实现逻辑...
}
```

#### 错误处理规范

```go
// 自定义错误类型
type UserError struct {
    Code    int    `json:"code"`
    Message string `json:"message"`
    Data  string `json:"data,omitempty"`
}

func (e *UserError) Error() string {
    return e.Message
}

// 错误常量定义
var (
    ErrUserNotFound     = &UserError{Code: 1001, Message: "用户不存在"}
    ErrUserExists       = &UserError{Code: 1002, Message: "用户已存在"}
    ErrInvalidPassword  = &UserError{Code: 1003, Message: "密码格式不正确"}
    ErrPermissionDenied = &UserError{Code: 1004, Message: "权限不足"}
)

// 错误处理示例
func (s *UserService) CreateUser(user *User) error {
    // 验证用户是否已存在
    exists, err := s.userExists(user.Username)
    if err != nil {
        return fmt.Errorf("检查用户是否存在失败: %w", err)
    }
    if exists {
        return ErrUserExists
    }
    
    // 验证密码强度
    if err := s.validatePassword(user.Password); err != nil {
        return fmt.Errorf("密码验证失败: %w", err)
    }
    
    // 创建用户
    if err := s.db.Create(user).Error; err != nil {
        return fmt.Errorf("创建用户失败: %w", err)
    }
    
    return nil
}
```

#### 结构体标签规范

```go
type User struct {
    ID        uint      `json:"id" gorm:"primarykey;comment:用户ID"`
    Username  string    `json:"username" gorm:"uniqueIndex;size:64;not null;comment:用户名" validate:"required,min=3,max=64"`
    Password  string    `json:"-" gorm:"size:255;not null;comment:密码" validate:"required,min=8"`
    Email     string    `json:"email" gorm:"uniqueIndex;size:128;comment:邮箱" validate:"email"`
    Phone     string    `json:"phone" gorm:"size:20;comment:手机号" validate:"phone"`
    Status    int       `json:"status" gorm:"default:1;comment:状态(1:启用 0:禁用)"`
    CreatedAt time.Time `json:"createdAt" gorm:"comment:创建时间"`
    UpdatedAt time.Time `json:"updatedAt" gorm:"comment:更新时间"`
    DeletedAt gorm.DeletedAt `json:"-" gorm:"index;comment:删除时间"`
}

// TableName 指定表名
func (User) TableName() string {
    return "sys_users"
}
```

### 2. JavaScript/Vue 代码规范

#### 命名规范

```javascript
// 常量：大写，下划线分隔
const API_BASE_URL = 'http://localhost:8888'
const MAX_FILE_SIZE = 10 * 1024 * 1024

// 变量：驼峰命名
const userName = 'admin'
const isLoggedIn = true
const userList = []

// 函数：驼峰命名，动词开头
function getUserList() {}
function createUser() {}
function validateForm() {}
function handleSubmit() {}

// 类：大写开头，驼峰命名
class UserService {
  constructor() {}
  
  async getUsers() {}
  async createUser(userData) {}
}

// 组件：大写开头，驼峰命名
const UserList = {
  name: 'UserList',
  // ...
}
```

#### Vue 组件规范

```vue
<template>
  <!-- 使用语义化的HTML标签 -->
  <div class="user-list-container">
    <!-- 条件渲染使用 v-if/v-show -->
    <div v-if="loading" class="loading-wrapper">
      <el-loading />
    </div>
    
    <!-- 列表渲染使用 v-for，必须添加 key -->
    <div
      v-for="user in userList"
      :key="user.id"
      class="user-item"
      @click="handleUserClick(user)"
    >
      {{ user.username }}
    </div>
    
    <!-- 事件处理使用方法名，不使用内联表达式 -->
    <el-button @click="handleAddUser">添加用户</el-button>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getUserList, createUser } from '@/api/user'

export default {
  name: 'UserList',
  
  // Props 定义要详细
  props: {
    departmentId: {
      type: [String, Number],
      required: true,
      validator: (value) => value > 0
    },
    showActions: {
      type: Boolean,
      default: true
    }
  },
  
  // Emits 声明
  emits: ['user-selected', 'user-created'],
  
  setup(props, { emit }) {
    // 响应式数据
    const loading = ref(false)
    const userList = ref([])
    const searchForm = reactive({
      keyword: '',
      status: 1
    })
    
    // 计算属性
    const filteredUsers = computed(() => {
      return userList.value.filter(user => 
        user.username.includes(searchForm.keyword)
      )
    })
    
    // 方法
    const fetchUserList = async () => {
      try {
        loading.value = true
        const { data } = await getUserList({
          departmentId: props.departmentId,
          ...searchForm
        })
        userList.value = data.list
      } catch (error) {
        ElMessage.error('获取用户列表失败')
        console.error('获取用户列表失败:', error)
      } finally {
        loading.value = false
      }
    }
    
    const handleUserClick = (user) => {
      emit('user-selected', user)
    }
    
    const handleAddUser = () => {
      // 处理添加用户逻辑
    }
    
    // 生命周期
    onMounted(() => {
      fetchUserList()
    })
    
    return {
      loading,
      userList,
      searchForm,
      filteredUsers,
      fetchUserList,
      handleUserClick,
      handleAddUser
    }
  }
}
</script>

<style lang="scss" scoped>
// 使用 BEM 命名规范
.user-list-container {
  padding: 20px;
  
  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  
  .user-item {
    padding: 10px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      background-color: #f5f7fa;
      border-color: #409eff;
    }
    
    &--active {
      background-color: #ecf5ff;
      border-color: #409eff;
    }
  }
}
</style>
```

#### API 调用规范

```javascript
// api/user.js
import request from '@/utils/request'

// API 函数命名：动词 + 资源名
export function getUserList(params) {
  return request({
    url: '/user/getUserList',
    method: 'post',
    data: params
  })
}

export function createUser(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function updateUser(id, data) {
  return request({
    url: `/user/setUserInfo`,
    method: 'put',
    data: { ...data, ID: id }
  })
}

export function deleteUser(id) {
  return request({
    url: '/user/deleteUser',
    method: 'delete',
    data: { ID: id }
  })
}

// 在组件中使用
import { getUserList, createUser } from '@/api/user'

export default {
  setup() {
    const fetchUsers = async () => {
      try {
        const response = await getUserList({ page: 1, pageSize: 10 })
        if (response.code === 0) {
          userList.value = response.data.list
        } else {
          ElMessage.error(response.msg || '获取用户列表失败')
        }
      } catch (error) {
        ElMessage.error('网络错误，请稍后重试')
        console.error('API调用失败:', error)
      }
    }
    
    return { fetchUsers }
  }
}
```

## 🔄 Git 工作流

### 1. 分支管理

```bash
# 主要分支
main/master    # 主分支，用于生产环境
develop        # 开发分支，用于集成开发

# 功能分支
feature/user-management     # 功能开发分支
feature/api-optimization    # 功能开发分支

# 修复分支
hotfix/login-bug           # 紧急修复分支
bugfix/user-validation     # 普通修复分支

# 发布分支
release/v1.2.0             # 发布准备分支
```

### 2. 提交规范

#### 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### 类型说明

```bash
# 功能相关
feat:     新功能
fix:      修复bug
perf:     性能优化

# 代码相关
refactor: 重构代码
style:    代码格式调整

# 文档和测试
docs:     文档更新
test:     测试相关

# 构建和配置
build:    构建系统或依赖更新
ci:       CI配置更新
chore:    其他杂项

# 版本相关
revert:   回滚提交
```

#### 提交示例

```bash
# 新功能
git commit -m "feat(user): 添加用户批量导入功能

- 支持Excel文件导入
- 添加数据验证
- 支持导入进度显示

Closes #123"

# 修复bug
git commit -m "fix(auth): 修复JWT token过期时间计算错误

修复了token过期时间计算不准确的问题，
现在使用UTC时间进行计算。

Fixes #456"

# 重构
git commit -m "refactor(api): 重构用户API响应结构

BREAKING CHANGE: 用户API响应格式发生变化
- 将user_info改为userInfo
- 添加了权限信息字段"
```

### 3. 分支操作流程

#### 功能开发流程

```bash
# 1. 从develop分支创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/user-management

# 2. 开发功能
# ... 编写代码 ...

# 3. 提交代码
git add .
git commit -m "feat(user): 添加用户管理功能"

# 4. 推送到远程
git push origin feature/user-management

# 5. 创建Pull Request
# 在GitHub/GitLab上创建PR，请求合并到develop分支

# 6. 代码审查通过后合并
# 删除功能分支
git checkout develop
git pull origin develop
git branch -d feature/user-management
git push origin --delete feature/user-management
```

#### 紧急修复流程

```bash
# 1. 从main分支创建hotfix分支
git checkout main
git pull origin main
git checkout -b hotfix/login-bug

# 2. 修复问题
# ... 修复代码 ...

# 3. 提交修复
git add .
git commit -m "fix(auth): 修复登录验证失败问题"

# 4. 合并到main和develop
git checkout main
git merge hotfix/login-bug
git push origin main

git checkout develop
git merge hotfix/login-bug
git push origin develop

# 5. 删除hotfix分支
git branch -d hotfix/login-bug
git push origin --delete hotfix/login-bug

# 6. 创建版本标签
git tag -a v1.1.1 -m "修复登录验证问题"
git push origin v1.1.1
```

## 👥 团队协作

### 1. 代码审查

#### Pull Request 模板

```markdown
## 变更描述

简要描述本次变更的内容和目的。

## 变更类型

- [ ] 新功能
- [ ] Bug修复
- [ ] 性能优化
- [ ] 重构
- [ ] 文档更新
- [ ] 测试相关

## 测试

- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 手动测试通过
- [ ] 性能测试通过（如适用）

## 检查清单

- [ ] 代码符合项目规范
- [ ] 添加了必要的注释
- [ ] 更新了相关文档
- [ ] 没有引入新的安全风险
- [ ] 向后兼容（或已标记为破坏性变更）

## 相关Issue

Closes #123
Related to #456

## 截图（如适用）

<!-- 添加截图或GIF来展示变更效果 -->

## 额外说明

<!-- 任何需要审查者注意的特殊说明 -->
```

#### 代码审查要点

```markdown
### 功能性审查
- [ ] 功能是否按需求实现
- [ ] 边界条件是否处理
- [ ] 错误处理是否完善
- [ ] 性能是否可接受

### 代码质量审查
- [ ] 代码结构是否清晰
- [ ] 命名是否规范
- [ ] 注释是否充分
- [ ] 是否有代码重复

### 安全性审查
- [ ] 输入验证是否充分
- [ ] 权限控制是否正确
- [ ] 敏感信息是否保护
- [ ] SQL注入等安全问题

### 测试审查
- [ ] 测试覆盖率是否足够
- [ ] 测试用例是否合理
- [ ] 集成测试是否通过
```

### 2. 项目管理

#### Issue 模板

```markdown
## Bug报告

### 环境信息
- 操作系统：
- 浏览器：
- 项目版本：

### 问题描述

简要描述遇到的问题。

### 复现步骤

1. 打开页面
2. 点击按钮
3. 查看结果

### 期望行为

描述期望的正确行为。

### 实际行为

描述实际发生的行为。

### 截图

如果适用，添加截图来帮助解释问题。

### 额外信息

添加任何其他有助于解决问题的信息。
```

```markdown
## 功能需求

### 需求描述

详细描述新功能的需求。

### 用户故事

作为 [用户角色]，我希望 [功能描述]，以便 [价值/目的]。

### 验收标准

- [ ] 标准1
- [ ] 标准2
- [ ] 标准3

### 设计稿

<!-- 如果有设计稿，请添加链接或图片 -->

### 技术要求

- 前端技术栈：
- 后端技术栈：
- 数据库变更：

### 优先级

- [ ] 高
- [ ] 中
- [ ] 低
```

### 3. 文档规范

#### README 模板

```markdown
# 项目名称

简要描述项目的目的和功能。

## 功能特性

- 功能1
- 功能2
- 功能3

## 技术栈

### 后端
- Go 1.19+
- Gin
- GORM
- Redis
- MySQL

### 前端
- Vue 3
- Element Plus
- Vite
- Pinia

## 快速开始

### 环境要求

- Go 1.19+
- Node.js 20.19+ 或 22.12+
- MySQL 8.0+
- Redis 6.0+

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/your-org/project-name.git
cd project-name
```

2. 后端设置
```bash
cd server
go mod download
cp config.yaml.example config.yaml
# 修改配置文件
go run main.go
```

3. 前端设置
```bash
cd web
npm install
npm run dev
```

## 部署

### Docker 部署

```bash
docker-compose up -d
```

### 手动部署

详细的部署步骤...

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

## 许可证

本项目采用 [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) 开源许可证
```

#### API 文档规范

```markdown
# API 文档

## 基础信息

- 基础URL: `http://localhost:8888`
- 版本: v1
- 认证方式: JWT Token

## 通用响应格式

```json
{
  "code": 0,
  "data": {},
  "msg": "success"
}
```

## 用户管理

### 获取用户列表

**请求**

```http
POST /user/getUserList
Content-Type: application/json
Authorization: Bearer <token>

{
  "page": 1,
  "pageSize": 10,
  "keyword": ""
}
```

**响应**

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "username": "admin",
        "email": "admin@example.com",
        "createdAt": "2023-01-01T00:00:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 10
  },
  "msg": "success"
}
```

**错误响应**

| 错误码 | 说明 |
|--------|------|
| 1001   | 用户不存在 |
| 1002   | 权限不足 |
| 1003   | 参数错误 |
```

## 🔧 开发工具配置

### 1. VS Code 配置

#### settings.json

```json
{
  "go.formatTool": "goimports",
  "go.lintTool": "golangci-lint",
  "go.testFlags": ["-v"],
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue"
  ],
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.css": "prettier"
}
```

#### 推荐扩展

```json
{
  "recommendations": [
    "golang.go",
    "vue.volar",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json",
    "redhat.vscode-yaml"
  ]
}
```

### 2. Git Hooks

#### pre-commit

```bash
#!/bin/sh
# .git/hooks/pre-commit

echo "Running pre-commit checks..."

# 检查Go代码格式
if ! gofmt -l . | grep -q '^$'; then
    echo "Go code is not formatted. Please run 'gofmt -w .'"
    exit 1
fi

# 运行Go测试
if ! go test ./...; then
    echo "Go tests failed"
    exit 1
fi

# 检查前端代码格式
cd web
if ! npm run lint; then
    echo "Frontend linting failed"
    exit 1
fi

echo "Pre-commit checks passed!"
```

#### commit-msg

```bash
#!/bin/sh
# .git/hooks/commit-msg

commit_regex='^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "Invalid commit message format!"
    echo "Format: <type>(<scope>): <subject>"
    echo "Example: feat(user): add user registration"
    exit 1
fi
```

### 3. 代码质量工具

#### .golangci.yml

```yaml
linters-settings:
  govet:
    check-shadowing: true
  golint:
    min-confidence: 0
  gocyclo:
    min-complexity: 15
  maligned:
    suggest-new: true
  dupl:
    threshold: 100
  goconst:
    min-len: 2
    min-occurrences: 2
  misspell:
    locale: US
  lll:
    line-length: 140
  goimports:
    local-prefixes: github.com/flipped-aurora/gin-vue-admin

linters:
  enable:
    - bodyclose
    - deadcode
    - depguard
    - dogsled
    - dupl
    - errcheck
    - gochecknoinits
    - goconst
    - gocyclo
    - gofmt
    - goimports
    - golint
    - gosec
    - gosimple
    - govet
    - ineffassign
    - interfacer
    - lll
    - misspell
    - nakedret
    - scopelint
    - staticcheck
    - structcheck
    - stylecheck
    - typecheck
    - unconvert
    - unparam
    - unused
    - varcheck
    - whitespace

run:
  timeout: 5m
```

#### .eslintrc.js

```javascript
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'space-before-function-paren': ['error', 'never'],
    'comma-dangle': ['error', 'never']
  }
}
```

## 📊 质量保证

### 1. 测试规范

#### 单元测试

```go
// user_service_test.go
package service

import (
    "testing"
    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/mock"
)

func TestUserService_CreateUser(t *testing.T) {
    // 准备测试数据
    user := &User{
        Username: "testuser",
        Email:    "test@example.com",
        Password: "password123",
    }
    
    // 创建mock
    mockDB := new(MockDB)
    mockDB.On("Create", mock.AnythingOfType("*User")).Return(nil)
    
    // 创建服务实例
    service := NewUserService(mockDB, nil)
    
    // 执行测试
    err := service.CreateUser(user)
    
    // 断言结果
    assert.NoError(t, err)
    mockDB.AssertExpectations(t)
}

func TestUserService_CreateUser_UserExists(t *testing.T) {
    user := &User{
        Username: "existinguser",
        Email:    "existing@example.com",
        Password: "password123",
    }
    
    mockDB := new(MockDB)
    mockDB.On("First", mock.AnythingOfType("*User"), mock.Anything).Return(nil)
    
    service := NewUserService(mockDB, nil)
    
    err := service.CreateUser(user)
    
    assert.Error(t, err)
    assert.Equal(t, ErrUserExists, err)
}
```

#### 集成测试

```go
// integration_test.go
package test

import (
    "bytes"
    "encoding/json"
    "net/http"
    "net/http/httptest"
    "testing"
    "github.com/gin-gonic/gin"
    "github.com/stretchr/testify/assert"
)

func TestUserAPI_CreateUser(t *testing.T) {
    // 设置测试环境
    gin.SetMode(gin.TestMode)
    router := setupRouter()
    
    // 准备测试数据
    userData := map[string]interface{}{
        "username": "testuser",
        "email":    "test@example.com",
        "password": "password123",
    }
    
    jsonData, _ := json.Marshal(userData)
    
    // 创建请求
    req, _ := http.NewRequest("POST", "/user/register", bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")
    
    // 执行请求
    w := httptest.NewRecorder()
    router.ServeHTTP(w, req)
    
    // 验证响应
    assert.Equal(t, http.StatusOK, w.Code)
    
    var response map[string]interface{}
    err := json.Unmarshal(w.Body.Bytes(), &response)
    assert.NoError(t, err)
    assert.Equal(t, float64(0), response["code"])
}
```

### 2. 性能测试

```go
// benchmark_test.go
package service

import (
    "testing"
)

func BenchmarkUserService_GetUserByID(b *testing.B) {
    service := setupUserService()
    
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        _, err := service.GetUserByID(1)
        if err != nil {
            b.Fatal(err)
        }
    }
}

func BenchmarkUserService_GetUserList(b *testing.B) {
    service := setupUserService()
    
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        _, _, err := service.GetUserList(PageInfo{Page: 1, PageSize: 10})
        if err != nil {
            b.Fatal(err)
        }
    }
}
```

## 📚 相关文档

- [项目介绍](/guide/introduce/project)
- [快速开始](/guide/start-quickly/initialization)
- [故障排除指南](/guide/troubleshooting/common-issues)