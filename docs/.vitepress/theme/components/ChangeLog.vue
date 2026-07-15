<template>
  <div class="cl-page">
    <div class="cl-shell">
      <!-- 主时间线 -->
      <main class="cl-main">
        <header class="cl-hero">
          <h1 class="cl-title">更新日志</h1>
          <p class="cl-subtitle">
            记录 Gin-Vue-Admin 每个版本的新增、优化与修复。
          </p>
        </header>

        <div class="cl-timeline">
          <article
            v-for="release in releases"
            :id="release.version"
            :key="release.version"
            class="cl-entry"
          >
            <span
              class="cl-node"
              :class="{ 'cl-node--active': release.latest }"
              aria-hidden="true"
            ></span>

            <div class="cl-entry-head">
              <h2 class="cl-version">{{ release.version }}</h2>
              <span v-if="release.latest" class="cl-badge">最新</span>
              <time class="cl-date">{{ release.date }}</time>
            </div>

            <ul class="cl-changes">
              <li
                v-for="(change, i) in release.changes"
                :key="i"
                class="cl-change"
              >
                <span class="cl-tag" :class="`cl-tag--${change.type}`">
                  {{ tagLabel[change.type] }}
                </span>
                <span class="cl-text">{{ change.text }}</span>
              </li>
            </ul>
          </article>
        </div>
      </main>

      <!-- 右侧版本导航 -->
      <aside class="cl-aside">
        <div class="cl-aside-inner">
          <div id="cl-aside-title" class="cl-aside-title">版本</div>
          <nav class="cl-aside-nav" aria-labelledby="cl-aside-title">
            <a
              v-for="release in releases"
              :key="release.version"
              :href="`#${release.version}`"
              class="cl-aside-link"
              :class="{ 'cl-aside-link--active': active === release.version }"
              @click="goTo($event, release.version)"
            >
              {{ release.version }}
            </a>
          </nav>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 变更类型 → 中文标签。新增数据时只需扩展下方 releases 数组即可。
const tagLabel = {
  feature: '新增',
  improve: '优化',
  fix: '修复',
}

// 更新日志数据：按版本从新到旧排列，最新版本设置 latest: true。
const releases = [
  {
    version: 'v3.0.0',
    date: '2026-06-18',
    latest: true,
    changes: [
      { type: 'feature', text: '全新 3.0 架构：前端升级至 Vue 3 + Vite 6，后端支持 Go 1.23。' },
      { type: 'feature', text: 'AutoCode 代码生成器支持一键生成 CRUD 接口与配套表单。' },
      { type: 'improve', text: '重构权限系统，菜单与 API 权限的配置更直观。' },
      { type: 'improve', text: '文档站全面改版，支持全局搜索与快捷键唤起。' },
      { type: 'fix', text: '修复暗色模式下部分组件对比度不足的问题。' },
    ],
  },
  {
    version: 'v2.9.1',
    date: '2026-04-22',
    changes: [
      { type: 'improve', text: '提升大数据量表格的渲染性能。' },
      { type: 'fix', text: '修复导出 Excel 时中文表头偶发乱码的问题。' },
      { type: 'fix', text: '修复字典缓存在多实例部署下不同步的问题。' },
    ],
  },
  {
    version: 'v2.9.0',
    date: '2026-03-10',
    changes: [
      { type: 'feature', text: '新增插件市场，支持一键安装组织管理等官方插件。' },
      { type: 'improve', text: '优化登录流程，支持多种验证码策略灵活切换。' },
      { type: 'fix', text: '修复部分场景下 JWT 刷新令牌偶发失效的问题。' },
    ],
  },
  {
    version: 'v2.8.4',
    date: '2026-01-20',
    changes: [
      { type: 'improve', text: '升级若干依赖库版本，修复关联的安全告警。' },
      { type: 'fix', text: '修复文件上传在特定对象存储配置下的路径错误。' },
    ],
  },
]

const active = ref(releases[0].version)

// 点击右侧版本：平滑滚动并同步高亮，避免默认锚点跳动被固定导航栏遮挡。
const goTo = (event, version) => {
  const el = document.getElementById(version)
  if (!el) return
  event.preventDefault()
  active.value = version
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${version}`)
}

let observer = null

onMounted(() => {
  const entries = Array.from(document.querySelectorAll('.cl-entry'))
  observer = new IntersectionObserver(
    (records) => {
      // 已滚动到底部：末尾的短条目无法进入观察带，强制高亮最后一个版本，
      // 避免点击 / 滚动到最后一个版本时高亮被上一条抢回。
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (atBottom) {
        active.value = releases[releases.length - 1].version
        return
      }
      records.forEach((record) => {
        if (record.isIntersecting) active.value = record.target.id
      })
    },
    // 顶部留出固定导航栏高度，底部收窄以便滚动时提前命中下一版本。
    { rootMargin: '-88px 0px -66% 0px', threshold: 0 }
  )
  entries.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.cl-page {
  background: var(--gva-bg-base);
  min-height: 100vh;
  color: var(--gva-text-body);
  font-family: var(--vp-font-family-base);
  -webkit-font-smoothing: antialiased;
}

.cl-shell {
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 76px 32px 112px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 200px;
  column-gap: 72px;
}

/* ---- Hero ---- */
.cl-hero {
  margin-bottom: 64px;
}
.cl-title {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: clamp(38px, 4.6vw, 52px);
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--gva-text-strong);
}
.cl-subtitle {
  margin: 18px 0 0;
  font-size: clamp(15px, 1.4vw, 17px);
  line-height: 1.7;
  color: var(--gva-text-muted);
}

/* ---- Timeline ---- */
.cl-timeline {
  position: relative;
}
.cl-timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: var(--gva-border);
}

.cl-entry {
  position: relative;
  padding-left: 44px;
  padding-bottom: 48px;
  scroll-margin-top: 96px;
}
.cl-entry:last-child {
  padding-bottom: 0;
}

/* 时间线节点：默认空心，最新版本为实心蓝点带柔光环 */
.cl-node {
  position: absolute;
  left: 0;
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: var(--gva-bg-base);
  border: 2px solid var(--gva-border-strong);
  box-sizing: border-box;
}
.cl-node--active {
  background: var(--gva-primary);
  border-color: var(--gva-primary);
  box-shadow: 0 0 0 4px var(--gva-primary-soft);
}

.cl-entry-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
}
.cl-version {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: var(--vp-font-family-mono);
  font-size: clamp(20px, 2vw, 24px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.01em;
  color: var(--gva-text-strong);
}
.cl-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--gva-primary);
  background: var(--gva-primary-soft);
}
.cl-date {
  margin-left: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 13.5px;
  color: var(--gva-text-muted);
  white-space: nowrap;
}

/* ---- Change rows ---- */
.cl-changes {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 16px;
}
.cl-change {
  display: flex;
  gap: 22px;
  align-items: baseline;
}
.cl-tag {
  flex: none;
  width: 32px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--gva-text-muted);
  user-select: none;
}
.cl-text {
  flex: 1;
  min-width: 0;
  font-size: 15.5px;
  line-height: 1.7;
  color: var(--gva-text-body);
  /* 防止超长不可断词（URL / 长标识符）在全局 overflow-x:hidden 下被静默裁切 */
  overflow-wrap: break-word;
}

/* ---- Right rail ---- */
.cl-aside {
  position: relative;
}
.cl-aside-inner {
  position: sticky;
  top: 96px;
}
.cl-aside-title {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--gva-text-muted);
  padding-left: 15px;
  margin-bottom: 16px;
}
.cl-aside-nav {
  display: flex;
  flex-direction: column;
}
.cl-aside-link {
  display: block;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  line-height: 1.4;
  padding: 8px 0 8px 14px;
  color: var(--gva-text-muted);
  border-left: 2px solid transparent;
  text-decoration: none;
  transition: color 0.15s ease, border-color 0.15s ease;
}
.cl-aside-link:hover {
  color: var(--gva-text-strong);
}
.cl-aside-link--active {
  color: var(--gva-primary);
  font-weight: 700;
  border-left-color: var(--gva-primary);
}

/* ---- Responsive ---- */
@media (max-width: 960px) {
  .cl-shell {
    grid-template-columns: 1fr;
    column-gap: 0;
    padding: 56px 22px 88px;
  }
  .cl-aside {
    display: none;
  }
  .cl-hero {
    margin-bottom: 48px;
  }
}

@media (max-width: 560px) {
  .cl-entry-head {
    flex-wrap: wrap;
  }
  .cl-date {
    width: 100%;
    margin-left: 0;
    order: 3;
    margin-top: 2px;
  }
}
</style>
