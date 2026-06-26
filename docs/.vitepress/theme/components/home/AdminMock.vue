<template>
  <div class="amock" :class="{ 'amock--compact': compact }">
    <!-- top bar -->
    <div class="amock__top">
      <div class="amock__brand">
        <span class="amock__logo">G</span>
        <span class="amock__brandname">Gin-Vue-Admin</span>
      </div>
      <div class="amock__search"></div>
      <div class="amock__tools">
        <span class="amock__dot"></span>
        <span class="amock__dot"></span>
        <span class="amock__avatar"></span>
      </div>
    </div>
    <div class="amock__body">
      <!-- sidebar -->
      <aside class="amock__side">
        <span v-for="(m, i) in menus" :key="i" class="amock__menu" :class="{ on: i === 1 }">
          <i class="amock__mi"></i>{{ m }}
        </span>
      </aside>
      <!-- main -->
      <main class="amock__main">
        <div class="amock__crumbs">
          <span>用户管理</span>
          <button class="amock__new">+ 新增用户</button>
        </div>
        <div class="amock__table">
          <div class="amock__tr amock__tr--head">
            <span>ID</span><span>用户名</span><span>角色</span><span>状态</span><span>操作</span>
          </div>
          <div v-for="row in rows" :key="row.id" class="amock__tr">
            <span>{{ row.id }}</span>
            <span class="amock__user"><i class="amock__face"></i>{{ row.name }}</span>
            <span>{{ row.role }}</span>
            <span><i class="amock__badge" :class="row.on ? 'is-on' : 'is-off'">{{ row.on ? '启用' : '禁用' }}</i></span>
            <span class="amock__ops"><i></i><i></i></span>
          </div>
        </div>
      </main>
    </div>

    <!-- optional play overlay -->
    <button v-if="play" class="amock__play" aria-label="播放产品演示" @click="$emit('play')">
      <svg viewBox="0 0 24 24" width="26" height="26"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  play: { type: Boolean, default: false },
  compact: { type: Boolean, default: false },
})
defineEmits(['play'])
const menus = ['仪表盘', '用户管理', '角色权限', '菜单配置', '代码生成', '系统设置']
const rows = [
  { id: '01', name: 'admin', role: '超级管理员', on: true },
  { id: '02', name: 'manager', role: '部门主管', on: true },
  { id: '03', name: 'developer', role: '开发者', on: true },
  { id: '04', name: 'guest', role: '访客', on: false },
]
</script>

<style scoped>
.amock {
  position: relative;
  background: #fff;
  border: 1px solid var(--gva-border);
  border-radius: var(--gva-radius);
  box-shadow: var(--gva-shadow-lg);
  overflow: hidden;
  font-size: 13px;
  color: #334155;
}
.dark .amock { background: #0f1628; border-color: rgba(255,255,255,0.08); color: #cbd5e1; }

.amock__top {
  display: flex; align-items: center; gap: 16px;
  padding: 11px 16px; border-bottom: 1px solid var(--gva-border);
  background: #fcfcfd;
}
.dark .amock__top { background: #0c1322; border-color: rgba(255,255,255,0.06); }
.amock__brand { display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--gva-text-strong); }
.amock__logo {
  width: 22px; height: 22px; border-radius: 6px; display: grid; place-items: center;
  background: var(--gva-primary); color: #fff; font-weight: 800; font-size: 13px;
}
.amock__brandname { font-size: 13px; }
.amock__search { flex: 1; height: 26px; border-radius: 7px; background: rgba(15,23,42,0.05); max-width: 260px; }
.dark .amock__search { background: rgba(255,255,255,0.06); }
.amock__tools { display: flex; align-items: center; gap: 10px; }
.amock__dot { width: 8px; height: 8px; border-radius: 999px; background: rgba(15,23,42,0.18); }
.amock__avatar { width: 22px; height: 22px; border-radius: 999px; background: linear-gradient(135deg, #6b9bf8, #2465f2); }

.amock__body { display: flex; min-height: 0; }
.amock__side {
  width: 142px; flex-shrink: 0; padding: 14px 10px; display: flex; flex-direction: column; gap: 4px;
  border-right: 1px solid var(--gva-border); background: #fcfcfd;
}
.dark .amock__side { background: #0c1322; border-color: rgba(255,255,255,0.06); }
.amock__menu {
  display: flex; align-items: center; gap: 8px; padding: 7px 9px; border-radius: 7px;
  font-size: 12.5px; color: var(--gva-text-body); white-space: nowrap;
}
.amock__menu.on { background: var(--gva-primary-soft); color: var(--gva-primary); font-weight: 600; }
.amock__mi { width: 13px; height: 13px; border-radius: 4px; background: currentColor; opacity: 0.55; }

.amock__main { flex: 1; padding: 16px 18px; min-width: 0; }
.amock__crumbs { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.amock__crumbs > span { font-weight: 600; color: var(--gva-text-strong); }
.amock__new {
  height: 30px; padding: 0 14px; border-radius: 8px; border: none; cursor: default;
  background: var(--gva-primary); color: #fff; font-size: 12.5px; font-weight: 600;
}
.amock__table { border: 1px solid var(--gva-border); border-radius: 10px; overflow: hidden; }
.amock__tr {
  display: grid; grid-template-columns: 0.5fr 1.3fr 1.2fr 0.9fr 0.9fr;
  align-items: center; padding: 11px 14px; border-bottom: 1px solid var(--gva-border);
}
.amock__tr:last-child { border-bottom: none; }
.amock__tr--head { background: rgba(15,23,42,0.025); font-size: 12px; color: var(--gva-text-muted); font-weight: 600; }
.dark .amock__tr--head { background: rgba(255,255,255,0.03); }
.amock__user { display: flex; align-items: center; gap: 8px; }
.amock__face { width: 20px; height: 20px; border-radius: 999px; background: linear-gradient(135deg, #cbd5e1, #94a3b8); flex-shrink: 0; }
.amock__badge { font-style: normal; font-size: 11.5px; padding: 2px 9px; border-radius: 999px; font-weight: 600; }
.amock__badge.is-on { background: rgba(22,163,74,0.12); color: var(--gva-success); }
.amock__badge.is-off { background: rgba(239,68,68,0.12); color: var(--gva-danger); }
.amock__ops { display: flex; gap: 8px; }
.amock__ops i { width: 16px; height: 16px; border-radius: 5px; background: rgba(36,101,242,0.18); }

.amock__play {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: 66px; height: 66px; border-radius: 999px; border: none; cursor: pointer;
  background: var(--gva-primary); color: #fff; display: grid; place-items: center;
  box-shadow: 0 12px 34px rgba(36,101,242,0.5);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.amock__play::before {
  content: ""; position: absolute; inset: -10px; border-radius: 999px;
  border: 1px solid rgba(36,101,242,0.4); animation: amockPulse 2.4s ease-out infinite;
}
.amock__play:hover { transform: translate(-50%, -50%) scale(1.06); }
.amock__play svg { margin-left: 3px; }
@keyframes amockPulse {
  0% { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1.5); opacity: 0; }
}

.amock--compact { font-size: 12px; }
.amock--compact .amock__side { width: 0; padding: 0; border: none; overflow: hidden; }

@media (max-width: 560px) {
  .amock__side { display: none; }
  .amock__tr { grid-template-columns: 0.5fr 1.3fr 1fr 0.9fr; }
  .amock__tr > span:nth-child(5), .amock__tr--head > span:nth-child(5) { display: none; }
}
</style>
