<template>
  <a
    target="_blank"
    :href="link"
    rel="noopener noreferrer"
    :title="name"
    class="link"
  >
    {{ name }}
  </a>
</template>

<script>
export default {
  props: {
    link: String,
    name: String,
  },
}
</script>

<style lang="scss" scoped>
.link {
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.4s ease;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  font-weight: 450;
  font-size: 18px;
  margin: 0 -5px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
