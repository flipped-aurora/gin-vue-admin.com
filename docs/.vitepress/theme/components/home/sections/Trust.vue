<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="gva-head">
        <span class="gva-label">值得信赖</span>
        <h2 class="gva-h2" style="margin-top: 16px">安全、可靠、<span class="gva-hl">可控</span></h2>
        <p class="gva-lead">
          你决定暴露哪些 API，Agent 只能调用这些；数据留在你自己的服务器上，边界始终掌握在你手里。
        </p>
      </div>

      <div class="trust__grid">
        <div v-for="c in cards" :key="c.title" class="gva-card gva-card--hover trust__card">
          <div class="trust__icon" v-html="c.icon"></div>
          <h3 class="trust__title">{{ c.title }}</h3>
          <p class="trust__desc">{{ c.desc }}</p>
          <span class="trust__tag"><i></i> {{ c.tag }}</span>
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

<style scoped>
.trust__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.trust__card { padding: 30px; }
.trust__icon {
  width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center;
  background: var(--gva-primary-soft); color: var(--gva-primary); margin-bottom: 20px;
}
.trust__title { font-size: 20px; font-weight: 700; color: var(--gva-text-strong); margin: 0 0 12px; }
.trust__desc { font-size: 14px; line-height: 1.7; color: var(--gva-text-body); margin: 0 0 20px; }
.trust__tag {
  display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px; font-weight: 600;
  color: var(--gva-primary);
}
.trust__tag i { width: 7px; height: 7px; border-radius: 999px; background: var(--gva-primary); }

@media (max-width: 860px) {
  .trust__grid { grid-template-columns: 1fr; }
}
</style>
