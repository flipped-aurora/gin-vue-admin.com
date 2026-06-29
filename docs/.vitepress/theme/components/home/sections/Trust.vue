<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="text-center mb-14 max-[860px]:mb-10">
        <span class="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.02em] text-[var(--gva-primary)] mb-4 before:content-[''] before:w-[7px] before:h-[7px] before:rounded-full before:bg-[var(--gva-primary)] before:shadow-[0_0_0_4px_var(--gva-primary-soft)]">值得信赖</span>
        <h2 class="text-[clamp(28px,3.6vw,40px)] leading-[1.18] font-bold tracking-[-0.02em] text-[var(--gva-text-strong)]" style="margin-top: 16px">安全、可靠、<span class="text-[var(--gva-primary)]">可控</span></h2>
        <p class="text-[clamp(15px,1.5vw,18px)] leading-[2] text-[var(--gva-text-body)] max-w-[820px] mt-4 mx-auto">
          你决定暴露哪些 API，Agent 只能调用这些；数据留在你自己的服务器上，边界始终掌握在你手里。
        </p>
      </div>

      <div class="grid grid-cols-3 gap-[22px] max-[860px]:grid-cols-1">
        <div v-for="c in cards" :key="c.title" class="bg-[var(--gva-bg-base)] border border-[var(--gva-border)] rounded-[var(--gva-radius)] shadow-[shadow:var(--gva-shadow-sm)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[3px] hover:shadow-[shadow:var(--gva-shadow)] hover:border-[var(--gva-border-strong)] p-[30px]">
          <div class="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-[var(--gva-primary-soft)] text-[var(--gva-primary)] mb-5" v-html="c.icon"></div>
          <h3 class="text-[20px] font-bold text-[var(--gva-text-strong)] mb-3">{{ c.title }}</h3>
          <p class="text-[14px] leading-[1.7] text-[var(--gva-text-body)] mb-5">{{ c.desc }}</p>
          <span class="inline-flex items-center gap-[7px] text-[12.5px] font-semibold text-[var(--gva-primary)]"><i class="w-[7px] h-[7px] rounded-full bg-[var(--gva-primary)]"></i> {{ c.tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const cards = [
  {
    title: '安全',
    desc: '支持完全私有化部署，源码、数据与模型调用都在自有环境内闭环，不依赖任何外部托管。',
    tag: '支持私有化部署',
    icon: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  },
  {
    title: '可靠',
    desc: '基于 Go + Vue 的成熟全栈架构，经过大量项目在生产环境长期打磨，稳定可维护。',
    tag: '生产环境验证',
    icon: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l3 7 4-14 3 7h4"/></svg>',
  },
  {
    title: '可控',
    desc: '细到字段级的权限与可见性控制，Agent 能看到什么、能做什么，完全由你定义。',
    tag: '你决定 Agent 能看见什么',
    icon: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg>',
  },
]
</script>
