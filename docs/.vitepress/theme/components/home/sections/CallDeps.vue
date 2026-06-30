<template>
  <section class="gva-section">
    <div class="gva-container">
      <!-- 标题区 -->
      <div class="mb-[38px] text-center max-[859px]:mb-[28px]">
        <!-- UI 图中不显示原标签 -->
        <span class="hidden">调用依赖</span>

        <h2
          class="text-[clamp(28px,3.6vw,40px)] font-bold leading-[1.18] tracking-[-0.02em] text-[var(--gva-text-strong)] max-[859px]:text-[34px] max-[859px]:leading-[1.22]"
        >
          依赖关系<span class="text-[var(--gva-primary)]">自动识别</span>
        </h2>

        <p
          class="mx-auto mt-4 max-w-[820px] text-[clamp(15px,1.5vw,18px)] leading-[2] text-[var(--gva-text-body)] max-[859px]:mt-[12px] max-[859px]:text-[14px] max-[859px]:leading-[1.65]"
        >
          从 API 选择到 Skill 生成，GVA 全程处理。
        </p>
      </div>

      <!-- 对比区域 -->
      <div
        class="grid grid-cols-1 items-stretch gap-0 min-[860px]:grid-cols-[minmax(0,1fr)_116px_minmax(0,1fr)]"
      >
        <!-- 左侧：未使用 GVA -->
        <div class="flex min-w-0 flex-col">
          <div
            class="flex h-full min-h-0 flex-col overflow-hidden rounded-[13px] border border-[#F6C9C5] bg-[#FEF4F3]"
          >
            <!-- 左侧标题栏 -->
            <div
              class="flex h-[48px] shrink-0 items-center gap-[10px] border-b border-[#F0D2CF] bg-[#FEF4F3] px-[21px] max-[859px]:h-[42px] max-[859px]:px-[16px]"
            >
              <span
                class="h-[11px] w-[11px] shrink-0 rounded-full bg-[#EF5148]"
              ></span>

              <span
                class="text-[13px] font-semibold tracking-[0.01em] text-[#F05A51] max-[859px]:text-[14px]"
              >
                未使用 GVA
              </span>
            </div>

            <!-- 左侧代码区 -->
            <div
              class="min-h-[276px] flex-1 bg-[radial-gradient(circle_at_50%_0%,#252525_0%,#1E1E1E_42%,#191919_100%)] px-[22px] py-[12px] font-mono text-[13.5px] leading-[1.55] tracking-[0.005em] text-[#D0D0D0] max-[859px]:min-h-0 max-[859px]:px-[17px] max-[859px]:py-[15px] max-[859px]:text-[12px] max-[859px]:leading-[1.72]"
            >
              <p class="whitespace-pre text-[#858585]"># 尝试调用 createOrder</p>

              <p class="whitespace-pre text-[#D6D6D6]">
$ agent.call('createOrder', {
              </p>

              <p class="whitespace-pre text-[#D6D6D6]">
  productId: 'P001',
              </p>

              <p class="whitespace-pre">
  <span class="text-[#EB584C]">userId: ???</span>    <span class="text-[#DF5148]"># 从哪里来？</span>
              </p>

              <p class="whitespace-pre text-[#D6D6D6]">})</p>

              <div class="h-[0.75em]"></div>

              <p class="whitespace-pre text-[#ED5C4F]">
× Error: Missing required param 'userId'
              </p>

              <p class="whitespace-pre pl-[2.2em] text-[#ED5C4F]">
getUserList must be called first
              </p>

              <p class="whitespace-pre pl-[2.2em] text-[#ED5C4F]">
but no dependency defined
              </p>

              <div class="h-[0.6em]"></div>

              <p class="whitespace-pre text-[#8C8C8C]">
# 调用顺序未知，执行失败
              </p>
            </div>

            <!-- 左侧结果栏 -->
            <div
              class="flex h-[52px] shrink-0 items-center justify-center border-t border-[#F0D2CF] bg-[#FEF4F3] text-[14px] font-semibold text-[#F05A51] max-[859px]:h-[40px]"
            >
              调用失败
            </div>
          </div>
        </div>

        <!-- 中间灰色细线 -->
        <div
          class="flex h-[54px] items-center justify-center max-[859px]:my-[6px] min-[860px]:h-auto"
        >
          <span
            class="block h-px w-[76px] bg-[linear-gradient(90deg,rgba(190,190,190,0)_0%,rgba(190,190,190,0.68)_24%,rgba(190,190,190,0.68)_76%,rgba(190,190,190,0)_100%)] max-[859px]:rotate-90"
          ></span>
        </div>

        <!-- 右侧：使用 GVA CLI -->
        <div class="flex min-w-0 flex-col">
          <div
            class="flex h-full min-h-0 flex-col overflow-hidden rounded-[13px] border border-[#BFEAD1] bg-[#F4FCF7]"
          >
            <!-- 右侧标题栏 -->
            <div
              class="flex h-[48px] shrink-0 items-center gap-[10px] border-b border-[#CFE9DA] bg-[#F4FCF7] px-[21px] max-[859px]:h-[42px] max-[859px]:px-[16px]"
            >
              <span
                class="h-[11px] w-[11px] shrink-0 rounded-full bg-[#35B966]"
              ></span>

              <span
                class="text-[13px] font-semibold tracking-[0.01em] text-[#39B767] max-[859px]:text-[14px]"
              >
                使用 GVA CLI
              </span>
            </div>

            <!-- 右侧代码区 -->
            <div
              class="min-h-[276px] flex-1 bg-[radial-gradient(circle_at_50%_0%,#252525_0%,#1E1E1E_42%,#191919_100%)] px-[22px] py-[12px] font-mono text-[13.5px] leading-[1.55] tracking-[0.005em] text-[#D0D0D0] max-[859px]:min-h-0 max-[859px]:px-[17px] max-[859px]:py-[15px] max-[859px]:text-[12px] max-[859px]:leading-[1.72]"
            >
              <p class="whitespace-pre text-[#39B54A]">
# GVA 自动生成 Skill 调用链
              </p>

              <p class="whitespace-pre text-[#D6D6D6]">
Step 1 → getUserList()
              </p>

              <p class="whitespace-pre text-[#39B54A]">
  ✓ userId: 'U001'   ← 已自动获取
              </p>

              <div class="h-[0.75em]"></div>

              <p class="whitespace-pre text-[#D6D6D6]">
Step 2 → createOrder({
              </p>

              <p class="whitespace-pre text-[#D6D6D6]">
  productId: 'P001',
              </p>

              <p class="whitespace-pre text-[#39B54A]">
  userId: 'U001'   ← 自动传入
              </p>

              <p class="whitespace-pre text-[#D6D6D6]">})</p>

              <div class="h-[0.6em]"></div>

              <p class="whitespace-pre text-[#39B54A]">
✓ Order created successfully
              </p>

              <p class="whitespace-pre text-[#39B54A]">
# 依赖由 GVA 自动识别，无需手动配置
              </p>
            </div>

            <!-- 右侧结果栏 -->
            <div
              class="flex h-[52px] shrink-0 items-center justify-center border-t border-[#CFE9DA] bg-[#F4FCF7] text-[14px] font-semibold text-[#34B765] max-[859px]:h-[40px]"
            >
              调用成功
            </div>
          </div>
        </div>
      </div>

      <!-- 底部链接 -->
      <div class="mt-[36px] text-center max-[859px]:mt-[22px]">
        <a
          class="group inline-flex items-center gap-[9px] border-b-2 border-[var(--gva-primary)] pb-[5px] text-[15px] font-semibold leading-none text-[var(--gva-primary)] transition-opacity hover:opacity-80 max-[859px]:text-[14px]"
          href="/guide/server/mcp"
        >
          <span>了解 Skill 生成机制</span>

          <span
            class="text-[17px] leading-none transition-transform group-hover:translate-x-[3px] max-[859px]:text-[14px]"
          >
            →
          </span>
        </a>
      </div>
    </div>
  </section>
</template>