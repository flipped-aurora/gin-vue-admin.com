<template>
  <Layout>
    <template #layout-top>
    <!--  <GiteeBanner /> -->
    </template>
    <template #aside-outline-after>
      <AsideAd></AsideAd>
    </template>
    <template #layout-bottom>
      <LegalFooterLinks />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import AsideAd from './components/asideAd.vue'
import GiteeBanner from './components/GiteeBanner.vue'
import LegalFooterLinks from './components/LegalFooterLinks.vue'
const { Layout }  = DefaultTheme
</script>
