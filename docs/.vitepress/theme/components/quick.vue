<template>
  <div class="group relative rounded-xl border border-slate-200 dark:border-slate-800">
    <div class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
    <div class="relative overflow-hidden rounded-xl p-6">
      <slot></slot>
      <h2 class="mt-4 font-display text-base text-slate-900 dark:text-white">
        <a :href="href">
          <span class="absolute -inset-px rounded-xl" />
          {{title}}
        </a>
      </h2>
      <p class="mt-1 text-sm text-slate-700 dark:text-slate-400">
        {{description}}
      </p>
    </div>
  </div>
</template>

<script setup>
defineExpose({
  title :{
    type : String
  },
  href :{
    type : String
  },
  description :{
    type : String
  }
})
</script>

<style lang="scss" scoped>

</style>
