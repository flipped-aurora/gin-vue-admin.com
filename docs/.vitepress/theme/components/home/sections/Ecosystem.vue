<template>
  <section class="gva-section gva-section--alt">
    <div class="gva-container">
      <div class="gva-two-col">
        <div class="gva-two-col__text">
          <span class="gva-label">框架生态</span>
          <h2 class="gva-h2">不只是框架，<br />是一个<span class="gva-hl">持续生长</span>的生态</h2>
          <p class="gva-lead">
            论坛、支付、消息、存储、工作流……数百个官方与社区插件，让你像搭积木一样扩展系统能力。
          </p>
          <a class="gva-btn gva-btn--primary" href="https://plugin.gin-vue-admin.com/#/layout/home" target="_blank" rel="noopener">
            逛逛插件市场 →
          </a>
        </div>

        <div class="eco__grid">
          <a
            v-for="t in tiles"
            :key="t.name"
            class="eco__tile"
            :style="{ background: t.bg }"
            :href="t.link"
            target="_blank"
            rel="noopener"
          >
            <span class="eco__tile-name">{{ t.name }}</span>
          </a>
        </div>
      </div>

      <!-- 官方合作 + 赞助位（保留现有外链与广告位） -->
      <div class="eco__partners">
        <span class="eco__partners-label">官方合作</span>
        <div class="eco__partners-row">
          <a
            v-for="p in partners"
            :key="p.name"
            class="eco__partner"
            :href="p.href"
            target="_blank"
            rel="noopener"
          >
            <img :src="p.img" :alt="p.name" loading="lazy" />
          </a>
          <div class="wwads-cn eco__ad" data-id="260"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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

<style scoped>
.eco__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.eco__tile {
  aspect-ratio: 1.5 / 1; border-radius: 14px; display: grid; place-items: center; padding: 12px;
  color: #fff; transition: transform 0.2s ease, box-shadow 0.2s ease; position: relative; overflow: hidden;
}
.eco__tile::after {
  content: ""; position: absolute; inset: 0; background: rgba(255, 255, 255, 0.08); opacity: 0;
  transition: opacity 0.2s ease;
}
.eco__tile:hover { transform: translateY(-3px); box-shadow: 0 16px 34px rgba(15, 23, 42, 0.18); }
.eco__tile:hover::after { opacity: 1; }
.eco__tile-name { font-size: 15px; font-weight: 700; position: relative; z-index: 1; text-align: center; }

.eco__partners {
  margin-top: 56px; padding-top: 30px; border-top: 1px solid var(--gva-border);
  display: flex; align-items: center; gap: 22px; flex-wrap: wrap; justify-content: center;
}
.eco__partners-label { font-size: 13px; font-weight: 600; color: var(--gva-text-muted); }
.eco__partners-row { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; justify-content: center; }
.eco__partner {
  display: grid; place-items: center; height: 40px; padding: 6px 14px; border-radius: 10px;
  background: var(--gva-bg-base); border: 1px solid var(--gva-border); transition: border-color 0.2s ease;
}
.eco__partner:hover { border-color: var(--gva-primary-ring); }
.eco__partner img { max-height: 26px; max-width: 130px; object-fit: contain; }
.eco__ad { max-width: 320px; }

@media (max-width: 560px) {
  .eco__grid { gap: 10px; }
  .eco__tile-name { font-size: 13px; }
}
</style>
