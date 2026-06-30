<template>
  <section class="gva-section !py-[44px] min-[861px]:!py-[100px] lg:!py-[128px] xl:!py-[160px]">
    <div class="gva-container">
      <div class="text-center mb-14 min-[861px]:mb-16 max-[860px]:mb-10">
        <h2 class="text-[clamp(28px,3.8vw,44px)] leading-[1.18] font-bold tracking-[-0.02em] text-[var(--gva-text-strong)]" style="margin-top: 16px">他们都在用 <span class="text-[var(--gva-primary)]">GVA</span></h2>
        <p class="text-[clamp(15px,1.6vw,19px)] leading-[2] text-[var(--gva-text-body)] max-w-[820px] mt-4 mx-auto">从云厂商到内容平台，众多团队把 GVA 用在生产环境。</p>
      </div>

      <div class="flex items-center gap-3.5 min-[861px]:gap-5">
        <button class="shrink-0 w-[42px] h-[42px] min-[861px]:w-[50px] min-[861px]:h-[50px] rounded-full cursor-pointer border border-[var(--gva-border-strong)] bg-[var(--gva-bg-base)] text-[var(--gva-text-body)] text-[22px] min-[861px]:text-[26px] leading-none transition-all duration-[180ms] hover:border-[var(--gva-primary)] hover:text-[var(--gva-primary)]" aria-label="上一组" @click="move(-1)">‹</button>
        <div class="flex-1 grid grid-cols-5 gap-4 min-[861px]:gap-5 items-center max-[860px]:grid-cols-3 max-[520px]:grid-cols-1">
          <div
            v-for="(u, i) in visible"
            :key="u.key"
            class="grid place-items-center h-24 min-[861px]:h-32 p-[18px] min-[861px]:p-7 bg-[var(--gva-bg-base)] border rounded-[var(--gva-radius)] transition-all duration-[250ms] max-[860px]:first:hidden max-[860px]:last:hidden"
            :class="i === 2 ? 'opacity-100 scale-[1.06] shadow-[shadow:var(--gva-shadow)] border-[var(--gva-primary-ring)]' : 'opacity-[0.55] shadow-[shadow:var(--gva-shadow-sm)] border-[var(--gva-border)] max-[520px]:hidden'"
          >
            <img :src="u.img" :alt="u.name" loading="lazy" class="max-w-full max-h-12 min-[861px]:max-h-16 object-contain transition-[filter] duration-[250ms]" :class="i === 2 ? 'grayscale-0' : 'grayscale'" />
          </div>
        </div>
        <button class="shrink-0 w-[42px] h-[42px] min-[861px]:w-[50px] min-[861px]:h-[50px] rounded-full cursor-pointer border border-[var(--gva-border-strong)] bg-[var(--gva-bg-base)] text-[var(--gva-text-body)] text-[22px] min-[861px]:text-[26px] leading-none transition-all duration-[180ms] hover:border-[var(--gva-primary)] hover:text-[var(--gva-primary)]" aria-label="下一组" @click="move(1)">›</button>
      </div>

      <div class="flex justify-center gap-[7px] mt-[26px] min-[861px]:mt-[34px] flex-wrap">
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