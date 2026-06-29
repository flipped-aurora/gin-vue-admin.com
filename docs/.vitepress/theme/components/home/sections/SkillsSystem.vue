<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="gva-two-col gva-two-col--reverse">
        <!-- terminal -->
        <div class="skills__term">
          <img
            class="skills__img"
            src="/web/codeimg.png"
            alt="执行 gva init 后的终端输出"
            loading="lazy"
          />
          <p class="gva-muted skills__cap">执行 gva init 后的实际输出</p>
        </div>

        <!-- text -->
        <div class="gva-two-col__text">
          <span class="gva-label">Skills 系统</span>
          <h3 class="gva-h3">不只是接入<br />AI <span class="gva-hl">真正理解</span>你的系统</h3>
          <p class="gva-lead">
            执行 gva init，GVA 的代码规范、模块结构、命名约定自动打包成 Skills，安装进你的 AI Agent。
          </p>
          <p class="gva-lead">
            它知道 GVA 怎么组织代码，生成的结果直接符合项目规范，不需要你反复纠正。
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
.skills__img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--gva-radius);
}
.skills__cap { margin-top: 12px; text-align: center; }
.skills__pills { margin: 4px 0 24px; }
</style>
