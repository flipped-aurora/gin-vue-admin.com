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
    - theme: bg-blue-500 text-white dark:bg-blue:600 hover:bg-blue-800 border border-blue-900
      text: Get Started
      link: guide/introduce/project
    - theme: alt
      text: Open PluginShop
      link: https://plugin.gin-vue-admin.com/
    - theme: alt
      text: View on GitHub
      link: https://github.com/flipped-aurora/gin-vue-admin

---
<script setup>
import HomeCompanyGroup from '/@theme/components/HomeCompanyGroup.vue';
import HomeCenterAd from '/@theme/components/HomeCenterAd.vue';
import Quicks from "/@theme/components/quicks.vue"
</script>
<Quicks/>

<HomeCompanyGroup/>


[//]: # (<IndexMounted />)
