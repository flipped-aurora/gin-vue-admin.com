<template>
  <section class="gva-section flex justify-center overflow-hidden pt-[240px] px-6 pb-[80px] bg-[#F9F9F9] dark:bg-[var(--gva-bg-base)] max-[860px]:pt-[60px] max-[860px]:pb-[18px] min-[2560px]:pt-[210px] min-[2560px]:pb-[110px]">
    <div class="gva-container text-center flex flex-col items-center max-[860px]:w-[min(100%,300px)]">
      <h1 class="text-[clamp(34px,5vw,56px)] min-[2560px]:text-[clamp(56px,3.2vw,76px)] leading-[1.2] font-semibold tracking-[-0.02em] text-[#1a1a1a] dark:text-[var(--gva-text-strong)] mx-0 mt-0 mb-5 max-[860px]:hidden">
        用 AI 构建<span class="text-[#2264F2] dark:text-[var(--gva-primary)]">系统</span>，让系统为 <span class="text-[#2264F2] dark:text-[var(--gva-primary)]">AI</span> 工作
      </h1>
      <h1 class="text-[clamp(34px,5vw,56px)] leading-[1.2] font-semibold tracking-[-0.02em] text-[#1a1a1a] dark:text-[var(--gva-text-strong)] mx-0 mt-0 mb-5 hidden max-[860px]:block max-[860px]:mb-[18px] max-[860px]:text-[28px] max-[860px]:leading-[1.32] max-[860px]:font-bold max-[860px]:tracking-[0]" aria-label="让现有 API 成为 AI Agent 可直接调用的业务能力">
        让现有 API 成为
        <span class="inline max-[860px]:block">AI Agent <span class="text-[var(--gva-primary)]">可直接调用</span>的</span>
        业务能力
      </h1>
      <p class="text-[clamp(15px,1.5vw,18px)] min-[2560px]:text-[clamp(16px,1.1vw,22px)] leading-[2] text-[#808080] dark:text-[var(--gva-text-body)] mt-2 mx-0 mb-[20px] max-[860px]:hidden max-[860px]:font-light">
        GVA 3.0 将 AI 辅助开发、全栈工程能力与智能调用体系融为一体，<br />
        让开发者更高效地构建系统，也让系统中的 API、服务与业务流程能够被 AI 理解和调用。<br />
        让每一个业务系统，天然具备 AI 能力。
      </p>
      <p class="hidden text-[clamp(15px,1.5vw,18px)] leading-[2] text-[#808080] dark:text-[var(--gva-text-body)] mt-10 mx-0 mb-[30px] max-[860px]:block max-[860px]:font-light max-[860px]:text-[13px] max-[860px]:leading-[2.15] max-[860px]:max-w-full max-[860px]:mt-0 max-[860px]:mb-[28px]">
        在 GVA 中选择 API，填写每个 Skill 的名称与描述，<br />
        点击生成，下载包含 API 代码与自动生成的<br />
        Skill 文件的 ZIP 包。<br />
        将 Skill 文件放入项目后，任何 AI Agent 即可直接<br />
        调用这些 API，统一内部权限校验，无需额外配置。
      </p>
      <div class="hero__actions flex gap-4 flex-wrap justify-center max-[860px]:w-full max-[860px]:flex-col max-[860px]:gap-3 max-[860px]:items-stretch">
        <ExperienceDropdown class="min-w-40 max-[860px]:mx-auto max-[860px]:w-[90%] max-[860px]:min-w-0 max-[860px]:flex-none" />
        <a class="gva-btn gva-btn--ghost gva-btn--commercial min-w-40 max-[860px]:w-[90%] max-[860px]:mx-auto max-[860px]:flex-none max-[860px]:min-w-0" href="https://plugin.gin-vue-admin.com/license" target="_blank" rel="noopener" aria-label="商业授权（合规）">
          <span>商业授权</span>
          <span class="gva-btn__badge" aria-hidden="true">合规</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import ExperienceDropdown from '../ExperienceDropdown.vue'

// Hero 区只承载标题、副标题与核心操作按钮。
// 视频/产品预览已迁移到紧随其后的 VideoSection.vue，本区不含任何视频元素。
</script>
