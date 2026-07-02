<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="text-center mb-14 max-[860px]:mb-10">
        <h2 class="text-[clamp(28px,3.6vw,40px)] leading-[1.18] font-bold tracking-[-0.02em] text-[var(--gva-text-strong)]" style="margin-top: 16px">
          <span class="block"><span class="text-[var(--gva-primary)]">3 万+</span> 开发者</span>
          <span class="block">已经在用 GVA</span>
        </h2>
        <p class="text-[clamp(14px,1.5vw,18px)] leading-[2] text-[var(--gva-text-body)] max-w-[820px] mt-4 mx-auto max-[860px]:font-light">
          一个被持续验证、持续生长的开源全栈框架。
        </p>
      </div>

      <div class="grid grid-cols-4 gap-5 mb-[52px] max-[860px]:grid-cols-2">
        <div v-for="(s, i) in stats" :key="s.label" class="relative text-center py-[26px] px-3">
          <span
            class="block text-[clamp(26px,3.2vw,36px)] font-extrabold tracking-[-0.02em]"
            :class="i === 0 ? 'text-[var(--gva-primary)]' : 'text-[var(--gva-text-strong)]'"
          >{{ s.num }}</span>
          <span class="block mt-2 text-[13.5px] text-[var(--gva-text-muted)]">{{ s.label }}</span>
          <span
            v-if="i < stats.length - 1"
            class="absolute right-0 top-1/2 hidden h-[60%] w-px -translate-y-1/2 bg-[var(--gva-border)] min-[861px]:block"
          ></span>
        </div>
      </div>

      <!-- ─── 桌面端轮播（≥ 861px）：三栏，中间高亮，fade + scale 切换 ─── -->
      <div
        class="hidden min-[861px]:flex carousel-desktop"
        @mouseenter="pause"
        @mouseleave="resume"
      >
        <div
          v-for="(t, i) in visibleDesktop"
          :key="i"
          class="carousel-card h-[200px] overflow-hidden bg-[var(--gva-bg-base)] border rounded-[var(--gva-radius)] p-6 flex flex-col justify-between"
          :class="i === 1
            ? 'card-center shadow-[shadow:var(--gva-shadow)] border-[var(--gva-primary-ring)]'
            : 'card-side shadow-[shadow:var(--gva-shadow-sm)] border-[var(--gva-border)]'"
        >
          <p class="text-[14px] leading-[1.7] text-[var(--gva-text-body)] m-0 mb-5 line-clamp-3">"{{ t.text }}"</p>
          <div class="flex items-center gap-3">
            <span class="shrink-0 w-[38px] h-[38px] rounded-full grid place-items-center text-white font-bold" :style="{ background: t.color }">{{ t.name[0] }}</span>
            <span>
              <strong class="block text-[14px] text-[var(--gva-text-strong)]">{{ t.name }}</strong>
              <em class="not-italic text-[12.5px] text-[var(--gva-text-muted)]">{{ t.role }}</em>
            </span>
          </div>
        </div>
      </div>

      <!-- ─── 移动端轮播（≤ 860px）：单张全宽，独立 TransitionGroup ─── -->
      <div
        class="block min-[861px]:hidden carousel-track"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <TransitionGroup :name="slideDirection" tag="div" class="carousel-inner-mobile">
          <div
            :key="testimonials[current].name + current"
            class="carousel-card-mobile h-[200px] w-full overflow-hidden bg-[var(--gva-bg-base)] border rounded-[var(--gva-radius)] p-6 flex flex-col justify-between shadow-[shadow:var(--gva-shadow)] border-[var(--gva-primary-ring)]"
          >
            <p class="text-[14px] leading-[1.7] text-[var(--gva-text-body)] m-0 mb-5 line-clamp-3 font-light">"{{ testimonials[current].text }}"</p>
            <div class="flex items-center gap-3">
              <span class="shrink-0 w-[38px] h-[38px] rounded-full grid place-items-center text-white font-bold" :style="{ background: testimonials[current].color }">{{ testimonials[current].name[0] }}</span>
              <span>
                <strong class="block text-[14px] text-[var(--gva-text-strong)]">{{ testimonials[current].name }}</strong>
                <em class="not-italic text-[12.5px] text-[var(--gva-text-muted)] font-light">{{ testimonials[current].role }}</em>
              </span>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Dots -->
      <div class="flex justify-center gap-2 mt-7">
        <button
          v-for="(t, i) in testimonials"
          :key="i"
          class="h-2 rounded-full border-none cursor-pointer transition-all duration-200"
          :class="i === current ? 'w-[22px] bg-[var(--gva-primary)]' : 'w-2 bg-[var(--gva-border-strong)]'"
          :aria-label="`第 ${i + 1} 条`"
          @click="jumpTo(i)"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const stats = [
  { num: '30,000+', label: 'GitHub Stars' },
  { num: '5,800+', label: 'Forks' },
  { num: '400+', label: '贡献者' },
  { num: '200+', label: '生态插件' },
]

const testimonials = [
  { text: '从建模到上线，GVA 把重复劳动几乎全部自动化了，团队真正把精力放在业务上。', name: '李工', role: '后端负责人 · 某 SaaS 团队', color: '#2264F2' },
  { text: '接入 MCP 后，AI 直接读懂我们的项目结构，生成的代码风格和现有工程完全一致。', name: '王敏', role: '全栈工程师', color: '#16a34a' },
  { text: '权限体系做得很扎实，把 AI Agent 也纳入同一套 RBAC，安全上让人放心。', name: '张磊', role: '技术架构师', color: '#f59e0b' },
  { text: '代码生成器 + 插件市场，让一个小团队也能快速交付企业级后台。', name: '陈晨', role: '独立开发者', color: '#8b5cf6' },
  { text: '文档和社区都很活跃，遇到问题基本当天就能找到答案。', name: '赵宇', role: '前端负责人', color: '#ef4444' },
]

const current = ref(0)
const slideDirection = ref('slide-left') // 仅移动端使用

// 桌面端：三张（左、中、右），key 固定为位置，内容随 current 变化
const visibleDesktop = computed(() => {
  const n = testimonials.length
  return [-1, 0, 1].map((off) => {
    const idx = (current.value + off + n) % n
    return { ...testimonials[idx] }
  })
})

function jumpTo(idx) {
  const n = testimonials.length
  const diff = ((idx - current.value) + n) % n
  slideDirection.value = diff <= n / 2 ? 'slide-left' : 'slide-right'
  current.value = idx
}

function next() {
  slideDirection.value = 'slide-left'
  current.value = (current.value + 1) % testimonials.length
}

// 自动播放
let timer = null
const INTERVAL = 3500

function start() {
  timer = setInterval(next, INTERVAL)
}
function pause() {
  clearInterval(timer)
  timer = null
}
function resume() {
  if (!timer) start()
}

onMounted(start)
onUnmounted(pause)

// 移动端触摸滑动
let touchStartX = 0
function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
  pause()
}
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 40) {
    if (dx < 0) {
      slideDirection.value = 'slide-left'
      current.value = (current.value + 1) % testimonials.length
    } else {
      slideDirection.value = 'slide-right'
      current.value = (current.value - 1 + testimonials.length) % testimonials.length
    }
  }
  resume()
}
</script>

<style scoped>
/* ─── 桌面三栏容器：overflow visible 避免裁掉上移的中间卡 ─── */
.carousel-desktop {
  display: flex;
  gap: 18px;
  align-items: center;   /* 垂直居中对齐，中间卡用 margin-top 上移 */
  padding-top: 10px;     /* 给中间卡上移留空间 */
}

.carousel-card {
  flex: 1;
  min-width: 0;
  /* 所有视觉属性都走 transition，切换时淡入淡出 + 微缩放 */
  transition:
    opacity        0.38s cubic-bezier(0.4, 0, 0.2, 1),
    transform      0.38s cubic-bezier(0.4, 0, 0.2, 1),
    filter         0.38s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow     0.38s cubic-bezier(0.4, 0, 0.2, 1),
    border-color   0.38s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 中间高亮卡：上移 + 足够不模糊 */
.card-center {
  opacity: 1;
  transform: translateY(-6px) scale(1);
  filter: none;
}

/* 两侧弱化卡 */
.card-side {
  opacity: 0.6;
  transform: translateY(0) scale(0.97);
  filter: blur(1.5px);
}

/* ─── 移动端单张 ─── */
.carousel-track {
  overflow: hidden;
  position: relative;
}

.carousel-inner-mobile {
  position: relative;
  width: 100%;
}

.carousel-card-mobile {
  width: 100%;
}

.slide-left-leave-active.carousel-card-mobile,
.slide-right-leave-active.carousel-card-mobile {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

/* ─── 移动端动画：向左（前进）─── */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.52s cubic-bezier(0.4, 0, 0.2, 1),
              opacity   0.52s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-left-enter-from { transform: translateX(56px); opacity: 0; }
.slide-left-enter-to   { transform: translateX(0);    opacity: 1; }
.slide-left-leave-from { transform: translateX(0);    opacity: 1; }
.slide-left-leave-to   { transform: translateX(-56px); opacity: 0; }

/* ─── 移动端动画：向右（后退）─── */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.52s cubic-bezier(0.4, 0, 0.2, 1),
              opacity   0.52s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-right-enter-from { transform: translateX(-56px); opacity: 0; }
.slide-right-enter-to   { transform: translateX(0);     opacity: 1; }
.slide-right-leave-from { transform: translateX(0);     opacity: 1; }
.slide-right-leave-to   { transform: translateX(56px);  opacity: 0; }
</style>