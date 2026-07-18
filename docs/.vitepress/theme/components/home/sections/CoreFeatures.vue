<template>
  <section class="gva-section bg-white dark:bg-[var(--gva-bg-base)]">
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
          class="group relative flex h-full w-full flex-col overflow-hidden rounded-[12px] borderd  bg-white dark:bg-[var(--gva-bg-dark-soft)] p-7 text-left [font:inherit] transition-[transform,border-color] duration-200 hover:-translate-y-[2px] hover:border-[#B7C2D2] dark:hover:border-[var(--gva-border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2264F2]/25 min-[860px]:min-h-[310px] max-[859px]:min-h-0 max-[859px]:rounded-[12px] max-[859px]:p-6"
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
            class="relative mt-auto inline-flex w-fit items-center gap-2.5 pb-[13px] pt-[18px] text-[16px] font-medium leading-none text-[#2264F2] dark:text-[var(--gva-primary)] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#2264F2] dark:after:bg-[var(--gva-primary)] after:content-[''] max-[859px]:text-[17px]"
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
          <!-- PC 端宽度按视口等比放大：1080P 约 1090px，2K 约 1450px，超出 1600px 封顶；
               高度随内部 aspect 比例自适应，因此整体宽高同步缩放。移动端保持原 820px 上限。 -->
          <div
            class="w-full max-w-[820px] rounded-[var(--gva-radius)] border border-[var(--gva-border)] bg-[var(--gva-bg-base)] p-6 shadow-[var(--gva-shadow-sm)] max-[859px]:rounded-[14px] max-[859px]:p-4 min-[860px]:max-w-[clamp(880px,56vw,1600px)] min-[860px]:p-[clamp(24px,2vw,40px)]"
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
              class="relative mt-1 grid aspect-[35/19] w-full place-items-center overflow-hidden rounded-[10px] border border-[var(--gva-border)] bg-[var(--gva-bg-alt)]"
            >
              <!-- 截图按自身比例居中。热点与气泡都挂在这一层，hotspot 的百分比才与截图严格对齐；
                   若挂在外层，比例不同的截图（如 demo10）会因留白导致小球指偏。 -->
              <div
                class="relative max-h-full w-full"
                :style="{ aspectRatio: currentStep.ratio || '35 / 19' }"
              >
                <img
                  v-if="currentStep.img"
                  class="absolute inset-0 h-full w-full object-contain"
                  :src="currentStep.img"
                  :alt="currentStep.t"
                  draggable="false"
                />

                <!-- 占位截图：demo 02 / 03 素材就位后同样替换为 img -->
                <div v-else class="absolute inset-0 flex flex-col">
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
    desc: '用 Claude Code、Cursor、Codex 等主流 AI Coding Agent 快速搭建完整系统。配置 MCP 即可开工，Skills 一键下载安装，AI 协作规范随仓库预置，无需手动配置任何规范文件。',
    // 截图在 /public/doc，按 demo1x 顺序排列（无 demo13）。
    // ratio 必须与图片实际像素一致，否则热点百分比会指偏：demo10 是 2926×1408，其余为 1.842 宽比。
    steps: [
      {
        icon: '🧰',
        t: '定义工具',
        d: '填写名称与参数，即可生成工具骨架代码。',
        img: '/doc/demo10.png',
        ratio: '2926 / 1408',
        hotspot: { x: 30, y: 21, side: 'right' },
      },
      {
        icon: '🔌',
        t: '接入客户端',
        d: '服务启动后，配置可直接复制到 7 种 AI 客户端。',
        img: '/doc/demo11.png',
        ratio: '1702 / 924',
        hotspot: { x: 23, y: 44, side: 'right' },
      },
      {
        icon: '🧩',
        t: '工具开箱可用',
        d: '内置 17 个工具，均可在线测试调用。',
        img: '/doc/demo12.png',
        ratio: '2940 / 1596',
        hotspot: { x: 42, y: 19, side: 'right' },
      },
      {
        icon: '🏗️',
        t: '构建业务 MCP',
        d: '把系统已有的业务 API 组装成自定义 MCP。',
        img: '/doc/demo14.png',
        ratio: '2940 / 1596',
        hotspot: { x: 23, y: 28, side: 'right' },
      },
      {
        icon: '✅',
        t: '绑定 API',
        d: '勾选需要开放的接口，保存后即时生效。',
        img: '/doc/demo15.png',
        ratio: '2940 / 1596',
        hotspot: { x: 61, y: 50, side: 'left' },
      },
    ],
  },
  {
    num: '02',
    title: 'API 一键 CLI 化',
    desc: '在 GVA 中选择已有 API，填写 Skill 名称，系统自动解析入参与出参，调用链路可视化编排，一键打包成完整 Skill，任何 AI Agent 导入即用。',
    // 截图在 /public/doc，按 demo2x 顺序排列。四张同为 2940×1596。
    steps: [
      {
        icon: '🖥️',
        t: '新建 CLI',
        d: '新建 CLI，定义名称、主命令与版本。',
        img: '/doc/demo20.png',
        ratio: '2940 / 1596',
        hotspot: { x: 22.5, y: 28, side: 'right' },
      },
      {
        icon: '✅',
        t: '选择 API',
        d: '从项目里勾选要开放给 AI 的接口。',
        img: '/doc/demo21.png',
        ratio: '2940 / 1596',
        hotspot: { x: 61, y: 50, side: 'left' },
      },
      {
        icon: '📝',
        t: '命令定义',
        d: '参数与返回自动解析，说明可自行调整。',
        img: '/doc/demo22.png',
        ratio: '2940 / 1596',
        hotspot: { x: 91.5, y: 24, side: 'left' },
      },
      {
        icon: '🔀',
        t: '场景编排',
        d: '拖拽节点连线，编排多命令的调用链路。',
        img: '/doc/demo23.png',
        ratio: '2940 / 1596',
        hotspot: { x: 53.5, y: 61, side: 'left' },
      },
    ],
  },
  {
    num: '03',
    title: '权限统一管控',
    desc: 'Agent 调用仍经过 GVA 内部权限校验，现有角色与权限配置直接生效。无需重新设置，现有系统低成本接入 AI。',
    // 截图在 /public/doc，按 demo3x 顺序排列。五张同为 2940×1596。
    steps: [
      {
        icon: '👥',
        t: '定义角色',
        d: '为 AI Agent 单独建立角色，权限边界独立。',
        img: '/doc/demo30.png',
        ratio: '2940 / 1596',
        hotspot: { x: 22.75, y: 24.4, side: 'right' },
      },
      {
        icon: '🎚️',
        t: '配置能力',
        d: '查看、导入、批量、删除逐项授权。',
        img: '/doc/demo31.png',
        ratio: '2940 / 1596',
        hotspot: { x: 50, y: 23.3, side: 'right' },
      },
      {
        icon: '🗂️',
        t: '菜单授权',
        d: '菜单按角色分配，控制页面可见范围。',
        img: '/doc/demo32.png',
        ratio: '2940 / 1596',
        hotspot: { x: 86.85, y: 36.1, side: 'left' },
      },
      {
        icon: '🙋',
        t: '分配用户',
        d: '用户可同时归属多个角色，随时调整。',
        img: '/doc/demo33.png',
        ratio: '2940 / 1596',
        hotspot: { x: 76.35, y: 58.4, side: 'left' },
      },
      {
        icon: '🏢',
        t: '部门与数据',
        d: '维护部门与成员归属，数据权限据此划分。',
        img: '/doc/demo34.png',
        ratio: '2940 / 1596',
        hotspot: { x: 24.3, y: 32.8, side: 'right' },
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
.dark .borderd{
  border-color: var(--gva-border) !important;
}
</style>