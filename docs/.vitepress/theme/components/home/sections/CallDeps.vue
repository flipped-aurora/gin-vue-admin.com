<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="gva-head">
        <span class="gva-label">调用依赖</span>
        <h2 class="gva-h2" style="margin-top: 16px">依赖关系<span class="gva-hl">自动识别</span></h2>
        <p class="gva-lead">从 API 选择到 Skill 生成，GVA 全程处理。</p>
      </div>

      <div class="deps">
        <div class="deps__col">
          <div class="gva-terminal deps__term deps__term--bad">
            <div class="gva-terminal__bar">
              <span class="gva-terminal__dot gva-terminal__dot--r"></span>
              <span class="gva-terminal__dot gva-terminal__dot--y"></span>
              <span class="gva-terminal__dot gva-terminal__dot--g"></span>
              <span class="gva-terminal__title">不使用 GVA</span>
            </div>
            <div class="gva-terminal__body"><span class="gva-t-blue">agent</span> <span class="gva-t-dim">→</span> createOrder(<span class="gva-t-yellow">items</span>)
<span class="gva-t-dim">resolving dependencies…</span>
<span class="gva-t-red">✗ Error: Missing required param 'userId'</span>
<span class="gva-t-dim">  at createOrder (order.service)</span>
<span class="gva-t-red">  request aborted.</span></div>
          </div>
          <p class="deps__tag deps__tag--bad">调用失败</p>
        </div>

        <div class="deps__col">
          <div class="gva-terminal deps__term deps__term--good">
            <div class="gva-terminal__bar">
              <span class="gva-terminal__dot gva-terminal__dot--r"></span>
              <span class="gva-terminal__dot gva-terminal__dot--y"></span>
              <span class="gva-terminal__dot gva-terminal__dot--g"></span>
              <span class="gva-terminal__title">使用 GVA 后</span>
            </div>
            <div class="gva-terminal__body"><span class="gva-t-blue">agent</span> <span class="gva-t-dim">→</span> createOrder(<span class="gva-t-yellow">items</span>)
<span class="gva-t-green">✓</span> auto-resolved <span class="gva-t-blue">userId</span> from session
<span class="gva-t-green">✓</span> injected required params
<span class="gva-t-green">✓ Order created successfully</span>
<span class="gva-t-dim">  orderId: #100245</span></div>
          </div>
          <p class="deps__tag deps__tag--good">调用成功</p>
        </div>
      </div>

      <div style="text-align: center; margin-top: 36px">
        <a class="gva-link" href="/guide/server/mcp">了解 Skill 生成机制 <span class="gva-arrow">→</span></a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.deps { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
.deps__col { display: flex; flex-direction: column; }
.deps__term--bad { border-color: rgba(239, 68, 68, 0.5); box-shadow: 0 18px 44px rgba(239, 68, 68, 0.14); }
.deps__term--good { border-color: rgba(22, 163, 74, 0.5); box-shadow: 0 18px 44px rgba(22, 163, 74, 0.14); }
.deps__tag {
  margin: 16px 0 0; text-align: center; font-size: 14px; font-weight: 700;
}
.deps__tag--bad { color: var(--gva-danger); }
.deps__tag--good { color: var(--gva-success); }

@media (max-width: 860px) {
  .deps { grid-template-columns: 1fr; gap: 24px; }
}
</style>
