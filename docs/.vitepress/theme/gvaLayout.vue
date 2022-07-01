<template>
  <layout>
    <template #aside-outline-after>
      <AsideAd></AsideAd>
    </template>
  </layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import AsideAd from './components/asideAd.vue'
const { Layout }  = DefaultTheme
</script>
