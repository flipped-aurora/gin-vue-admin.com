<template>
  <section class="gva-section gva-section--alt">
    <div class="gva-container">
      <div class="gva-two-col">
        <!-- text -->
        <div class="gva-two-col__text">
          <span class="gva-label">实时生成</span>
          <h3 class="gva-h3">从 <span class="gva-hl">一句话需求</span> 到完整的业务模块</h3>
          <p class="gva-lead">
            描述你想要的功能，AI 顺着 GVA 的工程约定，自动产出从数据层到前端的整套代码，
            每一步都对齐你现有的项目结构。
          </p>
          <ul class="gva-bullets">
            <li>数据模型自动生成</li>
            <li>API 接口自动生成</li>
            <li>前端页面自动生成</li>
            <li>权限策略自动生成</li>
          </ul>
          <a class="gva-link" href="/guide/generator/server">查看生成机制 <span class="gva-arrow">→</span></a>
        </div>

        <!-- chat + generated table -->
        <div class="gen">
          <div class="gva-card gen__chat">
            <div class="gen__chat-head">
              <span class="gen__spark">✦</span> Claude Code
            </div>
            <div class="gen__prompt">帮我创建一个用户管理模块，包含增删改查和角色权限。</div>
            <ul class="gen__steps">
              <li v-for="s in steps" :key="s.t" :class="{ done: s.done }">
                <span class="gen__check">{{ s.done ? '✓' : '○' }}</span>{{ s.t }}
              </li>
            </ul>
          </div>
          <div class="gen__arrow">→</div>
          <div class="gen__out">
            <AdminMock compact />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AdminMock from '../AdminMock.vue'
const steps = [
  { t: '分析需求', done: true },
  { t: '创建数据模型 User', done: true },
  { t: '生成 API 接口', done: true },
  { t: '注册路由', done: true },
  { t: '配置权限规则', done: true },
  { t: '生成前端页面', done: false },
]
</script>

<style scoped>
.gen { display: flex; align-items: center; gap: 14px; }
.gen__chat { flex: 1 1 0; min-width: 0; padding: 18px; }
.gen__chat-head {
  display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 14px;
  color: var(--gva-text-strong); margin-bottom: 14px;
}
.gen__spark {
  width: 22px; height: 22px; border-radius: 7px; display: grid; place-items: center;
  background: var(--gva-primary-soft); color: var(--gva-primary); font-size: 13px;
}
.gen__prompt {
  background: var(--gva-primary); color: #fff; padding: 11px 14px; border-radius: 12px 12px 12px 4px;
  font-size: 13.5px; line-height: 1.5; margin-bottom: 16px;
}
.gen__steps { list-style: none; padding: 0; margin: 0; display: grid; gap: 9px; }
.gen__steps li {
  display: flex; align-items: center; gap: 9px; font-size: 13.5px; color: var(--gva-text-muted);
}
.gen__steps li.done { color: var(--gva-text-body); }
.gen__check {
  width: 18px; height: 18px; border-radius: 999px; display: grid; place-items: center;
  font-size: 11px; flex-shrink: 0; border: 1px solid var(--gva-border-strong); color: var(--gva-text-muted);
}
.gen__steps li.done .gen__check {
  background: var(--gva-success); border-color: var(--gva-success); color: #fff;
}
.gen__arrow { flex-shrink: 0; font-size: 22px; color: var(--gva-primary); font-weight: 700; }
.gen__out { flex: 1.15 1 0; min-width: 0; }

@media (max-width: 860px) {
  .gen { flex-direction: column; }
  .gen__arrow { transform: rotate(90deg); }
  .gen__chat, .gen__out { width: 100%; }
}
</style>
