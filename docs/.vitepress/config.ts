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

    themeConfig: {
        logo: '/logo.png',

        search: {
            provider: 'local',
            options: {
                locales: {
                    zh: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换',
                                    closeText: '关闭'
                                }
                            }
                        }
                    }
                },
                miniSearch: {
                    searchOptions: {
                        combineWith: 'AND',
                        fuzzy: 0.2,
                        prefix: true,
                        boost: { title: 4, text: 2, titles: 1 }
                    }
                }
            }
        },

        editLink: {
            pattern: 'https://github.com/flipped-aurora/gin-vue-admin.com/edit/master/docs/:path',
            text: '在Github上编辑此页'
        },

        socialLinks: [],

        footer: {
            message: `Copyright © 2020-${new Date().getFullYear()} Flipped-aurora Open Source Community`,
            copyright: `<a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备17040210号-2</a>`
        },


        nav: [
            {text: '文档', link: '/guide/start-quickly/initialization', target: '_blank'},
            {text: '协议', link: '/copyright.pdf', target: '_blank'},
            {text: '购买授权', link: 'https://plugin.gin-vue-admin.com/license'},
            {text: '插件市场', link: 'https://plugin.gin-vue-admin.com/#/layout/home'},
            {text: '<span class="gva-nav-bilingual" aria-label="多语言"><img class="gva-nav-bilingual__img gva-nav-bilingual__img--light" src="/web/bilingual.png" alt="" /><img class="gva-nav-bilingual__img gva-nav-bilingual__img--dark" src="/web/bilingual_day.png" alt="" /></span>', link: '#'},
            {
                text: 'GitHub',
                items: [
                    {text: 'GitHub', link: 'https://github.com/flipped-aurora/gin-vue-admin'},
                    {text: 'Gitee', link: 'https://gitee.com/pixelmax/gin-vue-admin'},
                    {text: 'GitCode', link: 'https://gitcode.com/flipped-aurora/gin-vue-admin'},
                ]
            }
        ],

        sidebar: {
            '/guide/': [
                {
                    text: '介绍',
                    collapsed: false,
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
                            text: 'AI助手配置',
                            link: '/guide/server/mcp'
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
                        }
                    ]
                },
                {
                    text: '代码生成器',
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
                            link: 'https://plugin.gin-vue-admin.com/license'
                        }
                    ]
                },
                {
                    text: '后端项目指南',
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
                            text: '认证系统',
                            link: '/guide/server/authentication'
                        },
                        {
                            text: '权限系统',
                            link: '/guide/server/authorization'
                        },
                        {
                            text: '代码生成器',
                            link: '/guide/server/code-generator'
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
                            text: 'MCP AI助手集成',
                            link: '/guide/server/mcp'
                        },
                        {
                            text: '数据库设计',
                            link: '/guide/server/database-design'
                        },
                        {
                            text: '开发指导文档',
                            link: 'https://plugin.gin-vue-admin.com/license'
                        }
                    ]
                },
                {
                    text: '最佳实践',
                    collapsed: false,
                    items: [
                        {
                            text: '开发规范指南',
                            link: '/guide/best-practices/development-standards'
                        }
                    ]
                },
                {
                    text: '故障排除',
                    collapsed: false,
                    items: [
                        {
                            text: '常见问题解答',
                            link: '/guide/troubleshooting/common-issues'
                        }
                    ]
                },
                {
                    text: '插件使用教程',
                    collapsed: true,
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
                            link: 'https://plugin.gin-vue-admin.com/license'
                        }
                    ]
                },
                {
                    text: '视频教程',
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
                {
                    text: '🔥特惠服务器',
                    link: 'https://flipped-aurora.feishu.cn/wiki/HNnPwI9TbifCvwk51A2cLqOjnac?from=from_copylink'
                }
            ],
            '/experience/': [
                {
                    text: '体验项目',
                    collapsed: false,
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
