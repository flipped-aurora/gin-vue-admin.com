<template>
  <section class="gva-section">
    <div class="gva-container">
      <div class="text-center mb-14 max-[860px]:mb-10">
        <span class="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.02em] text-[var(--gva-primary)] mb-4 before:content-[''] before:w-[7px] before:h-[7px] before:rounded-full before:bg-[var(--gva-primary)] before:shadow-[0_0_0_4px_var(--gva-primary-soft)]">调用依赖</span>
        <h2 class="text-[clamp(28px,3.6vw,40px)] leading-[1.18] font-bold tracking-[-0.02em] text-[var(--gva-text-strong)]" style="margin-top: 16px">依赖关系<span class="text-[var(--gva-primary)]">自动识别</span></h2>
        <p class="text-[clamp(15px,1.5vw,18px)] leading-[2] text-[var(--gva-text-body)] max-w-[820px] mt-4 mx-auto">从 API 选择到 Skill 生成，GVA 全程处理。</p>
      </div>

      <div class="grid grid-cols-1 gap-6 min-[860px]:grid-cols-2 min-[860px]:gap-7">
        <div class="flex flex-col">
          <div class="bg-[var(--gva-bg-dark)] border border-[rgba(239,68,68,0.5)] rounded-[var(--gva-radius)] overflow-hidden shadow-[0_18px_44px_rgba(239,68,68,0.14)] font-mono">
            <div class="flex items-center gap-[7px] px-4 py-[13px] bg-[rgba(255,255,255,0.04)] border-b border-[rgba(255,255,255,0.06)]">
              <span class="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
              <span class="w-3 h-3 rounded-full bg-[#febc2e]"></span>
              <span class="w-3 h-3 rounded-full bg-[#28c840]"></span>
              <span class="ml-2 text-[12px] text-[rgba(255,255,255,0.4)]">不使用 GVA</span>
            </div>
            <div class="p-5 text-[13.5px] leading-[1.85] text-[#cdd6e4] whitespace-pre-wrap [word-break:break-word]"><span class="text-[#7aa6ff]">agent</span> <span class="text-[rgba(255,255,255,0.45)]">→</span> createOrder(<span class="text-[#fbbf24]">items</span>)
<span class="text-[rgba(255,255,255,0.45)]">resolving dependencies…</span>
<span class="text-[#f87171]">✗ Error: Missing required param 'userId'</span>
<span class="text-[rgba(255,255,255,0.45)]">  at createOrder (order.service)</span>
<span class="text-[#f87171]">  request aborted.</span></div>
          </div>
          <p class="mt-4 text-center text-[14px] font-bold text-[var(--gva-danger)]">调用失败</p>
        </div>

        <div class="flex flex-col">
          <div class="bg-[var(--gva-bg-dark)] border border-[rgba(22,163,74,0.5)] rounded-[var(--gva-radius)] overflow-hidden shadow-[0_18px_44px_rgba(22,163,74,0.14)] font-mono">
            <div class="flex items-center gap-[7px] px-4 py-[13px] bg-[rgba(255,255,255,0.04)] border-b border-[rgba(255,255,255,0.06)]">
              <span class="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
              <span class="w-3 h-3 rounded-full bg-[#febc2e]"></span>
              <span class="w-3 h-3 rounded-full bg-[#28c840]"></span>
              <span class="ml-2 text-[12px] text-[rgba(255,255,255,0.4)]">使用 GVA 后</span>
            </div>
            <div class="p-5 text-[13.5px] leading-[1.85] text-[#cdd6e4] whitespace-pre-wrap [word-break:break-word]"><span class="text-[#7aa6ff]">agent</span> <span class="text-[rgba(255,255,255,0.45)]">→</span> createOrder(<span class="text-[#fbbf24]">items</span>)
<span class="text-[#4ade80]">✓</span> auto-resolved <span class="text-[#7aa6ff]">userId</span> from session
<span class="text-[#4ade80]">✓</span> injected required params
<span class="text-[#4ade80]">✓ Order created successfully</span>
<span class="text-[rgba(255,255,255,0.45)]">  orderId: #100245</span></div>
          </div>
          <p class="mt-4 text-center text-[14px] font-bold text-[var(--gva-success)]">调用成功</p>
        </div>
      </div>

      <div style="text-align: center; margin-top: 36px">
        <a class="group inline-flex items-center gap-1.5 text-[var(--gva-primary)] font-semibold text-[15px] hover:text-[var(--gva-primary-hover)]" href="/guide/server/mcp">了解 Skill 生成机制 <span class="transition-transform group-hover:translate-x-[3px]">→</span></a>
      </div>
    </div>
  </section>
</template>
