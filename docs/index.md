---
layout: home

title: gin-vue-admin
titleTemplate: GVA 文档站

hero:
  name: Gin-Vue-Admin
  text: A management platform using Golang and Vue
  tagline: 使用gin+vue进行极速开发的全栈开发基础平台
  image:
    src: /logo.png
    alt: gin-vue-admin
  actions:
    - theme: brand
      text: Get Started
      link: guide/start-quickly/initialization
    - theme: alt
      text: Open PluginShop
      link: https://plugin.gin-vue-admin.com/
    - theme: alt
      text: View on GitHub
      link: https://github.com/flipped-aurora/gin-vue-admin

features:
  - icon: 🍭
    title: Easy to use
    details: 大幅度降低应用层代码难度， 让每一个刚开始学习 gin 和 vue 的新手都能快速上手.这将会是你上手学习 gin + vue 的最佳代码。
  - icon: 🚀
    title: Automated Code
    details: 系统提供自动化代码功能， 对于简单业务逻辑， 只需配置结构体或者导入数据库即可一键创建并导入对应前后端简单业务逻辑代码。
  - icon: 🌈
    title: Standardized catalog
    details: 项目目录分层清晰， 项目模式结构清晰， 包名语义化， 让你更加容易理解目录结构， 读懂代码更加方便！
  - icon: 🦄
    title: Rich open source
    details: 已集成各类鉴权功能， 对各类基础服务提供支持， 安装依赖完成即可轻松使用。
  - icon: 🌈
    title: Free to expand
    details: 系统底层代码和业务逻辑代码分层清晰， 不会发生相互干扰， 便于根据自己业务方向进行拓展
  - icon: 🌟
    title: Long-term Maintenance
    details: 专业的开发团队， 更新及时， bug响应迅速， 交流社群活跃， 让你有了问题， 有迹可循。
---
<script setup>
import HomeCompanyGroup from '/@theme/components/HomeCompanyGroup.vue';
import HomeCenterAd from '/@theme/components/HomeCenterAd.vue';
</script>

[//]: # (<HomeCenterAd />)

<HomeCompanyGroup/>

<IndexMounted />

<MicroApp />
