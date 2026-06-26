<template>
  <section class="gva-section hero">
    <div class="gva-container hero__inner">
      <div class="hero__badge">
        <span class="hero__badge-dot"></span> GVA 3.0 · AI 原生全栈框架
      </div>
      <h1 class="gva-h1 hero__title">
        用 <span class="gva-hl">AI</span> 构建系统，<br />让系统为 <span class="gva-hl">AI</span> 工作
      </h1>
      <p class="gva-lead hero__lead">
        GVA 3.0 将 AI 辅助开发、全栈工程能力与智能调用体系融为一体，从一句话需求到完整业务模块，
        再到可被 Agent 直接调用的 Skill，让每一个业务系统天然具备 AI 能力。
      </p>
      <div class="hero__actions">
        <a class="gva-btn gva-btn--primary" href="https://demo.gin-vue-admin.com" target="_blank" rel="noopener">
          立即体验
        </a>
        <a class="gva-btn gva-btn--ghost" href="/guide/introduce/project">查看文档</a>
      </div>

      <div class="hero__shot">
        <AdminMock play @play="open = true" />
      </div>
    </div>

    <!-- video / product preview lightbox -->
    <Teleport to="body">
      <Transition name="hero-modal">
        <div v-if="open" class="hero-modal" @click.self="open = false">
          <div class="hero-modal__panel">
            <div class="hero-modal__bar">
              <span>产品演示 · Gin-Vue-Admin</span>
              <button class="hero-modal__close" aria-label="关闭" @click="open = false">✕</button>
            </div>
            <div class="hero-modal__stage">
              <iframe
                v-if="open"
                class="hero-modal__frame"
                src="https://demo.gin-vue-admin.com"
                title="Gin-Vue-Admin 在线演示"
                loading="lazy"
                referrerpolicy="no-referrer"
              ></iframe>
              <a class="hero-modal__open" href="https://demo.gin-vue-admin.com" target="_blank" rel="noopener">
                在新窗口打开在线体验 →
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import AdminMock from '../AdminMock.vue'

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
.hero {
  padding-top: 92px;
  padding-bottom: 64px;
  background:
    radial-gradient(900px 460px at 50% -8%, rgba(36, 101, 242, 0.1), transparent 70%),
    var(--gva-bg-base);
  overflow: hidden;
}
.hero__inner { text-align: center; display: flex; flex-direction: column; align-items: center; }
.hero__badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 600;
  color: var(--gva-primary); background: var(--gva-primary-soft);
  border: 1px solid var(--gva-primary-ring); margin-bottom: 22px;
}
.hero__badge-dot { width: 7px; height: 7px; border-radius: 999px; background: var(--gva-primary); }
.hero__title { margin: 0 0 20px; }
.hero__lead { margin: 0 auto 30px; max-width: 680px; }
.hero__actions { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-bottom: 52px; }
.hero__shot { width: 100%; max-width: 980px; }

/* modal */
.hero-modal {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(6, 8, 15, 0.72); backdrop-filter: blur(6px);
  display: grid; place-items: center; padding: 24px;
}
.hero-modal__panel {
  width: 100%; max-width: 1040px; background: #0f1628; border-radius: 16px; overflow: hidden;
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.55); border: 1px solid rgba(255, 255, 255, 0.08);
}
.hero-modal__bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 18px; color: rgba(255, 255, 255, 0.72); font-size: 13.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.hero-modal__close {
  width: 30px; height: 30px; border-radius: 8px; border: none; cursor: pointer;
  background: rgba(255, 255, 255, 0.08); color: #fff; font-size: 14px;
}
.hero-modal__close:hover { background: rgba(255, 255, 255, 0.16); }
.hero-modal__stage { position: relative; aspect-ratio: 16 / 9; background: #060810; }
.hero-modal__frame { width: 100%; height: 100%; border: 0; }
.hero-modal__open {
  position: absolute; right: 14px; bottom: 14px; z-index: 2;
  padding: 8px 14px; border-radius: 999px; font-size: 13px; font-weight: 600;
  background: var(--gva-primary); color: #fff; box-shadow: var(--gva-shadow-primary);
}

.hero-modal-enter-active, .hero-modal-leave-active { transition: opacity 0.2s ease; }
.hero-modal-enter-from, .hero-modal-leave-to { opacity: 0; }

@media (max-width: 860px) {
  .hero { padding-top: 64px; }
  .hero__actions .gva-btn { flex: 1; min-width: 140px; }
}
</style>
