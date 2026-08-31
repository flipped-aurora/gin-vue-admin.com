<template>
  <section
    class="gva-section bg-white dark:bg-[var(--gva-bg-base)]"
    aria-labelledby="licensed-edition-title"
  >
    <div class="gva-container">
      <div class="mb-14 text-center max-[859px]:mb-10">
        <p
          class="m-0 text-[14px] font-semibold leading-none text-[var(--gva-primary)]"
        >
          GVA 授权版
        </p>
        <h2
          id="licensed-edition-title"
          class="m-0 mt-4 text-[clamp(28px,3.6vw,40px)] font-bold leading-[1.18] tracking-[-0.02em] text-[var(--gva-text-strong)] max-[859px]:leading-[1.22]"
        >
          从开发底座，升级为可交付的业务系统
        </h2>
        <p
          class="mx-auto mb-0 mt-4 max-w-[820px] text-[clamp(15px,1.5vw,18px)] leading-[2] text-[var(--gva-text-body)] max-[859px]:mt-3 max-[859px]:text-[14px] max-[859px]:leading-[1.65]"
        >
          当项目进入商业运营或客户交付，授权版把合规使用、专属服务与企业能力接到同一条交付路径上。
        </p>
      </div>

      <div
        class="grid grid-cols-1 gap-6 min-[860px]:grid-cols-3 min-[1200px]:gap-8"
      >
        <article
          class="group flex h-full min-w-0 flex-col rounded-[12px] border border-[var(--gva-border)] bg-[var(--gva-bg-base)] p-7 shadow-[var(--gva-shadow-sm)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[2px] hover:border-[var(--gva-border-strong)] hover:shadow-[var(--gva-shadow)] max-[859px]:p-6"
        >
          <span
            class="mb-3 block select-none text-[48px] font-extrabold leading-none text-[var(--gva-primary-soft)]"
          >
            01
          </span>
          <h3
            class="m-0 mb-2.5 text-[19px] font-bold leading-[1.35] text-[var(--gva-text-strong)] max-[859px]:text-[20px]"
          >
            表单 · 流程 · 通知
          </h3>
          <p
            class="m-0 text-[14px] leading-[1.7] text-[var(--gva-text-body)]"
          >
            把数据采集、审批流转和站内信、邮件及 Webhook
            触达连成业务协作闭环。
          </p>
        </article>

        <article
          class="group flex h-full min-w-0 flex-col rounded-[12px] border border-[var(--gva-border)] bg-[var(--gva-bg-base)] p-7 shadow-[var(--gva-shadow-sm)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[2px] hover:border-[var(--gva-border-strong)] hover:shadow-[var(--gva-shadow)] max-[859px]:p-6"
        >
          <span
            class="mb-3 block select-none text-[48px] font-extrabold leading-none text-[var(--gva-primary-soft)]"
          >
            02
          </span>
          <h3
            class="m-0 mb-2.5 text-[19px] font-bold leading-[1.35] text-[var(--gva-text-strong)] max-[859px]:text-[20px]"
          >
            数据集 · 看板 · 报表
          </h3>
          <p
            class="m-0 text-[14px] leading-[1.7] text-[var(--gva-text-body)]"
          >
            从数据查询到可视化分析，再到定时导出与发送，形成持续的数据交付链路。
          </p>
        </article>

        <article
          class="group flex h-full min-w-0 flex-col rounded-[12px] border border-[var(--gva-border)] bg-[var(--gva-bg-base)] p-7 shadow-[var(--gva-shadow-sm)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[2px] hover:border-[var(--gva-border-strong)] hover:shadow-[var(--gva-shadow)] max-[859px]:p-6"
        >
          <span
            class="mb-3 block select-none text-[48px] font-extrabold leading-none text-[var(--gva-primary-soft)]"
          >
            03
          </span>
          <h3
            class="m-0 mb-2.5 text-[19px] font-bold leading-[1.35] text-[var(--gva-text-strong)] max-[859px]:text-[20px]"
          >
            达梦 · 人大金仓
          </h3>
          <p
            class="m-0 text-[14px] leading-[1.7] text-[var(--gva-text-body)]"
          >
            授权版支持达梦、人大金仓等国产数据库，与业务协作和数据分析能力一并交付。
          </p>
        </article>
      </div>

      <div
        class="mt-8 flex items-center justify-between gap-8 border-t border-[var(--gva-border)] pt-8 max-[700px]:items-stretch max-[700px]:flex-col max-[700px]:gap-5"
      >
        <p
          class="m-0 max-w-[780px] text-[14px] leading-[1.8] text-[var(--gva-text-body)]"
        >
          <strong
            class="mb-1 block text-[var(--gva-text-strong)]"
          >授权版即包含上述业务、数据与国产数据库能力。</strong>
          独立版在此基础上部署客户专属私有仓库，并提供商标与品牌定制，让底层仍由
          Gin-Vue-Admin
          驱动的产品，在使用感受和持续维护上成为客户自己的框架。
        </p>
        <a
          class="gva-btn gva-btn--primary min-w-[150px] shrink-0 max-[700px]:w-full"
          href="/empower/"
        >
          了解授权版
        </a>
      </div>
    </div>
  </section>
</template>
