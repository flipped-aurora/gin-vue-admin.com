import { defineConfig } from 'vitepress'

const lang = 'zh-CN'
const ogDescription = 'OPQ 文档站'
const ogImage = 'https://opqbot.com/opq.1200x630.v2.jpg'
const ogTitle = ogDescription
const ogUrl = 'https://docs.opqbot.com'

const ITEMS = {
  project: [
    { text: '开发 SDK', link: '/project/sdk' },
    { text: '开源插件', link: '/project/plugins' },
    { text: '实用工具', link: '/project/tools' },
  ],
  knowledge: [
    { text: '捐赠列表', link: '/other/ranking' },
    { text: '相关站点', link: '/other/site' },
  ]
}

export default defineConfig({
  title: 'Gin-Vue-Admin',
  description: ogDescription,
  lang,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: '/svg.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'twitter:description', content: ogDescription }],
    ['meta', { property: 'twitter:title', content: ogTitle }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:image', content: ogImage }],
    ['meta', { property: 'twitter:url', content: ogUrl }]
  ],

  vue: {
    reactivityTransform: true
  },

  themeConfig: {
    logo: '/svg.svg',

    editLink: {
      pattern: 'https://github.com/opq-osc/opq-helper/edit/main/docs/:path',
      text: '在Github上编辑此页'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/flipped-aurora/gin-vue-admin' },
    ],

    footer: {
      message: 'Flipped-aurora Open Source Community',
      copyright: 'MIT Licensed | Copyright © 2022'
    },

    nav: [
      {
        text: '🚀 Guide',
        items: [
          { text: '快速开始', link: '/guide/manual/' },
          { text: 'Docker 快速搭建指南', link: '/guide/docker-start' },
        ],
      },
      // {
      //   text: '🌈 Project',
      //   items: ITEMS.project
      // },
      {
        text: '📚︎ Knowledge',
        items: ITEMS.knowledge
      },
      {
        text: '✨ 插件市场',
        items: [
          { text: '插件市场', link: 'https://plugin.gin-vue-admin.com/#/layout/plugin' },
        ]
      },
      {
        text: '⛓ 在线体验',
        link : 'https://demo.gin-vue-admin.com'
      },
      {
        text: '🎉 关于我们',
        link: '/about/join',
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '从零开始搭建 Gva',
          collapsible: true,
          items: [
            {
              text: '简介',
              link: '/guide/manual/'
            },
            {
              text: '准备环境',
              link: '/guide/manual/environment'
            },
            {
              text: '快速开始',
              link: '/guide/manual/qulick-start'
            },
            {
              text: '进阶知识',
              link: '/guide/manual/advanced'
            },
            {
              text: '最佳实践',
              link: '/guide/manual/practices'
            },
            {
              text: '常见问题',
              link: '/guide/manual/qa'
            },
          ]
        },
        {
          text: '使用 Docker 快速搭建',
          items: [
            {
              text: 'Docker 指南',
              link: '/guide/docker-start'
            }
          ]
        }
      ],
      // '/project/': [
      //   {
      //     text: 'Project',
      //     items: ITEMS.project
      //   }
      // ],
      '/other/': [
        {
          text: 'Knowledge',
          items: ITEMS.knowledge
        }
      ],
    }
  }
})
