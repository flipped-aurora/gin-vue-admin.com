<template>
  <div :id="MICRO_APP_ELM"></div>
</template>

<script>
import { MICRO_APP_ELM } from '../constants'

const isString = (v) => typeof v === 'string'

export default {
  computed: {
    MICRO_APP_ELM() {
      return MICRO_APP_ELM
    },
  },
  async mounted() {
    const { start } = await import('../plugins/microApp')
    if (typeof window !== 'undefined' && !window.qiankunStarted) {
      window.qiankunStarted = true
      start({
        fetch: (url, options, ...args) => {
          if (isString(url) && url.endsWith('html')) {
            return fetch(
              url,
              {
                ...options,
                cache: 'no-cache',
              },
              ...args
            )
          }
          return fetch(url, options, ...args)
        },
      })
    }
  },
}
</script>
