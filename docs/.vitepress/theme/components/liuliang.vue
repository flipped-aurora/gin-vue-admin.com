<template>
  <div class="fixed bottom-10 right-0 gap-2 flex flex-col z-[999]  bg-white shadow p-2 rounded" v-if="showAD">
    <a class="flex items-center justify-center rounded overflow-hidden" target="_blank" href="https://plugin.gin-vue-admin.com/details/69">
      <img :width="160" src="/advertising/cms.png" alt="cms">
    </a>
    <a class="flex items-center justify-center rounded overflow-hidden" target="_blank" href="https://plugin.gin-vue-admin.com/details/139">
      <img :width="160" src="/advertising/shop.jpg" alt="shop">
    </a>
<!--    <a class="flex items-center justify-center rounded overflow-hidden" target="_blank" href="https://ym.ksjhaoka.com/invite?s=srtGcMEo83371">-->
<!--      <img :width="160" src="/advertising/daili.jpg" alt="成为代理">-->
<!--    </a>-->
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const showAD = ref(true)
</script>
