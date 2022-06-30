import Theme from 'vitepress/theme'
import './styles/vars.css'
import './styles/global.scss'

// @ts-ignore
import PluginInfo from '../components/PluginInfo.vue'
// @ts-ignore
import Badge from '../compatible/Badge.vue'
// @ts-ignore
import PluginRanking from '../components/PluginRanking.vue'
// @ts-ignore
import Link from '../components/Link.vue'
// @ts-ignore
import IndexMounted from '../components/IndexMounted.vue'
// @ts-ignore
import MicroApp from '../components/MicroApp.vue'

import GvaLayout from './gvaLayout.vue'

const components = {
  PluginInfo,
  Badge,
  PluginRanking,
  Link,
  IndexMounted,
  MicroApp
}


export default {
  ...Theme,
  Layout : GvaLayout,
  // @ts-ignore
  enhanceApp({ app}) {
    Object.keys(components).forEach(c => {
      // @ts-ignore
      app.component(c, components[c])
    })
  }
}
