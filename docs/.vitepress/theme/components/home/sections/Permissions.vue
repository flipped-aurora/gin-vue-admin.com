<template>
  <section class="gva-section gva-section--alt">
    <div class="gva-container">
      <div class="gva-head">
        <span class="gva-label">权限管控</span>
        <h2 class="gva-h2" style="margin-top: 16px">Agent 与人，遵守<span class="gva-hl">同一套规则</span></h2>
        <p class="gva-lead">
          AI Agent 不是特权用户，它和真实成员共用同一套 RBAC 权限体系，能做什么、不能做什么，由你统一决定。
        </p>
      </div>

      <div class="gva-card perm">
        <div class="perm__head">
          <span class="perm__title">GVA 权限配置</span>
          <span class="perm__badge"><i></i> 统一管控中</span>
        </div>
        <div class="perm__table">
          <div class="perm__row perm__row--head">
            <span>角色</span>
            <span v-for="c in caps" :key="c">{{ c }}</span>
          </div>
          <div v-for="r in roles" :key="r.name" class="perm__row">
            <span class="perm__role">
              <i class="perm__role-dot" :style="{ background: r.color }"></i>{{ r.name }}
            </span>
            <span v-for="(v, i) in r.perms" :key="i" class="perm__cell">
              <i v-if="v" class="perm__yes">✓</i>
              <i v-else class="perm__no">✗</i>
            </span>
          </div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 26px">
        <a class="gva-link" href="/guide/server/authorization">查看权限文档 <span class="gva-arrow">→</span></a>
      </div>

      <div class="perm__feats">
        <div v-for="f in feats" :key="f" class="perm__feat">
          <span class="gva-label" style="margin: 0">{{ f }}</span>
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

<style scoped>
.perm { padding: 0; overflow: hidden; max-width: 940px; margin: 0 auto; }
.perm__head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 22px; border-bottom: 1px solid var(--gva-border);
}
.perm__title { font-weight: 700; color: var(--gva-text-strong); font-size: 15px; }
.perm__badge {
  display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px; font-weight: 600;
  color: var(--gva-success); background: rgba(22, 163, 74, 0.1); padding: 5px 12px; border-radius: 999px;
}
.perm__badge i { width: 7px; height: 7px; border-radius: 999px; background: var(--gva-success); }

.perm__row {
  display: grid; grid-template-columns: 1.4fr repeat(5, 1fr); align-items: center;
  padding: 13px 22px; border-bottom: 1px solid var(--gva-border);
}
.perm__row:last-child { border-bottom: none; }
.perm__row--head { background: rgba(15, 23, 42, 0.025); font-size: 12.5px; color: var(--gva-text-muted); font-weight: 600; }
.dark .perm__row--head { background: rgba(255, 255, 255, 0.03); }
.perm__row--head > span:not(:first-child),
.perm__cell { text-align: center; }
.perm__role { display: flex; align-items: center; gap: 9px; font-weight: 600; color: var(--gva-text-strong); }
.perm__role-dot { width: 9px; height: 9px; border-radius: 999px; flex-shrink: 0; }
.perm__yes { font-style: normal; color: var(--gva-success); font-weight: 700; }
.perm__no { font-style: normal; color: rgba(15, 23, 42, 0.22); font-weight: 700; }
.dark .perm__no { color: rgba(255, 255, 255, 0.22); }

.perm__feats {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
  max-width: 940px; margin: 40px auto 0;
}
.perm__feat {
  text-align: center; padding: 20px; background: var(--gva-bg-base);
  border: 1px solid var(--gva-border); border-radius: var(--gva-radius);
}

@media (max-width: 720px) {
  .perm { overflow-x: auto; }
  .perm__table { min-width: 560px; }
  .perm__head { min-width: 560px; }
  .perm__feats { grid-template-columns: 1fr; }
}
</style>
