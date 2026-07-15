<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import { useData } from 'vitepress'
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar'
import { isActive } from 'vitepress/dist/client/shared'

// 与 VitePress 一致：用 page.relativePath 判定当前页（route.path 在 SSR 期不可靠）。
// 用原始 sidebar（作者书写结构，保留末尾纯链接项），而非加工过的 sidebarGroups。
const { page } = useData()
const { sidebar, hasSidebar } = useSidebar()

function isExternal(link) {
  return !!link && /^https?:\/\//.test(link)
}
function hasChildren(group) {
  return Array.isArray(group.items) && group.items.length > 0
}
function itemActive(link) {
  return !!link && !isExternal(link) && isActive(page.value.relativePath, link)
}

// 当前页面所属分组的下标（用于 global 视图高亮 + 初始钻入）
const currentGroupIndex = computed(() => {
  const groups = sidebar.value
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i]
    if (itemActive(g.link)) return i
    if (hasChildren(g) && g.items.some((it) => itemActive(it.link))) return i
  }
  return -1
})

const view = ref('global') // 'global' | 'detail'
const openIndex = ref(-1) // 详情视图当前展示的分组下标
const globalEl = ref(null)

const openGroup = computed(() => sidebar.value[openIndex.value] || null)

// 依据当前路由决定初始/切换后的视图：命中某分组则钻入，否则回到全局
function resolveFromRoute() {
  const i = currentGroupIndex.value
  if (i >= 0) {
    openIndex.value = i
    view.value = 'detail'
  } else {
    openIndex.value = -1
    view.value = 'global'
  }
}
resolveFromRoute()
watch(() => page.value.relativePath, resolveFromRoute)

function showDetail(i) {
  openIndex.value = i
  view.value = 'detail'
}

function showGlobal(flashIdx) {
  view.value = 'global'
  nextTick(() => {
    const root = globalEl.value
    if (!root || flashIdx == null || flashIdx < 0) return
    const btn = root.querySelector('[data-idx="' + flashIdx + '"]')
    if (!btn) return
    btn.scrollIntoView({ block: 'center' })
    btn.classList.remove('flash')
    void btn.offsetWidth
    btn.classList.add('flash')
  })
}

// 点击侧栏搜索框：派发官方同款合成事件，打开 VitePress 本地搜索
function openSearch() {
  const e = new Event('keydown')
  e.key = 'k'
  e.metaKey = true
  window.dispatchEvent(e)
}
</script>

<template>
  <div v-if="hasSidebar" class="gva-side">
    <!-- 搜索框（从顶栏移入侧栏，点击打开本地搜索） -->
    <button class="gva-search" type="button" aria-label="搜索文档" @click="openSearch">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
      <span class="ph">搜索文档</span>
      <span class="kbd">⌘K</span>
    </button>

    <!-- 全局视图：一级分组 -->
    <nav v-show="view === 'global'" ref="globalEl" class="gva-global">
      <template v-for="(g, i) in sidebar" :key="g.text">
        <a
          v-if="!hasChildren(g) && g.link"
          class="gva-grp"
          :class="{ current: i === currentGroupIndex }"
          :href="g.link"
          :target="isExternal(g.link) ? '_blank' : undefined"
          :rel="isExternal(g.link) ? 'noopener' : undefined"
        >
          <span class="name">{{ g.text }}</span>
          <span v-if="isExternal(g.link)" class="ext"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg></span>
        </a>
        <button
          v-else
          class="gva-grp"
          type="button"
          :data-idx="i"
          :class="{ current: i === currentGroupIndex }"
          @click="showDetail(i)"
        >
          <span class="name">{{ g.text }}</span>
          <span class="chev"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg></span>
        </button>
      </template>
    </nav>

    <!-- 详情视图：钻入某分组后的子项 -->
    <nav v-show="view === 'detail' && openGroup" class="gva-detail">
      <button class="gva-back" type="button" @click="showGlobal(openIndex)">
        <span class="back-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg></span>
        <span class="back-title">{{ openGroup && openGroup.text }}</span>
        <span class="back-spacer"></span>
      </button>
      <div class="gva-detail-list">
        <template v-for="it in (openGroup ? openGroup.items : [])" :key="it.text">
          <a
            v-if="it.link"
            class="gva-item"
            :class="{ active: itemActive(it.link) }"
            :href="it.link"
            :target="isExternal(it.link) ? '_blank' : undefined"
            :rel="isExternal(it.link) ? 'noopener' : undefined"
          >
            <span class="it-name">{{ it.text }}</span>
            <span v-if="isExternal(it.link)" class="ext"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg></span>
          </a>
          <div v-else class="gva-item">
            <span class="it-name">{{ it.text }}</span>
          </div>
        </template>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.gva-side {
  display: flex;
  flex-direction: column;
}

/* 搜索框 */
.gva-search {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 12px;
  margin-bottom: 20px;
  border: 1px solid var(--gva-border);
  border-radius: var(--gva-radius-sm);
  background: var(--gva-bg-base);
  color: var(--gva-text-muted);
  font-family: inherit;
  font-size: 14px;
  text-align: left;
  cursor: text;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.gva-search:hover {
  border-color: var(--gva-border-strong);
}
.gva-search:focus-visible {
  outline: none;
  border-color: var(--gva-primary);
  box-shadow: 0 0 0 3px var(--gva-primary-ring);
}
.gva-search svg {
  flex: 0 0 auto;
  color: var(--gva-text-muted);
}
.gva-search .ph {
  flex: 1;
}
.gva-search .kbd {
  font-family: var(--gva-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 11px;
  line-height: 1;
  border: 1px solid var(--gva-border);
  border-radius: 6px;
  padding: 3px 6px;
  color: var(--gva-text-muted);
}

/* 两个视图 */
.gva-global,
.gva-detail {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* 全局：一级分组 */
.gva-grp {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 9px 12px;
  border: 0;
  border-radius: 8px;
  background: none;
  color: var(--gva-text-body);
  font-family: inherit;
  font-size: 14.5px;
  font-weight: 500;
  line-height: 1.3;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.gva-grp:hover {
  background: rgba(15, 23, 42, 0.045);
  color: var(--gva-text-strong);
}
.gva-grp .name {
  flex: 1;
}
.gva-grp .chev,
.gva-grp .ext {
  display: flex;
  flex: 0 0 auto;
  color: var(--gva-text-muted);
}
.gva-grp.current {
  color: var(--gva-primary);
  font-weight: 600;
}
.gva-grp.current .chev {
  color: var(--gva-primary);
}
@keyframes gva-grpflash {
  0% {
    background: var(--gva-primary-soft);
  }
  100% {
    background: transparent;
  }
}
.gva-grp.flash {
  animation: gva-grpflash 1.15s ease;
}

/* 详情：返回条 + 子项 */
.gva-back {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 6px 14px;
  border: 0;
  background: none;
  font-family: inherit;
  cursor: pointer;
}
.gva-back .back-ico,
.gva-back .back-spacer {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  width: 22px;
  color: var(--gva-text-muted);
  transition: color 0.15s ease, transform 0.15s ease;
}
.gva-back .back-title {
  flex: 1;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: var(--gva-text-strong);
  letter-spacing: -0.01em;
}
.gva-back:hover .back-ico {
  color: var(--gva-primary);
  transform: translateX(-2px);
}
.gva-detail-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.gva-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  color: var(--gva-text-body);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.35;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.gva-item:hover {
  background: rgba(15, 23, 42, 0.045);
  color: var(--gva-text-strong);
}
.gva-item.active {
  background: var(--gva-primary-soft);
  color: var(--gva-primary);
  font-weight: 600;
}
.gva-item .it-name {
  flex: 1;
}
.gva-item .ext {
  display: flex;
  flex: 0 0 auto;
  color: var(--gva-text-muted);
}

/* 深色模式：hover 底色（浅色规范里是内联 rgba，深色单独兜一下） */
.dark .gva-grp:hover,
.dark .gva-item:hover {
  background: rgba(255, 255, 255, 0.06);
}
</style>
