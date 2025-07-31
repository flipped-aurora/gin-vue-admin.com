---
layout: home

title: gin-vue-admin
titleTemplate: GVA 文档站

hero:
  name: Gin-Vue-Admin
  text:  A management platform using Go and Vue.js
  tagline: 基于Go与Vue.js打造的企业级高效研发解决方案
  image:
    src: /logo.png
    alt: gin-vue-admin
  actions:
    - theme: bg-blue-500 text-white dark:bg-blue:600 hover:bg-blue-800
      text: 🚀 快速开始
      link: guide/introduce/project
    - theme: bg-green-500 text-white dark:bg-green-600 hover:bg-green-800 
      text: 🛒 插件市场
      link: https://plugin.gin-vue-admin.com
    - theme: bg-amber-500 text-white dark:bg-amber-600 hover:bg-amber-800
      text: 🥇 购买授权
      link: /empower/index.html
---
<script setup>
import HomeCompanyGroup from '.vitepress/theme/components/HomeCompanyGroup.vue';
import HomeCenterAd from '.vitepress/theme/components/HomeCenterAd.vue';
import Quicks from ".vitepress/theme/components/quicks.vue";
import Liuliang from ".vitepress/theme/components/liuliang.vue";
</script>
<Quicks/>
<Liuliang></Liuliang>
<HomeCompanyGroup/>


[//]: # (<IndexMounted />)
