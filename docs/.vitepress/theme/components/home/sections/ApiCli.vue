<template>
  <section
    class="gva-section !bg-white dark:!bg-[var(--gva-bg-base)] !py-[72px] sm:!py-[112px] lg:!py-[128px] xl:!pt-[152px] xl:!pb-[156px]"
  >
    <!-- 完整保留项目原有版心 -->
    <div class="gva-container">
      <!-- 标题区域 -->
      <div
        class="gva-head !mx-auto !max-w-none !text-center max-[859px]:!mx-auto max-[859px]:!w-full max-[859px]:!max-w-[404px]"
      >

        <!-- 移动端标题 -->
        <h2
          class="!m-0 text-[34px] font-bold leading-[1.2] tracking-[-0.04em] text-[#050505] dark:text-[var(--gva-text-strong)] min-[860px]:hidden"
        >
          已有 API，<span class="text-[#2264F2] dark:text-[var(--gva-primary)]">一键生成</span><br />可调用的 Skill
        </h2>

        <!-- 桌面端标题：保持原样 -->
        <h2
          class="gva-h2 !m-0 hidden !text-[38px] !font-bold !leading-[1.18] !tracking-[-0.045em] !text-[#050505] dark:!text-[var(--gva-text-strong)] min-[860px]:block sm:!text-[34px] lg:!text-[40px] xl:!text-[40px]"
        >
          已有 API，<span class="gva-hl !text-[#2264F2] dark:!text-[var(--gva-primary)]">一键生成</span>可调用的 Skill
        </h2>

        <!-- 移动端正文 -->
        <p
          class="!mx-auto !mb-0 mt-[16px] !max-w-[360px] text-[14px] font-light leading-[1.7] tracking-[0.015em] text-[#747981] dark:text-[var(--gva-text-body)] min-[860px]:hidden"
        >
          选择 API，填写描述，GVA 自动分析<br />
          调用依赖与入参出参，<br />
          生成完整 Skill 文件，Agent 开箱即用。
        </p>

        <!-- 桌面端正文：保持原样 -->
        <p
          class="gva-lead !mx-auto !mb-0 hidden !max-w-[1220px] !text-[16px] !font-normal !leading-[1.8] !tracking-[0.025em] !text-[#747981] dark:!text-[var(--gva-text-body)] min-[860px]:block sm:!mt-[32px] sm:!text-[14px] lg:!mt-[36px] lg:!text-[16px] xl:!mt-[38px] xl:!text-[16px] xl:!whitespace-nowrap"
        >
          把现成的接口包装成 Agent 能直接理解和调用的 Skill，不必为 AI 重写任何后端逻辑。
        </p>
      </div>

      <!-- ============ 移动端：纵向时间线 ============ -->
      <ol
        class="relative !mx-auto mt-[44px] flex !w-full !max-w-[404px] !list-none flex-col gap-[40px] !p-0 min-[860px]:hidden [&>li:last-child_.apicli\_\_mline]:hidden"
      >
        <li
          v-for="s in steps"
          :key="s.title"
          class="relative grid min-w-0 grid-cols-[64px_minmax(0,1fr)] items-start gap-x-[18px]"
        >
          <!-- 序号 + 连接线列 -->
          <div class="relative flex justify-center">
            <span
              class="select-none bg-[linear-gradient(180deg,rgba(34,100,242,0.30)_0%,rgba(34,100,242,0.18)_46%,rgba(34,100,242,0.09)_78%,rgba(34,100,242,0.025)_100%)] bg-clip-text text-[56px] font-semibold leading-[0.92] tracking-[-0.065em] text-transparent"
            >
              {{ s.num }}
            </span>

            <!-- 纵向连接线：末尾步骤隐藏 -->
            <span
              class="apicli__mline absolute left-1/2 top-[54px] h-[72px] w-[2px] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(34,100,242,0.32)_0%,rgba(34,100,242,0.06)_100%)]"
            ></span>
          </div>

          <!-- 文字列 -->
          <div class="min-w-0 pt-[3px]">
            <h4
              class="!m-0 text-[20px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#080A0E] dark:text-[var(--gva-text-strong)]"
            >
              {{ s.title }}
            </h4>

            <p
              class="!mx-0 !mb-0 mt-[12px] text-[14px] font-normal leading-[1.72] tracking-[0.01em] text-[#747981] dark:text-[var(--gva-text-body)]"
            >
              {{ s.mDesc[0] }}<br />{{ s.mDesc[1] }}
            </p>
          </div>
        </li>
      </ol>

      <!-- ============ 桌面端：保持原样（仅在 ≥860px 显示） ============ -->
      <ol
        class="apicli relative !m-0 !mt-[72px] hidden !list-none grid-cols-1 !p-0 min-[860px]:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-16 lg:!mt-[92px] xl:!mt-[110px] xl:grid-cols-4 xl:gap-x-0 [&>li:last-child_.apicli\_\_dot]:!hidden"
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
            class="gva-ghost-num relative z-0 mx-auto block select-none bg-[linear-gradient(180deg,rgba(34,100,242,0.175)_0%,rgba(34,100,242,0.125)_40%,rgba(34,100,242,0.065)_72%,rgba(34,100,242,0.012)_100%)] bg-clip-text text-[104px] font-semibold leading-[0.92] tracking-[-0.065em] text-transparent sm:text-[116px] lg:text-[132px] xl:text-[148px]"
          >
            {{ s.num }}
          </span>

          <!--
            步骤间连接线：
            两端透明、中间显色，
            中心放置蓝色菱形节点
          -->
          <span
            class="apicli__dot absolute left-[78%] top-[134px] z-0 hidden h-px w-[44%] bg-[linear-gradient(90deg,rgba(34,100,242,0.04)_0%,rgba(34,100,242,0.28)_24%,rgba(34,100,242,0.28)_76%,rgba(34,100,242,0.04)_100%)] xl:block after:absolute after:left-1/2 after:top-1/2 after:h-[10px] after:w-[10px] after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:bg-[#2264F2] dark:after:bg-[var(--gva-primary)] after:shadow-[0_0_12px_rgba(34,100,242,0.16)] after:content-['']"
          ></span>

          <!-- 标题向上压进数字渐隐区域 -->
          <h4
            class="apicli__title relative z-10 !mx-auto !mb-0 !mt-[-8px] w-fit !text-[20px] !font-semibold !leading-[1.3] !tracking-[-0.025em] !text-[#080A0E] dark:!text-[var(--gva-text-strong)] sm:!text-[22px] lg:!text-[24px] xl:!text-[27px]"
          >
            {{ s.title }}
          </h4>

          <!-- 描述 -->
          <p
            class="apicli__desc !mx-auto !mb-0 !mt-[28px] max-w-[230px] !text-[15px] !font-normal !leading-[2] !tracking-[0.015em] !text-[#747981] dark:!text-[var(--gva-text-body)] sm:!text-[16px] lg:!mt-[32px] lg:!text-[17px] xl:!mt-[36px] xl:max-w-[250px] xl:!text-[18px] xl:!leading-[2.15]"
          >
            {{ s.mDesc[0] }}<br />{{ s.mDesc[1] }}
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    num: '01',
    title: '选择 API',
    mDesc: ['从系统已有接口中', '勾选需要开放的 API'],
  },
  {
    num: '02',
    title: '填写描述',
    mDesc: ['命名 Skill，说明用途', '系统预填草稿，确认即可'],
  },
  {
    num: '03',
    title: '生成 ZIP',
    mDesc: ['下载含 API 代码', '与 Skill 文件的压缩包'],
  },
  {
    num: '04',
    title: 'Agent 调用',
    mDesc: ['Skill 放入项目', '任意 Agent 直接调用'],
  },
]
</script>