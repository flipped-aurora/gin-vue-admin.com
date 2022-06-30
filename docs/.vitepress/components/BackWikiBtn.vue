<template>
  <router-link :to="`/${id}/_Sidebar.html`" class="back">← 返回 Wiki 目录</router-link>
</template>

<script>
export default {
  props: {
    id: String
  }
}
</script>

<style lang="scss" scoped>
.back {
  margin-left: -25px;
  display: inline-block;
  font-weight: 450;
}
</style>