<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="gva-head">
        <span class="gva-label">核心功能</span>
        <h2 class="gva-h2" style="margin-top: 16px">亲自试一试：用 <span class="gva-hl">AI 驱动</span>你的 GVA 系统</h2>
        <p class="gva-lead">三个最常用的能力，点开就能一步步看它怎么跑起来。</p>
      </div>

      <div class="cf__grid">
        <button v-for="(d, i) in demos" :key="d.title" class="gva-card gva-card--hover cf__card" @click="openDemo(i)">
          <span class="gva-ghost-num cf__num">{{ d.num }}</span>
          <h3 class="cf__title">{{ d.title }}</h3>
          <p class="cf__desc">{{ d.desc }}</p>
          <span class="gva-link cf__try">试一下 <span class="gva-arrow">→</span></span>
        </button>
      </div>
    </div>

    <!-- wizard modal -->
    <Teleport to="body">
      <Transition name="cf-modal">
        <div v-if="active !== null" class="cf-modal" @click.self="close">
          <div class="cf-modal__panel gva-card">
            <div class="cf-modal__head">
              <div>
                <span class="gva-label" style="margin: 0">{{ demos[active].title }}</span>
                <p class="cf-modal__step">第 {{ step + 1 }} 步 / 共 {{ demos[active].steps.length }} 步</p>
              </div>
              <button class="cf-modal__close" aria-label="关闭" @click="close">✕</button>
            </div>

            <div class="cf-modal__progress">
              <span v-for="(s, i) in demos[active].steps" :key="i" :class="{ on: i <= step }"></span>
            </div>

            <div class="cf-modal__body">
              <div class="cf-modal__icon">{{ demos[active].steps[step].icon }}</div>
              <h4 class="cf-modal__title">{{ demos[active].steps[step].t }}</h4>
              <p class="cf-modal__text">{{ demos[active].steps[step].d }}</p>
            </div>

            <div class="cf-modal__foot">
              <button class="gva-btn gva-btn--ghost" :disabled="step === 0" @click="prev">上一步</button>
              <button v-if="step < demos[active].steps.length - 1" class="gva-btn gva-btn--primary" @click="next">下一步</button>
              <button v-else class="gva-btn gva-btn--primary" @click="close">完成</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const demos = [
  {
    num: '01', title: 'AI 驱动开发', desc: '一句话需求，AI 顺着 GVA 约定写出整套代码。',
    steps: [
      { icon: '💬', t: '描述需求', d: '用自然语言告诉 AI 你想要的业务模块。' },
      { icon: '🧩', t: '生成数据模型', d: 'AI 按 GVA 规范创建模型与迁移文件。' },
      { icon: '🔌', t: '生成 API 与路由', d: '接口、路由、权限规则一并产出。' },
      { icon: '🖥️', t: '生成前端页面', d: '列表、表单、校验对齐现有 UI 风格。' },
    ],
  },
  {
    num: '02', title: 'API 一键 CLI 化', desc: '把现成接口打包成 Agent 可调用的 Skill。',
    steps: [
      { icon: '✅', t: '选择 API', d: '从项目里勾选要开放的接口。' },
      { icon: '📝', t: '填写描述', d: '说明用途与参数，让 AI 看得懂。' },
      { icon: '📦', t: '生成 ZIP', d: '一键打包为标准 Skill 资源。' },
      { icon: '🤖', t: 'Agent 调用', d: '导入 AI 工具后即可直接调用。' },
    ],
  },
  {
    num: '03', title: '权限统一管控', desc: 'Agent 与人共用同一套 RBAC 规则。',
    steps: [
      { icon: '👥', t: '定义角色', d: '管理员、成员、AI Agent 各有边界。' },
      { icon: '🎚️', t: '配置能力', d: '查看、导入、批量、删除逐项授权。' },
      { icon: '🔍', t: '字段级控制', d: '权限可精确到单个字段是否可见。' },
      { icon: '🛡️', t: '全程审计', d: '每一次调用都有记录，可追溯。' },
    ],
  },
]

const active = ref(null)
const step = ref(0)

const openDemo = (i) => { active.value = i; step.value = 0 }
const close = () => { active.value = null }
const next = () => { if (step.value < demos[active.value].steps.length - 1) step.value++ }
const prev = () => { if (step.value > 0) step.value-- }

const onKey = (e) => {
  if (active.value === null) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.cf__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.cf__card {
  text-align: left; padding: 28px; cursor: pointer; background: var(--gva-bg-base);
  position: relative; overflow: hidden; font: inherit;
}
.cf__num { display: block; margin-bottom: 8px; }
.cf__title { font-size: 19px; font-weight: 700; color: var(--gva-text-strong); margin: 0 0 10px; }
.cf__desc { font-size: 14px; color: var(--gva-text-body); margin: 0 0 18px; line-height: 1.6; }
.cf__try { font-size: 14px; }

/* modal */
.cf-modal {
  position: fixed; inset: 0; z-index: 9999; display: grid; place-items: center; padding: 24px;
  background: rgba(6, 8, 15, 0.6); backdrop-filter: blur(6px);
}
.cf-modal__panel { width: 100%; max-width: 460px; padding: 24px; background: var(--gva-bg-base); }
.cf-modal__head { display: flex; align-items: flex-start; justify-content: space-between; }
.cf-modal__step { margin: 8px 0 0; font-size: 13px; color: var(--gva-text-muted); }
.cf-modal__close {
  width: 30px; height: 30px; border-radius: 8px; border: none; cursor: pointer;
  background: var(--gva-primary-soft); color: var(--gva-text-body); font-size: 14px;
}
.cf-modal__progress { display: flex; gap: 6px; margin: 18px 0 22px; }
.cf-modal__progress span {
  flex: 1; height: 4px; border-radius: 999px; background: var(--gva-border-strong);
  transition: background 0.25s ease;
}
.cf-modal__progress span.on { background: var(--gva-primary); }
.cf-modal__body { text-align: center; padding: 12px 8px 24px; }
.cf-modal__icon {
  width: 64px; height: 64px; border-radius: 18px; margin: 0 auto 18px; display: grid; place-items: center;
  font-size: 30px; background: var(--gva-primary-soft);
}
.cf-modal__title { font-size: 19px; font-weight: 700; color: var(--gva-text-strong); margin: 0 0 10px; }
.cf-modal__text { font-size: 14.5px; color: var(--gva-text-body); margin: 0; line-height: 1.6; }
.cf-modal__foot { display: flex; gap: 12px; }
.cf-modal__foot .gva-btn { flex: 1; }
.cf-modal__foot .gva-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.cf-modal-enter-active, .cf-modal-leave-active { transition: opacity 0.2s ease; }
.cf-modal-enter-from, .cf-modal-leave-to { opacity: 0; }

@media (max-width: 860px) {
  .cf__grid { grid-template-columns: 1fr; }
}
</style>
