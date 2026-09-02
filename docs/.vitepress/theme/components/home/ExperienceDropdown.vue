<template>
  <div
    ref="root"
    class="relative inline-flex"
    @focusout="handleFocusOut"
    @keydown.escape="close"
  >
    <button
      type="button"
      class="inline-flex h-[43px] w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border border-transparent bg-[var(--gva-primary)] px-7 text-[14px] font-normal text-white transition-[transform,box-shadow,background-color,border-color,color] duration-200 hover:-translate-y-px hover:bg-[var(--gva-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gva-primary)] focus-visible:ring-offset-2 max-[860px]:h-12"
      aria-haspopup="menu"
      :aria-expanded="open"
      :aria-controls="menuId"
      @click="toggle"
    >
      <span>立即体验</span>
      <span
        class="h-2 w-2 border-b border-r border-current transition-transform duration-200"
        :class="open ? 'translate-y-[2px] rotate-[225deg]' : '-translate-y-[2px] rotate-45'"
        aria-hidden="true"
      />
    </button>

    <div
      v-if="open"
      :id="menuId"
      class="absolute left-1/2 top-[calc(100%+8px)] z-30 w-[280px] max-w-[calc(100vw-32px)] -translate-x-1/2 overflow-hidden rounded-[8px] border border-[var(--gva-border)] bg-white p-1.5 text-left shadow-[0_16px_36px_rgba(15,23,42,0.16)] dark:bg-[var(--gva-bg-dark-soft)]"
      role="menu"
      aria-label="选择体验版本"
    >
      <a
        class="flex h-11 items-center justify-between rounded-[6px] px-3.5 text-[14px] text-[var(--gva-text-strong)] transition-colors hover:bg-[var(--gva-primary-soft)] hover:text-[var(--gva-primary)] focus-visible:bg-[var(--gva-primary-soft)] focus-visible:text-[var(--gva-primary)] focus-visible:outline-none"
        href="https://demo.gin-vue-admin.com"
        target="_blank"
        rel="noopener"
        role="menuitem"
        @click="close"
      >
        <span class="font-medium">标准版</span>
        <span class="text-[13px] text-[var(--gva-text-muted)]">v2.9.2</span>
      </a>
      <a
        class="flex h-11 items-center justify-between rounded-[6px] px-3.5 text-[14px] text-[var(--gva-text-strong)] transition-colors hover:bg-[var(--gva-primary-soft)] hover:text-[var(--gva-primary)] focus-visible:bg-[var(--gva-primary-soft)] focus-visible:text-[var(--gva-primary)] focus-visible:outline-none"
        href="https://vip.gin-vue-admin.com"
        target="_blank"
        rel="noopener"
        role="menuitem"
        @click="close"
      >
        <span class="font-medium">授权版</span>
        <span class="text-[13px] text-[var(--gva-text-muted)]">v3.0.1</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, useId } from 'vue'

const open = ref(false)
const root = ref(null)
const menuId = `experience-version-menu-${useId()}`

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function handleFocusOut(event) {
  if (!root.value?.contains(event.relatedTarget)) close()
}

function handleDocumentClick(event) {
  if (open.value && !root.value?.contains(event.target)) close()
}

onMounted(() => document.addEventListener('click', handleDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', handleDocumentClick))
</script>
