<template>
  <div class="fixed bottom-10 right-0 gap-2 flex flex-col z-auto  bg-white shadow p-2 rounded" v-if="showAD">
    <a class="flex items-center justify-center rounded overflow-hidden" target="_blank" href="https://ym.ksjhaoka.com/?s=srtGcMEo83371">
      <img :width="160" src="/advertising/liuliang.jpg" alt="流量">
    </a>
    <a class="flex items-center justify-center rounded overflow-hidden" target="_blank" href="https://ym.ksjhaoka.com/invite?s=srtGcMEo83371">
      <img :width="160" src="/advertising/daili.jpg" alt="成为代理">
    </a>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const showAD = ref(true)
</script>
