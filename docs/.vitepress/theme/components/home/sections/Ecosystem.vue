<template>
  <section class="gva-section gva-section--alt">
    <div class="gva-container">
      <div class="grid grid-cols-1 gap-8 min-[860px]:grid-cols-2 min-[860px]:items-center min-[860px]:gap-14">
        <div>
          <h2 class="text-[clamp(28px,3.6vw,40px)] leading-[1.18] font-bold tracking-[-0.02em] text-[var(--gva-text-strong)]">不只是框架，<br />是一个<span class="text-[var(--gva-primary)]">持续生长</span>的生态</h2>
          <p class="text-[clamp(14px,1.5vw,18px)] leading-[2] text-[var(--gva-text-body)] max-w-[820px] mt-[18px] mb-6 max-[860px]:font-light">
            论坛、支付、消息、存储、工作流……数百个官方与社区插件，让你像搭积木一样扩展系统能力。
          </p>
          <a class="relative inline-flex items-center gap-2.5 pb-[13px] text-[16px] leading-none font-medium text-[#0b72ff] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-[#287cff] max-[860px]:text-[14px]" href="https://plugin.gin-vue-admin.com/#/layout/home" target="_blank" rel="noopener">
            逛逛插件市场
            <img class="block w-3.5 h-3.5 object-contain" :src="arrRightIcon" alt="" aria-hidden="true" />
          </a>
        </div>

        <div class="grid grid-cols-3 gap-3.5 max-[560px]:gap-2.5">
          <a
            v-for="t in tiles"
            :key="t.name"
            class="aspect-[1.5/1] rounded-[14px] grid place-items-center p-3 text-white relative overflow-hidden transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-[0_16px_34px_rgba(15,23,42,0.18)] after:content-[''] after:absolute after:inset-0 after:bg-white/[0.08] after:opacity-0 after:transition-opacity after:duration-200 hover:after:opacity-100"
            :style="{ background: t.bg }"
            :href="t.link"
            target="_blank"
            rel="noopener"
          >
            <span class="text-[14px] font-bold relative z-[1] text-center max-[560px]:text-[13px]">{{ t.name }}</span>
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import arrRightIcon from '@/public/web/arr-right.png'

const PLUGIN = 'https://plugin.gin-vue-admin.com/#/layout/home'
const tiles = [
  { name: '极光论坛', bg: 'linear-gradient(135deg,#2264F2,#5b8cff)', link: PLUGIN },
  { name: '支付中心', bg: 'linear-gradient(135deg,#16a34a,#4ade80)', link: PLUGIN },
  { name: '消息队列', bg: 'linear-gradient(135deg,#f59e0b,#fbbf24)', link: PLUGIN },
  { name: '对象存储', bg: 'linear-gradient(135deg,#8b5cf6,#c084fc)', link: PLUGIN },
  { name: '短信服务', bg: 'linear-gradient(135deg,#ec4899,#f472b6)', link: PLUGIN },
  { name: '数据大屏', bg: 'linear-gradient(135deg,#0ea5e9,#38bdf8)', link: PLUGIN },
  { name: '工作流', bg: 'linear-gradient(135deg,#ef4444,#fb7185)', link: PLUGIN },
  { name: '权限扩展', bg: 'linear-gradient(135deg,#14b8a6,#2dd4bf)', link: PLUGIN },
  { name: '更多组件 →', bg: 'linear-gradient(135deg,#475569,#94a3b8)', link: PLUGIN },
]
const partners = [
  { name: 'EasySearch', img: '/advertising/easysearch.png', href: 'https://easysearch.cn' },
  { name: '崔亮的博客', img: '/advertising/cuiliang.png', href: 'https://www.cuiliangblog.cn' },
  { name: 'VForm', img: '/advertising/vform-banner.png', href: 'https://www.vform666.com' },
]
</script>
