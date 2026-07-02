<template>
  <section
    class="gva-section max-[859px]:max-[859px]:!py-[18px]"
  >
    <div class="gva-container">
      <div
        class="
          grid grid-cols-1 gap-10
          max-[859px]:mx-auto
          max-[859px]:w-full
          max-[859px]:max-w-[404px]
          max-[859px]:gap-0
          min-[860px]:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]
          min-[860px]:items-stretch
          min-[860px]:gap-[72px]
        "
      >
        <!-- 左侧：终端 -->
        <div
          class="
            order-2
            mt-[18px]
            flex
            min-w-0
            flex-col
            min-[860px]:order-1
            min-[860px]:mt-0
          "
        >
          <div
            class="
              flex
              h-[228px]
              flex-col
              overflow-hidden
              rounded-[15px]
              bg-[#151617]
              shadow-[0_16px_30px_-12px_rgba(0,0,0,0.46)]
              ring-1
              ring-black/10
              min-[860px]:h-auto
              min-[860px]:flex-1
              min-[860px]:rounded-xl
              min-[860px]:shadow-[0_30px_70px_-28px_rgba(0,0,0,0.45)]
              min-[860px]:ring-black/5
            "
          >
            <!-- 终端标题栏 -->
            <div
              class="
                relative
                flex
                h-[40px]
                shrink-0
                items-center
                border-b
                border-white/10
                bg-[#242526]
                px-[16px]
                min-[860px]:h-11
                min-[860px]:border-b-0
                min-[860px]:bg-[#282828]
                min-[860px]:px-5
              "
            >
              <div class="flex items-center gap-[8px]">
                <span
                  class="
                    h-[12px]
                    w-[12px]
                    rounded-full
                    bg-[#f25f59]
                    min-[860px]:h-3
                    min-[860px]:w-3
                    min-[860px]:bg-[#eb534c]
                  "
                ></span>

                <span
                  class="
                    h-[12px]
                    w-[12px]
                    rounded-full
                    bg-[#f7c843]
                    min-[860px]:h-3
                    min-[860px]:w-3
                    min-[860px]:bg-[#efae41]
                  "
                ></span>

                <span
                  class="
                    h-[12px]
                    w-[12px]
                    rounded-full
                    bg-[#46c85a]
                    min-[860px]:h-3
                    min-[860px]:w-3
                    min-[860px]:bg-[#3db63e]
                  "
                ></span>
              </div>

              <!-- 移动端标题 -->
              <span
                class="
                  absolute
                  left-1/2
                  -translate-x-1/2
                  text-[12px]
                  font-normal
                  leading-none
                  text-[#b9b9b9]
                  min-[860px]:hidden
                "
              >
                Terminal
              </span>

              <!-- 桌面端标题 -->
              <span
                class="
                  absolute
                  left-1/2
                  hidden
                  -translate-x-1/2
                  text-[13px]
                  font-medium
                  tracking-wide
                  text-[#8a8a8a]
                  min-[860px]:block
                "
              >
                zsh
              </span>
            </div>

            <!-- 移动端终端内容 -->
            <div
              class="
                flex-1
                overflow-hidden
                px-[20px]
                pt-[11px]
                font-mono
                text-[12px]
                leading-[1.62]
                min-[860px]:hidden
              "
            >
              <p class="flex items-center gap-[9px] whitespace-nowrap">
                <span class="text-[#85888d]">$</span>
                <span class="font-semibold text-[#e8e8e8]">
                  gva init
                </span>
              </p>

              <p
                class="
                  flex
                  items-center
                  gap-[9px]
                  whitespace-nowrap
                  text-[#a9aaae]
                "
              >
                <span class="w-[6px] shrink-0 text-[#6d7075]">›</span>
                <span>Detecting GVA project...</span>
              </p>

              <p
                class="
                  flex
                  items-center
                  gap-[9px]
                  whitespace-nowrap
                  text-[#a9aaae]
                "
              >
                <span class="w-[6px] shrink-0 text-[#6d7075]">›</span>
                <span>Collecting project conventions</span>
              </p>

              <p
                class="
                  flex
                  items-center
                  gap-[9px]
                  whitespace-nowrap
                  text-[#a9aaae]
                "
              >
                <span class="w-[6px] shrink-0 text-[#6d7075]">›</span>
                <span>Installing Skills to AI Agent</span>
              </p>

              <p
                class="
                  mt-[7px]
                  flex
                  items-center
                  gap-[9px]
                  whitespace-nowrap
                  text-[#528cff]
                "
              >
                <span class="w-[6px] shrink-0">✓</span>

                <span class="font-medium">
                  GVA Skills installed successfully
                </span>
              </p>

              <p class="mt-[1px] whitespace-nowrap text-[#a9aaae]">
                Your Agent now understands this project.
              </p>
            </div>

            <!-- 桌面端终端内容：保持原样 -->
            <div
              class="
                hidden
                flex-1
                overflow-x-auto
                px-6
                py-5
                font-mono
                text-[14px]
                leading-[1.85]
                min-[860px]:block
                min-[860px]:text-[15px]
              "
            >
              <p class="whitespace-pre text-[#8d8d8d]">
                ~ cd my-gva-project
              </p>

              <p class="whitespace-pre text-[#8d8d8d]">
                ~ gva init
              </p>

              <p class="h-[1.85em]">&nbsp;</p>

              <p class="whitespace-pre text-[#d2d2d2]">
                Initializing GVA project...
              </p>

              <p class="whitespace-pre text-[#d2d2d2]">
                Connecting to GVA instance...
              </p>

              <p class="h-[1.85em]">&nbsp;</p>

              <p class="whitespace-pre text-[#4eb849]">
                ✓ Skills installed successfully
              </p>

              <p class="whitespace-pre text-[#4eb849]">
                ✓ 8 skills loaded: data-modeling, ui-builder,
              </p>

              <p class="whitespace-pre pl-[4ch] text-[#4eb849]">
                workflow, permissions, plugin-dev...
              </p>

              <p class="h-[1.85em]">&nbsp;</p>

              <p class="whitespace-pre text-[#5b9bf0]">
                Ready. Your AI Agent now understands GVA.
              </p>

              <span
                class="
                  mt-1
                  inline-block
                  h-[1.05em]
                  w-[8px]
                  translate-y-[3px]
                  animate-pulse
                  bg-[#9a9a9a]
                "
              ></span>
            </div>
          </div>

          <!-- 移动端说明 -->
          <p
            class="
              mt-[11px]
              text-center
              text-[14px]
              font-normal
              leading-[1.5]
              text-[#777b82]
              min-[860px]:hidden
            "
          >
            一条命令，将项目知识交给 AI
          </p>

          <!-- 桌面端说明：保持原样 -->
          <p
            class="
              mt-3
              hidden
              text-center
              text-[14px]
              text-[#60656f]
              min-[860px]:block
            "
          >
            执行 gva init 后的实际输出
          </p>
        </div>

        <!-- 右侧：文字 -->
        <div
          class="
            order-1
            flex
            min-w-0
            flex-col
            justify-start
            min-[860px]:order-2
            min-[860px]:justify-center
          "
        >

          <!-- 移动端标题 -->
          <h3
            class="
              mt-[13px]
              text-[34px]
              font-bold
              leading-[1.2]
              tracking-[-0.04em]
              text-[#050505]
              min-[860px]:hidden
            "
          >
            <span class="block">不只是接入</span>

            <span class="block text-[#347cf3]">
              AI 真正理解
            </span>

            <span class="block">你的</span>

            <span class="block">
              <span class="text-[#347cf3]">GVA</span>
              <span class="ml-[4px]">系统</span>
            </span>
          </h3>

          <!-- 桌面端标题：保持原样 -->
          <h3
            class="
              hidden
              text-[32px]
              font-semibold
              leading-[1.32]
              tracking-tight
              text-[#030303]
              min-[860px]:block
              min-[860px]:text-[42px]
              min-[860px]:leading-[1.32]
            "
          >
            不只是接入<br />
            AI
            <span class="text-[#1268ff]">真正理解</span>你的系统
          </h3>

          <!-- 移动端正文 -->
          <div class="min-[860px]:hidden">
            <p
              class="
                mt-[17px]
                text-[14px]
                font-light
                leading-[1.58]
                text-[#4f535a]
              "
            >
              执行 gva init，GVA 的代码规范、<br />
              模块结构和命名约定<br />
              自动打包成 Skills，<br />
              安装进你的 AI Agent。
            </p>

            <p
              class="
                mt-[11px]
                text-[14px]
                font-light
                leading-[1.58]
                text-[#4f535a]
              "
            >
              它知道 GVA 怎么组织代码，<br />
              生成的结果直接符合项目规范，<br />
              不需要你在每一次生成后<br />
              反复纠正。
            </p>
          </div>

          <!-- 桌面端正文：保持原样 -->
          <div class="hidden min-[860px]:block">
            <p class="mt-6 text-[16px] leading-[1.72] text-[#60656f]">
              执行 gva init，GVA 的代码规范、<br />
              模块结构、命名约定自动打包成 Skills，<br />
              安装进你的 AI Agent。
            </p>

            <p class="mt-5 text-[16px] leading-[1.72] text-[#60656f]">
              它知道 GVA 怎么组织代码，<br />
              生成的结果直接符合项目规范，<br />
              不需要你反复纠正。
            </p>
          </div>

          <!-- Skills 标签：移动端隐藏 -->
          <div
            class="
              mt-7
              hidden
              flex-wrap
              gap-x-3
              gap-y-3
              min-[860px]:flex
            "
          >
            <span
              v-for="s in skills"
              :key="s"
              class="
                rounded-lg
                bg-[#EBF2FC]
                px-3.5
                py-1.5
                text-[12px]
                font-medium
                leading-none
                text-[#1268ff]
              "
            >
              {{ s }}
            </span>
          </div>

          <!-- 链接 -->
          <a
            class="
              mt-[15px]
              inline-flex
              w-fit
              items-center
              gap-[8px]
              border-b-2
              border-[#287cff]
              pb-[4px]
              text-[14px]
              font-medium
              leading-none
              text-[#1268ff]
              transition-opacity
              hover:opacity-80
              min-[860px]:mt-8
              min-[860px]:gap-2.5
              min-[860px]:pb-[3px]
              min-[860px]:text-[16px]
            "
            href="/guide/server/mcp"
          >
            <span>了解 Skills 机制</span>

            <span
              class="
                text-[14px]
                leading-none
                min-[860px]:text-[18px]
              "
            >
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
  'data-modeling',
  'ui-builder',
  'workflow',
  'permissions',
  'plugin-dev',
  'api-config',
  'deployment',
  'migration',
]
</script>