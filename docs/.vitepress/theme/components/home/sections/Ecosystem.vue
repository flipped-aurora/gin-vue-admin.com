<template>
  <section class="gva-section gva-section--alt">
    <div class="gva-container">
      <div class="grid grid-cols-1 gap-8 min-[860px]:grid-cols-2 min-[860px]:items-center min-[860px]:gap-14">
        <div>
          <h2 class="text-[clamp(28px,3.6vw,40px)] leading-[1.18] font-bold tracking-[-0.02em] text-[var(--gva-text-strong)]">不只是框架，<br />是一个<span class="text-[var(--gva-primary)]">持续生长</span>的生态</h2>
          <p class="text-[clamp(14px,1.5vw,18px)] leading-[2] text-[var(--gva-text-body)] max-w-[820px] mt-[18px] mb-6 max-[860px]:font-light">
            论坛、支付、消息、存储、工作流……数百个官方与社区插件，让你像搭积木一样扩展系统能力。
          </p>
          <a class="relative inline-flex items-center gap-2.5 pb-[13px] text-[16px] leading-none font-medium text-[#2264F2] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-[#2264F2] max-[860px]:text-[14px]" href="https://plugin.gin-vue-admin.com/#/layout/home" target="_blank" rel="noopener">
            逛逛插件市场
            <img class="block w-3.5 h-3.5 object-contain" :src="arrRightIcon" alt="" aria-hidden="true" />
          </a>
        </div>

        <!-- 右侧：插件市场官方推荐（5 推荐 + 4 热门），封面图卡片 -->
        <div class="grid grid-cols-3 gap-3.5 max-[560px]:gap-2.5">
          <a
            v-for="p in plugins"
            :key="p.id"
            class="group flex flex-col overflow-hidden rounded-[14px] border border-[var(--gva-border)] bg-[var(--gva-bg-base)] shadow-[var(--gva-shadow-sm)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[3px] hover:border-[var(--gva-border-strong)] hover:shadow-[var(--gva-shadow)]"
            :href="p.link"
            target="_blank"
            rel="noopener"
            :title="p.name"
          >
            <div class="aspect-[16/10] w-full overflow-hidden bg-[var(--gva-bg-alt)]">
              <img
                :src="p.picture"
                :alt="p.name"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              />
            </div>
            <div class="px-2.5 py-2 max-[560px]:px-2 max-[560px]:py-1.5">
              <p class="line-clamp-2 text-[13px] font-medium leading-[1.35] text-[var(--gva-text-strong)] max-[560px]:text-[12px]">
                {{ p.name }}
              </p>
            </div>
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import arrRightIcon from '@/public/web/arr-right.png'

const IMG_BASE = 'https://qmplusimg.henrongyi.top/'
const detailUrl = (id) => `https://plugin.gin-vue-admin.com/details/${id}`

// 兜底数据：构建期(SSR)先渲染这 9 个（5 官方推荐 + 4 热门），
// 客户端挂载后再用实时接口刷新；接口不可用时(如生产未配置代理)也能正常展示。
const plugins = ref(
  [
    { id: 158, name: '极光CRM--企业级客户关系管理系统', picture: '1772209628未命名(5) (1).jpg' },
    { id: 139, name: '极光商城 【小程序】 基于UNI-APP 命令行模式开发', picture: '1751191617shopplus.jpg' },
    { id: 133, name: 'GVA多租户版本', picture: '1749901916稿定智能设计202406151522.jpg' },
    { id: 67, name: '定时任务配置化管理', picture: '1745826267定时任务.jpg' },
    { id: 42, name: 'Kubernetes容器管理', picture: 'plugin/k8s.jpg' },
    { id: 162, name: '【BBS】极光论坛--基于GVA开发的积分论坛系统', picture: '1774856291jiguangbbs.jpg' },
    { id: 159, name: '【gvaClaw】适配GVA的多端兼容claw', picture: '1773150030未命名(5).jpg' },
    { id: 157, name: 'dify管理插件', picture: '1771478253dify.jpg' },
    { id: 87, name: '微信公众号管理插件', picture: '1745825686微信公众号管理插件.jpg' }
  ].map((p) => ({ id: p.id, name: p.name, picture: IMG_BASE + p.picture, link: detailUrl(p.id) }))
)

// 代理地址：见 docs/vite.config.ts 中 /shopPlugin -> plugin.gin-vue-admin.com/api
const RECOMMEND_URL = '/shopPlugin/getShopPluginList?page=1&pageSize=9&recommend=true'
const HOT_URL = '/shopPlugin/getShopPluginList?page=1&pageSize=9'

async function fetchList(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  if (json.code !== 0) throw new Error(`API code ${json.code}`)
  return json.data?.list || []
}

onMounted(async () => {
  try {
    // 5 个官方推荐置顶，再用热门列表补齐到 9 个（去重）
    const [recommend, hot] = await Promise.all([fetchList(RECOMMEND_URL), fetchList(HOT_URL)])
    const seen = new Set(recommend.map((p) => p.ID))
    const merged = [...recommend, ...hot.filter((p) => !seen.has(p.ID))].slice(0, 9)
    if (merged.length) {
      plugins.value = merged.map((p) => ({
        id: p.ID,
        name: p.name,
        picture: p.picture,
        link: detailUrl(p.ID)
      }))
    }
  } catch (e) {
    // 静默兜底：保留上面的初始 9 个
    console.warn('[Ecosystem] 加载插件市场推荐失败，使用兜底数据：', e)
  }
})
</script>
