<template>
  <section class="gva-section pt-[92px] pb-[116px] px-6 bg-[#fff] dark:bg-[var(--gva-bg-base)] max-[720px]:py-14 max-[720px]:px-4">
    <div class="gva-container">
      <div class="grid items-center grid-cols-[378px_minmax(0,1fr)] gap-14 max-[1120px]:grid-cols-[minmax(0,1fr)] max-[1120px]:gap-[42px]">
        <div>
          <p class="max-w-[432px] m-0 text-[42px] leading-[1.43] font-semibold tracking-[0] text-[#030303] dark:text-[var(--gva-text-strong)] max-[1120px]:max-w-[720px] max-[720px]:text-[34px]">你熟悉的 <span class="text-[#1268ff]">AI 工具</span> <br />
            直接接入 GVA</p>
          <p class="max-w-[432px] mx-0 mt-[34px] mb-[42px] text-[16px] leading-[1.72] font-normal text-[#60656f] max-[1120px]:max-w-[720px] max-[720px]:text-[14px] max-[720px]:font-light">
            所有支持 MCP 协议的主流 AI Coding Agent，<br />
            无需任何额外适配，直接连接 GVA，<br />开始搭建。
          </p>
          <a class="relative inline-flex items-center gap-2.5 pb-[13px] text-[16px] leading-none font-medium text-[#0b72ff] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-[#287cff] max-[720px]:text-[14px]" href="/guide/server/mcp" target="_blank">
            查看接入文档
            <img class="block w-3.5 h-3.5 object-contain" :src="arrRightIcon" alt="" aria-hidden="true" />
          </a>
        </div>

        <div class="bg-[var(--gva-bg-base)] border border-[#dfe5ee] rounded-[16px] shadow-[0_10px_34px_rgba(18,37,63,0.04)] transition-[transform,box-shadow,border-color] duration-200 min-h-[446px] pt-11 px-[26px] pb-[34px] dark:bg-[var(--gva-bg-dark-soft)] dark:border-[var(--gva-border)] max-[720px]:min-h-[auto] max-[720px]:py-5 max-[720px]:px-3.5">
          <div class="grid grid-cols-3 gap-y-7 gap-x-6 max-[720px]:grid-cols-2 max-[720px]:gap-2.5">
            <div v-for="t in tools" :key="t.name" class="flex flex-col items-center justify-center justify-self-center gap-3.5 w-[98%] h-[148px] pt-[18px] px-2 pb-4 border border-[#dfe5ee] rounded-[10px] bg-[#fff] shadow-[0_5px_13px_rgba(16,24,40,0.045)] transition-[border-color,transform,box-shadow] duration-200 hover:border-[rgba(36,101,242,0.28)] hover:shadow-[0_8px_18px_rgba(16,24,40,0.065)] dark:bg-[var(--gva-bg-dark-soft)] dark:border-[var(--gva-border)] dark:hover:border-[var(--gva-border)] max-[720px]:flex-row max-[720px]:justify-start max-[720px]:w-full max-[720px]:h-auto max-[720px]:gap-2.5 max-[720px]:px-3 max-[720px]:py-2.5 max-[720px]:rounded-lg">
              <span class="w-[66px] h-[66px] shrink-0 grid place-items-center overflow-hidden rounded-full max-[720px]:w-10 max-[720px]:h-10" :class="t.iconClass">
                <img v-if="t.icon" :src="t.icon" :alt="t.name" loading="lazy" class="block w-full h-full object-contain" />
                <span v-else>{{ t.glyph }}</span>
              </span>
              <span class="text-[18px] leading-none font-normal text-[#626770] max-[720px]:text-[14px]">{{ t.name }}</span>
            </div>
          </div>
          <p class="mt-7 mx-0 mb-0 text-center text-[16px] leading-none font-normal text-[#8d929b] max-[720px]:mt-4 max-[720px]:text-[13px]">以及所有支持 MCP 协议的 AI 工具</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import claudeIcon from '@/public/web/claude.png'
import codexIcon from '@/public/web/icon-chatgpt.png'
import hermesIcon from '@/public/web/hermes.png'
import openClawIcon from '@/public/web/openclaw.png'
import traeIcon from '@/public/web/trae.png'
import arrRightIcon from '@/public/web/arr-right.png'

const tools = [
  { name: 'Claude Code', icon: claudeIcon },
  { name: 'Cursor', glyph: 'I', iconClass: 'tools__icon--cursor' },
  { name: 'Codex', icon: codexIcon },
  { name: 'Trae', icon: traeIcon },
  { name: 'Hermes', icon: hermesIcon },
  { name: 'OpenClaw', icon: openClawIcon },
]
</script>

<style scoped>
/* Applied dynamically via :class="t.iconClass" from <script> data (Cursor's "I"
   glyph badge) — the class name lives in JS we must not touch, so it can't be
   folded into a static template class. Kept as the one rule Tailwind can't reach. */
.tools__icon--cursor {
  background: radial-gradient(circle at 50% 50%, #202126 0%, #111217 68%, #08090c 100%);
  color: #fff;
  font-size: 43px;
  font-weight: 800;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1;
  box-shadow: 0 3px 8px rgba(15, 17, 22, 0.16);
}

/* keep the glyph proportional to the shrunken mobile icon */
@media (max-width: 720px) {
  .tools__icon--cursor {
    font-size: 26px;
  }
}
</style>