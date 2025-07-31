# 🎨 前端知识库

Gin-Vue-Admin 前端基于 Vue 3 + Vite 4 + Element Plus  构建，采用现代化的前端开发技术栈，提供高效的开发体验和优秀的用户界面。

## 🚀 技术栈

### 核心框架
- **Vue 3** - 渐进式 JavaScript 框架
- **Vite 4** - 下一代前端构建工具
- **Element Plus ** - 基于 Vue 3 的组件库

### 状态管理
- **Pinia** - Vue 3 官方推荐的状态管理库
- **Vue Router 4** - Vue.js 官方路由管理器

### 开发工具
- **TypeScript** - JavaScript 的超集（可选）
- **ESLint** - 代码质量检查工具
- **Prettier** - 代码格式化工具
- **Sass/SCSS** - CSS 预处理器

### 构建优化
- **Vite Plugin** - 丰富的插件生态
- **Tree Shaking** - 自动移除未使用代码
- **Code Splitting** - 代码分割优化
- **Hot Module Replacement** - 热模块替换

## 📁 前端目录结构
```
web
 ├── babel.config.js
 ├── Dockerfile
 ├── favicon.ico
 ├── index.html                  -- 主页面
 ├── limit.js                    -- 助手代码
 ├── package.json                -- 包管理器代码
 ├── src                         -- 源代码
 │   ├── api                    -- api 组
 │   ├── App.vue                -- 主页面
 │   ├── assets                 -- 静态资源
 │   ├── components             -- 全局组件
 │   ├── core                   -- gva 组件包
 │   │   ├── config.js         -- gva网站配置文件
 │   │   ├── gin-vue-admin.js  -- 注册欢迎文件
 │   │   └── global.js         -- 统一导入文件
 │   ├── directive              -- v-auth 注册文件
 │   ├── main.js                -- 主文件
 │   ├── permission.js          -- 路由中间件
 │   ├── pinia                  -- pinia 状态管理器，取代vuex
 │   │   ├── index.js          -- 入口文件
 │   │   └── modules           -- modules
 │   │       ├── dictionary.js
 │   │       ├── router.js
 │   │       └── user.js
 │   ├── router                 -- 路由声明文件
 │   │   └── index.js
 │   ├── style                  -- 全局样式
 │   │   ├── base.scss
 │   │   ├── basics.scss
 │   │   ├── element_visiable.scss  -- 此处可以全局覆盖 element-plus 样式
 │   │   ├── iconfont.css           -- 顶部几个icon的样式文件
 │   │   ├── main.scss
 │   │   ├── mobile.scss
 │   │   └── newLogin.scss
 │   ├── utils                  -- 方法包库
 │   │   ├── asyncRouter.js    -- 动态路由相关
 │   │   ├── btnAuth.js        -- 动态权限按钮相关
 │   │   ├── bus.js            -- 全局mitt声明文件
 │   │   ├── date.js           -- 日期相关
 │   │   ├── dictionary.js     -- 获取字典方法 
 │   │   ├── downloadImg.js    -- 下载图片方法
 │   │   ├── format.js         -- 格式整理相关
 │   │   ├── image.js          -- 图片相关方法
 │   │   ├── page.js           -- 设置页面标题
 │   │   ├── request.js        -- 统一请求文件
 │   │   └── stringFun.js      -- 字符串文件
 |   ├── view                   -- 主要view代码
 |   |   ├── about              -- 关于我们
 |   |   ├── dashboard          -- 面板
 |   |   ├── error              -- 错误
 |   |   ├── example            -- 上传案例
 |   |   ├── iconList           -- icon列表
 |   |   ├── init               -- 初始化数据  
 |   |   ├── layout             -- layout约束页面 
 |   |   |   ├── aside          -- 侧边栏
 |   |   |   ├── bottomInfo     -- bottomInfo
 |   |   |   ├── screenfull     -- 全屏设置
 |   |   |   ├── setting        -- 系统设置
 |   |   |   └── index.vue      -- base 约束
 |   |   ├── login              --登录 
 |   |   ├── person             --个人中心 
 |   |   ├── superAdmin         -- 超级管理员操作
 |   |   ├── system             -- 系统检测页面
 |   |   ├── systemTools        -- 系统配置相关页面
 |   |   └── routerHolder.vue   -- page 入口页面 
 ├── vite.config.js             -- vite 配置文件
 └── yarn.lock
```

## 🛠️ 开发环境配置

### 环境要求
- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 或 **yarn** >= 1.22.0
- **Git** 版本控制工具

### 安装依赖

```bash
# 进入前端目录
cd web

# 使用 npm 安装
npm install

# 或使用 yarn 安装
yarn install
```

### 开发命令

```bash
# 启动开发服务器
npm run serve
# 或
yarn serve

# 构建生产版本
npm run build
# 或
yarn build

# 代码检查
npm run lint
# 或
yarn lint

# 代码格式化
npm run format
# 或
yarn format
```

## 🎯 核心配置文件

### Vite 配置 (vite.config.js)

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
```

### 项目配置 (src/core/config.js)

```javascript
// 系统全局配置
export const config = {
  appName: 'Gin-Vue-Admin',
  appLogo: 'logoIco.png',
  showProgressBar: true,
  progressBarColor: '#409EFF',
  showInfoTip: true,
  
  // 布局配置
  layout: {
    showTagsView: true,
    showSidebarLogo: true,
    fixedHeader: true,
    sidebarTextTheme: true,
    showGreyMode: false,
    showColorWeakness: false
  },
  
  // 主题配置
  theme: {
    primaryColor: '#409EFF',
    successColor: '#67C23A',
    warningColor: '#E6A23C',
    dangerColor: '#F56C6C',
    infoColor: '#909399'
  }
}
```

## 🏗️ 核心架构

### 1. 路由系统

#### 静态路由配置

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { asyncRouterHandle } from '@/utils/asyncRouter'

// 静态路由
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/login/index.vue')
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('@/view/layout/index.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/view/dashboard/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

#### 动态路由处理

```javascript
// src/utils/asyncRouter.js
import { asyncRoutes } from '@/router/asyncRouter'

// 动态路由处理
export function asyncRouterHandle(asyncRouter) {
  asyncRouter.forEach(item => {
    if (item.component) {
      if (item.component === 'view/routerHolder.vue') {
        item.component = () => import('@/view/routerHolder.vue')
      } else {
        const component = item.component
        item.component = () => import(`@/view/${component}`)
      }
    }
    if (item.children) {
      asyncRouterHandle(item.children)
    }
  })
  return asyncRouter
}

// 格式化路由
export function formatRouter(routes, routeMap) {
  const newRoutes = []
  routes.forEach(item => {
    if (item.path === 'dashboard') {
      item.component = () => import('@/view/dashboard/index.vue')
    } else if (item.component) {
      item.component = routeMap[item.component] || (() => import(`@/view/error/404.vue`))
    }
    if (item.children && item.children.length > 0) {
      item.children = formatRouter(item.children, routeMap)
    }
    newRoutes.push(item)
  })
  return newRoutes
}
```

### 2. 状态管理 (Pinia)

#### 用户状态管理

```javascript
// src/pinia/modules/user.js
import { defineStore } from 'pinia'
import { login, getUserInfo, logout } from '@/api/user'
import { jsonInBlacklist } from '@/api/jwt'
import router from '@/router/index'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      uuid: '',
      nickName: '',
      headerImg: '',
      authority: {},
      sideMode: 'dark',
      activeColor: '#1890ff',
      baseColor: '#fff'
    },
    token: '',
    mode: 'light'
  }),
  
  getters: {
    // 获取用户信息
    getUserInfo: (state) => state.userInfo,
    // 获取token
    getToken: (state) => state.token,
    // 获取模式
    getMode: (state) => state.mode
  },
  
  actions: {
    // 登录
    async LoginIn(loginInfo) {
      try {
        const res = await login(loginInfo)
        if (res.code === 0) {
          this.setUserInfo(res.data.user)
          this.setToken(res.data.token)
          await this.GetUserInfo()
          return true
        }
      } catch (error) {
        console.error('登录失败:', error)
        return false
      }
    },
    
    // 获取用户信息
    async GetUserInfo() {
      try {
        const res = await getUserInfo()
        if (res.code === 0) {
          this.setUserInfo(res.data.userInfo)
        }
        return res
      } catch (error) {
        console.error('获取用户信息失败:', error)
      }
    },
    
    // 登出
    async LoginOut() {
      try {
        const res = await logout()
        if (res.code === 0) {
          this.userInfo = {}
          this.token = ''
          localStorage.clear()
          router.push({ name: 'Login' })
        }
      } catch (error) {
        console.error('登出失败:', error)
      }
    },
    
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
    
    // 设置token
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    
    // 设置模式
    setMode(mode) {
      this.mode = mode
      localStorage.setItem('mode', mode)
    }
  }
})
```

#### 路由状态管理

```javascript
// src/pinia/modules/router.js
import { defineStore } from 'pinia'
import { asyncRouterHandle } from '@/utils/asyncRouter'
import { getMenu } from '@/api/menu'

export const useRouterStore = defineStore('router', {
  state: () => ({
    asyncRouters: [],
    keepAliveRouters: [],
    routerList: [],
    addRouters: [],
    routerMap: {}
  }),
  
  actions: {
    // 设置动态路由
    async SetAsyncRouter() {
      try {
        const res = await getMenu()
        if (res.code === 0) {
          const asyncRouter = res.data.menus || []
          this.asyncRouters = asyncRouterHandle(asyncRouter)
          this.routerList = res.data.menus || []
          return this.asyncRouters
        }
      } catch (error) {
        console.error('获取菜单失败:', error)
      }
    },
    
    // 设置keep-alive路由
    setKeepAliveRouters(history) {
      this.keepAliveRouters = history
    }
  }
})
```

### 3. HTTP 请求封装

```javascript
// src/utils/request.js
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/pinia/modules/user'
import router from '@/router/index'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 99999
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    
    // 添加token
    if (userStore.token) {
      config.headers['x-token'] = userStore.token
    }
    
    // 添加请求时间戳
    config.headers['x-timestamp'] = Date.now()
    
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    
    // 处理文件下载
    if (response.headers['content-type'] === 'application/octet-stream') {
      return response
    }
    
    // 业务错误处理
    if (res.code !== 0) {
      ElMessage({
        message: res.msg || '请求失败',
        type: 'error',
        duration: 5 * 1000
      })
      
      // token过期处理
      if (res.code === 1004 || res.code === 1005) {
        const userStore = useUserStore()
        userStore.LoginOut()
        return Promise.reject(new Error(res.msg || '登录过期'))
      }
      
      return Promise.reject(new Error(res.msg || '请求失败'))
    }
    
    return res
  },
  error => {
    console.error('响应错误:', error)
    
    let message = '网络错误'
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = '未授权，请重新登录'
          break
        case 403:
          message = '权限不足'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = `连接错误${error.response.status}`
      }
    }
    
    ElMessage({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    
    return Promise.reject(error)
  }
)

export default service
```

## 🎨 组件开发

### 全局组件注册

```javascript
// src/core/global.js
import GvaIcon from '@/components/gva-icon/index.vue'
import GvaTable from '@/components/gva-table/index.vue'
import GvaForm from '@/components/gva-form/index.vue'
import GvaUpload from '@/components/gva-upload/index.vue'

// 全局组件列表
const components = {
  GvaIcon,
  GvaTable,
  GvaForm,
  GvaUpload
}

// 注册全局组件
export function setupGlobalComponents(app) {
  Object.keys(components).forEach(key => {
    app.component(key, components[key])
  })
}
```

### 自定义组件示例

```vue
<!-- src/components/gva-table/index.vue -->
<template>
  <div class="gva-table">
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :header-row-class-name="headerRowClassName"
      :header-row-style="headerRowStyle"
      :header-cell-class-name="headerCellClassName"
      :header-cell-style="headerCellStyle"
      :row-key="rowKey"
      :empty-text="emptyText"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :span-method="spanMethod"
      :select-on-indeterminate="selectOnIndeterminate"
      :indent="indent"
      :lazy="lazy"
      :load="load"
      :tree-props="treeProps"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
      @cell-click="handleCellClick"
      @cell-dblclick="handleCellDblclick"
      @row-click="handleRowClick"
      @row-contextmenu="handleRowContextmenu"
      @row-dblclick="handleRowDblclick"
      @header-click="handleHeaderClick"
      @header-contextmenu="handleHeaderContextmenu"
      @sort-change="handleSortChange"
      @filter-change="handleFilterChange"
      @current-change="handleCurrentChange"
      @header-dragend="handleHeaderDragend"
      @expand-change="handleExpandChange"
    >
      <slot />
    </el-table>
    
    <!-- 分页组件 -->
    <div v-if="showPagination" class="gva-pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :small="small"
        :disabled="disabled"
        :background="background"
        :layout="layout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props定义
const props = defineProps({
  // 表格数据
  tableData: {
    type: Array,
    default: () => []
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  },
  // 是否显示分页
  showPagination: {
    type: Boolean,
    default: true
  },
  // 分页配置
  total: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  // 表格配置
  height: [String, Number],
  maxHeight: [String, Number],
  stripe: Boolean,
  border: Boolean,
  size: String,
  fit: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  rowClassName: [String, Function],
  rowStyle: [Object, Function],
  cellClassName: [String, Function],
  cellStyle: [Object, Function],
  headerRowClassName: [String, Function],
  headerRowStyle: [Object, Function],
  headerCellClassName: [String, Function],
  headerCellStyle: [Object, Function],
  rowKey: [String, Function],
  emptyText: String,
  defaultExpandAll: Boolean,
  expandRowKeys: Array,
  defaultSort: Object,
  tooltipEffect: String,
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  spanMethod: Function,
  selectOnIndeterminate: {
    type: Boolean,
    default: true
  },
  indent: {
    type: Number,
    default: 16
  },
  lazy: Boolean,
  load: Function,
  treeProps: {
    type: Object,
    default: () => ({
      hasChildren: 'hasChildren',
      children: 'children'
    })
  },
  small: Boolean,
  disabled: Boolean,
  background: {
    type: Boolean,
    default: true
  }
})

// Emits定义
const emit = defineEmits([
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'current-change',
  'header-dragend',
  'expand-change',
  'size-change',
  'page-change'
])

// 表格引用
const tableRef = ref()

// 事件处理
const handleSelect = (selection, row) => emit('select', selection, row)
const handleSelectAll = (selection) => emit('select-all', selection)
const handleSelectionChange = (selection) => emit('selection-change', selection)
const handleCellMouseEnter = (row, column, cell, event) => emit('cell-mouse-enter', row, column, cell, event)
const handleCellMouseLeave = (row, column, cell, event) => emit('cell-mouse-leave', row, column, cell, event)
const handleCellClick = (row, column, cell, event) => emit('cell-click', row, column, cell, event)
const handleCellDblclick = (row, column, cell, event) => emit('cell-dblclick', row, column, cell, event)
const handleRowClick = (row, column, event) => emit('row-click', row, column, event)
const handleRowContextmenu = (row, column, event) => emit('row-contextmenu', row, column, event)
const handleRowDblclick = (row, column, event) => emit('row-dblclick', row, column, event)
const handleHeaderClick = (column, event) => emit('header-click', column, event)
const handleHeaderContextmenu = (column, event) => emit('header-contextmenu', column, event)
const handleSortChange = (data) => emit('sort-change', data)
const handleFilterChange = (filters) => emit('filter-change', filters)
const handleCurrentChange = (currentRow, oldCurrentRow) => emit('current-change', currentRow, oldCurrentRow)
const handleHeaderDragend = (newWidth, oldWidth, column, event) => emit('header-dragend', newWidth, oldWidth, column, event)
const handleExpandChange = (row, expandedRows) => emit('expand-change', row, expandedRows)

// 分页事件处理
const handleSizeChange = (size) => emit('size-change', size)
const handlePageChange = (page) => emit('page-change', page)

// 暴露表格方法
defineExpose({
  tableRef,
  clearSelection: () => tableRef.value?.clearSelection(),
  toggleRowSelection: (row, selected) => tableRef.value?.toggleRowSelection(row, selected),
  toggleAllSelection: () => tableRef.value?.toggleAllSelection(),
  toggleRowExpansion: (row, expanded) => tableRef.value?.toggleRowExpansion(row, expanded),
  setCurrentRow: (row) => tableRef.value?.setCurrentRow(row),
  clearSort: () => tableRef.value?.clearSort(),
  clearFilter: (columnKeys) => tableRef.value?.clearFilter(columnKeys),
  doLayout: () => tableRef.value?.doLayout(),
  sort: (prop, order) => tableRef.value?.sort(prop, order)
})
</script>

<style lang="scss" scoped>
.gva-table {
  .gva-pagination {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
```

## 🔐 权限控制

### 权限指令

```javascript
// src/directive/auth.js
import { useUserStore } from '@/pinia/modules/user'

// 权限检查函数
function checkPermission(el, binding) {
  const { value } = binding
  const userStore = useUserStore()
  const roles = userStore.userInfo.authority?.defaultRouter || []
  
  if (value && value instanceof Array && value.length > 0) {
    const permissionRoles = value
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('权限指令需要传入数组参数')
  }
}

// 权限指令
export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  updated(el, binding) {
    checkPermission(el, binding)
  }
}
```

### 按钮权限控制

```javascript
// src/utils/btnAuth.js
import { useUserStore } from '@/pinia/modules/user'

// 检查按钮权限
export function checkBtnPermission(btnName) {
  const userStore = useUserStore()
  const btnAuth = userStore.userInfo.authority?.btns || []
  return btnAuth.includes(btnName)
}

// 权限按钮组件
export function useBtnAuth() {
  const userStore = useUserStore()
  
  const hasAuth = (btnName) => {
    const btnAuth = userStore.userInfo.authority?.btns || []
    return btnAuth.includes(btnName)
  }
  
  return {
    hasAuth
  }
}
```

## 🎨 主题定制

### Element Plus 主题定制

```scss
// src/style/element_variables.scss
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      'base': #409eff,
    ),
    'success': (
      'base': #67c23a,
    ),
    'warning': (
      'base': #e6a23c,
    ),
    'danger': (
      'base': #f56c6c,
    ),
    'error': (
      'base': #f56c6c,
    ),
    'info': (
      'base': #909399,
    ),
  )
);

// 自定义组件样式
.el-button {
  border-radius: 4px;
  
  &.is-round {
    border-radius: 20px;
  }
}

.el-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-table {
  .el-table__header {
    th {
      background-color: #fafafa;
      color: #606266;
      font-weight: 500;
    }
  }
}
```

### 暗色主题支持

```scss
// src/style/dark.scss
[data-theme='dark'] {
  --el-bg-color: #141414;
  --el-bg-color-page: #0a0a0a;
  --el-bg-color-overlay: #1d1e1f;
  --el-text-color-primary: #e5eaf3;
  --el-text-color-regular: #cfd3dc;
  --el-text-color-secondary: #a3a6ad;
  --el-text-color-placeholder: #8d9095;
  --el-text-color-disabled: #6c6e72;
  --el-border-color: #4c4d4f;
  --el-border-color-light: #414243;
  --el-border-color-lighter: #363637;
  --el-border-color-extra-light: #2b2b2c;
  --el-border-color-dark: #58585b;
  --el-border-color-darker: #636466;
  --el-fill-color: #303133;
  --el-fill-color-light: #262727;
  --el-fill-color-lighter: #1d1d1d;
  --el-fill-color-extra-light: #191919;
  --el-fill-color-dark: #39393a;
  --el-fill-color-darker: #424243;
  --el-fill-color-blank: transparent;
  
  // 自定义组件暗色样式
  .layout-container {
    background-color: var(--el-bg-color-page);
  }
  
  .gva-card {
    background-color: var(--el-bg-color);
    border-color: var(--el-border-color);
  }
}
```

## 📱 响应式设计

### 移动端适配

```scss
// src/style/mobile.scss
@media screen and (max-width: 768px) {
  .layout-container {
    .aside {
      position: fixed;
      top: 0;
      left: -210px;
      z-index: 1001;
      transition: left 0.3s;
      
      &.mobile-show {
        left: 0;
      }
    }
    
    .main-container {
      margin-left: 0;
      
      .navbar {
        .hamburger-container {
          display: block;
        }
      }
    }
  }
  
  .gva-table {
    .el-table {
      font-size: 12px;
    }
    
    .gva-pagination {
      .el-pagination {
        justify-content: center;
        
        .el-pagination__sizes,
        .el-pagination__jump {
          display: none;
        }
      }
    }
  }
  
  .gva-form {
    .el-form-item {
      margin-bottom: 15px;
      
      .el-form-item__label {
        line-height: 20px;
        margin-bottom: 5px;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .gva-search-box {
    .el-form {
      .el-form-item {
        width: 100%;
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }
  
  .gva-btn-list {
    .el-button {
      margin-bottom: 10px;
      width: 100%;
    }
  }
}
```

## 🚀 性能优化

### 路由懒加载

```javascript
// 路由懒加载配置
const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/view/dashboard/index.vue')
  },
  {
    path: '/system',
    name: 'System',
    component: () => import(/* webpackChunkName: "system" */ '@/view/system/index.vue'),
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "system-user" */ '@/view/system/user/index.vue')
      }
    ]
  }
]
```

### 组件懒加载

```vue
<template>
  <div>
    <!-- 使用 Suspense 包装异步组件 -->
    <Suspense>
      <template #default>
        <AsyncComponent />
      </template>
      <template #fallback>
        <div class="loading">加载中...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

// 异步组件
const AsyncComponent = defineAsyncComponent({
  loader: () => import('@/components/heavy-component.vue'),
  loadingComponent: () => import('@/components/loading.vue'),
  errorComponent: () => import('@/components/error.vue'),
  delay: 200,
  timeout: 3000
})
</script>
```

### 图片懒加载

```vue
<template>
  <div class="image-container">
    <img
      v-lazy="imageSrc"
      :alt="imageAlt"
      class="lazy-image"
      @load="handleImageLoad"
      @error="handleImageError"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: ''
  }
})

const imageLoaded = ref(false)
const imageError = ref(false)

const handleImageLoad = () => {
  imageLoaded.value = true
}

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.image-container {
  position: relative;
  overflow: hidden;
}

.lazy-image {
  width: 100%;
  height: auto;
  transition: opacity 0.3s;
}

.lazy-image[lazy=loading] {
  opacity: 0.3;
}

.lazy-image[lazy=loaded] {
  opacity: 1;
}

.lazy-image[lazy=error] {
  opacity: 0.3;
}
</style>
```

## 🧪 测试

### 单元测试配置

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
```

### 组件测试示例

```javascript
// tests/components/GvaTable.test.js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import GvaTable from '@/components/gva-table/index.vue'
import { ElTable, ElPagination } from 'element-plus'

describe('GvaTable', () => {
  it('renders table with data', () => {
    const tableData = [
      { id: 1, name: '张三', age: 25 },
      { id: 2, name: '李四', age: 30 }
    ]
    
    const wrapper = mount(GvaTable, {
      props: {
        tableData,
        total: 2,
        currentPage: 1,
        pageSize: 10
      },
      global: {
        components: {
          ElTable,
          ElPagination
        }
      }
    })
    
    expect(wrapper.find('.gva-table').exists()).toBe(true)
    expect(wrapper.find('.gva-pagination').exists()).toBe(true)
  })
  
  it('emits page-change event when page changes', async () => {
    const wrapper = mount(GvaTable, {
      props: {
        tableData: [],
        total: 100,
        currentPage: 1,
        pageSize: 10
      }
    })
    
    await wrapper.vm.handlePageChange(2)
    
    expect(wrapper.emitted('page-change')).toBeTruthy()
    expect(wrapper.emitted('page-change')[0]).toEqual([2])
  })
})
```

## 📚 最佳实践

### 1. 代码规范
- 使用 ESLint + Prettier 保证代码质量
- 遵循 Vue 3 Composition API 最佳实践
- 组件命名使用 PascalCase
- 文件命名使用 kebab-case

### 2. 性能优化
- 合理使用 v-memo 和 v-once
- 避免在模板中使用复杂计算
- 使用 shallowRef 和 shallowReactive 优化响应式
- 合理拆分组件，避免组件过大

### 3. 安全防护
- 对用户输入进行验证和过滤
- 使用 v-html 时注意 XSS 防护
- 敏感信息不要存储在前端
- 使用 HTTPS 传输数据

### 4. 用户体验
- 提供加载状态提示
- 合理的错误处理和提示
- 响应式设计适配移动端
- 无障碍访问支持

## 🐛 常见问题

### Q: 如何解决路由懒加载失败？
A: 检查路径是否正确，确保组件文件存在，可以添加错误处理。

### Q: Element Plus 样式不生效？
A: 确保正确导入样式文件，检查 CSS 优先级和作用域。

### Q: Pinia 状态丢失？
A: 检查是否正确持久化状态，页面刷新时重新初始化状态。

### Q: 打包后静态资源路径错误？
A: 检查 Vite 配置中的 base 路径和 publicPath 设置。

## 📚 相关文档

- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Element Plus 文档](https://element-plus.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [Vue Router 文档](https://router.vuejs.org/)
