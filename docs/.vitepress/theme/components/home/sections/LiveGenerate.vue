<template>
  <section class="gva-section bg-[#F5F5F5]">
    <div class="gva-container">
      <div
        class="grid grid-cols-1 gap-12 min-[860px]:grid-cols-[minmax(0,0.46fr)_minmax(0,1fr)] min-[860px]:items-center min-[860px]:gap-16"
      >
        <!-- ============ LEFT: text ============ -->
        <div class="flex min-w-0 flex-col">
          <h3 class="text-[34px] font-extrabold leading-[1.22] tracking-tight text-[#1c1c1c] min-[860px]:text-[36px]">
            从 <span class="text-[#1268ff]">一句话需求</span><br />到完整的业务模块
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

          <!-- bullets: dots changed from blue to a sober slate gray -->
          <ul class="mt-7 flex flex-col gap-3">
            <li
              v-for="b in bullets"
              :key="b"
              class="flex items-center gap-3 text-[15px] font-medium text-[#33373f]"
            >
              <span class="h-[7px] w-[7px] shrink-0 rounded-full bg-[#9aa1ac]"></span>{{ b }}
            </li>
          </ul>

          <a
            class="mt-9 inline-flex w-fit items-center gap-2.5 border-b-2 border-[#287cff] pb-[3px] text-[16px] font-medium leading-none text-[#1268ff] transition-opacity hover:opacity-80"
            href="/guide/generator/server"
          >
            查看演示视频 <span class="text-[18px]">→</span>
          </a>
        </div>

        <!-- ============ RIGHT: browser-window card ============ -->
        <div
          class="overflow-hidden rounded-2xl border border-[#e6e7ea] bg-white shadow-[0_30px_70px_-30px_rgba(20,30,60,0.28)]"
        >
          <!-- window title bar -->
          <div class="relative flex h-12 items-center border-b border-[#ececef] bg-[#f7f7f9] px-5">
            <div class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-full bg-[#ff5f56]"></span>
              <span class="h-3 w-3 rounded-full bg-[#febc2e]"></span>
              <span class="h-3 w-3 rounded-full bg-[#28c840]"></span>
            </div>
            <span
              class="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-[#8a8b90]"
              >GVA AI 开发演示</span
            >
          </div>

          <!-- body: dark chat panel + white table -->
          <div class="relative flex flex-col min-[860px]:flex-row">
            <!-- dark Claude Code panel -->
            <div class="w-full bg-[#1d1f2b] p-6 min-[860px]:w-[43%]">
              <div class="mb-5 text-[15px] font-medium text-[#c9cad1]">Claude Code</div>

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
                  :class="s.done ? 'text-[#b9bac1]' : 'text-[#3b82f6]'"
                >
                  <span v-if="s.done" class="w-4 shrink-0 text-center text-[#9a9ba4]">✓</span>
                  <span
                    v-else
                    class="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-[#3b82f6] border-t-transparent"
                  ></span>
                  <span :class="{ 'font-medium': !s.done }">{{ s.t }}</span>
                </li>
              </ul>
            </div>

            <!-- white admin table -->
            <div class="w-full flex-1 bg-white p-6 min-[860px]:p-7">
              <div class="mb-5 flex items-center justify-between">
                <h4 class="text-[18px] font-bold text-[#1c1c1e]">用户管理</h4>
                <button
                  class="rounded-lg bg-[#1268ff] px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#0f5ae0]"
                >
                  + 新增用户
                </button>
              </div>

              <!-- table header -->
              <div
                class="grid grid-cols-[44px_1fr_1.3fr_0.9fr_0.7fr] gap-2 border-b border-[#eef0f3] pb-3 text-[13px] text-[#8a8b90]"
              >
                <span>ID</span><span>用户名</span><span>角色</span><span>状态</span><span>操作</span>
              </div>

              <!-- table rows -->
              <div
                v-for="(r, i) in rows"
                :key="r.id"
                class="grid grid-cols-[44px_1fr_1.3fr_0.9fr_0.7fr] items-center gap-2 py-[18px] text-[14px]"
                :class="i < rows.length - 1 ? 'border-b border-[#f2f3f5]' : ''"
              >
                <span :class="r.muted ? 'text-[#bcbfc7]' : 'text-[#2a2a2e]'">{{ r.id }}</span>
                <span :class="r.muted ? 'text-[#bcbfc7]' : 'font-medium text-[#2a2a2e]'">{{ r.name }}</span>
                <span :class="r.muted ? 'text-[#bcbfc7]' : 'text-[#2a2a2e]'">{{ r.role }}</span>
                <span>
                  <span
                    class="inline-block rounded-md border px-2 py-[3px] text-[12px] leading-none"
                    :class="r.active
                      ? 'border-[#c6efd5] bg-[#ecfdf3] text-[#16a34a]'
                      : 'border-[#e6e8eb] bg-[#f4f5f6] text-[#9aa0aa]'"
                    >{{ r.active ? '启用' : '停用' }}</span
                  >
                </span>
                <a
                  href="#"
                  class="text-[14px]"
                  :class="r.muted ? 'text-[#bcbfc7]' : 'text-[#1268ff] hover:opacity-80'"
                  >编辑</a
                >
              </div>
            </div>

            <!-- floating arrow button on the seam (desktop only) -->
            <div
              class="absolute left-[43%] top-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#eceef2] bg-white shadow-[0_8px_24px_-6px_rgba(20,30,60,0.25)] min-[860px]:grid"
            >
              <span class="text-[20px] font-semibold text-[#1268ff]">→</span>
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