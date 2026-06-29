<template>
  <section
    class="gva-section !bg-white !py-[96px] sm:!py-[112px] lg:!py-[128px] xl:!pt-[152px] xl:!pb-[156px]"
  >
    <!-- 完整保留项目原有版心 -->
    <div class="gva-container">
      <!-- 标题区域 -->
      <div class="gva-head !mx-auto !max-w-none !text-center">
        <!-- 设计图中不显示该标签，仅隐藏，不删除节点 -->
        <span class="gva-label !hidden">
          API CLI 化
        </span>

        <h2
          class="gva-h2 !m-0 !text-[38px] !font-bold !leading-[1.18] !tracking-[-0.045em] !text-[#050505] sm:!text-[46px] lg:!text-[54px] xl:!text-[64px]"
        >
          已有 API，<span class="gva-hl !text-[#347CF3]">一键生成</span>可调用的 Skill
        </h2>

        <p
          class="gva-lead !mx-auto !mb-0 !mt-[28px] !max-w-[1220px] !text-[16px] !font-normal !leading-[1.8] !tracking-[0.025em] !text-[#747981] sm:!mt-[32px] sm:!text-[14px] lg:!mt-[36px] lg:!text-[16px] xl:!mt-[38px] xl:!text-[16px] xl:!whitespace-nowrap"
        >
          把现成的接口包装成 Agent 能直接理解和调用的 Skill，不必为 AI 重写任何后端逻辑。
        </p>
      </div>

      <!-- 流程区域 -->
      <ol
        class="apicli relative !m-0 !mt-[72px] grid !list-none grid-cols-1 !p-0 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-16 lg:!mt-[92px] xl:!mt-[110px] xl:grid-cols-4 xl:gap-x-0 [&>li:last-child_.apicli__dot]:!hidden"
      >
        <li
          v-for="(s, i) in steps"
          :key="s.title"
          class="apicli__step relative min-w-0 !px-0 text-center"
        >
          <!--
            大号数字：
            上方保留浅蓝实体感，
            中下部逐渐透明，
            最底部融入白色背景
          -->
          <span
            class="gva-ghost-num relative z-0 mx-auto block select-none bg-[linear-gradient(180deg,rgba(78,128,238,0.175)_0%,rgba(78,128,238,0.125)_40%,rgba(78,128,238,0.065)_72%,rgba(78,128,238,0.012)_100%)] bg-clip-text text-[104px] font-semibold leading-[0.92] tracking-[-0.065em] text-transparent sm:text-[116px] lg:text-[132px] xl:text-[148px]"
          >
            {{ s.num }}
          </span>

          <!--
            步骤间连接线：
            两端透明、中间显色，
            中心放置蓝色菱形节点
          -->
          <span
            class="apicli__dot absolute left-[71%] top-[134px] z-0 hidden h-px w-[44%] bg-[linear-gradient(90deg,rgba(78,128,238,0.04)_0%,rgba(78,128,238,0.28)_24%,rgba(78,128,238,0.28)_76%,rgba(78,128,238,0.04)_100%)] xl:block after:absolute after:left-1/2 after:top-1/2 after:h-[10px] after:w-[10px] after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:bg-[#347CF3] after:shadow-[0_0_12px_rgba(52,124,243,0.16)] after:content-['']"
          ></span>

          <!-- 标题向上压进数字渐隐区域 -->
          <h4
            class="apicli__title relative z-10 !mx-auto !mb-0 !mt-[-8px] w-fit !text-[20px] !font-semibold !leading-[1.3] !tracking-[-0.025em] !text-[#080A0E] sm:!text-[22px] lg:!text-[24px] xl:!text-[27px]"
          >
            {{ s.title }}
          </h4>

          <!-- 描述 -->
          <p
            class="apicli__desc !mx-auto !mb-0 !mt-[28px] max-w-[230px] !text-[15px] !font-normal !leading-[2] !tracking-[0.015em] !text-[#747981] sm:!text-[16px] lg:!mt-[32px] lg:!text-[17px] xl:!mt-[36px] xl:max-w-[250px] xl:!text-[18px] xl:!leading-[2.15]"
          >
            {{ s.desc }}
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
const steps = [
  { num: '01', title: '选择 API', desc: '从项目里勾选要开放给 Agent 的接口' },
  { num: '02', title: '填写描述', desc: '用自然语言说明用途与参数含义' },
  { num: '03', title: '生成 ZIP', desc: '一键打包成标准 Skill 资源文件' },
  { num: '04', title: 'Agent 调用', desc: 'AI 工具导入后即可直接调用' },
]
</script>