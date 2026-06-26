<template>
  <section class="gva-section hero">
    <div class="gva-container hero__inner">
      <h1 class="gva-h1 hero__title">
        用 AI 构建系统，让系统为 AI 工作
      </h1>
      <p class="gva-lead hero__lead">
        GVA 3.0 将 AI 辅助开发、全栈工程能力与智能调用体系融为一体，<br />
        让开发者更高效地构建系统，也让系统中的 API、服务与业务流程能够被 AI 理解和调用。<br />
        让每一个业务系统，天然具备 AI 能力。
      </p>
      <div class="hero__actions">
        <a class="gva-btn gva-btn--primary" href="https://demo.gin-vue-admin.com" target="_blank" rel="noopener">
          立即体验
        </a>
        <a class="gva-btn gva-btn--ghost" href="/guide/introduce/project">查看文档</a>
      </div>
    </div>
  </section>
</template>

<script setup>
// Hero 区只承载标题 + 副标题 + 两个按钮。
// 视频/产品预览已迁移到紧随其后的 VideoSection.vue，本区不含任何视频元素。
</script>

<style scoped>
.hero {
  /* 自然流缩短：略矮于视口，使下方 VideoSection 卡片顶部从首屏底部露出 ~70px。
     顶栏(.VPNavBar)在文档流中占 64px；卡片顶 = 64 + 本区高 + VideoSection 上 padding(60)。
     令卡片顶 = 100vh - 70(露出量) → 本区高 = 100vh - 194。露出量与视口高度无关。 */
  min-height: calc(100vh - 194px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    radial-gradient(900px 460px at 50% -8%, rgba(36, 101, 242, 0.1), transparent 70%),
    var(--gva-bg-base);
  overflow: hidden;
}
.hero__inner { text-align: center; display: flex; flex-direction: column; align-items: center; }
.hero__title { margin: 0 0 20px; }
.hero__lead { margin: 0 auto 30px; max-width: 760px; }
.hero__actions { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }

@media (max-width: 860px) {
  .hero {
    min-height: auto;
    padding: 96px 20px 64px;
  }
  .hero__actions .gva-btn { flex: 1; min-width: 140px; }
}
</style>
