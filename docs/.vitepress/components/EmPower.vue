  <template>
    <div class="flex items-center gap-x-6   bg-orange-600 dark:bg-orange-800 px-2 md:px-6 py-2.5 sm:px-3.5 sm:before:flex-1 " @click="">
      <div class="text-sm leading-6 text-white max-w-7xl container">
        <div class="cursor-pointer text-base pb-1">
          gin-vue-admin 再此承诺，项目除必须联网的
            <span class="px-2 rounded bg-orange-200 text-orange-600 dark:bg-orange-400 dark:text-orange-100">AI服务</span>，
            <span class="px-2 rounded bg-orange-200 text-orange-600 dark:bg-orange-400 dark:text-orange-100">部分"插件"</span> 外，不会主动请求任何外部gva服务。
        </div>
          <div>如后期增加主动查询授权协议等功能，会在官网和 github 提前通知，告知所有用户（目前内部暂无此计划)</div>
      </div>
      <div class="flex flex-1 justify-end">
        <button type="button" class="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span class="sr-only">Dismiss</span>
        </button>
      </div>
    </div>
    <div class="max-w-7xl mx-auto py-24 px-4 bg-white dark:bg-[#242424] sm:px-6 lg:px-0">
      <h2 class="text-3xl font-extrabold text-gray-900 dark:text-gray-200 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">购买授权</h2>
      <p class="mt-6 max-w-2xl text-xl text-gray-500 dark:text-gray-400">如果您需要去除系统下方的Gin-Vue-Admin以及flipped-aurora技术支持标识，这表明您打算将项目用于商业目的。根据授权协议，您必须获得相应的授权。项目内置了隐蔽的指纹识别功能【无安全隐患】，获取授权文件后在官方指导下去除指纹标记。</p>
      <!-- Tiers -->
      <div class="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div v-for="tier in pricing.tiers" :key="tier.title" class="relative p-8 bg-white dark:bg-[#242424]  border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm flex flex-col group cursor-pointer">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900  dark:text-gray-300">{{ tier.title }}</h3>
            <p v-if="tier.mostPopular" class="absolute top-0 py-1.5 px-4 bg-indigo-500 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">最多购买</p>
            <p class="mt-4 flex items-baseline text-gray-900 dark:text-gray-300">
              <span class="text-5xl font-extrabold tracking-tight">￥{{ tier.price }}</span>
              <span v-if="tier.nextPrice" class="text-sm text-gray-400 dark:text-gray-600 line-through font-extrabold tracking-tight">￥{{ tier.nextPrice }}</span>
              <span class="ml-1 text-xl font-semibold">{{ tier.frequency }}</span>
            </p>
            <p class="mt-6 text-gray-500 dark:text-gray-400">{{ tier.description }}</p>

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
          <a :href="tier.link" target="_blank"
             :class="[tier.mostPopular ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-indigo-50 dark:bg-indigo-200  text-indigo-700 hover:bg-indigo-100', 'mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium group-hover:-translate-y-1 group-hover:ease-in-out ']">{{ tier.cta }}</a>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import {onMounted, ref} from "vue"
    onMounted(()=>{
      window.location.href= "https://plugin.gin-vue-admin.com/license"
    })
    const toLink = () => {
      window.open('https://flipped-aurora.feishu.cn/docx/KwjxdnvatozgwIxGV0rcpkZSn4d?from=from_copylink')
    }
    const pricing = ref({
      tiers: [
        {
          title: '自用版授权',
          price: 1288,
          nextPrice: 1688,
          frequency: '终生',
          description: '此授权您可以剔除系统下方的Gin-Vue-Admin以及flipped-aurora技术支持标识，但在本授权模式下，您所开发的软件不可以做为项目进行对外出售，仅用于本公司运营项目使用。',
          features: ['可以剔除版权标识', '专属交互式文档', '专属企业飞书群', '及时的团队答疑','插件享受企业版优惠价格','每月一次远程协助'],
          cta: '购买授权',
          mostPopular: false,
          link:'https://flipped-aurora.feishu.cn/docx/KwjxdnvatozgwIxGV0rcpkZSn4d?from=from_copylink',
        },
        {
          title: '无限制版授权',
          price: 1688,
          nextPrice: 2088,
          frequency: '终生',
          description: '此授权您可以剔除系统下方的Gin-Vue-Admin以及flipped-aurora技术支持标识，在本授权模式下，您所开发的软件可以做为项目进行对外出售。',
          features:  ['可以剔除版权标识','可对外出售源码', '专属交互式文档', '专属企业飞书群', '及时的团队答疑', '插件享受项目版优惠价格','每月一次远程协助'],
          cta: '购买授权',
          mostPopular: true,
          link:'https://flipped-aurora.feishu.cn/docx/KwjxdnvatozgwIxGV0rcpkZSn4d?from=from_copylink',
        },
        {
          title: '企业/集团授权',
          price: 16888,
          nextPrice: 20888,
          frequency: '',
          description: '如贵司需对授权协议内容进行定制化修改（包括但不限于对协议条款的重大调整，以及提供相关资质文件或文书等），或因签约流程复杂导致付款周期预计超过20个工作日，请选择此授权模式。',
          features:  ['可以剔除版权标识','可对外出售源码','专属交互式文档', '专属企业飞书群', '及时的团队答疑', '插件享受项目版优惠价格','每月一次远程协助'],
          cta: '购买授权',
          mostPopular: false,
          link:'https://flipped-aurora.feishu.cn/docx/KwjxdnvatozgwIxGV0rcpkZSn4d#XEUbd25fpoJel5xy1NMc23kInvb',
        },
      ],
    })
  </script>
