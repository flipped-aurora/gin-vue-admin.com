<template>
  <div v-if="showBanner" class="gitee-banner">
    <div class="banner-container">
      <div class="banner-shell">
        <a
          class="banner-main"
          href="https://plugin.gin-vue-admin.com/license"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="banner-content">
            <div class="banner-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#C71D23" />
              </svg>
            </div>
            <div class="banner-text">
              <span class="banner-title">🎉 授权打折活动正在进行中</span>
              <span class="banner-highlight">点击查看优惠授权方案</span>
              <span class="banner-subtitle">限时优惠，欢迎了解详情</span>
            </div>
            <div class="banner-actions">
              <span class="vote-button">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1L9.5 5.5L14 7L9.5 8.5L8 13L6.5 8.5L2 7L6.5 5.5L8 1Z" fill="currentColor" />
                </svg>
                立即查看
              </span>
            </div>
          </div>
        </a>
        <button
          class="close-button"
          type="button"
          aria-label="关闭活动通知"
          title="关闭"
          @click="closeBanner"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const BANNER_CLOSE_KEY = 'gva-license-banner-closed'
const showBanner = ref(true)

const closeBanner = () => {
  showBanner.value = false
  window.localStorage.setItem(BANNER_CLOSE_KEY, '1')
}

onMounted(() => {
  showBanner.value = window.localStorage.getItem(BANNER_CLOSE_KEY) !== '1'
})
</script>

<style scoped>
.gitee-banner {
  position: relative;
  display: block;
  z-index: 30;
  margin-top: var(--vp-nav-height, 64px);
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #c44569 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.5s ease-out;
}

.banner-main {
  flex: 1;
  min-width: 0;
  text-decoration: none;
  color: inherit;
  transition: filter 0.2s ease;
}

.banner-main:hover {
  filter: brightness(1.03);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.banner-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.banner-shell {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.banner-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.banner-text {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 14px;
  line-height: 1.4;
}

.banner-title {
  font-weight: 500;
}

.banner-highlight {
  font-weight: 700;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
  white-space: nowrap;
}

.banner-subtitle {
  font-weight: 400;
  opacity: 0.9;
}

.banner-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.vote-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.9);
  color: #c44569;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.vote-button:hover {
  background: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.close-button {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.06);
}

.close-button:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.85);
  outline-offset: 2px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .banner-shell {
    align-items: flex-start;
  }

  .banner-content {
    flex-direction: column;
    gap: 12px;
    padding-right: 6px;
  }

  .banner-text {
    flex-direction: column;
    text-align: center;
    gap: 4px;
  }

  .banner-highlight {
    white-space: normal;
  }

  .banner-actions {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .banner-container {
    padding: 0 16px;
  }

  .banner-text {
    font-size: 13px;
  }

  .vote-button {
    padding: 10px 20px;
    font-size: 14px;
  }
}

/* 暗色主题适配 */
.dark .gitee-banner {
  background: linear-gradient(135deg, #d63031 0%, #e17055 50%, #a29bfe 100%);
}

.dark .vote-button {
  background: rgba(255, 255, 255, 0.95);
  color: #2d3436;
}

.dark .vote-button:hover {
  background: white;
}

.dark .close-button {
  background: rgba(255, 255, 255, 0.16);
}

.dark .close-button:hover {
  background: rgba(255, 255, 255, 0.24);
}
</style>
