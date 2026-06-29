<template>
  <section class="gva-section gva-section--alt">
    <div class="gva-container">
      <div class="text-center mb-14 max-[860px]:mb-10">
        <span class="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.02em] text-[var(--gva-primary)] mb-4 before:content-[''] before:w-[7px] before:h-[7px] before:rounded-full before:bg-[var(--gva-primary)] before:shadow-[0_0_0_4px_var(--gva-primary-soft)]">权限管控</span>
        <h2 class="text-[clamp(28px,3.6vw,40px)] leading-[1.18] font-bold tracking-[-0.02em] text-[var(--gva-text-strong)]" style="margin-top: 16px">Agent 与人，遵守<span class="text-[var(--gva-primary)]">同一套规则</span></h2>
        <p class="text-[clamp(15px,1.5vw,18px)] leading-[2] text-[var(--gva-text-body)] max-w-[820px] mt-4 mx-auto">
          AI Agent 不是特权用户，它和真实成员共用同一套 RBAC 权限体系，能做什么、不能做什么，由你统一决定。
        </p>
      </div>

      <div class="bg-[var(--gva-bg-base)] border border-[var(--gva-border)] rounded-[var(--gva-radius)] shadow-[shadow:var(--gva-shadow-sm)] transition-[transform,box-shadow,border-color] duration-200 p-0 overflow-hidden max-w-[940px] mx-auto max-[720px]:overflow-x-auto">
        <div class="flex items-center justify-between px-[22px] py-[18px] border-b border-[var(--gva-border)] max-[720px]:min-w-[560px]">
          <span class="font-bold text-[var(--gva-text-strong)] text-[15px]">GVA 权限配置</span>
          <span class="inline-flex items-center gap-[7px] text-[12.5px] font-semibold text-[var(--gva-success)] bg-[rgba(22,163,74,0.1)] px-3 py-[5px] rounded-full"><i class="w-[7px] h-[7px] rounded-full bg-[var(--gva-success)]"></i> 统一管控中</span>
        </div>
        <div class="max-[720px]:min-w-[560px]">
          <div class="grid grid-cols-[1.4fr_repeat(5,1fr)] items-center px-[22px] py-[13px] border-b border-[var(--gva-border)] bg-[rgba(15,23,42,0.025)] text-[12.5px] text-[var(--gva-text-muted)] font-semibold dark:bg-[rgba(255,255,255,0.03)]">
            <span>角色</span>
            <span v-for="c in caps" :key="c" class="text-center">{{ c }}</span>
          </div>
          <div v-for="r in roles" :key="r.name" class="grid grid-cols-[1.4fr_repeat(5,1fr)] items-center px-[22px] py-[13px] border-b border-[var(--gva-border)] last:border-b-0">
            <span class="flex items-center gap-[9px] font-semibold text-[var(--gva-text-strong)]">
              <i class="w-[9px] h-[9px] rounded-full shrink-0" :style="{ background: r.color }"></i>{{ r.name }}
            </span>
            <span v-for="(v, i) in r.perms" :key="i" class="text-center">
              <i v-if="v" class="not-italic text-[var(--gva-success)] font-bold">✓</i>
              <i v-else class="not-italic text-[rgba(15,23,42,0.22)] font-bold dark:text-[rgba(255,255,255,0.22)]">✗</i>
            </span>
          </div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 26px">
        <a class="group inline-flex items-center gap-1.5 text-[var(--gva-primary)] font-semibold text-[15px] hover:text-[var(--gva-primary-hover)]" href="/guide/server/authorization">查看权限文档 <span class="transition-transform group-hover:translate-x-[3px]">→</span></a>
      </div>

      <div class="grid grid-cols-3 gap-4 max-w-[940px] mx-auto mt-10 max-[720px]:grid-cols-1">
        <div v-for="f in feats" :key="f" class="text-center p-5 bg-[var(--gva-bg-base)] border border-[var(--gva-border)] rounded-[var(--gva-radius)]">
          <span class="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.02em] text-[var(--gva-primary)] before:content-[''] before:w-[7px] before:h-[7px] before:rounded-full before:bg-[var(--gva-primary)] before:shadow-[0_0_0_4px_var(--gva-primary-soft)]" style="margin: 0">{{ f }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const caps = ['查看数据', '导入', '批量操作', '删除', '导出']
const roles = [
  { name: '管理员', color: '#2264F2', perms: [true, true, true, true, true] },
  { name: '普通成员', color: '#16a34a', perms: [true, true, false, false, true] },
  { name: 'AI Agent', color: '#f59e0b', perms: [true, false, true, false, false] },
]
const feats = ['现有配置直接生效', '权限精确到字段级别', '操作全程可审计']
</script>
