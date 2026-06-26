<template>
  <section class="gva-section fcta">
    <div class="gva-container fcta__inner">
      <span class="gva-label">准备好了吗</span>
      <h2 class="gva-h2 fcta__title">强大的 API，<span class="gva-hl">更强大的 AI</span></h2>
      <p class="gva-lead fcta__lead">GVA 3.0，让 API 也能被 AI 理解、调用、自动化。</p>
      <div class="fcta__actions">
        <a class="gva-btn gva-btn--primary" href="https://demo.gin-vue-admin.com" target="_blank" rel="noopener">立即体验</a>
        <a class="gva-btn gva-btn--ghost" href="/guide/introduce/project">阅读文档 →</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fcta {
  background:
    radial-gradient(720px 360px at 50% 120%, rgba(36, 101, 242, 0.12), transparent 70%),
    var(--gva-bg-base);
}
.fcta__inner { text-align: center; display: flex; flex-direction: column; align-items: center; }
.fcta__title { margin: 16px 0 0; }
.fcta__lead { margin: 16px auto 32px; }
.fcta__actions { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }

@media (max-width: 560px) {
  .fcta__actions .gva-btn { flex: 1; min-width: 140px; }
}
</style>
