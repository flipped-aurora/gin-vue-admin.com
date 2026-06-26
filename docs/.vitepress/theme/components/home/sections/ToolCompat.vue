<template>
  <section class="gva-section tools">
    <div class="gva-container">
      <div class="gva-two-col tools__layout">
        <div class="gva-two-col__text">
          <p class="tools__title">你熟悉的 <span class="gva-hl">AI 工具</span> <br />
            直接接入 GVA</p>
          <p class="gva-lead">
            所有支持 MCP 协议的主流 AI Coding Agent，<br />
            无需任何额外适配，直接连接 GVA，<br />开始搭建。
          </p>
          <a class="gva-link" href="/guide/server/mcp" target="_blank">
            查看接入文档
            <img class="tools__link-icon" :src="arrRightIcon" alt="" aria-hidden="true" />
          </a>
        </div>

        <div class="gva-card tools__card">
          <div class="tools__grid">
            <div v-for="t in tools" :key="t.name" class="tools__item">
              <span class="tools__icon" :class="t.iconClass">
                <img v-if="t.icon" :src="t.icon" :alt="t.name" loading="lazy" />
                <span v-else>{{ t.glyph }}</span>
              </span>
              <span class="tools__name">{{ t.name }}</span>
            </div>
          </div>
          <p class="tools__foot">以及所有支持 MCP 协议的 AI 工具</p>
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
.tools {
  padding: 92px 24px 116px;
  background: #fff;
}

.tools .gva-container {
  max-width: var(--gva-content);
}

.tools__layout {
  grid-template-columns: 378px minmax(0, 1fr);
  gap: 56px;
}

.tools .gva-label {
  display: inline-flex;
  margin-bottom: 33px;
  gap: 13px;
  font-size: 22px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0;
  color: #1268ff;
}

.tools .gva-label::before {
  width: 15px;
  height: 15px;
  box-shadow: none;
  background: #1268ff;
}

.tools__title {
  max-width: 432px;
  margin: 0;
  font-size: 46px;
  line-height: 1.43;
  font-weight: 600;
  letter-spacing: 0;
  color: #030303;
}

.tools__title .gva-hl {
  color: #1268ff;
}

.tools .gva-lead {
  max-width: 432px;
  margin: 34px 0 42px;
  font-size: 16px;
  line-height: 1.72;
  font-weight: 400;
  color: #60656f;
}

.tools .gva-link {
  position: relative;
  gap: 10px;
  padding-bottom: 13px;
  font-size: 16px;
  line-height: 1;
  font-weight: 500;
  color: #0b72ff;
}

.tools .gva-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #287cff;
}

.tools .gva-arrow {
  font-size: 27px;
  line-height: 0.75;
}

.tools__link-icon {
  display: block;
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.tools__card {
  min-height: 446px;
  padding: 44px 26px 34px;
  border-color: #dfe5ee;
  border-radius: 16px;
  box-shadow: 0 10px 34px rgba(18, 37, 63, 0.04);
}

.tools__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px 24px;
}

.tools__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-self: center;
  gap: 14px;
  width: 98%;
  height: 148px;
  padding: 18px 8px 16px;
  border: 1px solid #dfe5ee;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 5px 13px rgba(16, 24, 40, 0.045);
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.tools__item:hover {
  border-color: rgba(36, 101, 242, 0.28);
  box-shadow: 0 8px 18px rgba(16, 24, 40, 0.065);
}

.tools__icon {
  width: 66px;
  height: 66px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 999px;
}

.tools__icon img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.tools__icon--cursor {
  background: radial-gradient(circle at 50% 50%, #202126 0%, #111217 68%, #08090c 100%);
  color: #fff;
  font-size: 43px;
  font-weight: 800;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1;
  box-shadow: 0 3px 8px rgba(15, 17, 22, 0.16);
}

.tools__name {
  font-size: 18px;
  line-height: 1;
  font-weight: 400;
  color: #626770;
}

.tools__foot {
  margin: 28px 0 0;
  text-align: center;
  font-size: 16px;
  line-height: 1;
  font-weight: 400;
  color: #8d929b;
}

.dark .tools {
  background: var(--gva-bg-base);
}

.dark .tools__title {
  color: var(--gva-text-strong);
}

.dark .tools__card,
.dark .tools__item {
  background: var(--gva-bg-dark-soft);
  border-color: var(--gva-border);
}

@media (max-width: 1120px) {
  .tools__layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 42px;
  }

  .tools__title,
  .tools .gva-lead {
    max-width: 720px;
  }
}

@media (max-width: 720px) {
  .tools {
    padding: 56px 16px;
  }

  .tools__title {
    font-size: 34px;
  }

  .tools .gva-lead,
  .tools .gva-link,
  .tools__foot {
    font-size: 17px;
  }

  .tools__card {
    min-height: auto;
    padding: 28px 18px;
  }

  .tools__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .tools__item {
    height: 132px;
    padding: 12px 8px;
  }

  .tools__icon {
    width: 56px;
    height: 56px;
  }
}

@media (max-width: 420px) {
  .tools__grid {
    grid-template-columns: 1fr;
  }
}
</style>
