<template>
  <div class="_badge">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    type: String,
  },
}
</script>

<style lang="scss" scoped>
._badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 1px 8px;
  background-color: #e7c000;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  line-height: 18px;
  transform: translate(5%, -50%);
}
</style>
