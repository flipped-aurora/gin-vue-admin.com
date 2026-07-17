import type { Router } from 'vitepress'

// 站点访问统计（UV/PV）上报。
// 代理地址：见 docs/vite.config.ts 中 /pluginApi -> plugin.gin-vue-admin.com/api
// 统一前缀 pluginApi 会在代理转发时去除。
// PV：首屏 + 每次路由切换各上报一次；UV 由服务端按访客去重。
// 注意：vitepress 1.3.4 客户端启动挂载前会调用 router.go()（见
// node_modules/vitepress/dist/client/app/index.js），首屏同样会触发
// onAfterRouteChanged，因此无需手动补报首屏。
const REPORT_URL = '/pluginApi/siteVisit/report?source=website'

// 钩子收到的 href 可能是规范化形式（router.go 内部 normalizeHref 的结果），
// 也可能是地址栏原始形式（popstate 回到浏览器初始历史条目时）。把两种写法
// 折叠成同一个 key：去掉尾部 index(.html) 和 .html 扩展名，保证同一页面
// 只有一个身份，避免重复计数。
const canonicalPath = (href: string) => {
  const path = new URL(href, location.origin).pathname
  return path.replace(/(^|\/)index(\.html)?$/, '$1').replace(/\.html$/, '')
}

// 记录上一次上报的页面 key，同页重复触发（如页内 hash 前进/后退）不再上报。
let lastReportedPath = ''

const report = (href: string) => {
  const path = canonicalPath(href)
  if (path === lastReportedPath) return
  lastReportedPath = path
  if (import.meta.env.DEV) {
    console.log(`[siteVisit] dev 环境仅打印，不上报：${path}`)
    return
  }
  // keepalive：上报后立即关页请求仍能发出；统计失败不影响页面，忽略错误。
  fetch(REPORT_URL, { keepalive: true }).catch(() => {})
}

export const setupSiteVisit = (router: Router) => {
  const selfOnAfterRouteChanged = router.onAfterRouteChanged
  router.onAfterRouteChanged = async (to) => {
    // 快速连点时被后来导航取代的 go() 也会触发本钩子，但页面并未渲染；
    // 只统计真正落地（route.path 已指向目标页）的导航，防止多计或漏计。
    if (canonicalPath(to) === canonicalPath(router.route.path)) {
      report(to)
    }
    await selfOnAfterRouteChanged?.(to)
  }
}
