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

        <div v-if="loading" class="cl-state">加载中…</div>
        <div v-else-if="errorMsg" class="cl-state">{{ errorMsg }}</div>
        <div v-else class="cl-timeline">
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
                <span class="cl-tag" :class="`cl-tag--${change.typeKey}`">
                  {{ change.type }}
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

// 代理地址：见 docs/vite.config.ts 中 /pluginApi -> plugin.gin-vue-admin.com/api
// 统一前缀 pluginApi 会在代理转发时去除。
const CHANGELOG_URL = '/pluginApi/productChangelog/getPublicChangelogList'

// 中文类型 → 英文 key，仅用于拼 CSS class（保留原配色）。
// 接口下不存在的 key 也会兜底到 'other'。
const TYPE_KEY = {
  新增: 'feature',
  优化: 'improve',
  修复: 'fix',
  UI: 'ui',
  其他: 'other',
}

const releases = ref([])
const active = ref('')
const loading = ref(true)
const errorMsg = ref('')

// 把 ISO 日期格式化成 YYYY-MM-DD（用本地时区，避免 UTC 偏移导致日期错位）。
const formatDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// 接口数据 → 模板所需结构。
const normalize = (list) =>
  list.map((item, idx) => ({
    version: item.title || `v${item.version}`,
    date: formatDate(item.releaseDate),
    latest: idx === 0,
    changes: (item.items || []).map((c) => ({
      type: c.type,
      typeKey: TYPE_KEY[c.type] || 'other',
      text: c.content,
    })),
  }))

const fetchChangelog = async () => {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await fetch(CHANGELOG_URL)
    if (!res.ok) throw new Error(`接口返回 ${res.status}`)
    const json = await res.json()
    if (json.code !== 0) throw new Error(json.msg || '获取日志失败')
    const list = (json.data && json.data.list) || []
    releases.value = normalize(list)
    active.value = releases.value[0]?.version || ''
  } catch (e) {
    errorMsg.value = `更新日志加载失败：${e.message || e}`
  } finally {
    loading.value = false
  }
}

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

onMounted(async () => {
  await fetchChangelog()

  const entries = Array.from(document.querySelectorAll('.cl-entry'))
  if (!entries.length) return
  observer = new IntersectionObserver(
    (records) => {
      // 已滚动到底部：末尾的短条目无法进入观察带，强制高亮最后一个版本，
      // 避免点击 / 滚动到最后一个版本时高亮被上一条抢回。
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (atBottom) {
        active.value = releases.value[releases.value.length - 1].version
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

/* ---- Loading / error state ---- */
.cl-state {
  padding: 48px 0;
  text-align: center;
  font-size: 15px;
  color: var(--gva-text-muted);
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
  display: flex;
  flex-direction: column;
  /* 版本很多时导航自身可能比视口更高：限制在视口内、内部滚动，
     保证整条版本导航始终留在视野中（真正充当页面导航，版本再多也够得着）。 */
  max-height: calc(100vh - 96px - 24px);
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
  min-height: 0; /* 允许在 flex 容器内收缩，超高时才触发内部滚动 */
  overflow-y: auto;
  overscroll-behavior: contain; /* 内部滚到头不带动整页 */
  scrollbar-width: thin;
  scrollbar-color: var(--gva-border-strong) transparent;
}
.cl-aside-nav::-webkit-scrollbar {
  width: 6px;
}
.cl-aside-nav::-webkit-scrollbar-thumb {
  background: var(--gva-border-strong);
  border-radius: 999px;
}
.cl-aside-nav::-webkit-scrollbar-track {
  background: transparent;
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
