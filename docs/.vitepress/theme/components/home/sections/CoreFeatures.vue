<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="text-center mb-14 max-[860px]:mb-10">
        <span class="inline-flex items-center gap-2 mb-4 text-[13px] font-semibold tracking-[0.02em] text-[var(--gva-primary)] before:content-[''] before:w-[7px] before:h-[7px] before:rounded-full before:bg-[var(--gva-primary)] before:shadow-[0_0_0_4px_var(--gva-primary-soft)]">核心功能</span>
        <h2 class="text-[clamp(28px,3.6vw,40px)] leading-[1.18] font-bold tracking-[-0.02em] text-[var(--gva-text-strong)]" style="margin-top: 16px">亲自试一试：用 <span class="text-[var(--gva-primary)]">AI 驱动</span>你的 GVA 系统</h2>
        <p class="text-[clamp(15px,1.5vw,18px)] leading-[2] text-[var(--gva-text-body)] max-w-[820px] mt-4 mb-0 mx-auto">三个最常用的能力，点开就能一步步看它怎么跑起来。</p>
      </div>

      <div class="grid grid-cols-1 gap-[22px] min-[860px]:grid-cols-3">
        <button v-for="(d, i) in demos" :key="d.title" class="relative overflow-hidden p-7 text-left cursor-pointer [font:inherit] bg-[var(--gva-bg-base)] border border-[var(--gva-border)] rounded-[var(--gva-radius)] shadow-[shadow:var(--gva-shadow-sm)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[3px] hover:shadow-[shadow:var(--gva-shadow)] hover:border-[var(--gva-border-strong)]" @click="openDemo(i)">
          <span class="block mb-2 text-[clamp(40px,5vw,64px)] font-extrabold leading-none text-[var(--gva-ghost-num)] tracking-[-0.02em]">{{ d.num }}</span>
          <h3 class="text-[19px] font-bold text-[var(--gva-text-strong)] m-0 mb-2.5">{{ d.title }}</h3>
          <p class="text-[14px] text-[var(--gva-text-body)] m-0 mb-[18px] leading-[1.6]">{{ d.desc }}</p>
          <span class="group inline-flex items-center gap-1.5 text-[var(--gva-primary)] font-semibold text-[14px] hover:text-[var(--gva-primary-hover)]">试一下 <span class="transition-transform group-hover:translate-x-[3px]">→</span></span>
        </button>
      </div>
    </div>

    <!-- wizard modal -->
    <Teleport to="body">
      <Transition name="cf-modal">
        <div v-if="active !== null" class="fixed inset-0 z-[9999] grid place-items-center p-6 bg-[rgba(6,8,15,0.6)] backdrop-blur-[6px]" @click.self="close">
          <div class="w-full max-w-[460px] p-6 bg-[var(--gva-bg-base)] border border-[var(--gva-border)] rounded-[var(--gva-radius)] shadow-[shadow:var(--gva-shadow-sm)] transition-[transform,box-shadow,border-color] duration-200">
            <div class="flex items-start justify-between">
              <div>
                <span class="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.02em] text-[var(--gva-primary)] before:content-[''] before:w-[7px] before:h-[7px] before:rounded-full before:bg-[var(--gva-primary)] before:shadow-[0_0_0_4px_var(--gva-primary-soft)]" style="margin: 0">{{ demos[active].title }}</span>
                <p class="m-0 mt-2 text-[13px] text-[var(--gva-text-muted)]">第 {{ step + 1 }} 步 / 共 {{ demos[active].steps.length }} 步</p>
              </div>
              <button class="w-[30px] h-[30px] rounded-[8px] border-none cursor-pointer bg-[var(--gva-primary-soft)] text-[var(--gva-text-body)] text-[14px]" aria-label="关闭" @click="close">✕</button>
            </div>

            <div class="flex gap-1.5 mt-[18px] mb-[22px]">
              <span v-for="(s, i) in demos[active].steps" :key="i" class="flex-1 h-1 rounded-full transition-[background] duration-[250ms]" :class="{ 'bg-[var(--gva-primary)]': i <= step, 'bg-[var(--gva-border-strong)]': i > step }"></span>
            </div>

            <div class="text-center pt-3 px-2 pb-6">
              <div class="w-16 h-16 rounded-[18px] mx-auto mb-[18px] grid place-items-center text-[30px] bg-[var(--gva-primary-soft)]">{{ demos[active].steps[step].icon }}</div>
              <h4 class="text-[19px] font-bold text-[var(--gva-text-strong)] m-0 mb-2.5">{{ demos[active].steps[step].t }}</h4>
              <p class="text-[14.5px] text-[var(--gva-text-body)] m-0 leading-[1.6]">{{ demos[active].steps[step].d }}</p>
            </div>

            <div class="flex gap-3">
              <button class="inline-flex items-center justify-center gap-2 h-[43px] max-[860px]:h-12 px-7 rounded-[8px] text-[14px] font-normal cursor-pointer whitespace-nowrap border border-[var(--gva-primary)] bg-transparent text-[var(--gva-primary)] transition-[transform,box-shadow,background-color,border-color,color] duration-200 hover:border-[var(--gva-primary)] hover:text-[var(--gva-primary)] flex-1 disabled:opacity-40 disabled:cursor-not-allowed" :disabled="step === 0" @click="prev">上一步</button>
              <button v-if="step < demos[active].steps.length - 1" class="inline-flex items-center justify-center gap-2 h-[43px] max-[860px]:h-12 px-7 rounded-[8px] text-[14px] font-normal cursor-pointer whitespace-nowrap border border-transparent bg-[var(--gva-primary)] text-white transition-[transform,box-shadow,background-color,border-color,color] duration-200 hover:bg-[var(--gva-primary-hover)] hover:text-white hover:-translate-y-px flex-1 disabled:opacity-40 disabled:cursor-not-allowed" @click="next">下一步</button>
              <button v-else class="inline-flex items-center justify-center gap-2 h-[43px] max-[860px]:h-12 px-7 rounded-[8px] text-[14px] font-normal cursor-pointer whitespace-nowrap border border-transparent bg-[var(--gva-primary)] text-white transition-[transform,box-shadow,background-color,border-color,color] duration-200 hover:bg-[var(--gva-primary-hover)] hover:text-white hover:-translate-y-px flex-1 disabled:opacity-40 disabled:cursor-not-allowed" @click="close">完成</button>
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
/* Vue <Transition name="cf-modal"> enter/leave classes — applied by Vue at
   runtime, and the name prop is markup we must not change, so these cannot be
   expressed as static Tailwind utilities. */
.cf-modal-enter-active, .cf-modal-leave-active { transition: opacity 0.2s ease; }
.cf-modal-enter-from, .cf-modal-leave-to { opacity: 0; }
</style>
