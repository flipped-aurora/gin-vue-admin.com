<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="gva-head">
        <span class="gva-label">明星用户</span>
        <h2 class="gva-h2" style="margin-top: 16px">他们都在用 <span class="gva-hl">GVA</span></h2>
        <p class="gva-lead">从云厂商到内容平台，众多团队把 GVA 用在生产环境。</p>
      </div>

      <div class="su__carousel">
        <button class="su__arrow" aria-label="上一组" @click="move(-1)">‹</button>
        <div class="su__track">
          <div
            v-for="(u, i) in visible"
            :key="u.key"
            class="gva-card su__logo"
            :class="{ 'su__logo--center': i === 2 }"
          >
            <img :src="u.img" :alt="u.name" loading="lazy" />
          </div>
        </div>
        <button class="su__arrow" aria-label="下一组" @click="move(1)">›</button>
      </div>

      <div class="su__dots">
        <button
          v-for="(u, i) in users"
          :key="i"
          class="su__dot"
          :class="{ on: i === current }"
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

<style scoped>
.su__carousel { display: flex; align-items: center; gap: 14px; }
.su__arrow {
  flex-shrink: 0; width: 42px; height: 42px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--gva-border-strong); background: var(--gva-bg-base);
  color: var(--gva-text-body); font-size: 22px; line-height: 1; transition: all 0.18s ease;
}
.su__arrow:hover { border-color: var(--gva-primary); color: var(--gva-primary); }
.su__track { flex: 1; display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; align-items: center; }
.su__logo {
  height: 96px; display: grid; place-items: center; padding: 18px; opacity: 0.55;
  transition: all 0.25s ease;
}
.su__logo img { max-width: 100%; max-height: 48px; object-fit: contain; filter: grayscale(100%); transition: filter 0.25s ease; }
.su__logo--center { opacity: 1; transform: scale(1.06); box-shadow: var(--gva-shadow); border-color: var(--gva-primary-ring); }
.su__logo--center img { filter: none; }

.su__dots { display: flex; justify-content: center; gap: 7px; margin-top: 26px; flex-wrap: wrap; }
.su__dot { width: 8px; height: 8px; border-radius: 999px; border: none; cursor: pointer; background: var(--gva-border-strong); transition: all 0.2s ease; }
.su__dot.on { width: 22px; background: var(--gva-primary); }

@media (max-width: 860px) {
  .su__track { grid-template-columns: repeat(3, 1fr); }
  .su__track > .su__logo:first-child, .su__track > .su__logo:last-child { display: none; }
}
@media (max-width: 520px) {
  .su__track { grid-template-columns: 1fr; }
  .su__logo:not(.su__logo--center) { display: none; }
}
</style>
