<template>
  <footer class="gva-section gva-section--dark sf">
    <div class="gva-container">
      <div class="sf__top">
        <!-- brand + stats -->
        <div class="sf__brand">
          <div class="sf__logo">
            <img src="/logo.png" alt="Gin-Vue-Admin" />
            <span>Gin-Vue-Admin</span>
          </div>
          <p class="sf__tagline">用 AI 构建系统，让系统为 AI 工作。基于 Go 与 Vue.js 的企业级 AI+ 全栈解决方案。</p>
          <div class="sf__stats">
            <span v-for="b in badges" :key="b" class="sf__badge">{{ b }}</span>
          </div>
        </div>

        <!-- link columns -->
        <div class="sf__cols">
          <div v-for="col in columns" :key="col.title" class="sf__col">
            <h4>{{ col.title }}</h4>
            <a
              v-for="l in col.links"
              :key="l.text"
              :href="l.href"
              :target="l.ext ? '_blank' : undefined"
              :rel="l.ext ? 'noopener' : undefined"
            >{{ l.text }}</a>
          </div>

          <div class="sf__col">
            <h4>关注</h4>
            <div class="sf__social">
              <a v-for="s in socials" :key="s.name" :href="s.href" :title="s.name" target="_blank" rel="noopener" v-html="s.icon"></a>
            </div>
          </div>
        </div>
      </div>

      <div class="sf__bottom">
        <p class="sf__copy">
          Copyright © 2020-{{ year }} Flipped-aurora Open Source Community ·
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">鲁ICP备17040210号-2</a>
        </p>
        <nav class="sf__legal">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/refund">Refund Policy</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = 2026
const badges = ['⭐ 23.5k Stars', '🌍 200k+ 全球用户', '🔥 GCore Trending', '🥇 Gitee 同类 Top1']

const columns = [
  {
    title: '产品',
    links: [
      { text: '社区论坛', href: 'https://github.com/flipped-aurora/gin-vue-admin/discussions', ext: true },
      { text: '插件市场', href: 'https://plugin.gin-vue-admin.com/#/layout/home', ext: true },
      { text: '在线体验', href: 'https://demo.gin-vue-admin.com', ext: true },
      { text: 'GVA 3.0', href: '/guide/introduce/project' },
    ],
  },
  {
    title: '资源',
    links: [
      { text: '开发文档', href: '/guide/introduce/project' },
      { text: '视频教程', href: '/guide/video/golang' },
      { text: '常见问题', href: '/guide/manual/qa' },
      { text: '关于我们', href: '/about/join' },
    ],
  },
]

const socials = [
  { name: 'GitHub', href: 'https://github.com/flipped-aurora/gin-vue-admin', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 3.9-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z"/></svg>' },
  { name: 'Gitee', href: 'https://gitee.com/pixelmax/gin-vue-admin', icon: '<img src="/icons/gitee.png" alt="Gitee" width="20" height="20" />' },
  { name: 'GitCode', href: 'https://gitcode.com/flipped-aurora/gin-vue-admin', icon: '<img src="/icons/gitcode.svg" alt="GitCode" width="20" height="20" />' },
]
</script>

<style scoped>
.sf { padding-top: 64px; padding-bottom: 28px; }
.sf__top {
  display: grid; grid-template-columns: 1.4fr 2fr; gap: 56px;
  padding-bottom: 44px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.sf__logo { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 18px; color: #fff; }
.sf__logo img { width: 30px; height: 30px; border-radius: 8px; }
.sf__tagline { margin: 16px 0 20px; font-size: 14px; line-height: 1.7; color: rgba(255, 255, 255, 0.55); max-width: 360px; }
.sf__stats { display: flex; flex-wrap: wrap; gap: 9px; }
.sf__badge {
  font-size: 12px; padding: 6px 12px; border-radius: 999px;
  background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.78);
}

.sf__cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.sf__col h4 { font-size: 13px; font-weight: 700; color: #fff; margin: 0 0 16px; letter-spacing: 0.04em; }
.sf__col a { display: block; font-size: 14px; color: rgba(255, 255, 255, 0.6); margin-bottom: 12px; transition: color 0.18s ease; }
.sf__col a:hover { color: #fff; }
.sf__social { display: flex; gap: 12px; }
.sf__social a {
  width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; margin: 0;
  background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.8);
  transition: all 0.18s ease;
}
.sf__social a:hover { background: var(--gva-primary); border-color: var(--gva-primary); color: #fff; }
.sf__social :deep(img) { display: block; border-radius: 4px; }

.sf__bottom {
  display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
  padding-top: 24px;
}
.sf__copy { margin: 0; font-size: 13px; color: rgba(255, 255, 255, 0.45); }
.sf__copy a { color: rgba(255, 255, 255, 0.6); }
.sf__copy a:hover { color: #fff; }
.sf__legal { display: flex; gap: 20px; flex-wrap: wrap; }
.sf__legal a { font-size: 13px; color: rgba(255, 255, 255, 0.55); }
.sf__legal a:hover { color: #fff; }

@media (max-width: 860px) {
  .sf__top { grid-template-columns: 1fr; gap: 36px; }
  .sf__bottom { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 520px) {
  .sf__cols { grid-template-columns: 1fr 1fr; }
}
</style>
