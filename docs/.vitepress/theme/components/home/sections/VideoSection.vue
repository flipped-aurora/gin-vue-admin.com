<template>
  <section class="relative -mt-[60px] z-10 pt-[40px] px-6 pb-20 min-[861px]:bg-[linear-gradient(to_bottom,#F9F9F9_67%,transparent_67%)] min-[861px]:dark:bg-[linear-gradient(to_bottom,var(--gva-bg-base)_67%,transparent_67%)] max-[860px]:mt-0 max-[860px]:bg-[var(--gva-bg-base)] max-[860px]:pt-7 max-[860px]:px-4 max-[860px]:pb-0">
    <div class="max-w-[860px] min-[2560px]:max-w-[1100px] mx-auto p-4 bg-white rounded-2xl shadow-[shadow:var(--gva-shadow-sm)] dark:bg-[var(--gva-bg-dark-soft)] max-[860px]:rounded-[14px]">
      <!-- 标题行：左对齐，小播放图标 + 文案 -->
      <div class="flex items-center gap-2.5 mb-2.5 max-[860px]:mb-3">
        <span class="inline-flex text-[var(--gva-primary)]" aria-hidden="true">
          <img class="block w-[18px] h-[18px]" :src="playerIcon" alt="" />
        </span>
        <span class="text-[14px] font-medium text-[var(--gva-text-strong)] max-[860px]:font-semibold">观看工作流程演示</span>
      </div>

      <!-- ═══ 轮播图（暂时替换 video）═══
           盒子比例与轮播图一致（aspect-[35/19] = 2940×1596），object-cover 铺满无黑边；
           动画复刻 Community.vue 的单张全宽滑动：translateX(56px) + 透明度，
           cubic-bezier(0.4,0,0.2,1) 0.52s，自动播放 3.5s、hover 暂停、触摸、圆点。 -->
      <div
        class="relative w-full aspect-[35/19] rounded-[4px] overflow-hidden bg-[#eef1f6] dark:bg-[#161c2b] max-[860px]:rounded-lg"
        @mouseenter="pause"
        @mouseleave="resume"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <TransitionGroup :name="slideDirection" tag="div" class="absolute inset-0">
          <img
            :key="slides[current] + current"
            :src="slides[current]"
            :alt="`GVA 演示 ${current + 1}`"
            class="carousel-slide absolute inset-0 w-full h-full object-cover select-none"
            draggable="false"
          />
        </TransitionGroup>
      </div>

      <!-- 圆点：样式与 Community.vue 一致 -->
      <div class="flex justify-center gap-2 mt-4">
        <button
          v-for="(s, i) in slides"
          :key="i"
          class="h-2 rounded-full border-none cursor-pointer transition-all duration-200"
          :class="i === current ? 'w-[22px] bg-[var(--gva-primary)]' : 'w-2 bg-[var(--gva-border-strong)]'"
          :aria-label="`第 ${i + 1} 张`"
          @click="jumpTo(i)"
        ></button>
      </div>

      <!-- ═══ 原 video 区（暂时注释，保留以便恢复）═══
      <div class="relative w-full aspect-[16/9] rounded-[4px] overflow-hidden max-[860px]:aspect-[306/236] max-[860px]:rounded-lg">
        TODO: 替换为真实 GVA Admin 截图（先用占位）
        <div class="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#eef1f6,#e3e8f0)] dark:bg-[linear-gradient(135deg,#161c2b,#10141f)]" role="img" aria-label="GVA Admin 系统截图（占位）">
          <span class="text-[14px] text-[var(--gva-text-muted)] tracking-[0.02em]">GVA Admin 截图（占位）</span>
        </div>
        <button class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-none cursor-pointer bg-[rgba(255,255,255,0.58)] backdrop-blur-[10px] grid place-items-center shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition-[transform,box-shadow] duration-[180ms] hover:scale-[1.06] max-[860px]:w-10 max-[860px]:h-10" aria-label="播放工作流程演示视频" @click="open = true">
          <span class="w-0 h-0 ml-1 border-t-[11px] border-t-transparent border-b-[11px] border-b-transparent border-l-[18px] border-l-[rgba(31,41,55,0.88)] max-[860px]:ml-[3px] max-[860px]:border-t-[8px] max-[860px]:border-b-[8px] max-[860px]:border-l-[13px]" aria-hidden="true"></span>
        </button>
      </div>
      ═══ 原 video 区 end ═══ -->
    </div>

    <!-- ═══ 原播放弹层（暂时注释，保留以便恢复）═══
    <Teleport to="body">
      <Transition name="vsec-modal">
        <div v-if="open" class="fixed inset-0 z-[9999] bg-[rgba(6,8,15,0.72)] backdrop-blur-[6px] grid place-items-center p-6" @click.self="open = false">
          <div class="relative w-full max-w-[1040px] bg-[#0f1628] rounded-2xl overflow-hidden shadow-[0_40px_90px_rgba(0,0,0,0.55)] border border-[rgba(255,255,255,0.08)]">
            <button class="absolute right-3 top-3 z-[2] w-8 h-8 rounded-lg border-none cursor-pointer bg-[rgba(255,255,255,0.12)] text-white text-[14px] hover:bg-[rgba(255,255,255,0.2)]" aria-label="关闭" @click="open = false">✕</button>
            <div class="relative aspect-[16/9] bg-[#060810] grid place-items-center">
              <video
                v-if="videoSrc"
                class="w-full h-full"
                :src="videoSrc"
                controls
                autoplay
                playsinline
              ></video>
              TODO: 在下方 videoSrc 填入工作流程演示视频地址后即可播放
              <div v-else class="text-[rgba(255,255,255,0.6)] text-[14px]">视频地址待填入（VideoSection.vue → videoSrc）</div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    ═══ 原播放弹层 end ═══ -->
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import playerIcon from '@/public/web/player.png'

/* ═══════════════════════════════════════════════════════════════
   轮播图（暂时替换 video）
   动画与 Community.vue 的移动端单张滑动完全一致：
   TransitionGroup + slide-left/slide-right，translateX(56px) + 透明度，
   cubic-bezier(0.4,0,0.2,1) 0.52s，自动播放 3.5s、hover 暂停、圆点、触摸。
   ═══════════════════════════════════════════════════════════════ */
const slides = [
  '/web/lbt1.png',
  '/web/lbt2.png',
  '/web/lbt3.png',
  '/web/lbt4.png',
  '/web/lbt5.png',
]
const n = slides.length
const current = ref(0)
const slideDirection = ref('slide-left') // 供 TransitionGroup 的 :name 使用

function move(d) {
  slideDirection.value = d > 0 ? 'slide-left' : 'slide-right'
  current.value = (current.value + d + n) % n
}

function jumpTo(i) {
  if (i === current.value) return
  // 与 Community.vue 一致：按最短路径决定滑入方向
  const diff = ((i - current.value) + n) % n
  const forward = diff <= n / 2
  slideDirection.value = forward ? 'slide-left' : 'slide-right'
  current.value = i
}

/* 自动播放（间隔与 Community.vue 一致：3500ms） */
let timer = null
const INTERVAL = 3500
function start() { timer = setInterval(() => move(1), INTERVAL) }
function pause() { clearInterval(timer); timer = null }
function resume() { if (!timer) start() }

/* 移动端触摸 */
let touchStartX = 0
function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
  pause()
}
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1)
  resume()
}

onMounted(start)
onUnmounted(pause)

/* ═══ 原 video / 播放弹层逻辑（暂时注释，保留以便恢复）═══
import { watch, onBeforeUnmount } from 'vue'

// TODO: 填入工作流程演示视频地址（留空时弹层显示占位提示）
const videoSrc = ''
const open = ref(false)

const onKey = (e) => { if (e.key === 'Escape') open.value = false }
watch(open, (v) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = v ? 'hidden' : ''
})
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
═══ 原 video / 播放弹层逻辑 end ═══ */
</script>

<style scoped>
/* ═══════════════════════════════════════════
   轮播滑动动画 —— 与 Community.vue 完全一致
   enter/leave 的 <img> 均为 absolute inset-0，天然重叠形成"滑动+交叉淡入"
   ═══════════════════════════════════════════ */
.carousel-slide {
  will-change: transform, opacity;
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

/* ═══ 原播放弹层过渡（暂时注释，保留以便恢复）═══
.vsec-modal-enter-active, .vsec-modal-leave-active { transition: opacity 0.2s ease; }
.vsec-modal-enter-from, .vsec-modal-leave-to { opacity: 0; }
═══ 原播放弹层过渡 end ═══ */
</style>
