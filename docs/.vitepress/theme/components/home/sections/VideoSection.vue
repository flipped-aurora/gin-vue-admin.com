<template>
  <section class="vsec">
    <div class="vsec__card">
      <!-- 标题行：左对齐，小播放图标 + 文案 -->
      <div class="vsec__head">
        <span class="vsec__head-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <rect x="3" y="4" width="18" height="16" rx="3" fill="currentColor" opacity="0.16" />
            <path d="M10 9.2v5.6l4.6-2.8z" fill="currentColor" />
          </svg>
        </span>
        <span class="vsec__head-text">观看工作流程演示</span>
      </div>

      <!-- 视频区：16:9，封面（占位）+ 居中蓝色播放按钮 -->
      <div class="vsec__player">
        <!-- TODO: 替换为真实 GVA Admin 截图（先用占位） -->
        <div class="vsec__cover" role="img" aria-label="GVA Admin 系统截图（占位）">
          <span class="vsec__cover-hint">GVA Admin 截图（占位）</span>
        </div>
        <button class="vsec__play" aria-label="播放工作流程演示视频" @click="open = true">
          <svg viewBox="0 0 24 24" width="26" height="26">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 播放弹层 -->
    <Teleport to="body">
      <Transition name="vsec-modal">
        <div v-if="open" class="vsec-modal" @click.self="open = false">
          <div class="vsec-modal__panel">
            <button class="vsec-modal__close" aria-label="关闭" @click="open = false">✕</button>
            <div class="vsec-modal__stage">
              <video
                v-if="videoSrc"
                class="vsec-modal__video"
                :src="videoSrc"
                controls
                autoplay
                playsinline
              ></video>
              <!-- TODO: 在下方 videoSrc 填入工作流程演示视频地址后即可播放 -->
              <div v-else class="vsec-modal__placeholder">视频地址待填入（VideoSection.vue → videoSrc）</div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

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
</script>

<style scoped>
.vsec {
  position: relative;
  /* 上 padding 与 Hero 的缩短值配合，使卡片顶部从首屏底部露出 ~70px。
     下 padding 保持 80px 留白。 */
  padding: 60px 24px 80px;
  background: var(--gva-bg-base);
}

.vsec__card {
  max-width: var(--gva-content);
  margin: 0 auto;
  padding: 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow: var(--gva-shadow-lg);
}
.dark .vsec__card { background: var(--gva-bg-dark-soft); }

/* 标题行 */
.vsec__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.vsec__head-icon { display: inline-flex; color: var(--gva-primary); }
.vsec__head-text {
  font-size: 18px;
  font-weight: 500;
  color: var(--gva-text-strong);
}

/* 视频区 16:9 */
.vsec__player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
}
.vsec__cover {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #eef1f6, #e3e8f0);
}
.dark .vsec__cover { background: linear-gradient(135deg, #161c2b, #10141f); }
.vsec__cover-hint {
  font-size: 14px;
  color: var(--gva-text-muted);
  letter-spacing: 0.02em;
}

/* 居中播放按钮 */
.vsec__play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: var(--gva-primary);
  color: #fff;
  display: grid;
  place-items: center;
  box-shadow: 0 12px 30px rgba(36, 101, 242, 0.45);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.vsec__play:hover { transform: translate(-50%, -50%) scale(1.06); }
.vsec__play svg { margin-left: 3px; }

/* 弹层 */
.vsec-modal {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(6, 8, 15, 0.72); backdrop-filter: blur(6px);
  display: grid; place-items: center; padding: 24px;
}
.vsec-modal__panel {
  position: relative;
  width: 100%; max-width: 1040px;
  background: #0f1628; border-radius: 16px; overflow: hidden;
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.vsec-modal__close {
  position: absolute; right: 12px; top: 12px; z-index: 2;
  width: 32px; height: 32px; border-radius: 8px; border: none; cursor: pointer;
  background: rgba(255, 255, 255, 0.12); color: #fff; font-size: 14px;
}
.vsec-modal__close:hover { background: rgba(255, 255, 255, 0.2); }
.vsec-modal__stage {
  position: relative; aspect-ratio: 16 / 9; background: #060810;
  display: grid; place-items: center;
}
.vsec-modal__video { width: 100%; height: 100%; }
.vsec-modal__placeholder { color: rgba(255, 255, 255, 0.6); font-size: 14px; }

.vsec-modal-enter-active, .vsec-modal-leave-active { transition: opacity 0.2s ease; }
.vsec-modal-enter-from, .vsec-modal-leave-to { opacity: 0; }

@media (max-width: 860px) {
  .vsec { padding: 24px 16px 56px; }
  .vsec__card { padding: 20px; }
}
</style>
