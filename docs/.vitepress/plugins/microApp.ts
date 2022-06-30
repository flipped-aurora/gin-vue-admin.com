import { registerMicroApps, start as _start } from 'qiankun'
import { MICRO_APP_ELM } from '../constants'

if (typeof window !== 'undefined') {
  registerMicroApps([
    {
      name: 'opqbot-notify',
      entry: '//fastly.jsdelivr.net/gh/opq-osc/opqbot-notify@gh-pages/index.html', // '//localhost:9528'
      container: `#${MICRO_APP_ELM}`,
      activeRule: '/',
    },
  ])
}

export const start = _start
