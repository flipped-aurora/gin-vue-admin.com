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
            {
                icon:{
                    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.4791 4.97677C15.6201 4.89789 15.7691 4.8145 15.93 4.72314C15.9494 4.82848 15.9683 4.92046 15.9854 5.00383C16.0157 5.15091 16.0406 5.2719 16.0525 5.39144C16.1479 6.4296 16.6697 7.1933 17.4093 7.36527C18.4908 7.61639 19.5106 7.20133 20.06 6.28555C20.72 5.18673 20.4334 3.84099 19.3097 3.03098C16.1851 0.777435 12.7523 0.155888 9.05448 1.24127C1.08137 3.59371 -1.64675 13.3884 4.01196 19.3949C6.43292 21.9642 9.50695 23.0727 12.9963 22.9889C17.4663 22.8839 20.6857 20.6563 22.7408 16.7954C24.1978 14.0561 22.6139 11.0619 19.5805 10.4396C17.8481 10.0908 16.0765 9.97757 14.3137 10.103C13.7272 10.1594 13.1579 10.3325 12.6394 10.6124C12.0592 10.9135 11.8915 11.5383 11.9565 12.1575C12.0171 12.7217 12.4498 13.0601 12.965 13.1453C14.0024 13.3077 15.0522 13.402 16.1 13.4881C16.4032 13.5136 16.7093 13.5166 17.0149 13.5197C17.4534 13.5241 17.8912 13.5285 18.3187 13.5991C19.5385 13.8007 19.9574 14.7905 19.33 15.8495C19.1763 16.1041 18.9971 16.3424 18.7951 16.5607C17.9745 17.4632 16.9014 18.0981 15.7152 18.3827C13.55 18.9127 11.3827 18.9425 9.22755 18.2617C6.77347 17.4875 5.31042 15.6849 5.25902 13.2584C5.2398 11.7619 5.61972 10.2874 6.35969 8.9865C6.69401 8.38013 6.87751 7.75562 6.82593 7.06851C6.80422 6.77557 6.79219 6.48231 6.77927 6.16716C6.77239 5.99944 6.76526 5.82551 6.75628 5.64214C7.00484 5.69431 7.25032 5.76016 7.49161 5.83943C8.43027 6.21622 9.35415 6.38812 10.3702 6.11155C10.9482 5.97335 11.5455 5.93511 12.1363 5.9985C13.0877 6.07606 14.0387 5.84361 14.847 5.33586C15.0488 5.2176 15.2539 5.10279 15.4791 4.97677Z" fill="#DA203E"/>
</svg>
`
                },link: 'https://gitcode.com/flipped-aurora/gin-vue-admin'
            },
            {
                icon:{
                    svg: `<svg t="1725790606415" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2314" width="48" height="48"><path d="M512 992C246.895625 992 32 777.104375 32 512S246.895625 32 512 32s480 214.895625 480 480-214.895625 480-480 480z m242.9521875-533.3278125h-272.56875a23.7121875 23.7121875 0 0 0-23.71125 23.7121875l-0.024375 59.255625c0 13.08 10.6078125 23.7121875 23.6878125 23.7121875h165.96c13.104375 0 23.7121875 10.6078125 23.7121875 23.6878125v11.855625a71.1121875 71.1121875 0 0 1-71.1121875 71.1121875h-225.215625a23.7121875 23.7121875 0 0 1-23.6878125-23.7121875V423.1278125a71.1121875 71.1121875 0 0 1 71.0878125-71.1121875h331.824375a23.7121875 23.7121875 0 0 0 23.6878125-23.71125l0.0721875-59.2565625a23.7121875 23.7121875 0 0 0-23.68875-23.7121875H423.08a177.76875 177.76875 0 0 0-177.76875 177.7921875V754.953125c0 13.1034375 10.60875 23.7121875 23.713125 23.7121875h349.63125a159.984375 159.984375 0 0 0 159.984375-159.984375V482.36a23.7121875 23.7121875 0 0 0-23.7121875-23.6878125z" fill="#C71D23" p-id="2315"></path></svg>`
                },link: 'https://gitee.com/pixelmax/gin-vue-admin'
            }
        ],

        footer: {
            message: `Copyright © 2020-${new Date().getFullYear()} Flipped-aurora Open Source Community`,
            copyright: `<a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备17040210号-2</a>`
        },


        nav: [
            {
                text: '🚀 Guide',
                items: [
                    {text: '项目介绍', link: '/guide/introduce/project'},
                    {text: '快速开始', link: '/guide/start-quickly/initialization'},
                    {text: '项目上线', link: '/guide/deployment/'},
                    {text: '更新日志', link: 'https://flipped-aurora.feishu.cn/docx/LPufdOPWxo3zcpxNSVGcr1vcn71?from=from_copylink'},
                ],
            },
            {
                text: '📚︎ 著作权',
                link: '/copyright.pdf',
                target: '_blank'
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
                            text: '自动化package',
                            link: '/guide/generator/package',
                        },
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
                            text: '自定义全局皮肤',
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
                        {
                            text: '开发指导文档',
                            link: 'https://www.gin-vue-admin.com/empower/index.html'
                        }
                    ]
                },
                {
                    text: '后端项目指南',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: '后端指南',
                            link: '/guide/server/'
                        },
                        {
                            text: '配置文件',
                            link: '/guide/server/config'
                        },
                        {
                            text: '对象存储',
                            link: '/guide/server/oss'
                        },
                        {
                            text: '多数据库支持',
                            link: '/guide/server/multiple-databases'
                        },
                        {
                            text: '严格角色模式',
                            link: '/guide/server/strict-auth'
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
                        {
                            text: '开发指导文档',
                            link: 'https://www.gin-vue-admin.com/empower/index.html'
                        }
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
                            text: 'kubernetes',
                            link: '/guide/deployment/k8s'
                        },
                        {
                            text: '更详部署指南',
                            link: 'https://www.gin-vue-admin.com/empower/index.html'
                        }
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
                }
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
