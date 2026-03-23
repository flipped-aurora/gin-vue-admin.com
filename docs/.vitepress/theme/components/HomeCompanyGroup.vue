<template>
  <section id="company-group">
    <div class="container">
      <div class="company-title">{{ sectionTitles.featuredUsers }}</div>
      <div class="brand-grid">
        <div
          v-for="item in featuredUsers"
          :key="item.name"
          class="brand-grid-item"
          :class="item.surface ? `surface-${item.surface}` : ''"
        >
          <div class="brand-surface">
            <img
              :src="item.img"
              :alt="item.name"
              :style="getImageStyle(item)"
              data-nosnippet
            >
          </div>
        </div>
      </div>

      <div class="company-title mt-14">{{ sectionTitles.officialPartners }}</div>
      <div class="company-box">
        <a
          v-for="item in partners"
          :key="item.href"
          class="company-box-item"
          :class="[
            item.surface ? `surface-${item.surface}` : '',
            item.meta ? 'has-meta' : 'logo-only',
          ]"
          :href="item.href"
          target="_blank"
          rel="noreferrer"
        >
          <div class="brand-surface company-logo-surface">
            <img
              :src="item.img"
              :alt="item.name"
              :style="getImageStyle(item)"
              data-nosnippet
            >
          </div>
          <div v-if="item.meta" class="company-meta">
            <div class="company-box-item-title">{{ item.meta.title }}</div>
            <div class="company-box-item-description">{{ item.meta.description }}</div>
          </div>
        </a>
      </div>

      <div class="company-title">{{ sectionTitles.advertising }}</div>
      <div class="flex justify-center">
        <div class="wwads-cn wwads-horizontal" data-id="260" style="max-width:350px"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface BrandMeta {
  title: string
  description: string
}

interface BrandItem {
  name: string
  img: string
  href?: string
  width?: number
  surface?: 'light' | 'contrast'
  meta?: BrandMeta
}

const sectionTitles = {
  featuredUsers: '\u660e\u661f\u7528\u6237',
  officialPartners: '\u5b98\u65b9\u5408\u4f5c',
  advertising: '\u5e7f\u544a',
}

const featuredUsers: BrandItem[] = [
  { name: 'Alibaba', img: '/user/ali.svg' },
  { name: 'ByteDance', img: '/user/zijie.svg' },
  { name: 'Tencent', img: '/user/tengxun.svg' },
  { name: 'EA', img: '/user/ea.svg' },
  { name: 'Douyu', img: '/user/douyu.svg' },
  { name: 'vivo', img: '/user/vivo-tight.svg' },
  { name: 'Anker', img: '/user/anker.svg' },
  { name: 'Shenxinfu', img: '/user/shenxinfu.png' },
  { name: 'Cadence', img: '/user/cadence.svg' },
  { name: 'Transsion', img: '/user/transsion.svg' },
  { name: 'China Mobile', img: '/user/mobile-tight.png' },
  { name: 'Huashu', img: '/user/huashu-tight.png' },
]

const partners: BrandItem[] = [
  { name: 'EasySearch', img: '/advertising/easysearch.png', href: 'https://easysearch.cn' },
  {
    name: 'Cuiliang Blog',
    img: '/advertising/cuiliang.png',
    href: 'https://www.cuiliangblog.cn',
    surface: 'contrast',
    meta: {
      title: '\u5d14\u4eae\u7684\u535a\u5ba2',
      description: '\u8fd0\u7ef4\u7814\u53d1\u535a\u5ba2',
    },
  },
  { name: 'VForm', img: '/advertising/vform-banner.png', href: 'https://www.vform666.com' },
  { name: 'Nutpi', img: '/advertising/jianguo.png', href: 'https://www.nutpi.net' },
]

const getImageStyle = (item: BrandItem) =>
  item.width
    ? { maxWidth: `${item.width}px` }
    : undefined
</script>

<style scoped>
#company-group {
  padding: 12px 24px 24px;
  text-align: center;
  margin-top: 20px;
  border-top: 1px solid var(--vp-c-bg-soft);
  --card-height: 148px;
  --card-radius: 26px;
  --card-border: rgba(148, 163, 184, 0.22);
  --card-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 250, 252, 0.88) 100%);
  --card-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
  --surface-light-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95));
  --surface-contrast-bg: linear-gradient(135deg, rgba(23, 37, 84, 0.96), rgba(15, 23, 42, 0.98));
}

.dark #company-group {
  --card-border: rgba(148, 163, 184, 0.12);
  --card-bg: linear-gradient(180deg, rgba(17, 24, 39, 0.9) 0%, rgba(15, 23, 42, 0.82) 100%);
  --card-shadow: 0 20px 44px rgba(2, 6, 23, 0.34);
  --surface-light-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(241, 245, 249, 0.94));
  --surface-contrast-bg: linear-gradient(135deg, rgba(37, 52, 87, 0.95), rgba(15, 23, 42, 0.98));
}

#company-group .container {
  margin: 10px auto;
  max-width: 1152px;
}

#company-group .company-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 1em;
  letter-spacing: 0.08em;
}

#company-group .brand-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

#company-group .company-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}

#company-group .brand-grid-item,
#company-group .company-box-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--card-height);
  border-radius: 8px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  padding: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

#company-group .brand-grid-item::before,
#company-group .company-box-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top, rgba(18, 143, 208, 0.14), transparent 58%);
  pointer-events: none;
}

.dark #company-group .brand-grid-item::before,
.dark #company-group .company-box-item::before {
  background: radial-gradient(circle at top, rgba(56, 189, 248, 0.16), transparent 60%);
}

#company-group .brand-grid-item:hover,
#company-group .company-box-item:hover {
  transform: translateY(-2px);
  border-color: rgba(18, 143, 208, 0.36);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.12);
}

.dark #company-group .brand-grid-item:hover,
.dark #company-group .company-box-item:hover {
  box-shadow: 0 26px 52px rgba(2, 6, 23, 0.42);
}

#company-group .brand-surface {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(var(--card-height) - 24px);
  padding: 16px 18px;
  border-radius: 18px;
}

#company-group .surface-light .brand-surface {
  background: var(--surface-light-bg);
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.18);
}

.dark #company-group .surface-light .brand-surface {
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.12);
}

#company-group .surface-contrast .brand-surface {
  background: var(--surface-contrast-bg);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

#company-group .brand-grid-item img,
#company-group .company-box-item img {
  width: auto;
  height: auto;
  max-width: min(100%, 240px);
  max-height: 72px;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(15, 23, 42, 0.08));
}

#company-group .company-box-item {
  justify-content: flex-start;
  text-align: left;
  gap: 18px;
  text-decoration: none;
}

#company-group .company-box-item.logo-only {
  justify-content: center;
  padding: 14px;
}

#company-group .company-box-item.logo-only .company-logo-surface {
  flex: 1 1 auto;
  max-width: none;
  min-height: calc(var(--card-height) - 28px);
}

#company-group .company-box-item.logo-only img {
  max-width: min(100%, 320px);
  max-height: 88px;
}

#company-group .company-logo-surface {
  flex: 0 0 min(52%, 220px);
}

#company-group .company-meta {
  position: relative;
  z-index: 1;
  min-width: 0;
}

#company-group .company-box-item .company-box-item-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

#company-group .company-box-item .company-box-item-description {
  font-size: 12px;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  #company-group {
    padding-inline: 16px;
  }

  #company-group .company-box-item {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    gap: 12px;
  }

  #company-group .company-box-item.logo-only {
    padding: 12px;
  }

  #company-group .company-logo-surface {
    flex-basis: auto;
  }
}
</style>
