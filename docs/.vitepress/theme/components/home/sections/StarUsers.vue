<template>
  <section class="gva-section !py-[44px] min-[861px]:!py-[100px] lg:!py-[128px] xl:!py-[160px]">
    <div class="gva-container">
      <div class="text-center mb-14 min-[861px]:mb-16 max-[860px]:mb-10">
        <h2 class="text-[clamp(28px,3.8vw,44px)] leading-[1.18] font-bold tracking-[-0.02em] text-[var(--gva-text-strong)]" style="margin-top: 16px">他们都在用 <span class="text-[var(--gva-primary)]">GVA</span></h2>
        <p class="text-[clamp(14px,1.6vw,19px)] leading-[2] text-[var(--gva-text-body)] max-w-[820px] mt-4 mx-auto">从云厂商到内容平台，众多团队把 GVA 用在生产环境。</p>
      </div>

      <!-- ─── 桌面端 + 平板（≥ 521px）：传送带式滑动轮播 ─── -->
      <div
        class="hidden min-[521px]:flex items-center gap-3.5 min-[861px]:gap-5"
        @mouseenter="pause"
        @mouseleave="resume"
      >
        <button
          class="shrink-0 w-[42px] h-[42px] min-[861px]:w-[50px] min-[861px]:h-[50px] rounded-full cursor-pointer border border-[var(--gva-border-strong)] bg-[var(--gva-bg-base)] text-[var(--gva-text-body)] text-[22px] min-[861px]:text-[26px] leading-none transition-all duration-[180ms] hover:border-[var(--gva-primary)] hover:text-[var(--gva-primary)]"
          aria-label="上一组"
          @click="move(-1)"
        >‹</button>

        <!-- 视口：裁切轨道，只露出中间 5 张 -->
        <div class="flex-1 carousel-viewport">
          <!-- 轨道：7 张卡（5 可见 + 左右各 1 缓冲），整体 translateX 滑动 -->
          <div
            ref="trackRef"
            class="carousel-belt"
            :class="{ 'snap-frame': noCardTransition }"
            :style="trackStyle"
            @transitionend="onTrackTransitionEnd"
          >
            <div
              v-for="u in visibleDesktop"
              :key="u.off"
              class="logo-card grid place-items-center p-[18px] min-[861px]:p-7 bg-[var(--gva-bg-base)] border rounded-[var(--gva-radius)]"
              :class="u.off === centerOffset
                ? 'card-center shadow-[shadow:var(--gva-shadow)] border-[var(--gva-primary-ring)]'
                : 'card-side shadow-[shadow:var(--gva-shadow-sm)] border-[var(--gva-border)]'"
            >
              <img
                :src="u.img"
                :alt="u.name"
                loading="lazy"
                class="logo-img max-w-full max-h-12 min-[861px]:max-h-16 object-contain"
                :class="u.off === centerOffset ? 'grayscale-0' : 'grayscale'"
              />
            </div>
          </div>
        </div>

        <button
          class="shrink-0 w-[42px] h-[42px] min-[861px]:w-[50px] min-[861px]:h-[50px] rounded-full cursor-pointer border border-[var(--gva-border-strong)] bg-[var(--gva-bg-base)] text-[var(--gva-text-body)] text-[22px] min-[861px]:text-[26px] leading-none transition-all duration-[180ms] hover:border-[var(--gva-primary)] hover:text-[var(--gva-primary)]"
          aria-label="下一组"
          @click="move(1)"
        >›</button>
      </div>

      <!-- ─── 移动端（≤ 520px）：单张全宽滑动（保持不变）─── -->
      <div
        class="flex min-[521px]:hidden items-center gap-3"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <button
          class="shrink-0 w-[38px] h-[38px] rounded-full cursor-pointer border border-[var(--gva-border-strong)] bg-[var(--gva-bg-base)] text-[var(--gva-text-body)] text-[20px] leading-none transition-all duration-[180ms] hover:border-[var(--gva-primary)] hover:text-[var(--gva-primary)]"
          aria-label="上一个"
          @click="move(-1)"
        >‹</button>

        <div class="flex-1 carousel-mobile-track">
          <TransitionGroup :name="slideDirection" tag="div" class="carousel-mobile-inner">
            <div
              :key="users[current].name + '-' + current"
              class="carousel-mobile-card grid place-items-center h-24 p-[18px] bg-[var(--gva-bg-base)] border rounded-[var(--gva-radius)] shadow-[shadow:var(--gva-shadow)] border-[var(--gva-primary-ring)]"
            >
              <img
                :src="users[current].img"
                :alt="users[current].name"
                loading="lazy"
                class="max-w-full max-h-12 object-contain"
              />
            </div>
          </TransitionGroup>
        </div>

        <button
          class="shrink-0 w-[38px] h-[38px] rounded-full cursor-pointer border border-[var(--gva-border-strong)] bg-[var(--gva-bg-base)] text-[var(--gva-text-body)] text-[20px] leading-none transition-all duration-[180ms] hover:border-[var(--gva-primary)] hover:text-[var(--gva-primary)]"
          aria-label="下一个"
          @click="move(1)"
        >›</button>
      </div>

      <!-- Dots -->
      <div class="flex justify-center gap-[7px] mt-[26px] min-[861px]:mt-[34px] flex-wrap">
        <button
          v-for="(u, i) in users"
          :key="i"
          class="h-2 rounded-full border-0 cursor-pointer transition-all duration-200"
          :class="i === current ? 'w-[22px] bg-[var(--gva-primary)]' : 'w-2 bg-[var(--gva-border-strong)]'"
          :aria-label="u.name"
          @click="jumpTo(i)"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const users = [
  { name: '华数传媒',      img: '/user/huashu-tight.png' },
  { name: 'Alibaba Cloud', img: '/user/ali.svg' },
  { name: 'ByteDance',     img: '/user/zijie.svg' },
  { name: 'Tencent',       img: '/user/tengxun.svg' },
  { name: 'vivo',          img: '/user/vivo-tight.svg' },
  { name: 'Anker',         img: '/user/anker.svg' },
  { name: 'China Mobile',  img: '/user/mobile-tight.png' },
  { name: 'Douyu',         img: '/user/douyu.svg' },
  { name: 'Cadence',       img: '/user/cadence.svg' },
  { name: 'Transsion',     img: '/user/transsion.svg' },
]

const n = users.length
const current = ref(2)
const slideDirection = ref('slide-left') // 仅移动端 TransitionGroup 使用

/* ══════════ 桌面端传送带 ══════════ */

// 7 张卡：偏移 -3 ~ +3，可见的是 -2 ~ +2，±3 是滑动缓冲
const OFFSETS = [-3, -2, -1, 0, 1, 2, 3]
const visibleDesktop = computed(() =>
  OFFSETS.map((off) => {
    const idx = (current.value + off + n * 2) % n
    return { ...users[idx], off }
  })
)

const trackRef = ref(null)
const trackX = ref(0)        // 轨道 translateX 值（px）
const animating = ref(false)
const centerOffset = ref(0)  // 高亮卡的偏移位：动画期间指向来向的卡
const noCardTransition = ref(false) // 归位帧禁用卡片过渡，防止高亮"弹回"
const duration = ref(500)

let stepPx = 0               // 一格的距离 = 卡宽 + gap
let pendingSteps = 0         // dot 跳转的剩余步数
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
  centerOffset.value = d          // 高亮开始滑向来向的卡
  trackX.value = -d * stepPx      // 整条轨道滑动一格
  // transitionend 兜底（tab 切走时不会触发）
  fallbackTimer = setTimeout(finishStep, duration.value + 100)
}

function finishStep() {
  clearTimeout(fallbackTimer)
  if (!animating.value) return
  const d = centerOffset.value

  /*
    归位关键帧：
    1. 先禁用卡片自身的 CSS transition（scale/opacity/border 等）
    2. 同一帧内：轨道 transform 归零 + 数据前移 + 高亮位归零
       此时新渲染结果与滑动终点画面逐像素相同 → 肉眼不可见
    3. 两帧后恢复卡片 transition，供下一次滑动的高亮流动使用
    若不禁用，off=0 和 off=d 两张卡的高亮状态交换会在归位后
    跑一遍 0.5s 过渡动画，视觉上就是高亮"弹一下"。
  */
  noCardTransition.value = true
  animating.value = false
  centerOffset.value = 0
  current.value = (current.value + d + n) % n
  trackX.value = 0

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      noCardTransition.value = false
      // dot 多步跳转：恢复过渡后再滑下一格
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
    // 动画中最多排队 1 步，防止连点堆积
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
    // 移动端：直接跳
    current.value = idx
    return
  }
  if (animating.value) return
  pendingSteps = steps - 1
  pendingDir = d
  duration.value = steps > 1 ? 280 : 500 // 多步时每步加快
  startStep(d)
}

/* ══════════ 自动播放 ══════════ */

let timer = null
const INTERVAL = 3200

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
   桌面传送带
   ══════════════════════════════════════ */

/* 视口：裁掉两侧缓冲卡，上下 padding 给中间卡 scale 留空间 */
.carousel-viewport {
  overflow: hidden;
  padding: 10px 0;
}

/*
  轨道宽度推导（V = 视口宽，g = gap）：
  单卡宽 w = (V - 4g) / 5
  7 卡总宽 = 7w + 6g = (7V + 2g) / 5 = 140% + 0.4g
  基准偏移（让 -2~+2 可见）= w + g = (V + g)/5 = 20% + 0.2g
  margin-left 的 % 相对父级（视口），所以可以纯 CSS 定位，
  无需等 JS 测量，首屏不会闪。
*/
.carousel-belt {
  display: flex;
  gap: 16px;
  width: calc(140% + 6.4px);        /* g=16 */
  margin-left: calc(-20% - 3.2px);
  will-change: transform;
}

@media (min-width: 861px) {
  .carousel-belt {
    gap: 20px;
    width: calc(140% + 8px);        /* g=20 */
    margin-left: calc(-20% - 4px);
  }
}

/* 卡片：flex 均分，高度固定 */
.logo-card {
  flex: 1 1 0;
  min-width: 0;
  height: 96px;
  /* 高亮状态的渐变过渡：滑动时高亮从旧中心"流"到新中心 */
  transition:
    opacity      0.5s cubic-bezier(0.22, 1, 0.36, 1),
    transform    0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow   0.5s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (min-width: 861px) {
  .logo-card {
    height: 128px;
  }
}

.logo-img {
  transition: filter 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

/* 归位帧：禁用所有卡片过渡，状态交换瞬时完成 */
.snap-frame .logo-card,
.snap-frame .logo-img {
  transition: none !important;
}

.card-center {
  opacity: 1;
  transform: scale(1.06);
}

.card-side {
  opacity: 0.55;
  transform: scale(1);
}

/* ══════════════════════════════════════
   移动端单张滑动（保持不变）
   ══════════════════════════════════════ */
.carousel-mobile-track {
  position: relative;
  overflow: hidden;
}

.carousel-mobile-inner {
  position: relative;
  width: 100%;
}

.carousel-mobile-card {
  width: 100%;
}

.slide-left-leave-active.carousel-mobile-card,
.slide-right-leave-active.carousel-mobile-card {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.48s cubic-bezier(0.4, 0, 0.2, 1),
              opacity   0.48s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-left-enter-from  { transform: translateX(50px);  opacity: 0; }
.slide-left-enter-to    { transform: translateX(0);     opacity: 1; }
.slide-left-leave-from  { transform: translateX(0);     opacity: 1; }
.slide-left-leave-to    { transform: translateX(-50px); opacity: 0; }

.slide-right-enter-from { transform: translateX(-50px); opacity: 0; }
.slide-right-enter-to   { transform: translateX(0);     opacity: 1; }
.slide-right-leave-from { transform: translateX(0);     opacity: 1; }
.slide-right-leave-to   { transform: translateX(50px);  opacity: 0; }
</style>