<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="text-center mb-14 max-[860px]:mb-10">
        <span class="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.02em] text-[var(--gva-primary)] mb-4 before:content-[''] before:w-[7px] before:h-[7px] before:rounded-full before:bg-[var(--gva-primary)] before:shadow-[0_0_0_4px_var(--gva-primary-soft)]">明星用户</span>
        <h2 class="text-[clamp(28px,3.6vw,40px)] leading-[1.18] font-bold tracking-[-0.02em] text-[var(--gva-text-strong)]" style="margin-top: 16px">他们都在用 <span class="text-[var(--gva-primary)]">GVA</span></h2>
        <p class="text-[clamp(15px,1.5vw,18px)] leading-[2] text-[var(--gva-text-body)] max-w-[820px] mt-4 mx-auto">从云厂商到内容平台，众多团队把 GVA 用在生产环境。</p>
      </div>

      <div class="flex items-center gap-3.5">
        <button class="shrink-0 w-[42px] h-[42px] rounded-full cursor-pointer border border-[var(--gva-border-strong)] bg-[var(--gva-bg-base)] text-[var(--gva-text-body)] text-[22px] leading-none transition-all duration-[180ms] hover:border-[var(--gva-primary)] hover:text-[var(--gva-primary)]" aria-label="上一组" @click="move(-1)">‹</button>
        <div class="flex-1 grid grid-cols-5 gap-4 items-center max-[860px]:grid-cols-3 max-[520px]:grid-cols-1">
          <div
            v-for="(u, i) in visible"
            :key="u.key"
            class="grid place-items-center h-24 p-[18px] bg-[var(--gva-bg-base)] border rounded-[var(--gva-radius)] transition-all duration-[250ms] max-[860px]:first:hidden max-[860px]:last:hidden"
            :class="i === 2 ? 'opacity-100 scale-[1.06] shadow-[shadow:var(--gva-shadow)] border-[var(--gva-primary-ring)]' : 'opacity-[0.55] shadow-[shadow:var(--gva-shadow-sm)] border-[var(--gva-border)] max-[520px]:hidden'"
          >
            <img :src="u.img" :alt="u.name" loading="lazy" class="max-w-full max-h-12 object-contain transition-[filter] duration-[250ms]" :class="i === 2 ? 'grayscale-0' : 'grayscale'" />
          </div>
        </div>
        <button class="shrink-0 w-[42px] h-[42px] rounded-full cursor-pointer border border-[var(--gva-border-strong)] bg-[var(--gva-bg-base)] text-[var(--gva-text-body)] text-[22px] leading-none transition-all duration-[180ms] hover:border-[var(--gva-primary)] hover:text-[var(--gva-primary)]" aria-label="下一组" @click="move(1)">›</button>
      </div>

      <div class="flex justify-center gap-[7px] mt-[26px] flex-wrap">
        <button
          v-for="(u, i) in users"
          :key="i"
          class="h-2 rounded-full border-0 cursor-pointer transition-all duration-200"
          :class="i === current ? 'w-[22px] bg-[var(--gva-primary)]' : 'w-2 bg-[var(--gva-border-strong)]'"
          :aria-label="u.name"
          @click="current = i"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const users = [
  { name: '华数传媒', img: '/user/huashu-tight.png' },
  { name: 'Alibaba Cloud', img: '/user/ali.svg' },
  { name: 'ByteDance', img: '/user/zijie.svg' },
  { name: 'Tencent', img: '/user/tengxun.svg' },
  { name: 'vivo', img: '/user/vivo-tight.svg' },
  { name: 'Anker', img: '/user/anker.svg' },
  { name: 'China Mobile', img: '/user/mobile-tight.png' },
  { name: 'Douyu', img: '/user/douyu.svg' },
  { name: 'Cadence', img: '/user/cadence.svg' },
  { name: 'Transsion', img: '/user/transsion.svg' },
]

const current = ref(1)
const move = (d) => {
  const n = users.length
  current.value = (current.value + d + n) % n
}
const visible = computed(() => {
  const n = users.length
  return [-2, -1, 0, 1, 2].map((off) => {
    const idx = (current.value + off + n) % n
    return { ...users[idx], key: `${idx}-${off}` }
  })
})
</script>
