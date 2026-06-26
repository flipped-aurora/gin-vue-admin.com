<template>
  <section class="gva-section hero">
    <div class="gva-container hero__inner">
      <h1 class="gva-h1 hero__title hero__desktop-title">
        用 AI 构建系统，让系统为 AI 工作
      </h1>
      <h1 class="gva-h1 hero__title hero__mobile-title" aria-label="让现有 API 成为 AI Agent 可直接调用的业务能力">
        让现有 API 成为
        <span class="hero__title-line">AI Agent <span class="hero__title-accent">可直接调用</span>的</span>
        业务能力
      </h1>
      <p class="gva-lead hero__lead hero__desktop-lead">
        GVA 3.0 将 AI 辅助开发、全栈工程能力与智能调用体系融为一体，<br />
        让开发者更高效地构建系统，也让系统中的 API、服务与业务流程能够被 AI 理解和调用。<br />
        让每一个业务系统，天然具备 AI 能力。
      </p>
      <p class="gva-lead hero__lead hero__mobile-lead">
        在 GVA 中选择 API，填写每个 Skill 的名称与描述，<br />
        点击生成，下载包含 API 代码与自动生成的<br />
        Skill 文件的 ZIP 包。<br />
        将 Skill 文件放入项目后，任何 AI Agent 即可直接<br />
        调用这些 API，统一内部权限校验，无需额外配置。
      </p>
      <div class="hero__actions">
        <a class="gva-btn gva-btn--primary" href="https://demo.gin-vue-admin.com" target="_blank" rel="noopener">
          立即体验
        </a>
        <a class="gva-btn gva-btn--ghost" target="_blank" href="/guide/introduce/project">查看文档</a>
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
  /* 顶部 padding 抵消顶栏(64px)与底部缩短(64px)的偏置，使内容在视口中真正垂直居中。 */
  padding: 66px 24px 0;
  background: var(--gva-bg-base);
  overflow: hidden;
}
.hero__inner { max-width: var(--gva-content); text-align: center; display: flex; flex-direction: column; align-items: center; }
@media (min-width: 861px) {
  .hero__inner { transform: translateY(20%); }
}
.hero__mobile-title { display: none; }
.hero__mobile-lead { display: none; }
.hero__title { margin: 0 0 20px; }
.hero__title-line { display: inline; }
.hero__title-accent { color: var(--gva-primary); }
.hero__lead { margin: 40px 0 30px ; max-width: 760px; color: #808080; }
.hero__actions { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }

/* 按钮标准已下沉到全局 .gva-btn（圆角矩形 8px / 高 52px / padding 0 28）。
   首屏两个 CTA 额外用等宽 min-width。 */
.hero__actions .gva-btn { min-width: 160px; }

@media (max-width: 860px) {
  .hero {
    min-height: auto;
    padding: 60px 24px 18px;
  }
  .hero__inner { width: min(100%, 300px); }
  .hero__desktop-title { display: none; }
  .hero__desktop-lead { display: none; }
  .hero__mobile-title {
    display: block;
    margin: 0 0 18px;
    font-size: 28px;
    line-height: 1.32;
    font-weight: 700;
    letter-spacing: 0;
  }
  .hero__mobile-lead { display: block; }
  .hero__mobile-title .hero__title-line { display: block; }
  .hero__lead {
    margin: 0 0 28px;
    max-width: 100%;
    font-size: 13px;
    line-height: 2.15;
  }
  .hero__actions {
    width: 100%;
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  .hero__actions .gva-btn {
    width: 90%;
    flex: none;
    min-width: 0;
  }
}
</style>
