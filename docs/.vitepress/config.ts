import { defineConfig } from 'vitepress'

const lang = 'zh-CN'
const ogDescription = 'gin+vue编写的自动化代码开发脚手架，是gin+vue全栈学习最好的项目，腾讯阿里开发均有采用gin-vue-admin为模型进行相关业务开发，代码自动化，加快开发速度，权限系统齐全，减少重复工作'
const ogImage = 'https://opqbot.com/opq.1200x630.v2.jpg'
const ogTitle = ogDescription
const ogUrl = 'https://www.gin-vue-admin.com'

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
  lastUpdated: false,

  head: [
    ['link', { rel: 'icon', href: '/svg.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'gin-vue-admin' }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'twitter:description', content: ogDescription }],
    ['meta', { property: 'twitter:title', content: ogTitle }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:image', content: ogImage }],
    ['meta', { property: 'twitter:url', content: ogUrl }],
    [
    'script',
        {
          src: 'https://cdn.usefathom.com/script.js',
        },
    ],
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
      copyright: `Copyright © 2020-${new Date().getFullYear()} Flipped-aurora`
    },



    nav: [
      {
        text: '🚀 Guide',
        items: [
          { text: '快速开始', link: '/guide/start-quickly/initialization' },
          { text: '项目上线', link: '/guide/deployment/' },
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
        text : '🎁 特惠服务器',
        items :[
          {
            text: '腾讯云服务器',
            link :'https://cloud.tencent.com/act/new?fromSource=gwzcw.4325959.4325959.4325959&utm_medium=cps&utm_id=gwzcw.4325959.4325959.4325959&cps_key=962a7fdaa930cda1c06e36a7608e95cc'
          },
          {
            text: '阿里云服务器',
            link :'https://www.aliyun.com/minisite/goods?userCode=xqe01uob'
          }
        ]
      },
      {
        text: '✨ 插件市场',
        link: 'https://plugin.gin-vue-admin.com/#/layout/plugin'
      },
      {
        text: '⛓ 体验项目',
        items: [
          { text: '在线体验', link: 'https://demo.gin-vue-admin.com' },
          { text: 'Docker Playground', link: '/experience/docker-playground' },
          { text: 'docker-compose', link: '/experience/docker-compose' },
        ],
      },
      {
        text: '🎉 关于我们',
        link: '/about/join',
      },

    ],

    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          collapsible: true,
          items: [
            {
              text: '项目介绍',
              link: '/guide/introduce/project'
            }
          ]
        },
        {
          text: '快速开始',
          collapsible: true,
          items: [
            {
              text: '环境配置',
              link: '/guide/start-quickly/env'
            },
            {
              text: '初始化',
              link: '/guide/start-quickly/initialization'
            },
            {
              text: 'swagger',
              link: '/guide/start-quickly/swagger'
            },
            {
              text: 'vscode',
              link: '/guide/start-quickly/vscode'
            },
          ]
        },
        {
          text: '部署指南',
          collapsible: true,
          items: [
            {
              text: '项目上线',
              link: '/guide/deployment/'
            },
            {
              text: 'k8s资源配置',
              link: '/guide/deployment/k8s'
            },
            {
              text: 'docker快速开发',
              link: '/guide/deployment/docker'
            },
            {
              text: 'docker-compose',
              link: '/guide/deployment/docker-compose'
            },
            {
              text: 'docker',
              link: '/guide/deployment/docker'
            },
          ]
        },
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
          text: '视频教程',
          collapsible: true,
          items: [
            {
              text: 'golang教程',
              link: '/guide/video/golang'
            },
            {
              text: 'gin教程',
              link: '/guide/video/gin'
            },
            {
              text: 'gorm教程',
              link: '/guide/video/gorm'
            },
            {
              text: 'server项目教程',
              link: '/guide/video/server'
            },
            {
              text: 'web项目教程',
              link: '/guide/video/web'
            },
          ]
        },
        {
          text: 'Gva前后端分离',
          collapsible: true,
          items: [
            {
              text: '前端 指南',
              link: '/guide/web/'
            },
            {
              text: '按钮权限',
              link: '/guide/web/button-auth'
            },
            {
              text: '侧边栏样式自定义',
              link: '/guide/web/menu-theme'
            },
          ]
        },
        {
          text: '代码生成器',
          collapsible: true,
          items: [
            {
              text: '代码生成器使用指南',
              link: '/guide/generator/server',
            },
            {
              text: '表单生成器 `127.0.0.1` 拒绝连接',
              link: '/guide/generator/web',
            },
            {
              text: '表单生成器生产使用指南',
              link: '/guide/generator/web-produce',
            },
          ]
        },
        {
          text: '后端项目指南',
          collapsible: true,
          items: [
            {
              text: '后端 指南',
              link: '/guide/server/'
            },
            {
              text: '多数据库支持',
              link: '/guide/server/multiple-databases'
            },
            {
              text: 'viper',
              link: '/guide/server/core/viper'
            },
            {
              text: 'zap',
              link: '/guide/server/core/zap'
            },
            {
              text: 'gorm',
              link: '/guide/server/gorm'
            },
            {
              text: '定时任务',
              link: '/guide/server/timer'
            },
          ]
        },
      ],
      '/experience/': [
        {
          text: '体验项目',
          collapsible: true,
          items : [
            {
              text: '在线体验',
              link: '/experience/online'
            },
            {
              text: 'DockerPlayground',
              link: '/experience/docker-playground'
            },
            {
              text: 'docker-compose',
              link: '/experience/docker-compose'
            }
          ]
        },
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
