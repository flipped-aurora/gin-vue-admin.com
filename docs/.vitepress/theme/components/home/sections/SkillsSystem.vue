<template>
  <section class="gva-section">
    <div class="gva-container">
      <!--
        Two columns. items-stretch makes both columns share the same height,
        and the terminal box uses flex-1 so the dark panel fills that height —
        this is what keeps the left side level with the right side.
      -->
      <div
        class="grid grid-cols-1 gap-10 min-[860px]:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] min-[860px]:items-stretch min-[860px]:gap-[72px]"
      >
        <!-- ============ LEFT: terminal ============ -->
        <div class="flex min-w-0 flex-col">
          <div
            class="flex flex-1 flex-col overflow-hidden rounded-xl bg-[#151617] shadow-[0_30px_70px_-28px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
          >
            <!-- title bar -->
            <div class="relative flex h-11 shrink-0 items-center bg-[#282828] px-5">
              <div class="flex items-center gap-2">
                <span class="h-3 w-3 rounded-full bg-[#eb534c]"></span>
                <span class="h-3 w-3 rounded-full bg-[#efae41]"></span>
                <span class="h-3 w-3 rounded-full bg-[#3db63e]"></span>
              </div>
              <span
                class="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium tracking-wide text-[#8a8a8a]"
                >zsh</span
              >
            </div>

            <!-- body -->
            <div
              class="flex-1 overflow-x-auto px-6 py-5 font-mono text-[14px] leading-[1.85] min-[860px]:text-[15px]"
            >
              <p class="whitespace-pre text-[#8d8d8d]">~ cd my-gva-project</p>
              <p class="whitespace-pre text-[#8d8d8d]">~ gva init</p>
              <p class="h-[1.85em]">&nbsp;</p>
              <p class="whitespace-pre text-[#d2d2d2]">Initializing GVA project...</p>
              <p class="whitespace-pre text-[#d2d2d2]">Connecting to GVA instance...</p>
              <p class="h-[1.85em]">&nbsp;</p>
              <p class="whitespace-pre text-[#4eb849]">✓ Skills installed successfully</p>
              <p class="whitespace-pre text-[#4eb849]">✓ 8 skills loaded: data-modeling, ui-builder,</p>
              <p class="whitespace-pre pl-[4ch] text-[#4eb849]">workflow, permissions, plugin-dev...</p>
              <p class="h-[1.85em]">&nbsp;</p>
              <p class="whitespace-pre text-[#5b9bf0]">Ready. Your AI Agent now understands GVA.</p>
              <span
                class="mt-1 inline-block h-[1.05em] w-[8px] translate-y-[3px] animate-pulse bg-[#9a9a9a]"
              ></span>
            </div>
          </div>

          <p class="mt-3 text-center text-[14px] text-[#60656f]">执行 gva init 后的实际输出</p>
        </div>

        <!-- ============ RIGHT: text ============ -->
        <div class="flex min-w-0 flex-col justify-center">
          <!-- section label -->

          <h3 class="text-[32px] font-semibold leading-[1.32] tracking-tight text-[#030303] min-[860px]:text-[42px] min-[860px]:leading-[1.32]">
            不只是接入<br />AI <span class="text-[#1268ff]">真正理解</span>你的系统
          </h3>

          <p class="mt-6 text-[16px] leading-[1.72] text-[#60656f]">
            执行 gva init，GVA 的代码规范、<br />
            模块结构、命名约定自动打包成 Skills，<br />
            安装进你的 AI Agent。
          </p>
          <p class="mt-5 text-[16px] leading-[1.72] text-[#60656f]">
            它知道 GVA 怎么组织代码，<br />
            生成的结果直接符合项目规范，<br />
            不需要你反复纠正。
          </p>

          <div class="mt-7 flex flex-wrap gap-x-3 gap-y-3">
            <span
              v-for="s in skills"
              :key="s"
              class="rounded-lg bg-[#EBF2FC] px-3.5 py-1.5 text-[12px] font-medium leading-none text-[#1268ff]"
              >{{ s }}</span
            >
          </div>

          <a
            class="mt-8 inline-flex w-fit items-center gap-2.5 border-b-2 border-[#287cff] pb-[3px] text-[16px] font-medium leading-none text-[#1268ff] transition-opacity hover:opacity-80"
            href="/guide/server/mcp"
          >
            了解 Skills 机制 <span class="text-[18px]">→</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
  'data-modeling', 'ui-builder', 'workflow', 'permissions',
  'plugin-dev', 'api-config', 'deployment', 'migration',
]
</script>