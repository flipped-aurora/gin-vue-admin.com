---
layout: home

title: gin-vue-admin
titleTemplate: GVA 文档站

hero:
  name: Gin-Vue-Admin
  text: A management platform using Go and Vue
  tagline: 使用gin+vue进行极速开发的全栈开发基础平台
  image:
    src: /logo.png
    alt: gin-vue-admin
  actions:
    - theme: bg-blue-500 text-white dark:bg-blue:600 hover:bg-blue-800 border border-blue-900
      text: 快速开始
      link: guide/introduce/project
    - theme: alt
      text: 购买授权
      link: empower/index.html
---
<script setup>
import HomeCompanyGroup from '/@theme/components/HomeCompanyGroup.vue';
import HomeCenterAd from '/@theme/components/HomeCenterAd.vue';
import Quicks from "/@theme/components/quicks.vue"
import Liuliang from "/@theme/components/liuliang.vue"
</script>
<Quicks/>
<Liuliang></Liuliang>
<HomeCompanyGroup/>


[//]: # (<IndexMounted />)
