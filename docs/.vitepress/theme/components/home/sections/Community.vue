<template>
  <section class="gva-section gva-section--alt">
    <div class="gva-container">
      <div class="gva-head">
        <span class="gva-label">社区口碑</span>
        <h2 class="gva-h2" style="margin-top: 16px"><span class="gva-hl">3 万+</span> 开发者 已经在用 GVA</h2>
        <p class="gva-lead">一个被持续验证、持续生长的开源全栈框架。</p>
      </div>

      <div class="cm__stats">
        <div v-for="s in stats" :key="s.label" class="cm__stat">
          <span class="cm__num">{{ s.num }}</span>
          <span class="cm__label">{{ s.label }}</span>
        </div>
      </div>

      <div class="cm__carousel">
        <button class="cm__arrow" aria-label="上一条" @click="move(-1)">‹</button>
        <div class="cm__track">
          <div
            v-for="(t, i) in visible"
            :key="t.key"
            class="gva-card cm__quote"
            :class="{ 'cm__quote--center': i === 1 }"
          >
            <p class="cm__text">“{{ t.text }}”</p>
            <div class="cm__author">
              <span class="cm__avatar" :style="{ background: t.color }">{{ t.name[0] }}</span>
              <span>
                <strong>{{ t.name }}</strong>
                <em>{{ t.role }}</em>
              </span>
            </div>
          </div>
        </div>
        <button class="cm__arrow" aria-label="下一条" @click="move(1)">›</button>
      </div>

      <div class="cm__dots">
        <button
          v-for="(t, i) in testimonials"
          :key="i"
          class="cm__dot"
          :class="{ on: i === current }"
          :aria-label="`第 ${i + 1} 条`"
          @click="current = i"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const stats = [
  { num: '30,000+', label: 'GitHub Stars' },
  { num: '5,800+', label: 'Forks' },
  { num: '400+', label: '贡献者' },
  { num: '200+', label: '生态插件' },
]

const testimonials = [
  { text: '从建模到上线，GVA 把重复劳动几乎全部自动化了，团队真正把精力放在业务上。', name: '李工', role: '后端负责人 · 某 SaaS 团队', color: '#2264F2' },
  { text: '接入 MCP 后，AI 直接读懂我们的项目结构，生成的代码风格和现有工程完全一致。', name: '王敏', role: '全栈工程师', color: '#16a34a' },
  { text: '权限体系做得很扎实，把 AI Agent 也纳入同一套 RBAC，安全上让人放心。', name: '张磊', role: '技术架构师', color: '#f59e0b' },
  { text: '代码生成器 + 插件市场，让一个小团队也能快速交付企业级后台。', name: '陈晨', role: '独立开发者', color: '#8b5cf6' },
  { text: '文档和社区都很活跃，遇到问题基本当天就能找到答案。', name: '赵宇', role: '前端负责人', color: '#ef4444' },
]

const current = ref(0)
const move = (d) => {
  const n = testimonials.length
  current.value = (current.value + d + n) % n
}
const visible = computed(() => {
  const n = testimonials.length
  return [-1, 0, 1].map((off) => {
    const idx = (current.value + off + n) % n
    return { ...testimonials[idx], key: `${idx}-${off}` }
  })
})
</script>

<style scoped>
.cm__stats {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 52px;
}
.cm__stat {
  text-align: center; padding: 26px 12px; background: var(--gva-bg-base);
  border: 1px solid var(--gva-border); border-radius: var(--gva-radius);
}
.cm__num { display: block; font-size: clamp(26px, 3.2vw, 36px); font-weight: 800; color: var(--gva-primary); letter-spacing: -0.02em; }
.cm__label { display: block; margin-top: 8px; font-size: 13.5px; color: var(--gva-text-muted); }

.cm__carousel { display: flex; align-items: center; gap: 14px; }
.cm__arrow {
  flex-shrink: 0; width: 42px; height: 42px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--gva-border-strong); background: var(--gva-bg-base);
  color: var(--gva-text-body); font-size: 22px; line-height: 1; transition: all 0.18s ease;
}
.cm__arrow:hover { border-color: var(--gva-primary); color: var(--gva-primary); }
.cm__track { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; align-items: stretch; }
.cm__quote { padding: 24px; display: flex; flex-direction: column; justify-content: space-between; opacity: 0.66; transition: all 0.25s ease; }
.cm__quote--center { opacity: 1; transform: translateY(-6px); box-shadow: var(--gva-shadow); border-color: var(--gva-primary-ring); }
.cm__text { font-size: 14.5px; line-height: 1.7; color: var(--gva-text-body); margin: 0 0 20px; }
.cm__author { display: flex; align-items: center; gap: 12px; }
.cm__avatar { width: 38px; height: 38px; border-radius: 999px; display: grid; place-items: center; color: #fff; font-weight: 700; }
.cm__author strong { display: block; font-size: 14px; color: var(--gva-text-strong); }
.cm__author em { font-style: normal; font-size: 12.5px; color: var(--gva-text-muted); }

.cm__dots { display: flex; justify-content: center; gap: 8px; margin-top: 28px; }
.cm__dot { width: 8px; height: 8px; border-radius: 999px; border: none; cursor: pointer; background: var(--gva-border-strong); transition: all 0.2s ease; }
.cm__dot.on { width: 22px; background: var(--gva-primary); }

@media (max-width: 860px) {
  .cm__stats { grid-template-columns: repeat(2, 1fr); }
  .cm__track { grid-template-columns: 1fr; }
  .cm__quote:not(.cm__quote--center) { display: none; }
  .cm__quote--center { transform: none; }
}
</style>
