<template>
  <Layout :class="{ 'gva-doc': hasSidebar }">
    <template #layout-top>
    <!--  <GiteeBanner /> -->
    </template>
    <template #sidebar-nav-before>
      <GvaDocSidebar />
    </template>
    <template #layout-bottom>
      <!-- 首页自带深色页脚已含法务链接，避免重复 -->
      <LegalFooterLinks v-if="!isHome" />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar'
import { computed, onMounted, onUnmounted } from 'vue'
import GiteeBanner from './components/GiteeBanner.vue'
import LegalFooterLinks from './components/LegalFooterLinks.vue'
import GvaDocSidebar from './components/GvaDocSidebar.vue'
const { Layout }  = DefaultTheme
const { page } = useData()
// 文档站标记：有侧栏的页面（/guide、/experience、/study）挂 .gva-doc，样式只作用于此
const { hasSidebar } = useSidebar()
const isHome = computed(() => page.value.relativePath === 'index.md')

let scrollHandler
onMounted(() => {
    scrollHandler = () => {
        if (window.scrollY > 10) {
            document.body.classList.add('gva-nav-scrolled')
        } else {
            document.body.classList.remove('gva-nav-scrolled')
        }
    }
    window.addEventListener('scroll', scrollHandler, { passive: true })
})
onUnmounted(() => {
    window.removeEventListener('scroll', scrollHandler)
})
</script>
