<template>
  <Layout :class="{ 'gva-doc': hasSidebar, 'gva-home': isHome }">
    <template #layout-top>
    <!--  <GiteeBanner /> -->
    </template>
    <!-- 顶栏右侧自定义项：GitHub 徽标（点击跳仓库 / 悬停展开 gitee·gitcode）+ 多语言 -->
    <template #nav-bar-content-after>
      <GithubNav />
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
import GithubNav from './components/GithubNav.vue'
const { Layout }  = DefaultTheme
const { page } = useData()
// 文档站标记：有侧栏的页面（/guide、/experience、/study）挂 .gva-doc，样式只作用于此
// 首页标记：挂 .gva-home，顶栏未滚动时的浅灰底只在首页出现（见 global.scss 顶栏样式）
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
