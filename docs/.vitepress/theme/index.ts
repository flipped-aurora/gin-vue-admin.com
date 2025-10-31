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
import EmPower from '../components/EmPower.vue'
// @ts-ignore
import Link from '../components/Link.vue'
// @ts-ignore
import IndexMounted from '../components/IndexMounted.vue'
// @ts-ignore
import GiteeBanner from './components/GiteeBanner.vue'

import GvaLayout from './gvaLayout.vue'

const components = {
  PluginInfo,
  Badge,
  PluginRanking,
  Link,
  IndexMounted,
  EmPower,
  GiteeBanner
}

const initWebStyle = () =>{
  let media = window.matchMedia('(prefers-color-scheme: dark)');
  const dom = document.documentElement
  if(media.matches){
    dom.className = 'dark'
  }
  let callback = (e:any) => {
    let prefersDarkMode = e.matches;
    if (prefersDarkMode) {
      if(dom.className !== 'dark'){
        dom.className = 'dark'
      }
    }else{
      if(dom.className === 'dark'){
        dom.className = ''
      }
    }
  };
  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', callback);
  } else if (typeof media.addListener === 'function') {
    media.addListener(callback);
  }
}

// initWebStyle()

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
