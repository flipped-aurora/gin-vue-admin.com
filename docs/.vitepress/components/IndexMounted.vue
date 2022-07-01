<template> </template>

<script>
import { oscUrl } from '../constants'

export default {
  mounted() {
    const licenseElm = document.querySelector('.VPFooter .copyright')
    if (!licenseElm) {
      return
    }
    const text = licenseElm.textContent
    const handleHtml = /* html */ `
        <a
          target='_blank'
          href='https://beian.miit.gov.cn/#/Integrated/index'
          style='text-decoration: none; color: inherit;'
        >
          ${text}
        </a>
      `
    licenseElm.innerHTML = handleHtml
  },
}
</script>
