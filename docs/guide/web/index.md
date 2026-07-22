# 前端知识库

Gin-Vue-Admin 前端基于 Vue 3 + Vite 8 + Element Plus 构建，采用现代化的前端开发技术栈，提供高效的开发体验和优秀的用户界面。

## 技术栈

### 核心框架
- **Vue 3**（^3.5.31）- 渐进式 JavaScript 框架
- **Vite 8** - 下一代前端构建工具（@vitejs/plugin-vue ^6）
- **Element Plus**（^2.13.6）- 基于 Vue 3 的组件库

### 状态管理
- **Pinia**（^2.2.2）- Vue 3 官方推荐的状态管理库
- **Vue Router 4**（^4.4.3）- Vue.js 官方路由管理器

### 样式与图标
- **UnoCSS**（^66）- 原子化 CSS 引擎（presetWind3 + transformer-directives，项目未使用 tailwindcss，仅引入 tailwind-merge / clsx / class-variance-authority 作为类名工具库）
- **Sass/SCSS** - CSS 预处理器（modern-compiler API）
- **reka-ui**（^2.10.0）- 无样式组件库，作为自研基础组件库（core/componentLibrary）的底座
- **@iconify/vue**（^5）+ **@element-plus/icons-vue** - 在线图标与 Element Plus 图标

### 业务依赖
- **axios**（1.8.2）- HTTP 请求库
- **echarts**（5.5.1）- 图表
- **@logicflow/core** - 流程/场景编排
- **@form-create/designer**（3.x）- 表单设计器
- **@wangeditor/editor**（5.x）- 富文本编辑器
- **mitt / nprogress / universal-cookie / spark-md5** - 事件总线、进度条、Cookie、分片 hash 等工具库

### 开发工具
- **TypeScript** - JavaScript 的超集（可选，按组件开启）
- **ESLint** - 代码质量检查工具
- **vite-plugin-vue-devtools** - 开发调试与代码定位（VITE_POSITION=open 时启用）

## 前端目录结构
```
web
 ├── babel.config.cjs
 ├── Dockerfile
 ├── eslint.config.mjs
 ├── index.html                  -- 主页面（内联首屏暗色判定脚本，防止主题闪烁）
 ├── jsconfig.json
 ├── limit.js                    -- 助手代码
 ├── openDocument.js
 ├── package.json                -- 包管理器代码
 ├── uno.config.js               -- UnoCSS 配置文件
 ├── vite.config.js              -- vite 配置文件
 ├── src                         -- 源代码
 │   ├── api                     -- 接口模块
 │   ├── App.vue                 -- 主页面
 │   ├── assets                  -- 静态资源（icons 目录下的 svg 自动注册为图标）
 │   ├── components              -- 业务组件（svgIcon、iconButton、commandMenu、logo、bottomInfo 等，按需 import，不做全局注册）
 │   ├── core                    -- gva 核心包
 │   │   ├── componentLibrary    -- 基础组件库（reka-ui 底座，按 g- 前缀全局注册）
 │   │   ├── config.js           -- gva 网站配置文件
 │   │   ├── error-handel.js     -- 全局错误捕获与上报
 │   │   ├── gin-vue-admin.js    -- gva 插件入口（install）
 │   │   └── global.js           -- 统一注册文件（图标/组件/全局属性）
 │   ├── directive               -- 自定义指令（auth.js 提供 v-auth、clickOutSide.js）
 │   ├── hooks                   -- 组合式函数（responsive.js 响应式断点、useLayoutMode.js 等）
 │   ├── main.js                 -- 主文件
 │   ├── permission.js           -- 路由中间件
 │   ├── pinia                   -- pinia 状态管理器
 │   │   ├── index.js            -- 入口文件
 │   │   └── modules             -- app、user、router、dictionary、params、theme
 │   ├── plugin                  -- 业务插件（ai、auto、email、announcement）
 │   ├── router                  -- 路由声明文件
 │   │   └── index.js
 │   ├── style                   -- 全局样式
 │   │   ├── element_visiable.scss  -- 此处可以全局覆盖 element-plus 样式
 │   │   ├── iconfont.css           -- iconfont 样式文件
 │   │   ├── main.scss
 │   │   ├── reset.scss
 │   │   ├── theme.scss             -- 主题扩展样式（菜单风格/卡片模式/圆角）
 │   │   └── transition.scss        -- 页面切换动画
 │   ├── theme                   -- 主题引擎
 │   │   ├── adapters            -- 运行时适配器（runtime/element-plus/chrome/structure/uno）
 │   │   ├── preset              -- 内置主题预设（*.json）
 │   │   ├── settings.js         -- 主题配置项与默认值
 │   │   ├── token.js            -- 由配置派生主题 token
 │   │   └── vars.js / color.js / shared.js / version.js / index.js
 │   ├── utils                   -- 方法包库
 │   │   ├── asyncRouter.js      -- 动态路由相关
 │   │   ├── btnAuth.js          -- 动态权限按钮相关
 │   │   ├── bus.js              -- 全局 mitt 声明文件
 │   │   ├── dictionary.js       -- 获取字典方法
 │   │   ├── image.js            -- 图片相关方法
 │   │   ├── request.js          -- 统一请求文件
 │   │   └── ...
 │   └── view                    -- 主要 view 代码
 │       ├── about               -- 关于我们
 │       ├── dashboard           -- 面板
 │       ├── error               -- 错误页
 │       ├── example             -- 示例
 │       ├── init                -- 初始化数据
 │       ├── layout              -- layout 约束页面
 │       ├── login               -- 登录
 │       ├── media               -- 媒体相关（扫码上传等）
 │       ├── person              -- 个人中心
 │       ├── superAdmin          -- 超级管理员操作
 │       ├── system              -- 系统检测页面
 │       ├── systemTools         -- 系统配置相关页面
 │       └── routerHolder.vue    -- page 入口页面
```

::: tip
静态路由只有 `/init`、`/login`、`/scanUpload`、`/forceChangePassword` 和 404 兜底（catchAll），其余页面全部由后端下发的动态菜单驱动生成路由。
:::

## 开发环境配置

### 环境要求
- **Node.js** >= 20.19 或 >= 22.12
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
# 启动开发服务器（dev 与 serve 等价）
npm run dev
# 或
npm run serve

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 代码检查并自动修复
npm run lint:fix
```

## 核心配置文件

### Vite 配置 (vite.config.js)

3.0 的 Vite 配置要点：路径别名 `@` 指向 `src`；scss 使用 `modern-compiler` API；开发服务器端口与代理目标全部来自环境变量；除业务接口代理外，还内置了指向插件市场的 `/plugin` 固定代理；本地 svg 图标由 `vite-auto-import-svg` 构建为 sprite。

```javascript
import { svgBuilder } from 'vite-auto-import-svg'
import UnoCSS from '@unocss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const config = {
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
        vue$: 'vue/dist/vue.runtime.esm-bundler.js'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    server: {
      open: true,
      port: Number(env.VITE_CLI_PORT),
      proxy: {
        // 业务接口代理，例如 '/api' -> 'http://127.0.0.1:8888/'
        [env.VITE_BASE_API]: {
          target: `${env.VITE_BASE_PATH}:${env.VITE_SERVER_PORT}/`,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp('^' + env.VITE_BASE_API), '')
        },
        // 固定代理：插件市场
        '/plugin': {
          target: `https://plugin.gin-vue-admin.com/api/`,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp('^/plugin'), '')
        }
      }
    },
    plugins: [
      env.VITE_POSITION === 'open' &&
        vueDevTools({ launchEditor: env.VITE_EDITOR }),
      vuePlugin(),
      // 扫描 src/assets/icons 与 src/plugin 下的 svg，构建本地图标 sprite
      svgBuilder(['./src/plugin/', './src/assets/icons/'], base, outDir, 'assets', mode),
      UnoCSS()
      // ...
    ]
  }
  return config
}
```

### 项目配置 (src/core/config.js)

`core/config.js` 导出全局配置对象 `config`，以及开发启动时在终端打印横幅的 `viteLogo(env)`：

```javascript
export const config = {
  appName: 'Gin-Vue-Admin',   // 系统名称
  showViteLogo: true,         // 启动时是否在终端打印欢迎横幅
  keepAliveTabs: false,       // 标签页是否全部 keep-alive
  logs: []                    // 本地图标清单（注册时自动收集）
}
```

### 核心包 (src/core)

- `core/gin-vue-admin.js`：导出 `{ install }` 插件，`main.js` 中通过 `app.use()` 触发 `global.js` 的 `register(app)`。
- `core/global.js`：统一注册入口——注册全部 element-plus 图标与 `SvgIcon` 组件；通过 `import.meta.glob` 扫描 `src/assets/icons` 与 `src/plugin/**/assets/icons` 下的 svg 并注册为全局组件（插件图标带 `插件名-` 前缀）；把 `core/componentLibrary` 的基础组件按 kebab-case 注册为 `g-` 前缀全局组件；挂载全局属性 `$GIN_VUE_ADMIN = config`。
- `core/error-handel.js`：全局错误捕获（如 `unhandledrejection`），并经 `/sysError` 接口上报到后端。

## 核心架构

### 1. 路由系统

#### 静态路由配置

3.0 使用 hash 模式（`createWebHashHistory`），静态路由只保留初始化、登录等基础页面：

```javascript
// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/init',
    name: 'Init',
    component: () => import('@/view/init/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/login/index.vue')
  },
  {
    path: '/scanUpload',
    name: 'ScanUpload',
    meta: { title: '扫码上传', client: true },
    component: () => import('@/view/media/scanUpload.vue')
  },
  {
    path: '/forceChangePassword',
    name: 'ForceChangePassword',
    component: () => import('@/view/system/security/forceChangePassword.vue'),
    meta: { title: '修改密码' }
  },
  {
    path: '/:catchAll(.*)',
    meta: { closeTab: true },
    component: () => import('@/view/error/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```

#### 动态路由处理

业务页面路由由后端菜单接口下发，`asyncRouterHandle` 把菜单中的组件路径字符串映射为 `import.meta.glob` 收集到的真实组件；找不到组件时返回占位组件，避免路由白屏：

```javascript
// src/utils/asyncRouter.js
const viewModules = import.meta.glob('../view/**/*.vue')
const pluginModules = import.meta.glob('../plugin/**/*.vue')

export const asyncRouterHandle = (asyncRouter) => {
  asyncRouter.forEach((item) => {
    if (item.component && typeof item.component === 'string') {
      item.meta.path = '/src/' + item.component
      if (item.component.split('/')[0] === 'view') {
        item.component = dynamicImport(viewModules, item.component)
      } else if (item.component.split('/')[0] === 'plugin') {
        item.component = dynamicImport(pluginModules, item.component)
      }
    }
    if (item.children) {
      asyncRouterHandle(item.children)
    }
  })
}

function dynamicImport(dynamicViewsModules, component) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => key.replace('../', '') === component)
  const matched = dynamicViewsModules[matchKeys[0]]
  if (!matched) {
    console.warn(`[asyncRouter] 未找到组件: ${component}，已使用占位组件代替`)
    return { name: 'MissingComponentPlaceholder', render: () => null }
  }
  return matched
}
```

### 2. 状态管理 (Pinia)

3.0 的 store 位于 `src/pinia/modules`，包含 `app`（应用/设备与布局状态）、`user`（用户与 token）、`router`（动态路由与 keep-alive）、`dictionary`（字典缓存）、`params`（通用参数）、`theme`（主题设置）六个模块，全部采用 setup 语法编写。

#### 用户状态管理

```javascript
// src/pinia/modules/user.js（节选）
export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    uuid: '',
    nickName: '',
    headerImg: '',
    authority: {}
  })
  // token 持久化到 localStorage，并兼容 x-token cookie
  const token = useStorage('token', '')
  const xToken = useCookies()
  const currentToken = computed(() => token.value || xToken.get('x-token') || '')

  const setUserInfo = (val) => {
    userInfo.value = val
    if (val.originSetting) {
      // 后端返回的用户主题设置，交给 themeStore 解析并落地
      themeStore.applyRemoteSettings(val.originSetting)
    }
  }

  /* 登录*/
  const LoginIn = async (loginInfo) => {
    const res = await login(loginInfo)
    if (res.code !== 0) {
      return false
    }
    setUserInfo(res.data.user)
    setToken(res.data.token)
    // 密码过期时强制跳转改密页
    if (res.data.needChangePassword) {
      await router.push({ name: 'ForceChangePassword' })
      return true
    }
    // ...
  }
  // ...
})
```

#### 路由状态管理

`router` store 负责拉取后端菜单并生成动态路由，同时维护 keep-alive 清单：

```javascript
// src/pinia/modules/router.js（节选）
import { asyncRouterHandle } from '@/utils/asyncRouter'
import { asyncMenu } from '@/api/menu'

export const useRouterStore = defineStore('router', () => {
  const keepAliveRouters = ref([])
  const asyncRouterFlag = ref(0)
  // 拉取动态菜单 -> asyncRouterHandle 转换 -> addRoute 注册
  // 并根据菜单 meta.keepAlive 维护 keep-alive 列表
  // ...
})
```

### 3. HTTP 请求封装

`src/utils/request.js` 基于 axios 封装统一请求实例，3.0 的主要特性：

- `baseURL` 默认取 `VITE_BASE_API`，单请求超时时间 10 分钟。
- 全局 Loading：请求发出 400ms 后仍未返回才展示（`activeAxios` 计数），30 秒强制关闭兜底；可通过 `donNotShowLoading`、`loadingOption` 按请求控制。
- 请求头自动注入 `x-token`、`x-user-id`。
- 响应头携带 `new-token` 时自动续签 token。
- 401 清理登录态并跳转登录页；403 且 `needChangePassword`（或业务码 `code=7`）时跳转 `/forceChangePassword` 强制改密页。
- 错误消息去重：相同内容不重复弹出，同时最多展示 3 条。

```javascript
// src/utils/request.js（节选）
import axios from 'axios'
import { useUserStore } from '@/pinia/modules/user'
import { ElLoading, ElMessage } from 'element-plus'
import router from '@/router/index'

const DEFAULT_REQUEST_TIMEOUT = 1000 * 60 * 10 // 10 分钟
const service = axios.create()

service.interceptors.request.use((config) => {
  if (typeof config.timeout === 'undefined') {
    config.timeout = DEFAULT_REQUEST_TIMEOUT
  }
  if (!config.donNotShowLoading) {
    showLoading(config.loadingOption) // 400ms 延迟展示，30s 强制关闭
  }
  config.baseURL = config.baseURL || import.meta.env.VITE_BASE_API
  const userStore = useUserStore()
  config.headers = {
    'Content-Type': 'application/json',
    'x-token': userStore.token,
    'x-user-id': userStore.userInfo.ID,
    ...config.headers
  }
  return config
})

service.interceptors.response.use(
  (response) => {
    // new-token 自动续签
    if (response.headers['new-token']) {
      const userStore = useUserStore()
      userStore.setToken(response.headers['new-token'])
    }
    if (response.data.code === 0 || response.headers.success === 'true') {
      return response.data
    }
    showErrorMessage(response.data.msg) // 去重后弹出
    return response.data.msg ? response.data : response
  },
  (error) => {
    if (error.response?.status === 401) {
      // 清理登录态并跳转登录页
      router.push({ name: 'Login', replace: true })
    }
    if (
      error.response?.status === 403 &&
      (error.response?.data?.data?.needChangePassword ||
        error.response?.data?.code === 7)
    ) {
      // 强制修改密码
      router.push({ name: 'ForceChangePassword', replace: true })
    }
    return Promise.reject(error)
  }
)

export default service
```

## 组件开发

### 全局组件注册

3.0 在 `src/core/global.js` 中统一注册全局组件，业务组件（`src/components` 下的 svgIcon、iconButton、commandMenu、logo、bottomInfo 等）不做全局注册，按需 `import` 使用：

```javascript
// src/core/global.js（节选）
import * as ElIconModules from '@element-plus/icons-vue'
import svgIcon from '@/components/svgIcon/svgIcon.vue'
import * as ComponentLibrary from '@/core/componentLibrary'

export const register = (app) => {
  // 1. 统一注册全部 element-plus 图标
  for (const iconName in ElIconModules) {
    app.component(iconName, ElIconModules[iconName])
  }
  // 2. 注册 SvgIcon（本地 sprite + iconify 双通道）
  app.component('SvgIcon', svgIcon)
  // 3. 扫描 src/assets/icons 与 src/plugin/**/assets/icons 的 svg，
  //    按文件名注册为全局组件（插件图标带 插件名- 前缀）
  registerIcons(app)
  // 4. 基础组件库按 kebab-case 注册为 g- 前缀全局组件（Button -> g-button）
  registerComponentLibrary(app)
  // 5. 挂载全局配置
  app.config.globalProperties.$GIN_VUE_ADMIN = config
}
```

### 组件使用示例

全局基础组件可直接以 `g-` 前缀标签使用，图标通过 `SvgIcon` 双通道使用：

```vue
<template>
  <!-- 基础组件库（core/componentLibrary）全局组件 -->
  <g-button type="primary">保存</g-button>

  <!-- 本地 svg 图标（src/assets/icons 下的文件按文件名自动注册） -->
  <SvgIcon localIcon="lock" class="text-red-500 text-3xl" />

  <!-- Iconify 在线图标 -->
  <SvgIcon icon="lucide:search" />
</template>
```

## 权限控制

### 权限指令

`v-auth` 指令按角色 ID（authorityId）控制元素是否渲染，支持数组、字符串、数字传参以及 `.not` 修饰符取反：

```javascript
// src/directive/auth.js
import { useUserStore } from '@/pinia/modules/user'
export default {
  install: (app) => {
    const userStore = useUserStore()
    app.directive('auth', {
      mounted: function (el, binding) {
        const userInfo = userStore.userInfo
        if (!binding.value) {
          el.parentNode.removeChild(el)
          return
        }
        const waitUse = binding.value.toString().split(',')
        let flag = waitUse.some((item) => Number(item) === userInfo.authorityId)
        if (binding.modifiers.not) {
          flag = !flag
        }
        if (!flag) {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}
```

### 按钮权限控制

`useBtnAuth` 返回当前路由 `meta.btns`（由后端菜单下发），配合 `v-auth` 控制按钮级权限：

```javascript
// src/utils/btnAuth.js
import { useRoute } from 'vue-router'
import { reactive } from 'vue'
export const useBtnAuth = () => {
  const route = useRoute()
  return route.meta.btns || reactive({})
}
```

按钮的创建、分配与页面中使用方式详见 [按钮权限](./button-auth.md)。

## 主题定制

3.0 内置完整的主题引擎（`src/theme`），支持主题色、暗色模式、布局模式、菜单风格、标签栏风格等可视化配置，并提供主题预设的导入导出，详见 [自定义全局皮肤](./menu-theme.md)。

与 Element Plus 的关系：主题引擎通过 `el-config-provider` 下发尺寸等行为配置，颜色则直接写入 `--el-color-primary` 等 CSS 变量，无需编译期定制；如需全局覆盖 Element Plus 样式，仍可在 `src/style/element_visiable.scss` 中编写。暗色模式通过 `html.dark` class 切换（Element Plus 暗色变量由 `element-plus/theme-chalk/dark/css-vars.css` 提供）。

## 响应式设计

3.0 使用 `src/hooks/responsive.js` 按三档断点自适应（参考 arco-pro 实现）：

- **< 640px（mobile）**：收起所有内联菜单，侧边栏切换为左侧 Drawer 抽屉菜单。
- **640 ~ 1024px（pad）**：强制使用「通栏侧边」布局并自动收缩侧边栏（不修改用户所选布局）。
- **>= 1024px（desktop）**：使用用户在主题设置中选择的布局。

## 性能优化

### 路由懒加载

静态路由与动态路由均通过 `() => import(...)` 懒加载（动态路由由 `import.meta.glob` 按需加载），构建时自动按路由分包：

```javascript
{
  path: '/login',
  name: 'Login',
  component: () => import('@/view/login/index.vue')
}
```

### 组件懒加载

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

// 重型组件按需加载
const AsyncComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  delay: 200,
  timeout: 3000
})
</script>
```

### 图片懒加载

列表中的图片优先使用浏览器原生 `loading="lazy"` 属性，无需额外指令：

```html
<img src="..." loading="lazy" alt="...">
```

## 最佳实践

### 1. 代码规范
- 使用 ESLint 保证代码质量（`npm run lint` / `npm run lint:fix`）
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

## 常见问题

### Q: 如何解决路由懒加载失败？
A: 检查路径是否正确，确保组件文件存在。3.0 中动态路由找不到组件时会降级为占位组件并在控制台输出 `[asyncRouter]` 警告。

### Q: Element Plus 样式不生效？
A: 确保正确导入样式文件，检查 CSS 优先级和作用域；全局覆盖样式写在 `src/style/element_visiable.scss`。

### Q: Pinia 状态丢失？
A: 检查是否正确持久化状态，页面刷新时重新初始化状态。

### Q: 打包后静态资源路径错误？
A: 检查 Vite 配置中的 base 路径设置。

## 相关文档

- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Element Plus 文档](https://element-plus.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [Vue Router 文档](https://router.vuejs.org/)
- [UnoCSS 文档](https://unocss.dev/)
