<template> </template>

<script>
import { oscUrl } from '../constants'

export default {
  // hack footer 部分
  // 使其可以点击跳转到 osc
  mounted() {
    const licenseElm = document.querySelector('.VPFooter .message')
    if (!licenseElm) {
      return
    }
    const text = licenseElm.textContent
    const handleHtml = /* html */ `
        <a
          target='_blank' 
          href='${oscUrl}' 
          style='text-decoration: none; color: inherit;'
        >
          ${text}
        </a>
      `
    licenseElm.innerHTML = handleHtml
  },
}
</script>
