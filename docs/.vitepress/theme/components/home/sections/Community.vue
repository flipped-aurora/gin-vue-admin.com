<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="text-center mb-14 max-[860px]:mb-10">
        <h2 class="text-[clamp(28px,3.6vw,40px)] leading-[1.18] font-bold tracking-[-0.02em] text-[var(--gva-text-strong)] dark:text-[var(--gva-text-strong)]" style="margin-top: 16px">
          <span class="block"><span class="text-[var(--gva-primary)]">3 万+</span> 开发者</span>
          <span class="block">已经在用 GVA</span>
        </h2>
        <p class="text-[clamp(14px,1.5vw,18px)] leading-[2] text-[var(--gva-text-body)] max-w-[820px] mt-4 mx-auto max-[860px]:font-light">
          一个被持续验证、持续生长的开源全栈框架。
        </p>
      </div>

      <!-- 数据四宫格：移动端 2x2 + 十字分割线 -->
      <div class="relative grid grid-cols-4 gap-5 mb-[52px] max-[860px]:grid-cols-2">
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
        <!-- 移动端十字分割线：80% 长度，四端淡出 -->
        <span class="stats-cross-h min-[861px]:hidden" aria-hidden="true"></span>
        <span class="stats-cross-v min-[861px]:hidden" aria-hidden="true"></span>
      </div>

      <!-- ─── 桌面端轮播（≥ 861px）：传送带式滑动 ─── -->
      <div
        class="hidden min-[861px]:block carousel-viewport"
        @mouseenter="pause"
        @mouseleave="resume"
      >
        <!-- 轨道：5 张卡（3 可见 + 左右各 1 缓冲），整体 translateX 滑动 -->
        <div
          ref="trackRef"
          class="carousel-belt"
          :class="{ 'snap-frame': noCardTransition }"
          :style="trackStyle"
          @transitionend="onTrackTransitionEnd"
        >
          <div
            v-for="t in visibleDesktop"
            :key="t.off"
            class="carousel-card h-[200px] overflow-hidden bg-[var(--gva-bg-base)] border rounded-[var(--gva-radius)] p-6 flex flex-col justify-between"
            :class="t.off === centerOffset
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
      </div>

      <!-- ─── 移动端轮播（≤ 860px）：单张全宽（保持不变）─── -->
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
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

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

const n = testimonials.length
const current = ref(0)
const slideDirection = ref('slide-left') // 仅移动端 TransitionGroup 使用

/* ══════════ 桌面端传送带 ══════════ */

// 5 张卡：偏移 -2 ~ +2，可见 -1 ~ +1，±2 是滑动缓冲
const OFFSETS = [-2, -1, 0, 1, 2]
const visibleDesktop = computed(() =>
  OFFSETS.map((off) => {
    const idx = (current.value + off + n * 2) % n
    return { ...testimonials[idx], off }
  })
)

const trackRef = ref(null)
const trackX = ref(0)
const animating = ref(false)
const centerOffset = ref(0)          // 高亮卡的偏移位：动画期间指向来向的卡
const noCardTransition = ref(false)  // 归位帧禁用卡片过渡，防止高亮"弹回"
const duration = ref(500)

let stepPx = 0
let pendingSteps = 0
let pendingDir = 1
let fallbackTimer = null

function measureStep() {
  const el = trackRef.value
  if (!el || el.children.length < 2) return 0
  stepPx = el.children[1].offsetLeft - el.children[0].offsetLeft
  return stepPx
}

const trackStyle = computed(() => ({
  transform: `translateX(${trackX.value}px)`,
  transition: animating.value
    ? `transform ${duration.value}ms cubic-bezier(0.22, 1, 0.36, 1)`
    : 'none',
}))

function startStep(d) {
  if (!measureStep()) {
    // 桌面轨道不可见（移动端），直接改数据，交给移动端动画
    current.value = (current.value + d + n) % n
    return
  }
  animating.value = true
  centerOffset.value = d
  trackX.value = -d * stepPx
  fallbackTimer = setTimeout(finishStep, duration.value + 100)
}

function finishStep() {
  clearTimeout(fallbackTimer)
  if (!animating.value) return
  const d = centerOffset.value

  /*
    归位关键帧：禁用卡片过渡 → 同帧内归位+数据前移（画面逐像素相同，
    肉眼不可见）→ 两帧后恢复过渡。不禁用的话，高亮状态交换会在归位后
    跑一遍过渡动画，视觉上"弹一下"。
  */
  noCardTransition.value = true
  animating.value = false
  centerOffset.value = 0
  current.value = (current.value + d + n) % n
  trackX.value = 0

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      noCardTransition.value = false
      if (pendingSteps > 0) {
        pendingSteps--
        startStep(pendingDir)
      } else {
        duration.value = 500
      }
    })
  })
}

function onTrackTransitionEnd(e) {
  if (e.target === trackRef.value && e.propertyName === 'transform') {
    finishStep()
  }
}

/* ══════════ 交互入口 ══════════ */

function move(d) {
  slideDirection.value = d > 0 ? 'slide-left' : 'slide-right'
  if (animating.value) {
    pendingSteps = Math.min(pendingSteps + 1, 1)
    pendingDir = d
    return
  }
  startStep(d)
}

function jumpTo(idx) {
  if (idx === current.value) return
  const diff = ((idx - current.value) + n) % n
  const forward = diff <= n / 2
  const steps = forward ? diff : n - diff
  const d = forward ? 1 : -1
  slideDirection.value = forward ? 'slide-left' : 'slide-right'

  if (!measureStep()) {
    current.value = idx
    return
  }
  if (animating.value) return
  pendingSteps = steps - 1
  pendingDir = d
  duration.value = steps > 1 ? 280 : 500
  startStep(d)
}

/* ══════════ 自动播放 ══════════ */

let timer = null
const INTERVAL = 3500

function start() {
  timer = setInterval(() => move(1), INTERVAL)
}
function pause() {
  clearInterval(timer)
  timer = null
}
function resume() {
  if (!timer) start()
}

onMounted(() => {
  nextTick(measureStep)
  window.addEventListener('resize', measureStep)
  start()
})
onUnmounted(() => {
  pause()
  clearTimeout(fallbackTimer)
  window.removeEventListener('resize', measureStep)
})

/* ══════════ 移动端触摸 ══════════ */

let touchStartX = 0
function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
  pause()
}
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 40) {
    move(dx < 0 ? 1 : -1)
  }
  resume()
}
</script>

<style scoped>
/* ══════════════════════════════════════
   移动端四宫格十字分割线
   ══════════════════════════════════════ */

/*
  横线：80% 宽，水平居中，两端淡出
  竖线：80% 高，垂直居中，两端淡出
  1px 细线，颜色两端渐变到透明，精致不抢眼
*/
.stats-cross-h {
  position: absolute;
  left: 10%;
  right: 10%;
  top: 50%;
  height: 1px;
  transform: translateY(-0.5px);
  background: linear-gradient(
    to right,
    transparent,
    var(--gva-border) 22%,
    var(--gva-border) 78%,
    transparent
  );
  pointer-events: none;
}

.stats-cross-v {
  position: absolute;
  top: 10%;
  bottom: 10%;
  left: 50%;
  width: 1px;
  transform: translateX(-0.5px);
  background: linear-gradient(
    to bottom,
    transparent,
    var(--gva-border) 22%,
    var(--gva-border) 78%,
    transparent
  );
  pointer-events: none;
}

/* ══════════════════════════════════════
   桌面传送带
   ══════════════════════════════════════ */

/* 视口：裁掉两侧缓冲卡，上下 padding 给中间卡上移和阴影留空间 */
.carousel-viewport {
  overflow: hidden;
  padding: 12px 0 16px;
}

/*
  轨道宽度推导（V = 视口宽，g = gap = 18px）：
  单卡宽 w = (V - 2g) / 3
  5 卡总宽 = 5w + 4g = (5V + 2g) / 3 = 166.6667% + 12px
  基准偏移 = w + g = (V + g) / 3 = 33.3333% + 6px
  margin-left 的 % 相对父级（视口），纯 CSS 定位，首屏不闪
*/
.carousel-belt {
  display: flex;
  gap: 18px;
  width: calc(166.6667% + 12px);
  margin-left: calc(-33.3333% - 6px);
  align-items: center;
  will-change: transform;
}

.carousel-card {
  flex: 1 1 0;
  min-width: 0;
  /* 高亮状态渐变：滑动时高亮从旧中心"流"到新中心 */
  transition:
    opacity      0.5s cubic-bezier(0.22, 1, 0.36, 1),
    transform    0.5s cubic-bezier(0.22, 1, 0.36, 1),
    filter       0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow   0.5s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

/* 归位帧：禁用卡片过渡，状态交换瞬时完成 */
.snap-frame .carousel-card {
  transition: none !important;
}

/* 中间高亮卡：上移，清晰 */
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

/* ══════════════════════════════════════
   移动端单张滑动（保持不变）
   ══════════════════════════════════════ */
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

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.52s cubic-bezier(0.4, 0, 0.2, 1),
              opacity   0.52s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-left-enter-from  { transform: translateX(56px);  opacity: 0; }
.slide-left-enter-to    { transform: translateX(0);     opacity: 1; }
.slide-left-leave-from  { transform: translateX(0);     opacity: 1; }
.slide-left-leave-to    { transform: translateX(-56px); opacity: 0; }

.slide-right-enter-from { transform: translateX(-56px); opacity: 0; }
.slide-right-enter-to   { transform: translateX(0);     opacity: 1; }
.slide-right-leave-from { transform: translateX(0);     opacity: 1; }
.slide-right-leave-to   { transform: translateX(56px);  opacity: 0; }
</style>
