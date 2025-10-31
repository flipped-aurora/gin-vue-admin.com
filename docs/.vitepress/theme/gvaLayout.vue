<template>
  <layout>
    <template #layout-top>
      <GiteeBanner></GiteeBanner>
    </template>
    <template #aside-outline-after>
      <AsideAd></AsideAd>
    </template>
  </layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import AsideAd from './components/asideAd.vue'
import GiteeBanner from './components/GiteeBanner.vue'
const { Layout }  = DefaultTheme
</script>
