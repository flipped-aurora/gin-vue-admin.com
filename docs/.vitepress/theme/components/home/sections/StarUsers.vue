<template>
  <section class="gva-section !py-[44px] min-[861px]:!py-[100px] lg:!py-[128px] xl:!py-[160px]">
    <div class="gva-container">
      <div class="text-center mb-14 min-[861px]:mb-16 max-[860px]:mb-10">
        <h2 class="text-[clamp(28px,3.8vw,44px)] leading-[1.18] font-bold tracking-[-0.02em] text-[var(--gva-text-strong)]" style="margin-top: 16px">他们都在用 <span class="text-[var(--gva-primary)]">GVA</span></h2>
        <p class="text-[clamp(14px,1.6vw,19px)] leading-[2] text-[var(--gva-text-body)] max-w-[820px] mt-4 mx-auto">从云厂商到内容平台，众多团队把 GVA 用在生产环境。</p>
      </div>

      <!-- ─── 桌面端 + 平板（≥ 521px）：五栏，中间高亮，CSS transition 渐变 ─── -->
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

        <div class="flex-1 grid grid-cols-5 gap-4 min-[861px]:gap-5 items-center carousel-desktop-grid">
          <div
            v-for="(u, i) in visibleDesktop"
            :key="i"
            class="logo-card grid place-items-center h-24 min-[861px]:h-32 p-[18px] min-[861px]:p-7 bg-[var(--gva-bg-base)] border rounded-[var(--gva-radius)]"
            :class="i === 2
              ? 'card-center shadow-[shadow:var(--gva-shadow)] border-[var(--gva-primary-ring)]'
              : 'card-side shadow-[shadow:var(--gva-shadow-sm)] border-[var(--gva-border)]'"
          >
            <img
              :src="u.img"
              :alt="u.name"
              loading="lazy"
              class="logo-img max-w-full max-h-12 min-[861px]:max-h-16 object-contain"
              :class="i === 2 ? 'grayscale-0' : 'grayscale'"
            />
          </div>
        </div>

        <button
          class="shrink-0 w-[42px] h-[42px] min-[861px]:w-[50px] min-[861px]:h-[50px] rounded-full cursor-pointer border border-[var(--gva-border-strong)] bg-[var(--gva-bg-base)] text-[var(--gva-text-body)] text-[22px] min-[861px]:text-[26px] leading-none transition-all duration-[180ms] hover:border-[var(--gva-primary)] hover:text-[var(--gva-primary)]"
          aria-label="下一组"
          @click="move(1)"
        >›</button>
      </div>

      <!-- ─── 移动端（≤ 520px）：单张全宽滑动 ─── -->
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
import { ref, computed, onMounted, onUnmounted } from 'vue'

const users = [
  { name: '华数传媒',     img: '/user/huashu-tight.png' },
  { name: 'Alibaba Cloud', img: '/user/ali.svg' },
  { name: 'ByteDance',    img: '/user/zijie.svg' },
  { name: 'Tencent',      img: '/user/tengxun.svg' },
  { name: 'vivo',         img: '/user/vivo-tight.svg' },
  { name: 'Anker',        img: '/user/anker.svg' },
  { name: 'China Mobile', img: '/user/mobile-tight.png' },
  { name: 'Douyu',        img: '/user/douyu.svg' },
  { name: 'Cadence',      img: '/user/cadence.svg' },
  { name: 'Transsion',    img: '/user/transsion.svg' },
]

const current = ref(2) // 初始让中间位置有内容
const slideDirection = ref('slide-left')

// 桌面端：五张固定位置，key 绑 i（位置），内容随 current 变化
const visibleDesktop = computed(() => {
  const n = users.length
  return [-2, -1, 0, 1, 2].map((off) => {
    const idx = (current.value + off + n) % n
    return { ...users[idx] }
  })
})

function jumpTo(idx) {
  const n = users.length
  const diff = ((idx - current.value) + n) % n
  slideDirection.value = diff <= n / 2 ? 'slide-left' : 'slide-right'
  current.value = idx
}

function move(d) {
  slideDirection.value = d > 0 ? 'slide-left' : 'slide-right'
  const n = users.length
  current.value = (current.value + d + n) % n
}

// 自动播放
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

onMounted(start)
onUnmounted(pause)

// 移动端触摸手势
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
/* ─── 桌面五栏：overflow visible，给 scale(1.06) 留空间 ─── */
.carousel-desktop-grid {
  padding: 8px 4px; /* 上下留给 scale，左右留给阴影 */
}

/* 所有 logo 卡：视觉属性全部 transition */
.logo-card {
  transition:
    opacity      0.36s cubic-bezier(0.4, 0, 0.2, 1),
    transform    0.36s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow   0.36s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-img {
  transition: filter 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 中间高亮 */
.card-center {
  opacity: 1;
  transform: scale(1.06);
}

/* 两侧弱化 */
.card-side {
  opacity: 0.55;
  transform: scale(1);
}

/* ─── 移动端单张 ─── */
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

/* 向左（前进） */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.48s cubic-bezier(0.4, 0, 0.2, 1),
              opacity   0.48s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-left-enter-from { transform: translateX(50px); opacity: 0; }
.slide-left-enter-to   { transform: translateX(0);    opacity: 1; }
.slide-left-leave-from { transform: translateX(0);    opacity: 1; }
.slide-left-leave-to   { transform: translateX(-50px); opacity: 0; }

/* 向右（后退） */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.48s cubic-bezier(0.4, 0, 0.2, 1),
              opacity   0.48s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-right-enter-from { transform: translateX(-50px); opacity: 0; }
.slide-right-enter-to   { transform: translateX(0);     opacity: 1; }
.slide-right-leave-from { transform: translateX(0);     opacity: 1; }
.slide-right-leave-to   { transform: translateX(50px);  opacity: 0; }
</style>