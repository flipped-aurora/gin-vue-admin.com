<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="gva-two-col">
        <div class="gva-two-col__text">
          <span class="gva-label">工具兼容</span>
          <h3 class="gva-h3">你熟悉的 <span class="gva-hl">AI 工具</span> 直接接入 GVA</h3>
          <p class="gva-lead">
            所有支持 MCP 协议的主流 AI Coding Agent，无需任何额外适配，即可直接读取、理解并操作你的
            GVA 项目，把开发流程接入你已经在用的工具链。
          </p>
          <a class="gva-link" href="/guide/server/mcp">查看接入文档 <span class="gva-arrow">→</span></a>
        </div>

        <div class="gva-card tools__card">
          <div class="tools__grid">
            <div v-for="t in tools" :key="t.name" class="tools__item">
              <span class="tools__icon" :style="{ background: t.bg, color: t.fg }">{{ t.glyph }}</span>
              <span class="tools__name">{{ t.name }}</span>
            </div>
          </div>
          <p class="tools__foot">以及所有支持 MCP 协议的 AI 工具</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const tools = [
  { name: 'Claude Code', glyph: 'C', bg: 'rgba(217,119,87,0.14)', fg: '#d97757' },
  { name: 'Cursor', glyph: '⌁', bg: 'rgba(15,23,42,0.08)', fg: '#0f172a' },
  { name: 'Codex', glyph: '◎', bg: 'rgba(16,163,127,0.14)', fg: '#10a37f' },
  { name: 'Trae', glyph: 'T', bg: 'rgba(36,101,242,0.14)', fg: '#2264F2' },
  { name: 'Windsurf', glyph: '≈', bg: 'rgba(20,184,166,0.14)', fg: '#14b8a6' },
  { name: 'OpenClaw', glyph: '✦', bg: 'rgba(245,158,11,0.16)', fg: '#f59e0b' },
]
</script>

<style scoped>
.tools__card { padding: 28px; }
.tools__grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
}
.tools__item {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 22px 10px; border: 1px solid var(--gva-border); border-radius: 12px;
  background: var(--gva-bg-base); transition: border-color 0.2s ease, transform 0.2s ease;
}
.tools__item:hover { border-color: var(--gva-primary-ring); transform: translateY(-2px); }
.tools__icon {
  width: 46px; height: 46px; border-radius: 13px; display: grid; place-items: center;
  font-size: 22px; font-weight: 800;
}
.dark .tools__item .tools__icon[style*="15,23,42"] { color: #e2e8f0 !important; }
.tools__name { font-size: 13.5px; font-weight: 600; color: var(--gva-text-strong); }
.tools__foot {
  margin: 22px 0 0; text-align: center; font-size: 13px; color: var(--gva-text-muted);
  padding-top: 18px; border-top: 1px dashed var(--gva-border);
}

@media (max-width: 560px) {
  .tools__grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
