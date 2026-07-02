<template>
  <section class="gva-section !bg-[#F7F7F7] !py-[40px] sm:!py-[48px] lg:!py-[56px] xl:!py-[64px]">
    <div class="gva-container">
      <!-- ============ 标题区 ============ -->
      <div class="text-center max-w-[640px] mx-auto max-[859px]:max-w-[404px]">

        <!-- 移动端标题 -->
        <h2
          class="!m-0 mt-[10px] text-[28px] leading-[1.22] font-bold tracking-[-0.02em] text-[#050505] min-[860px]:hidden"
        >
          Agent 与人<br />遵守<span class="text-[#347CF3]">同一套规则</span>
        </h2>

        <!-- 桌面端标题 -->
        <h2
          class="!m-0 mt-[10px] hidden text-[30px] leading-[1.18] font-bold tracking-[-0.025em] text-[#050505] min-[860px]:block sm:text-[33px] lg:text-[37px] xl:text-[40px]"
        >
          Agent 与人，遵守<span class="text-[#347CF3]">同一套规则</span>
        </h2>

        <!-- 移动端正文 -->
        <p
          class="mt-[10px] text-[14px] font-light leading-[1.7] text-[#747981] min-[860px]:hidden"
        >
          无需为 Agent 单独配置权限，<br />现有角色与权限设置直接生效。
        </p>

        <!-- 桌面端正文 -->
        <p
          class="mt-[10px] hidden text-[14.5px] leading-[1.7] text-[#747981] min-[860px]:block sm:text-[15px]"
        >
          无需为 Agent 单独配置权限，<br />现有角色与权限设置直接生效。
        </p>
      </div>

      <!-- ============ 移动端：权限表 ============ -->
      <div class="mt-[22px] mx-auto max-w-[442px] min-[860px]:hidden">
        <div class="rounded-[16px] border border-[#E6E7EA] bg-white overflow-hidden">
          <div class="flex items-center justify-between px-[16px] py-[11px] border-b border-[#E6E7EA]">
            <span class="font-bold text-[#080A0E] text-[14px]">GVA 权限配置</span>
            <span
              class="inline-flex items-center gap-[6px] text-[11.5px] font-semibold text-[#16A34A] bg-[rgba(22,163,74,0.1)] px-[10px] py-[4px] rounded-full"
            >
              <i class="w-[6px] h-[6px] rounded-full bg-[#16A34A] not-italic"></i>统一管控中
            </span>
          </div>

          <div
            class="grid grid-cols-[1.7fr_1fr_1fr] items-center px-[16px] py-[8px] border-b border-[#E6E7EA] bg-[#FAFAFB] text-[12px] text-[#9499A3] font-semibold"
          >
            <span>身份</span>
            <span class="text-center">读取</span>
            <span class="text-center">写入</span>
          </div>

          <div
            v-for="r in roles"
            :key="r.name"
            class="grid grid-cols-[1.7fr_1fr_1fr] items-center px-[16px] py-[9px] border-b border-[#E6E7EA] last:border-b-0"
            :style="r.highlight ? { background: '#F2F6FE' } : {}"
          >
            <span class="flex items-center gap-[9px] min-w-0">
              <span
                class="grid place-items-center w-[30px] h-[30px] rounded-full shrink-0"
                :style="{ background: r.iconBg }"
              >
                <svg v-if="r.icon === 'user'" viewBox="0 0 24 24" class="w-[14px] h-[14px]" :style="{ color: r.iconColor }">
                  <circle cx="12" cy="8" r="3.6" fill="currentColor" />
                  <path d="M4.5 20c0-4.1 3.4-7.4 7.5-7.4s7.5 3.3 7.5 7.4" fill="currentColor" />
                </svg>
                <svg v-else viewBox="0 0 24 24" class="w-[13px] h-[13px]" :style="{ color: r.iconColor }">
                  <path d="M13 2 4.5 13.6h5.3L9 22l9.5-12.4h-5.3L13 2z" fill="currentColor" />
                </svg>
              </span>
              <span class="min-w-0">
                <span class="block font-semibold text-[#080A0E] text-[13.5px] leading-[1.25] truncate">{{ r.name }}</span>
                <span
                  class="block text-[11.5px] leading-[1.4]"
                  :class="r.subBlue ? 'text-[#347CF3] font-medium' : 'text-[#9499A3]'"
                >{{ r.sub }}</span>
              </span>
            </span>

            <span v-for="(v, i) in r.permsMobile" :key="i" class="text-center">
              <svg v-if="v" viewBox="0 0 20 20" class="inline-block w-[15px] h-[15px] text-[#16A34A]">
                <path d="M4 10.2l3.6 3.6L16 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg v-else viewBox="0 0 20 20" class="inline-block w-[15px] h-[15px] text-[#DC2626]">
                <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
              <span v-if="r.permNoteMobile" class="block text-[10px] text-[#9499A3] mt-[1px]">{{ r.permNoteMobile }}</span>
            </span>
          </div>

          <div class="px-[16px] py-[10px] text-center text-[12px] text-[#9499A3] border-t border-[#E6E7EA]">
            Agent 权限由 GVA 统一管控，无需额外配置
          </div>
        </div>
      </div>

      <!-- ============ 桌面端：权限表 ============ -->
      <div class="mt-[26px] hidden min-[860px]:block">
        <div class="max-w-[940px] mx-auto rounded-[18px] border border-[#E6E7EA] bg-white overflow-hidden">
          <div class="flex items-center justify-between px-[24px] py-[13px] border-b border-[#E6E7EA]">
            <span class="font-bold text-[#080A0E] text-[15px]">GVA 权限配置</span>
            <span
              class="inline-flex items-center gap-[7px] text-[12.5px] font-semibold text-[#16A34A] bg-[rgba(22,163,74,0.1)] px-[12px] py-[5px] rounded-full"
            >
              <i class="w-[7px] h-[7px] rounded-full bg-[#16A34A] not-italic"></i>统一管控中
            </span>
          </div>

          <div
            class="grid grid-cols-[1.6fr_0.85fr_1fr_1fr_1fr] items-center px-[24px] py-[9px] border-b border-[#E6E7EA] bg-[#FAFAFB] text-[12.5px] text-[#9499A3] font-semibold"
          >
            <span>身份</span>
            <span>角色</span>
            <span class="text-center">数据读取</span>
            <span class="text-center">数据写入</span>
            <span class="text-center">敏感操作</span>
          </div>

          <div
            v-for="r in roles"
            :key="r.name"
            class="grid grid-cols-[1.6fr_0.85fr_1fr_1fr_1fr] items-center px-[24px] py-[11px] border-b border-[#E6E7EA] last:border-b-0"
            :style="r.highlight ? { background: '#F2F6FE' } : {}"
          >
            <span class="flex items-center gap-[11px] min-w-0">
              <span
                class="grid place-items-center w-[32px] h-[32px] rounded-full shrink-0"
                :style="{ background: r.iconBg }"
              >
                <svg v-if="r.icon === 'user'" viewBox="0 0 24 24" class="w-[15px] h-[15px]" :style="{ color: r.iconColor }">
                  <circle cx="12" cy="8" r="3.6" fill="currentColor" />
                  <path d="M4.5 20c0-4.1 3.4-7.4 7.5-7.4s7.5 3.3 7.5 7.4" fill="currentColor" />
                </svg>
                <svg v-else viewBox="0 0 24 24" class="w-[14px] h-[14px]" :style="{ color: r.iconColor }">
                  <path d="M13 2 4.5 13.6h5.3L9 22l9.5-12.4h-5.3L13 2z" fill="currentColor" />
                </svg>
              </span>
              <span class="min-w-0">
                <span class="block font-semibold text-[#080A0E] text-[14px] leading-[1.25]">{{ r.name }}</span>
                <span
                  class="block text-[12px] leading-[1.4]"
                  :class="r.subBlue ? 'text-[#347CF3] font-medium' : 'text-[#9499A3]'"
                >{{ r.sub }}</span>
              </span>
            </span>

            <span class="flex items-center gap-[8px] flex-wrap">
              <span
                class="inline-flex items-center px-[11px] py-[3px] rounded-full text-[12.5px] font-semibold"
                :class="r.badgeBlue ? 'bg-[#E5EBFD] text-[#347CF3]' : 'bg-[#F3F4F6] text-[#71757D]'"
              >{{ r.badge }}</span>
              <span v-if="r.badgeNote" class="text-[12px] text-[#9499A3] whitespace-nowrap">{{ r.badgeNote }}</span>
            </span>

            <span v-for="(v, i) in r.perms" :key="i" class="text-center">
              <svg v-if="v" viewBox="0 0 20 20" class="inline-block w-[17px] h-[17px] text-[#16A34A]">
                <path d="M4 10.2l3.6 3.6L16 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg v-else viewBox="0 0 20 20" class="inline-block w-[17px] h-[17px] text-[#DC2626]">
                <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
              <span v-if="r.permNote" class="block text-[11.5px] text-[#9499A3] mt-[2px]">{{ r.permNote }}</span>
            </span>
          </div>

          <div class="flex items-center justify-between px-[24px] py-[12px] text-[13.5px] text-[#9499A3] border-t border-[#E6E7EA]">
            <span>Agent 的权限由 GVA 统一管控，无需额外配置</span>
            <a
              class="group inline-flex items-center gap-[6px] text-[#347CF3] font-semibold hover:text-[#1268ff]"
              href="/guide/server/authorization"
            >查看权限文档 <span class="transition-transform group-hover:translate-x-[3px]">→</span></a>
          </div>
        </div>
      </div>

      <!-- ============ 移动端：特性列表 + 链接 ============ -->
      <div class="mt-[22px] mx-auto max-w-[442px] min-[860px]:hidden">
        <ul class="flex flex-col gap-[14px]">
          <li v-for="f in feats" :key="f.title">
            <span class="flex items-center gap-[8px] font-semibold text-[#050505] text-[14.5px]">
              <i class="w-[6px] h-[6px] rounded-full bg-[#347CF3] not-italic shrink-0"></i>{{ f.title }}
            </span>
            <p class="mt-[5px] text-[13px] font-light leading-[1.6] text-[#747981]">{{ f.descMobile }}</p>
          </li>
        </ul>

        <div class="text-center mt-[18px]">
          <a
            class="inline-flex items-center gap-[6px] text-[#347CF3] font-semibold text-[14px] border-b border-[#347CF3] pb-[2px]"
            href="/guide/server/authorization"
          >查看权限文档 →</a>
        </div>
      </div>

      <!-- ============ 桌面端：特性列表 ============ -->
      <div class="mt-[26px] hidden min-[860px]:grid max-w-[940px] mx-auto grid-cols-3 gap-x-[32px]">
        <div v-for="f in feats" :key="f.title">
          <span class="flex items-center gap-[8px] font-semibold text-[#050505] text-[15px]">
            <i class="w-[7px] h-[7px] rounded-full bg-[#347CF3] not-italic shrink-0"></i>{{ f.title }}
          </span>
          <p class="mt-[7px] text-[13.5px] leading-[1.65] text-[#747981]">
            {{ f.desc[0] }}<br />{{ f.desc[1] }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const roles = [
  {
    name: '管理员',
    sub: '人类用户',
    subBlue: false,
    icon: 'user',
    iconBg: '#E5EBFD',
    iconColor: '#347CF3',
    badge: 'admin',
    badgeBlue: false,
    badgeNote: '',
    perms: [true, true, true],
    permsMobile: [true, true],
    permNote: '',
    permNoteMobile: '',
    highlight: false,
  },
  {
    name: '普通成员',
    sub: '人类用户',
    subBlue: false,
    icon: 'user',
    iconBg: '#EFEFF1',
    iconColor: '#71757D',
    badge: 'member',
    badgeBlue: false,
    badgeNote: '',
    perms: [true, false, false],
    permsMobile: [true, false],
    permNote: '',
    permNoteMobile: '',
    highlight: false,
  },
  {
    name: 'AI Agent',
    sub: '自动调用',
    subBlue: true,
    icon: 'bolt',
    iconBg: '#347CF3',
    iconColor: '#FFFFFF',
    badge: 'member',
    badgeBlue: true,
    badgeNote: '与普通成员相同',
    perms: [true, false, false],
    permsMobile: [true, false],
    permNote: '与成员相同',
    permNoteMobile: '同成员',
    highlight: true,
  },
]

const feats = [
  {
    title: '现有配置直接生效',
    desc: ['无需为 Agent 重新设置权限，', '已有角色和规则自动适用。'],
    descMobile: '已有角色和规则自动适用于 Agent，无需重新设置。',
  },
  {
    title: '权限精确到字段级别',
    desc: ['Agent 只能读写被授权的字段，', '越权操作直接拒绝。'],
    descMobile: 'Agent 只能读写被授权的字段，越权操作直接拒绝。',
  },
  {
    title: '操作全程可审计',
    desc: ['每次 Agent 调用均有记录，', '可追溯每一次数据变更。'],
    descMobile: '每次 Agent 调用均有记录，可追溯每一次数据变更。',
  },
]
</script>