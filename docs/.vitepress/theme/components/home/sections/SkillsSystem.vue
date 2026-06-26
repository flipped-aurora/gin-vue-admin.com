<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="gva-two-col gva-two-col--reverse">
        <!-- terminal -->
        <div class="skills__term">
          <div class="gva-terminal">
            <div class="gva-terminal__bar">
              <span class="gva-terminal__dot gva-terminal__dot--r"></span>
              <span class="gva-terminal__dot gva-terminal__dot--y"></span>
              <span class="gva-terminal__dot gva-terminal__dot--g"></span>
              <span class="gva-terminal__title">my-gva-project — zsh</span>
            </div>
            <div class="gva-terminal__body"><span class="gva-t-dim">$</span> cd my-gva-project
<span class="gva-t-dim">$</span> gva init
<span class="gva-t-dim">Initializing…</span>
<span class="gva-t-dim">Connecting…</span>
<span class="gva-t-green">✓</span> Skills installed successfully
<span class="gva-t-green">✓</span> 8 skills loaded: <span class="gva-t-blue">data-modeling, ui-builder, workflow,
  permissions, plugin-dev…</span>
<span class="gva-t-white">Ready. Your AI Agent now understands GVA.</span></div>
          </div>
          <p class="gva-muted skills__cap">执行 gva init 后的实际输出</p>
        </div>

        <!-- text -->
        <div class="gva-two-col__text">
          <span class="gva-label">Skills 系统</span>
          <h3 class="gva-h3">不只是接入，<span class="gva-hl">AI 真正理解</span>你的系统</h3>
          <p class="gva-lead">
            一条 <code class="skills__code">gva init</code> 命令，GVA 把数据建模、UI 构建、工作流、权限等能力
            打包成 Skills 注入 AI Agent，让它了解你的目录结构、数据模型与业务约定，而不是凭空猜测。
          </p>
          <div class="gva-pills skills__pills">
            <span v-for="s in skills" :key="s" class="gva-pill">{{ s }}</span>
          </div>
          <a class="gva-link" href="/guide/server/mcp">了解 Skills 机制 <span class="gva-arrow">→</span></a>
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

<style scoped>
.skills__cap { margin-top: 12px; text-align: center; }
.skills__pills { margin: 4px 0 24px; }
.skills__code {
  font-family: var(--vp-font-family-mono); font-size: 0.9em;
  background: var(--gva-primary-soft); color: var(--gva-primary);
  padding: 2px 7px; border-radius: 6px;
}
</style>
