import {defineConfig} from 'vitepress'

const lang = 'zh-CN'
const ogDescription = 'gin+vue编写的自动化代码开发脚手架，是gin+vue全栈学习最好的项目，腾讯阿里开发均有采用gin-vue-admin为模型进行相关业务开发，代码自动化，加快开发速度，权限系统齐全，减少重复工作'
const ogImage = 'https://www.gin-vue-admin.com/logo.png'
const ogTitle = ogDescription
const ogUrl = 'https://www.gin-vue-admin.com'

// const ITEMS = {
//   project: [
//     { text: '开发 SDK', link: '/project/sdk' },
//     { text: '开源插件', link: '/project/plugins' },
//     { text: '实用工具', link: '/project/tools' },
//   ]
// }

export default defineConfig({
    title: 'Gin-Vue-Admin',
    description: ogDescription,
    lang,
    lastUpdated: false,
    head: [
        ['link', {rel: 'icon', href: '/logo.png'}],
        ['meta', {property: 'og:type', content: 'website'}],
        ['meta', {property: 'og:title', content: 'gin-vue-admin'}],
        ['meta', {property: 'og:image', content: ogImage}],
        ['meta', {property: 'og:url', content: ogUrl}],
        ['meta', {property: 'twitter:description', content: ogDescription}],
        ['meta', {property: 'twitter:title', content: ogTitle}],
        ['meta', {property: 'twitter:card', content: 'summary_large_image'}],
        ['meta', {property: 'twitter:image', content: ogImage}],
        ['meta', {property: 'twitter:url', content: ogUrl}],
        [
            'script',
            {
                src: 'https://hm.baidu.com/hm.js?40635ef25e31fa2a58ed58f935d0a1a0',
            },
        ],
        [
            'script',
            {
                src: 'https://cdn.wwads.cn/js/makemoney.js',
                async: "true",
            },
        ],
    ],

    vue: {
        reactivityTransform: true
    },

    themeConfig: {
        logo: '/logo.png',

        editLink: {
            pattern: 'https://github.com/flipped-aurora/gin-vue-admin.com/edit/master/docs/:path',
            text: '在Github上编辑此页'
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/flipped-aurora/gin-vue-admin'},
        ],

        footer: {
            message: `Copyright © 2020-${new Date().getFullYear()} Flipped-aurora Open Source Community`,
            copyright: `鲁ICP备17040210号-2`
        },


        nav: [
            {
                text: '🚀 Guide',
                items: [
                    {text: '项目介绍', link: '/guide/introduce/project'},
                    {text: '快速开始', link: '/guide/start-quickly/initialization'},
                    {text: '项目上线', link: '/guide/deployment/'},
                ],
            },
            {
                text: '📚︎ 学习',
                link: '/study/index'
            },
            {
                text: '🎁 捐赠',
                link: '/coffee/index'
            },
            {
                text: '💰 购买授权',
                link: '/empower/index'
            },
            {
                text: '✨ 插件市场',
                link: 'https://plugin.gin-vue-admin.com/#/layout/home'
            },
            {
                text: '⛓ 体验项目',
                items: [
                    {text: '在线体验', link: 'https://demo.gin-vue-admin.com'},
                    {text: 'Docker Playground', link: '/experience/docker-playground'},
                    {text: 'docker-compose', link: '/experience/docker-compose'},
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
                    collapsed: true,
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
                        {
                            text: '常见问题',
                            link: '/guide/manual/qa'
                        },
                    ]
                },
                {
                    text: '代码生成器',
                    collapsible: true,
                    collapsed: true,
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
                    text: '前端项目指南',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: '前端指南',
                            link: '/guide/web/'
                        },
                        {
                            text: '环境变量',
                            link: '/guide/web/env',
                        },
                        {
                            text: '按钮权限',
                            link: '/guide/web/button-auth'
                        },
												{
														text: '字典方法',
                            link: '/guide/web/dictionary'
												},
                        {
                            text: '侧边栏样式自定义',
                            link: '/guide/web/menu-theme'
                        },
                        {
                            text:'自定义图标【菜单以及直接使用】',
                            link: '/guide/web/auto-icon'
                        },
                        {
                            text: '开启TypeScript',
                            link: '/guide/web/typescript',
                        },
                        {
                            text: '导出Excel',
                            link: '/guide/web/export-excel',
                        },
                    ]
                },
                {
                    text: '后端项目指南',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: '后端 指南',
                            link: '/guide/server/'
                        },
                        {
                            text: '配置文件',
                            link: '/guide/server/config'
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
                {
                    text: '插件使用教程',
                    collapsed: true,
                    collapsible: true,
                    items: [
                        {
                            text: '插件安装教程',
                            link: '/guide/plugin/install'
                        },
                        {
                            text: '插件研发教程',
                            link: '/guide/plugin/develop'
                        },
                    ]
                },
                {
                    text: '部署指南',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: '项目上线',
                            link: '/guide/deployment/'
                        },
                        {
                            text: 'docker',
                            link: '/guide/deployment/docker'
                        },
                        {
                            text: 'docker-compose',
                            link: '/guide/deployment/docker-compose'
                        },
                        {
                            text: 'docker-compose快速开发',
                            link: '/guide/deployment/docker_develop'
                        },
                        {
                            text: 'kubernetes',
                            link: '/guide/deployment/k8s'
                        },
                    ]
                },
                {
                    text: '视频教程',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: 'Go教程',
                            link: '/guide/video/golang'
                        },
                        {
                            text: 'Gin教程',
                            link: '/guide/video/gin'
                        },
                        {
                            text: 'Gorm教程',
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
            ],
            '/experience/': [
                {
                    text: '体验项目',
                    collapsible: true,
                    items: [
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
            '/study/': [
                {
                    text: '学习',
                    items: [
                        {text: '相关站点', link: '/study/'}
                    ]
                },
                {
                    text: '对象存储插件',
                    items: [
                        {text: '阿里云对象存储', link: '/study/aliyun'},
                        {text: '腾讯对象存储', link: '/study/tencent'},
                        {text: '七牛云对象存储', link: '/study/qiniu'},
                    ]
                }
            ],
        }
    }
})
