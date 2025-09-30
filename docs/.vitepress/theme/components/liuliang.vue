<template>
  <div class="fixed bottom-10 right-0 gap-2 flex flex-col z-[999]  bg-white shadow p-2 rounded" v-if="showAD">
    <a class="flex items-center justify-center rounded overflow-hidden" target="_blank" href="https://flipped-aurora.feishu.cn/wiki/HNnPwI9TbifCvwk51A2cLqOjnac?from=from_copylink">
     <img :width="160" src="/advertising/fwq.jpg" alt="成为代理" data-nosnippet>
   </a>
    <a class="flex items-center justify-center rounded overflow-hidden" target="_blank" href="https://plugin.gin-vue-admin.com/details/69">
      <img :width="160" src="/advertising/cms.png" alt="cms" data-nosnippet>
    </a>
    <a class="flex items-center justify-center rounded overflow-hidden" target="_blank" href="https://plugin.gin-vue-admin.com/details/139">
      <img :width="160" src="/advertising/shop.jpg" alt="shop" data-nosnippet>
    </a>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const showAD = ref(true)
</script>
