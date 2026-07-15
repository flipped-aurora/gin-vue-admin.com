<template>
  <section
    class="gva-section bg-[#F9F9F9] max-[859px]:!py-[22px]"
  >
    <div class="gva-container">
      <!-- =====================================================
        MOBILE：仅 859px 以下显示
      ====================================================== -->
      <div
        class="mx-auto w-full max-w-[442px] min-[860px]:hidden"
      >

        <!-- 标题 -->
        <h3
          class="mt-[17px] text-[34px] font-extrabold leading-[1.43] tracking-[-0.045em] text-[#050505]"
        >
          <span class="block">
            从
            <span class="ml-[5px] text-[#2264F2]">一句话需求</span>
          </span>

          <span class="block">到完整的</span>

          <span class="block text-[#2264F2]">业务</span>

          <span class="block text-[#2264F2]">模块</span>
        </h3>

        <!-- 正文 -->
        <div
          class="mt-[18px] text-[14px] font-light leading-[1.82] tracking-[0.005em] text-[#555a63]"
        >
          <p>
            描述你需要什么，AI 在 GVA 里<br />
            完成数据模型定义、API 生成、<br />
            路由注册和权限配置，<br />
            最终生成完整业务模块。
          </p>

          <p class="mt-[14px]">
            你不需要手动介入每一步，<br />
            只需要检查生成过程，<br />
            并审查最终结果。
          </p>
        </div>

        <!-- 链接 -->
        <a
          href="/guide/generator/server"
          class="mt-[18px] inline-flex w-fit items-center gap-[8px] border-b-2 border-[#2264F2] pb-[4px] text-[14px] font-medium leading-none text-[#2264F2] transition-opacity hover:opacity-80"
        >
          <span>查看演示视频</span>
          <span class="text-[14px] leading-none">→</span>
        </a>

        <!-- 移动端演示图 -->
        <div
          class="mt-[24px] overflow-hidden rounded-[14px] border border-[#dce2eb] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-[20px] shadow-[0_16px_34px_-20px_rgba(23,43,77,0.34)]"
        >
          <!-- AI Agent 面板 -->
          <div
            class="overflow-hidden rounded-[10px] border border-[#dce3ed] bg-white"
          >
            <!-- Agent 标题栏 -->
            <div
              class="flex h-[31px] items-center gap-[8px] border-b border-[#e2e7ee] px-[10px]"
            >
              <span
                class="grid h-[19px] w-[19px] shrink-0 place-items-center rounded-full bg-black text-[10px] font-semibold leading-none text-white"
              >
                I
              </span>

              <span class="text-[12px] font-medium text-[#555a63]">
                AI Coding Agent
              </span>
            </div>

            <!-- 输入框 -->
            <div
              class="relative m-[11px] min-h-[75px] rounded-[10px] border border-[#dce3ed] bg-white px-[13px] pb-[24px] pt-[11px]"
            >
              <p
                class="text-[12px] font-medium leading-[1.72] text-[#17191d]"
              >
                帮我创建一个用户管理模块，<br />
                包含列表、编辑和权限控制。
              </p>

              <!-- 发送按钮 -->
              <svg
                class="absolute bottom-[9px] right-[10px] h-[18px] w-[18px] text-[#2264F2]"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M21.3 3.2 3.9 9.9c-.9.35-.87 1.64.05 1.94l6.7 2.16 2.15 6.7c.3.92 1.59.95 1.94.05L21.5 3.36c.05-.13-.08-.26-.2-.16Z"
                  fill="currentColor"
                />
                <path
                  d="m10.65 14 5.15-5.15"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>

          <!-- 中间流程箭头 -->
          <div class="flex h-[47px] items-center justify-center gap-[18px]">
            <span
              class="h-px flex-1 border-t border-dashed border-[#b8d2ff]"
            ></span>

            <svg
              class="h-[26px] w-[26px] shrink-0 text-[#2264F2]"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 3v16M6.5 13.5 12 19l5.5-5.5"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span
              class="h-px flex-1 border-t border-dashed border-[#b8d2ff]"
            ></span>
          </div>

          <!-- GVA Admin 面板 -->
          <div
            class="overflow-hidden rounded-[10px] border border-[#dce3ed] bg-white"
          >
            <!-- Admin 标题栏 -->
            <div
              class="flex h-[31px] items-center justify-between border-b border-[#e2e7ee] px-[11px]"
            >
              <span class="text-[11px] font-medium text-[#555a63]">
                GVA Admin
              </span>

              <span
                class="h-[8px] w-[8px] rounded-full bg-[#2264F2] shadow-[0_0_7px_rgba(34,100,242,0.34)]"
              ></span>
            </div>

            <div class="flex h-[184px]">
              <!-- 左侧菜单 -->
              <div
                class="w-[29%] shrink-0 border-r border-[#e3e8ef] bg-[#fafbfc] py-[7px]"
              >
                <div
                  v-for="i in 4"
                  :key="i"
                  class="relative flex h-[35px] items-center gap-[8px] px-[11px]"
                  :class="
                    i === 3
                      ? 'bg-[#eef4ff] before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-[#2264F2]'
                      : ''
                  "
                >
                  <span
                    class="h-[10px] w-[10px] shrink-0 rounded-[1px]"
                    :class="i === 3 ? 'bg-[#b8c4d8]' : 'bg-[#c4c8cf]'"
                  ></span>

                  <span
                    class="h-[4px] rounded-full"
                    :class="
                      i === 3
                        ? 'w-[30px] bg-[#8fa2c2]'
                        : 'w-[27px] bg-[#9da1a8]'
                    "
                  ></span>
                </div>
              </div>

              <!-- 右侧内容 -->
              <div class="min-w-0 flex-1 px-[10px] pb-[8px] pt-[9px]">
                <div class="flex items-center justify-between">
                  <h4
                    class="text-[12px] font-semibold leading-none text-[#202329]"
                  >
                    用户管理
                  </h4>

                  <button
                    class="rounded-[4px] bg-[#2264F2] px-[8px] py-[5px] text-[9px] font-medium leading-none text-white"
                  >
                    新增用户
                  </button>
                </div>

                <!-- 表格 -->
                <div
                  class="mt-[9px] overflow-hidden rounded-[4px] border border-[#e1e6ed]"
                >
                  <!-- 表头 -->
                  <div
                    class="grid h-[28px] grid-cols-4 items-center border-b border-[#e3e8ee] bg-[#f7f8fa] px-[10px]"
                  >
                    <span class="h-[5px] w-[24px] bg-[#c1c5cc]"></span>
                    <span class="h-[5px] w-[20px] bg-[#c1c5cc]"></span>
                    <span class="h-[5px] w-[22px] bg-[#c1c5cc]"></span>
                    <span class="h-[5px] w-[20px] bg-[#c1c5cc]"></span>
                  </div>

                  <!-- 表格行 -->
                  <div
                    v-for="(row, index) in rows"
                    :key="row.id"
                    class="grid h-[35px] grid-cols-4 items-center px-[10px]"
                    :class="
                      index < rows.length - 1
                        ? 'border-b border-[#e6eaf0]'
                        : ''
                    "
                  >
                    <span class="h-[5px] w-[25px] bg-[#bfc3ca]"></span>
                    <span class="h-[5px] w-[20px] bg-[#bfc3ca]"></span>

                    <span
                      class="w-fit rounded-full bg-[#edf4ff] px-[5px] py-[3px] text-[8px] font-medium leading-none text-[#2264F2]"
                    >
                      启用
                    </span>

                    <span class="h-[5px] w-[25px] bg-[#bfc3ca]"></span>
                  </div>
                </div>

                <div
                  class="mt-[8px] flex items-center justify-end gap-[3px] text-[9px] font-medium leading-none text-[#2264F2]"
                >
                  <span>✓</span>
                  <span>Module generated</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 图片说明 -->
        <p
          class="mt-[19px] text-center text-[14px] font-normal leading-[1.5] text-[#777b82]"
        >
          一句话输入，一个可运行的业务模块
        </p>
      </div>

      <!-- =====================================================
        DESKTOP：原有 Web 端样式保持不变
      ====================================================== -->
      <div
        class="hidden grid-cols-1 gap-12 min-[860px]:grid min-[860px]:grid-cols-[minmax(0,0.46fr)_minmax(0,1fr)] min-[860px]:items-center min-[860px]:gap-16"
      >
        <!-- ============ LEFT: text ============ -->
        <div class="flex min-w-0 flex-col">
          <h3
            class="text-[34px] font-extrabold leading-[1.22] tracking-tight text-[#1c1c1c] min-[860px]:text-[36px]"
          >
            从
            <span class="text-[#2264F2]">一句话需求</span><br />
            到完整的业务模块
          </h3>

          <p class="mt-6 text-[16px] leading-[1.72] text-[#60656f]">
            描述你需要什么，AI 在 GVA 里完成<br />
            数据模型定义、API 生成、<br />
            路由注册和权限配置。
          </p>

          <p class="mt-5 text-[16px] leading-[1.72] text-[#60656f]">
            你不需要手动介入每一步，<br />
            只需要审查最终结果。
          </p>

          <ul class="mt-7 flex flex-col gap-3">
            <li
              v-for="b in bullets"
              :key="b"
              class="flex items-center gap-3 text-[15px] font-medium text-[#33373f]"
            >
              <span
                class="h-[7px] w-[7px] shrink-0 rounded-full bg-[#9aa1ac]"
              ></span>
              {{ b }}
            </li>
          </ul>

          <a
            class="mt-9 inline-flex w-fit items-center gap-2.5 border-b-2 border-[#2264F2] pb-[3px] text-[16px] font-medium leading-none text-[#2264F2] transition-opacity hover:opacity-80"
            href="/guide/generator/server"
          >
            查看演示视频
            <span class="text-[18px]">→</span>
          </a>
        </div>

        <!-- ============ RIGHT: browser-window card ============ -->
        <div
          class="overflow-hidden rounded-2xl border border-[#e6e7ea] bg-white shadow-[0_30px_70px_-30px_rgba(20,30,60,0.28)]"
        >
          <!-- window title bar -->
          <div
            class="relative flex h-12 items-center border-b border-[#ececef] bg-[#f7f7f9] px-5"
          >
            <div class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-full bg-[#ff5f56]"></span>
              <span class="h-3 w-3 rounded-full bg-[#febc2e]"></span>
              <span class="h-3 w-3 rounded-full bg-[#28c840]"></span>
            </div>

            <span
              class="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-[#8a8b90]"
            >
              GVA AI 开发演示
            </span>
          </div>

          <!-- body: dark chat panel + white table -->
          <div class="relative flex flex-col min-[860px]:flex-row">
            <!-- dark Claude Code panel -->
            <div class="w-full bg-[#1d1f2b] p-6 min-[860px]:w-[43%]">
              <div class="mb-5 text-[15px] font-medium text-[#c9cad1]">
                Claude Code
              </div>

              <div
                class="mb-6 rounded-2xl bg-[#3a3a4f] px-4 py-3 text-[14px] leading-[1.6] text-[#f1f1f4]"
              >
                帮我创建一个用户管理模块，包含用户列表、新增、编辑和权限分配功能。
              </div>

              <ul class="flex flex-col gap-[11px]">
                <li
                  v-for="s in steps"
                  :key="s.t"
                  class="flex items-center gap-2.5 text-[14px]"
                  :class="s.done ? 'text-[#b9bac1]' : 'text-[#2264F2]'"
                >
                  <span
                    v-if="s.done"
                    class="w-4 shrink-0 text-center text-[#9a9ba4]"
                  >
                    ✓
                  </span>

                  <span
                    v-else
                    class="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-[#2264F2] border-t-transparent"
                  ></span>

                  <span :class="{ 'font-medium': !s.done }">
                    {{ s.t }}
                  </span>
                </li>
              </ul>
            </div>

            <!-- white admin table -->
            <div class="w-full flex-1 bg-white p-6 min-[860px]:p-7">
              <div class="mb-5 flex items-center justify-between">
                <h4 class="text-[18px] font-bold text-[#1c1c1e]">
                  用户管理
                </h4>

                <button
                  class="rounded-lg bg-[#2264F2] px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#1B52D4]"
                >
                  + 新增用户
                </button>
              </div>

              <div
                class="grid grid-cols-[44px_1fr_1.3fr_0.9fr_0.7fr] gap-2 border-b border-[#eef0f3] pb-3 text-[13px] text-[#8a8b90]"
              >
                <span>ID</span>
                <span>用户名</span>
                <span>角色</span>
                <span>状态</span>
                <span>操作</span>
              </div>

              <div
                v-for="(r, i) in rows"
                :key="r.id"
                class="grid grid-cols-[44px_1fr_1.3fr_0.9fr_0.7fr] items-center gap-2 py-[18px] text-[14px]"
                :class="i < rows.length - 1 ? 'border-b border-[#f2f3f5]' : ''"
              >
                <span
                  :class="
                    r.muted ? 'text-[#bcbfc7]' : 'text-[#2a2a2e]'
                  "
                >
                  {{ r.id }}
                </span>

                <span
                  :class="
                    r.muted
                      ? 'text-[#bcbfc7]'
                      : 'font-medium text-[#2a2a2e]'
                  "
                >
                  {{ r.name }}
                </span>

                <span
                  :class="
                    r.muted ? 'text-[#bcbfc7]' : 'text-[#2a2a2e]'
                  "
                >
                  {{ r.role }}
                </span>

                <span>
                  <span
                    class="inline-block rounded-md border px-2 py-[3px] text-[12px] leading-none"
                    :class="
                      r.active
                        ? 'border-[#c6efd5] bg-[#ecfdf3] text-[#16a34a]'
                        : 'border-[#e6e8eb] bg-[#f4f5f6] text-[#9aa0aa]'
                    "
                  >
                    {{ r.active ? '启用' : '停用' }}
                  </span>
                </span>

                <a
                  href="#"
                  class="text-[14px]"
                  :class="
                    r.muted
                      ? 'text-[#bcbfc7]'
                      : 'text-[#2264F2] hover:opacity-80'
                  "
                >
                  编辑
                </a>
              </div>
            </div>

            <!-- floating arrow button on the seam -->
            <div
              class="absolute left-[43%] top-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#eceef2] bg-white shadow-[0_8px_24px_-6px_rgba(20,30,60,0.25)] min-[860px]:grid"
            >
              <span class="text-[20px] font-semibold text-[#2264F2]">
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const bullets = [
  '数据模型自动定义',
  'API 接口自动生成',
  '路由注册自动完成',
  '权限配置自动就位',
]

const steps = [
  { t: '分析需求...', done: true },
  { t: '创建数据模型 User...', done: true },
  { t: '生成 API 接口 ×6...', done: true },
  { t: '注册路由...', done: true },
  { t: '配置权限规则...', done: true },
  { t: '生成前端页面 ...', done: false },
]

const rows = [
  { id: '001', name: '张三', role: '管理员', active: true, muted: false },
  { id: '002', name: '李四', role: '普通用户', active: true, muted: false },
  { id: '003', name: '王五', role: '访客', active: false, muted: true },
]
</script>