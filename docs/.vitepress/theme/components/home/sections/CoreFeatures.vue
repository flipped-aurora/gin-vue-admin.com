<template>
  <section class="gva-section bg-white">
    <div class="gva-container">
      <!-- 标题区 -->
      <div class="mb-14 text-center max-[859px]:mb-10">
        <!-- UI 图中不显示原标签 -->
        <span class="hidden">核心功能</span>

        <h2
          class="m-0 text-[clamp(28px,3.6vw,40px)] font-bold leading-[1.18] tracking-[-0.02em] text-[var(--gva-text-strong)] max-[859px]:text-[34px] max-[859px]:leading-[1.22]"
        >
          <span class="block">亲自试一试：</span>

          <span class="block">
            用
            <span class="text-[var(--gva-primary)]">AI 驱动</span>你的 GVA 系统
          </span>
        </h2>

        <p
          class="mx-auto mb-0 mt-4 max-w-[820px] text-[clamp(15px,1.5vw,18px)] leading-[2] text-[var(--gva-text-body)] max-[859px]:mt-3 max-[859px]:text-[14px] max-[859px]:leading-[1.65]"
        >
          选择你的方式——AI 搭建、API CLI 化、或统一管控权限
        </p>
      </div>

      <!-- 功能卡片 -->
      <div
        class="grid grid-cols-1 gap-6 min-[860px]:grid-cols-3 min-[1200px]:gap-8"
      >
        <button
          v-for="(demo, index) in demos"
          :key="demo.title"
          type="button"
          class="group relative flex h-full w-full flex-col overflow-hidden rounded-[12px] borderd  bg-white p-7 text-left [font:inherit] transition-[transform,border-color] duration-200 hover:-translate-y-[2px] hover:border-[#B7C2D2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#347CF3]/25 min-[860px]:min-h-[310px] max-[859px]:min-h-0 max-[859px]:rounded-[12px] max-[859px]:p-6"
          @click="openDemo(index)"
        >
          <!-- 淡蓝数字 -->
          <span
            class="mb-2 block select-none bg-[linear-gradient(180deg,#CEDBFF_0%,#DEE7FF_58%,#EDF2FF_100%)] bg-clip-text text-[clamp(40px,5vw,64px)] font-extrabold leading-none tracking-[-0.02em] text-transparent max-[859px]:text-[52px]"
          >
            {{ demo.num }}
          </span>

          <!-- 卡片标题 -->
          <h3
            class="m-0 mb-2.5 text-[19px] font-bold leading-[1.35] tracking-[-0.015em] text-[var(--gva-text-strong)] max-[859px]:text-[20px]"
          >
            {{ demo.title }}
          </h3>

          <!-- 卡片描述 -->
          <p
            class="m-0 text-[14px] font-normal leading-[1.6] text-[var(--gva-text-body)] max-[859px]:text-[14px] max-[859px]:leading-[1.7]"
          >
            {{ demo.desc }}
          </p>

          <!-- 底部入口 -->
          <span
            class="relative mt-auto inline-flex w-fit items-center gap-2.5 pb-[13px] pt-[18px] text-[16px] font-medium leading-none text-[#0b72ff] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#287cff] after:content-[''] max-[859px]:text-[17px]"
          >
            试一下

            <img
              class="block h-3.5 w-3.5 object-contain"
              :src="arrRightIcon"
              alt=""
              aria-hidden="true"
            />
          </span>
        </button>
      </div>
    </div>

    <!-- 向导弹窗 -->
    <Teleport to="body">
      <Transition name="cf-modal">
        <div
          v-if="active !== null"
          class="fixed inset-0 z-[9999] grid place-items-center bg-[rgba(6,8,15,0.6)] p-6 backdrop-blur-[6px]"
          @click.self="close"
        >
          <div
            class="w-full max-w-[820px] rounded-[var(--gva-radius)] border border-[var(--gva-border)] bg-[var(--gva-bg-base)] p-6 shadow-[var(--gva-shadow-sm)] max-[859px]:rounded-[14px] max-[859px]:p-4"
          >
            <div class="flex justify-end">
              <button
                type="button"
                class="grid h-[30px] w-[30px] shrink-0 cursor-pointer place-items-center rounded-[8px] border-0 bg-[var(--gva-primary-soft)] text-[14px] text-[var(--gva-text-body)]"
                aria-label="关闭"
                @click="close"
              >
                ✕
              </button>
            </div>

            <!-- 进度条 -->
            <div class="mb-[22px] mt-[18px] flex gap-1.5">
              <span
                v-for="(_, index) in demos[active].steps"
                :key="index"
                class="h-1 flex-1 rounded-full transition-colors duration-[250ms]"
                :class="
                  index <= step
                    ? 'bg-[var(--gva-primary)]'
                    : 'bg-[var(--gva-border-strong)]'
                "
              ></span>
            </div>

            <!-- 截图 + 热点提示 -->
            <div
              class="relative mt-1 aspect-[16/10] w-full overflow-hidden rounded-[10px] border border-[var(--gva-border)] bg-[#15171c]"
            >
              <!-- 占位截图：实际素材就位后替换此区块 -->
              <div class="absolute inset-0 flex flex-col">
                <div
                  class="flex h-[34px] shrink-0 items-center gap-[6px] border-b border-white/10 px-3"
                >
                  <span class="h-[9px] w-[9px] rounded-full bg-white/15"></span>
                  <span class="h-[9px] w-[9px] rounded-full bg-white/15"></span>
                  <span class="h-[9px] w-[9px] rounded-full bg-white/15"></span>
                </div>

                <div class="flex min-h-0 flex-1">
                  <div
                    class="hidden w-[64px] shrink-0 border-r border-white/10 bg-white/[0.03] sm:block"
                  ></div>

                  <div
                    class="flex flex-1 flex-col items-center justify-center gap-[10px] bg-[#1b1e25] text-white/65"
                  >
                    <span class="text-[36px] leading-none">
                      {{ currentStep.icon }}
                    </span>

                    <span class="text-[13px] font-medium">
                      {{ currentStep.t }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 热点：靶心圆 + 放大脉冲环 -->
              <button
                type="button"
                class="absolute z-10 grid h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center border-0 bg-transparent p-0"
                :style="{
                  left: currentStep.hotspot.x + '%',
                  top: currentStep.hotspot.y + '%',
                }"
                :aria-label="
                  step < demos[active].steps.length - 1 ? '下一步' : '完成'
                "
                @mouseenter="showTip = true"
                @click="advance"
              >
                <span
                  class="cf-pulse-ring pointer-events-none absolute h-[26px] w-[26px] rounded-full border border-[var(--gva-primary)]"
                ></span>

                <span
                  class="relative grid h-[26px] w-[26px] place-items-center rounded-full bg-[var(--gva-primary)] shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
                >
                  <span
                    class="h-[11px] w-[11px] rounded-full border-2 border-[#0b0e16]"
                  ></span>
                </span>
              </button>

              <!-- 轻提示气泡：web hover 唤出，移动端 2s 后自动唤出 -->
              <Transition name="cf-tip">
                <div
                  v-if="showTip"
                  class="absolute z-10 w-[190px] rounded-[10px] bg-[var(--gva-primary)] px-[14px] py-[12px] text-[13px] font-medium leading-[1.5] text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.45)]"
                  :style="tipStyle"
                >
                  {{ currentStep.d }}

                  <span
                    class="absolute h-[9px] w-[9px] rotate-45 bg-[var(--gva-primary)]"
                    :style="tailStyle"
                  ></span>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import arrRightIcon from '@/public/web/arr-right.png'

const demos = [
  {
    num: '01',
    title: 'AI 驱动开发',
    desc: '用 Claude Code、Cursor、Codex 等主流 AI Coding Agent 快速搭建完整系统。执行 gva init，Skills 自动安装就位，无需手动配置任何规范文件。',
    steps: [
      {
        icon: '💬',
        t: '描述需求',
        d: '用自然语言告诉 AI 你想要的业务模块。',
        hotspot: { x: 50, y: 70, side: 'right' },
      },
      {
        icon: '🧩',
        t: '生成数据模型',
        d: 'AI 按 GVA 规范创建模型与迁移文件。',
        hotspot: { x: 38, y: 42, side: 'right' },
      },
      {
        icon: '🔌',
        t: '生成 API 与路由',
        d: '接口、路由、权限规则一并产出。',
        hotspot: { x: 62, y: 55, side: 'left' },
      },
      {
        icon: '🖥️',
        t: '生成前端页面',
        d: '列表、表单、校验对齐现有 UI 风格。',
        hotspot: { x: 55, y: 35, side: 'left' },
      },
    ],
  },
  {
    num: '02',
    title: 'API 一键 CLI 化',
    desc: '在 GVA 中选择已有 API，填写 Skill 名称，系统自动分析入参、出参与调用依赖关系，生成完整 Skill 文件，任何 AI Agent 开箱即用。',
    steps: [
      {
        icon: '✅',
        t: '选择 API',
        d: '从项目里勾选要开放的接口。',
        hotspot: { x: 35, y: 50, side: 'right' },
      },
      {
        icon: '📝',
        t: '填写描述',
        d: '说明用途与参数，让 AI 看得懂。',
        hotspot: { x: 58, y: 65, side: 'left' },
      },
      {
        icon: '📦',
        t: '生成 ZIP',
        d: '一键打包为标准 Skill 资源。',
        hotspot: { x: 50, y: 40, side: 'right' },
      },
      {
        icon: '🤖',
        t: 'Agent 调用',
        d: '导入 AI 工具后即可直接调用。',
        hotspot: { x: 65, y: 50, side: 'left' },
      },
    ],
  },
  {
    num: '03',
    title: '权限统一管控',
    desc: 'Agent 调用仍经过 GVA 内部权限校验，现有角色与权限配置直接生效。无需重新设置，现有系统低成本接入 AI。',
    steps: [
      {
        icon: '👥',
        t: '定义角色',
        d: '管理员、成员、AI Agent 各有边界。',
        hotspot: { x: 40, y: 45, side: 'right' },
      },
      {
        icon: '🎚️',
        t: '配置能力',
        d: '查看、导入、批量、删除逐项授权。',
        hotspot: { x: 60, y: 60, side: 'left' },
      },
      {
        icon: '🔍',
        t: '字段级控制',
        d: '权限可精确到单个字段是否可见。',
        hotspot: { x: 45, y: 35, side: 'right' },
      },
      {
        icon: '🛡️',
        t: '全程审计',
        d: '每一次调用都有记录，可追溯。',
        hotspot: { x: 58, y: 55, side: 'left' },
      },
    ],
  },
]

// 热点圆直径26px(半径13) + 与提示框的间距10px + 提示框尖角9px方块(对角线一半约4.5px)
const HOTSPOT_R = 13
const TIP_GAP = 10
const TAIL_HALF = 4.5

const active = ref(null)
const step = ref(0)
const showTip = ref(false)

let tipTimer = null

const clearTipTimer = () => {
  if (tipTimer) {
    clearTimeout(tipTimer)
    tipTimer = null
  }
}

// 轻提示展示逻辑：web 端鼠标 hover 热点(@mouseenter)立即唤出；
// 移动端没有 hover，靠这里的 2s 定时器自动唤出。两者互不冲突，谁先触发都行，一旦显示就保持到切换下一步。
const resetTip = () => {
  showTip.value = false
  clearTipTimer()

  tipTimer = setTimeout(() => {
    showTip.value = true
  }, 2000)
}

const currentStep = computed(() => {
  if (active.value === null) return null
  return demos[active.value].steps[step.value]
})

const tipStyle = computed(() => {
  const s = currentStep.value

  if (!s) return {}

  const offset = `${HOTSPOT_R + TIP_GAP}px`

  if (s.hotspot.side === 'left') {
    return {
      right: `calc(${100 - s.hotspot.x}% + ${offset})`,
      top: `${s.hotspot.y}%`,
      transform: 'translateY(-50%)',
    }
  }

  return {
    left: `calc(${s.hotspot.x}% + ${offset})`,
    top: `${s.hotspot.y}%`,
    transform: 'translateY(-50%)',
  }
})

const tailStyle = computed(() => {
  const s = currentStep.value

  if (!s) return {}

  return s.hotspot.side === 'left'
    ? {
        right: `-${TAIL_HALF}px`,
        top: `calc(50% - ${TAIL_HALF}px)`,
      }
    : {
        left: `-${TAIL_HALF}px`,
        top: `calc(50% - ${TAIL_HALF}px)`,
      }
})

watch(step, () => {
  if (active.value !== null) resetTip()
})

const openDemo = (index) => {
  active.value = index
  step.value = 0
  resetTip()
}

const close = () => {
  active.value = null
  clearTipTimer()
}

// 唯一的前进方式：点击热点。走到最后一步时点击热点直接收尾关闭弹窗。
const advance = () => {
  if (active.value === null) return

  if (step.value < demos[active.value].steps.length - 1) {
    step.value++
  } else {
    close()
  }
}

// 保留 prev 仅作为键盘左箭头的退回手段，不在界面上放可见的"上一步"按钮（对齐参考效果的极简交互）
const prev = () => {
  if (step.value > 0) {
    step.value--
  }
}

const onKey = (event) => {
  if (active.value === null) return

  if (event.key === 'Escape') {
    close()
  } else if (event.key === 'ArrowRight') {
    advance()
  } else if (event.key === 'ArrowLeft') {
    prev()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  clearTipTimer()
})
</script>

<style scoped>
.cf-modal-enter-active,
.cf-modal-leave-active {
  transition: opacity 0.2s ease;
}

.cf-modal-enter-from,
.cf-modal-leave-to {
  opacity: 0;
}

/* 热点放大脉冲：从自身大小淡出式扩散到约2.3倍，循环 */
@keyframes cf-pulse {
  0% {
    transform: scale(1);
    opacity: 0.55;
  }

  100% {
    transform: scale(2.3);
    opacity: 0;
  }
}

.cf-pulse-ring {
  animation: cf-pulse 1.8s cubic-bezier(0.2, 0.7, 0.4, 1) infinite;
}

.cf-tip-enter-active,
.cf-tip-leave-active {
  transition: opacity 0.18s ease;
}

.cf-tip-enter-from,
.cf-tip-leave-to {
  opacity: 0;
}

.borderd{
  border: 1px solid #DCDCDC !important;
}
</style>