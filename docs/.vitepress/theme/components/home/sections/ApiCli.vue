<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="gva-head">
        <span class="gva-label">API CLI 化</span>
        <h2 class="gva-h2" style="margin-top: 16px">
          已有 API，<span class="gva-hl">一键生成</span>可调用的 Skill
        </h2>
        <p class="gva-lead">
          把现成的接口包装成 Agent 能直接理解和调用的 Skill，不必为 AI 重写任何后端逻辑。
        </p>
      </div>

      <ol class="apicli">
        <li v-for="(s, i) in steps" :key="s.title" class="apicli__step">
          <span class="gva-ghost-num">{{ s.num }}</span>
          <span class="apicli__dot"></span>
          <h4 class="apicli__title">{{ s.title }}</h4>
          <p class="apicli__desc">{{ s.desc }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
const steps = [
  { num: '01', title: '选择 API', desc: '从项目里勾选要开放给 Agent 的接口' },
  { num: '02', title: '填写描述', desc: '用自然语言说明用途与参数含义' },
  { num: '03', title: '生成 ZIP', desc: '一键打包成标准 Skill 资源文件' },
  { num: '04', title: 'Agent 调用', desc: 'AI 工具导入后即可直接调用' },
]
</script>

<style scoped>
.apicli {
  list-style: none; padding: 0; margin: 0;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
  position: relative;
}
.apicli::before {
  content: ""; position: absolute; top: 46px; left: 12%; right: 12%; height: 1px;
  background: repeating-linear-gradient(90deg, var(--gva-border-strong) 0 6px, transparent 6px 14px);
  z-index: 0;
}
.apicli__step { position: relative; z-index: 1; text-align: center; padding: 0 6px; }
.apicli__dot {
  display: block; width: 11px; height: 11px; border-radius: 999px; margin: 6px auto 18px;
  background: var(--gva-primary); box-shadow: 0 0 0 5px var(--gva-primary-soft);
}
.apicli__title { font-size: 17px; font-weight: 700; color: var(--gva-text-strong); margin: 0 0 8px; }
.apicli__desc { font-size: 13.5px; color: var(--gva-text-body); margin: 0; line-height: 1.6; }

@media (max-width: 860px) {
  .apicli { grid-template-columns: 1fr 1fr; gap: 32px 20px; }
  .apicli::before { display: none; }
}
@media (max-width: 480px) {
  .apicli { grid-template-columns: 1fr; }
}
</style>
