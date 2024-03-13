  <template>
    <div class="max-w-7xl mx-auto py-24 px-4 bg-white sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">购买授权</h2>
      <p class="mt-6 max-w-2xl text-xl text-gray-500">如果您需要剔除系统下方的Gin-Vue-Admin以及flipped-aurora技术支持标识，则默认您用于商业行为，需要进行授权。</p>

      <!-- Tiers -->
      <div class="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div v-for="tier in pricing.tiers" :key="tier.title" class="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900">{{ tier.title }}</h3>
            <p v-if="tier.mostPopular" class="absolute top-0 py-1.5 px-4 bg-indigo-500 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">最多购买</p>
            <p class="mt-4 flex items-baseline text-gray-900">
              <span class="text-5xl font-extrabold tracking-tight">￥{{ tier.price }}</span>
              <span class="ml-1 text-xl font-semibold">{{ tier.frequency }}</span>
            </p>
            <p class="mt-6 text-gray-500">{{ tier.description }}</p>

            <!-- Feature list -->
            <ul role="list" class="mt-6 space-y-6">
              <li v-for="feature in tier.features" :key="feature" class="flex">
                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
                <span class="ml-3 text-gray-500">{{ feature }}</span>
              </li>
            </ul>
          </div>
          <a :href="tier.link" target="_blank"  :class="[tier.mostPopular ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100', 'mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium']">{{ tier.cta }}</a>
        </div>
      </div>
    </div>
  </template>

  <script setup>
    import {ref} from "vue"
    const pricing = ref({
      tiers: [
        {
          title: '企业自用版授权',
          price: 888,
          frequency: '终生',
          description: '此授权您可以剔除系统下方的Gin-Vue-Admin以及flipped-aurora技术支持标识，但在本授权模式下，您所开发的软件不可以做为项目进行对外出售，仅用于本公司运营项目使用。',
          features: ['可以剔除版权标识', '专属交互式文档', '专属企业飞书群', '及时的团队答疑','插件价格低至￥0.1', '【赠送】14天体验版企业服务'],
          cta: '购买授权',
          mostPopular: false,
          link:'https://flipped-aurora.feishu.cn/docx/KwjxdnvatozgwIxGV0rcpkZSn4d?from=from_copylink',
        },
        {
          title: '项目版授权',
          price: 1288,
          frequency: '终生',
          description: '此授权您可以剔除系统下方的Gin-Vue-Admin以及flipped-aurora技术支持标识，在本授权模式下，您所开发的软件可以做为项目进行对外出售。',
          features:  ['可以剔除版权标识','可对外出售源码', '专属交互式文档', '专属企业飞书群', '及时的团队答疑', '插件价格低至￥0.1','【赠送】14天体验版企业服务'],
          cta: '购买授权',
          mostPopular: true,
          link:'https://flipped-aurora.feishu.cn/docx/KwjxdnvatozgwIxGV0rcpkZSn4d?from=from_copylink',
        },
        {
          title: '企业服务',
          price: '面议',
          frequency: '',
          description: '专业团队为您的项目提供最合理的解决方案，可参与项目部分研发。',
          features:  ['可以剔除版权标识','可对外出售源码','专属交互式文档', '专属企业飞书群', '及时的团队答疑', '插件价格低至￥0.1','【赠送】14天体验版企业服务','专业团队参与项目开发'],
          cta: '联系我们',
          mostPopular: false,
          link:'https://flipped-aurora.feishu.cn/docx/KwjxdnvatozgwIxGV0rcpkZSn4d#XEUbd25fpoJel5xy1NMc23kInvb',
        },
      ],
    })
  </script>
