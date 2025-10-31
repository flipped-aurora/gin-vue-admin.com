<template>
  <div class="gitee-banner" v-if="showBanner">
    <div class="banner-container">
      <div class="banner-content">
        <div class="banner-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#C71D23"/>
          </svg>
        </div>
        <div class="banner-text">
          <span class="banner-title">🎉 我们正在参与</span>
          <span class="banner-highlight">Gitee 2025最受欢迎开源项目评选</span>
          <span class="banner-subtitle">希望能得到您宝贵的一票！</span>
        </div>
        <div class="banner-actions">
          <a 
            href="https://gitee.com/activity/2025opensource?ident=IIOGJ8" 
            target="_blank" 
            class="vote-button"
            @click="trackVote"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1L9.5 5.5L14 7L9.5 8.5L8 13L6.5 8.5L2 7L6.5 5.5L8 1Z" fill="currentColor"/>
            </svg>
            立即投票
          </a>
          <button class="close-button" @click="closeBanner" title="关闭">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showBanner = ref(true)

const closeBanner = () => {
  showBanner.value = false
  // 只在当前会话中隐藏banner，不保存到localStorage
  // 这样重新打开浏览器时banner会重新显示
}

const trackVote = () => {
  // 可以在这里添加投票点击统计
  console.log('Gitee vote clicked')
}

onMounted(() => {
  // 每次打开浏览器都显示banner
  showBanner.value = true
})
</script>

<style scoped>
.gitee-banner {
  position: relative;
  z-index: 30;
  margin-top: var(--vp-nav-height, 64px);
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #c44569 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.5s ease-out;
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

.banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
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
  text-decoration: none;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    gap: 12px;
    padding: 16px 0;
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
</style>