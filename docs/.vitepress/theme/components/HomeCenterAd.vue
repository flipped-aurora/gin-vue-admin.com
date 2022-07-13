<template>
  <section id="special-sponsor">
    <span>Gin-Vue-Admin Plugin</span>
    <a href="https://www.dcloud.io/hbuilderx.html?hmsr=vue-en&hmpl=&hmcu=&hmkw=&hmci=">
      <picture>
        <source type="image/avif" srcset="https://vuejs.org/images/sponsors/hbuilder.avif" />
        <img
            alt="hbuilder logo"
            width="97"
            height="36"
            src="https://vuejs.org/images/sponsors/hbuilder.avif"
        />
      </picture>
    </a>
    <span>A Plugin Market for GVA</span>
  </section>
</template>

<script setup>

</script>

<style scoped>

#special-sponsor {
  border-top: 1px solid var(--vt-c-divider-light-1);
  border-bottom: 1px solid var(--vt-c-divider-light-1);
  padding: 12px 24px;
  text-align: center;
  margin-top: 20px;
}

#special-sponsor span {
  font-weight: 500;
  font-size: 13px;
  vertical-align: middle;
  margin: 0 24px;
}

#special-sponsor img {
  display: inline-block;
  vertical-align: middle;
  height: 36px;
}

.dark #special-sponsor img {
  filter: grayscale(1) invert(1);
}

@media (max-width: 576px) {

  #special-sponsor img {
    display: block;
    margin: 2px auto 1px;
  }
}
</style>
