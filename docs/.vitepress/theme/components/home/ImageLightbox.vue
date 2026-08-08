<template>
  <Teleport to="body">
    <Transition name="lb-fade">
      <div
        v-if="open"
        ref="root"
        class="fixed inset-0 z-[9999] bg-[rgba(6,8,15,0.72)] backdrop-blur-[6px] flex flex-col items-center justify-center px-6 py-14 max-[860px]:px-3 max-[860px]:py-10"
        role="dialog"
        aria-modal="true"
        :aria-label="`图片查看器，第 ${index + 1} / ${slides.length} 张`"
        @click.self="close"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <!-- 关闭：右上角 -->
        <button
          ref="closeBtn"
          class="lb-glass absolute right-5 top-5 z-[2] w-9 h-9 rounded-[10px] grid place-items-center text-white text-[15px] leading-none max-[860px]:right-3 max-[860px]:top-3"
          aria-label="关闭"
          @click="close"
        >
          ✕
        </button>

        <!-- 上一张 / 下一张 -->
        <button
          v-if="slides.length > 1"
          class="lb-glass absolute left-5 top-1/2 -translate-y-1/2 z-[2] w-11 h-11 rounded-full grid place-items-center text-white text-[18px] leading-none max-[860px]:hidden"
          aria-label="上一张"
          @click.stop="move(-1)"
        >
          ‹
        </button>
        <button
          v-if="slides.length > 1"
          class="lb-glass absolute right-5 top-1/2 -translate-y-1/2 z-[2] w-11 h-11 rounded-full grid place-items-center text-white text-[18px] leading-none max-[860px]:hidden"
          aria-label="下一张"
          @click.stop="move(1)"
        >
          ›
        </button>

        <!-- 图片：与轮播一致的 slide-left/slide-right 滑动 -->
        <div class="relative flex-1 w-full flex items-center justify-center min-h-0" @click.self="close">
          <TransitionGroup :name="direction" tag="div" class="contents">
            <img
              :key="slides[index] + index"
              :src="slides[index]"
              :alt="`GVA 演示 ${index + 1}`"
              loading="lazy"
              class="lb-img max-w-[92vw] max-h-full w-auto h-auto object-contain rounded-[var(--gva-radius)] shadow-[0_40px_90px_rgba(0,0,0,0.55)] select-none"
              draggable="false"
            />
          </TransitionGroup>
        </div>

        <!-- 圆点：与轮播一致 -->
        <div v-if="slides.length > 1" class="flex justify-center gap-2 mt-5 shrink-0">
          <button
            v-for="(s, i) in slides"
            :key="i"
            class="h-2 rounded-full border-none cursor-pointer transition-all duration-200"
            :class="i === index ? 'w-[22px] bg-[var(--gva-primary)]' : 'w-2 bg-[rgba(255,255,255,0.32)] hover:bg-[rgba(255,255,255,0.5)]'"
            :aria-label="`第 ${i + 1} 张`"
            @click.stop="jumpTo(i)"
          ></button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'

const props = defineProps({
  slides: { type: Array, required: true },
  open: { type: Boolean, default: false },
  index: { type: Number, default: 0 },
})
const emit = defineEmits(['update:open', 'update:index'])

const direction = ref('slide-left')
const closeBtn = ref(null)

/* 打开前的焦点，关闭后还回去 */
let lastFocused = null

function close() {
  emit('update:open', false)
}

function move(d) {
  const n = props.slides.length
  if (n < 2) return
  direction.value = d > 0 ? 'slide-left' : 'slide-right'
  emit('update:index', (props.index + d + n) % n)
}

function jumpTo(i) {
  if (i === props.index) return
  const n = props.slides.length
  // 与轮播一致：按最短路径决定滑入方向
  const diff = ((i - props.index) + n) % n
  direction.value = diff <= n / 2 ? 'slide-left' : 'slide-right'
  emit('update:index', i)
}

/* 键盘：Esc 关闭、←/→ 切换 */
function onKey(e) {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') move(-1)
  else if (e.key === 'ArrowRight') move(1)
}

/* 触摸滑动 */
let touchStartX = 0
function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
}
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1)
}

/* 打开时锁滚动 + 接管键盘 + 移焦到关闭按钮 */
watch(
  () => props.open,
  async (v) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = v ? 'hidden' : ''
    if (v) {
      lastFocused = document.activeElement
      window.addEventListener('keydown', onKey)
      await nextTick()
      closeBtn.value?.focus()
    } else {
      window.removeEventListener('keydown', onKey)
      lastFocused?.focus?.()
      lastFocused = null
    }
  }
)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<style scoped>
/* 玻璃质感按钮：关闭 + 左右箭头共用 */
.lb-glass {
  border: none;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  transition: background 0.18s ease, transform 0.18s ease;
}
.lb-glass:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.06);
}
.lb-glass:focus-visible {
  outline: 2px solid var(--gva-primary);
  outline-offset: 2px;
}

/* 遮罩淡入 + 图片轻微放大（0.96 → 1） */
.lb-fade-enter-active,
.lb-fade-leave-active {
  transition: opacity 0.24s ease;
}
.lb-fade-enter-active .lb-img,
.lb-fade-leave-active .lb-img {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.lb-fade-enter-from,
.lb-fade-leave-to {
  opacity: 0;
}
.lb-fade-enter-from .lb-img,
.lb-fade-leave-to .lb-img {
  transform: scale(0.96);
  opacity: 0;
}

/* 层内切换：与 VideoSection 轮播完全一致 */
.lb-img {
  will-change: transform, opacity;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.52s cubic-bezier(0.4, 0, 0.2, 1),
              opacity   0.52s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-left-leave-active,
.slide-right-leave-active {
  position: absolute;
}
.slide-left-enter-from  { transform: translateX(56px);  opacity: 0; }
.slide-left-leave-to    { transform: translateX(-56px); opacity: 0; }
.slide-right-enter-from { transform: translateX(-56px); opacity: 0; }
.slide-right-leave-to   { transform: translateX(56px);  opacity: 0; }
</style>
