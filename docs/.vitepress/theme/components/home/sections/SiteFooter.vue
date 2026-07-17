<template>
  <footer class="gva-section gva-section--dark pt-16 pb-7">
    <div class="gva-container">
      <div class="grid grid-cols-[auto_1fr_1fr_1fr] gap-12 pb-11 border-b border-white/[0.08] max-[860px]:grid-cols-1 max-[860px]:gap-9 max-[1024px]:grid-cols-[auto_1fr_1fr] max-[1024px]:gap-8">

        <!-- 左侧：Trendshift badge + 社交图标 -->
        <div class="flex flex-col gap-5">
          <a
            href="https://trendshift.io/repositories/3250?utm_source=repository-badge&utm_medium=badge&utm_campaign=badge-repository-3250"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block"
          >
            <img
              src="https://trendshift.io/api/badge/repositories/3250"
              alt="flipped-aurora/gin-vue-admin | Trendshift"
              width="250"
              height="55"
            />
          </a>
          <div class="flex gap-2.5">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.href"
              :title="s.name"
              target="_blank"
              rel="noopener"
              v-html="s.icon"
              class="w-[38px] h-[38px] rounded-[10px] grid place-items-center bg-white/[0.06] border border-white/[0.1] text-white/[0.8] transition-all duration-[180ms] hover:bg-[var(--gva-primary)] hover:border-[var(--gva-primary)] hover:text-white [&_img]:block [&_img]:rounded-[4px]"
            ></a>
          </div>
        </div>

        <!-- 中间：产品 -->
        <div>
          <h4 class="mt-0 mb-4 text-[13px] font-bold text-white tracking-[0.04em]">产品</h4>
          <a
            v-for="l in columns[0].links"
            :key="l.text"
            :href="l.href"
            :target="l.ext ? '_blank' : undefined"
            :rel="l.ext ? 'noopener' : undefined"
            class="block text-[14px] text-white/[0.6] mb-3 transition-[color] duration-[180ms] hover:text-white"
          >{{ l.text }}</a>
        </div>

        <!-- 右侧：资源 -->
        <div>
          <h4 class="mt-0 mb-4 text-[13px] font-bold text-white tracking-[0.04em]">资源</h4>
          <a
            v-for="l in columns[1].links"
            :key="l.text"
            :href="l.href"
            :target="l.ext ? '_blank' : undefined"
            :rel="l.ext ? 'noopener' : undefined"
            class="block text-[14px] text-white/[0.6] mb-3 transition-[color] duration-[180ms] hover:text-white"
          >{{ l.text }}</a>
        </div>

        <!-- 最右：授权与支持 -->
        <div class="max-[1024px]:hidden">
          <h4 class="mt-0 mb-4 text-[13px] font-bold text-white tracking-[0.04em]">授权与支持</h4>
          <a
            v-for="l in columns[2].links"
            :key="l.text"
            :href="l.href"
            :target="l.ext ? '_blank' : undefined"
            :rel="l.ext ? 'noopener' : undefined"
            class="block text-[14px] text-white/[0.6] mb-3 transition-[color] duration-[180ms] hover:text-white"
          >{{ l.text }}</a>
        </div>

      </div>

      <div class="flex items-center justify-between gap-4 flex-wrap pt-6 max-[860px]:flex-col max-[860px]:items-start">
        <p class="m-0 text-[13px] text-white/[0.45]">
          Copyright © 2020-{{ year }} Flipped-aurora Open Source Community ·
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" class="text-white/[0.6] hover:text-white">鲁ICP备17040210号-2</a>
        </p>
        <nav class="flex gap-5 flex-wrap">
          <a href="/terms" class="text-[13px] text-white/[0.55] hover:text-white">Terms of Service</a>
          <a href="/privacy" class="text-[13px] text-white/[0.55] hover:text-white">Privacy Policy</a>
          <a href="/refund" class="text-[13px] text-white/[0.55] hover:text-white">Refund Policy</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = 2026

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
      { text: '关于我们', href: '/about/join' },
    ],
  },
  {
    title: '授权与支持',
    links: [
      { text: '企业版', href: 'https://plugin.gin-vue-admin.com/license', ext: true },
      { text: '服务协议', href: '/terms' },
      { text: '常见问题', href: '/guide/manual/qa' },
    ],
  },
]

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/flipped-aurora/gin-vue-admin',
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 3.9-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z"/></svg>',
  },
  {
    name: 'Gitee',
    href: 'https://gitee.com/pixelmax/gin-vue-admin',
    icon: '<img src="/icons/gitee.png" alt="Gitee" width="20" height="20" />',
  },
  {
    name: 'GitCode',
    href: 'https://gitcode.com/flipped-aurora/gin-vue-admin',
    icon: '<img src="/icons/gitcode.svg" alt="GitCode" width="20" height="20" />',
  },
]
</script>