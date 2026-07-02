<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="text-center mb-14 max-[860px]:mb-10">
        <h2 class="text-[clamp(28px,3.6vw,40px)] leading-[1.18] font-bold tracking-[-0.02em] text-[var(--gva-text-strong)]" style="margin-top: 16px"><span class="block"><span class="text-[var(--gva-primary)]">3 万+</span> 开发者</span><span class="block">已经在用 GVA</span></h2>
        <p class="text-[clamp(14px,1.5vw,18px)] leading-[2] text-[var(--gva-text-body)] max-w-[820px] mt-4 mx-auto max-[860px]:font-light">一个被持续验证、持续生长的开源全栈框架。</p>
      </div>

      <div class="grid grid-cols-4 gap-5 mb-[52px] max-[860px]:grid-cols-2">
        <div v-for="(s, i) in stats" :key="s.label" class="relative text-center py-[26px] px-3">
          <span
            class="block text-[clamp(26px,3.2vw,36px)] font-extrabold tracking-[-0.02em]"
            :class="i === 0 ? 'text-[var(--gva-primary)]' : 'text-[var(--gva-text-strong)]'"
          >{{ s.num }}</span>
          <span class="block mt-2 text-[13.5px] text-[var(--gva-text-muted)]">{{ s.label }}</span>
          <span
            v-if="i < stats.length - 1"
            class="absolute right-0 top-1/2 hidden h-[60%] w-px -translate-y-1/2 bg-[var(--gva-border)] min-[861px]:block"
          ></span>
        </div>
      </div>

      <!-- 轮播区：版心内三栏排列，中间高亮、两侧弱化 -->
      <div class="grid grid-cols-3 gap-[18px] items-stretch max-[860px]:grid-cols-1">
        <div
          v-for="(t, i) in visible"
          :key="t.key"
          class="h-[200px] overflow-hidden bg-[var(--gva-bg-base)] border rounded-[var(--gva-radius)] p-6 flex flex-col justify-between transition-all duration-[250ms]"
          :class="i === 1
            ? 'opacity-100 -translate-y-1.5 max-[860px]:translate-y-0 shadow-[shadow:var(--gva-shadow)] border-[var(--gva-primary-ring)]'
            : 'opacity-[0.66] blur-[2px] shadow-[shadow:var(--gva-shadow-sm)] border-[var(--gva-border)] max-[860px]:hidden'"
        >
          <p class="text-[14px] leading-[1.7] text-[var(--gva-text-body)] m-0 mb-5 line-clamp-3 max-[860px]:font-light">“{{ t.text }}”</p>
          <div class="flex items-center gap-3">
            <span class="shrink-0 w-[38px] h-[38px] rounded-full grid place-items-center text-white font-bold" :style="{ background: t.color }">{{ t.name[0] }}</span>
            <span>
              <strong class="block text-[14px] text-[var(--gva-text-strong)]">{{ t.name }}</strong>
              <em class="not-italic text-[12.5px] text-[var(--gva-text-muted)] max-[860px]:font-light">{{ t.role }}</em>
            </span>
          </div>
        </div>
      </div>

      <div class="flex justify-center gap-2 mt-7">
        <button
          v-for="(t, i) in testimonials"
          :key="i"
          class="h-2 rounded-full border-none cursor-pointer transition-all duration-200"
          :class="i === current ? 'w-[22px] bg-[var(--gva-primary)]' : 'w-2 bg-[var(--gva-border-strong)]'"
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
const visible = computed(() => {
  const n = testimonials.length
  return [-1, 0, 1].map((off) => {
    const idx = (current.value + off + n) % n
    return { ...testimonials[idx], key: `${idx}-${off}` }
  })
})
</script>