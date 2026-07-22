<script setup>
/* 顶栏右侧自定义项：
   - GitHub star 徽标：点击图标跳 GitHub 仓库；鼠标悬停展开 gitee / gitcode 镜像（仅图标）。
   - 多语言：由 config nav 迁来，排在 GitHub 之后 —— 完成「多语言 / GitHub 换位」。
   放在 VitePress 顶栏 nav-bar-content-after 插槽；靠 global.scss 的 flex order 移到主题切换按钮之前。
   星标数按需求写死 25k。图标托管在 https://qmplusimg.henrongyi.top/website/。 */
const REPOS = {
  github: 'https://github.com/flipped-aurora/gin-vue-admin',
  gitee: 'https://gitee.com/pixelmax/gin-vue-admin',
  gitcode: 'https://gitcode.com/flipped-aurora/gin-vue-admin',
}
</script>

<template>
  <div class="gva-nav-extra">
    <!-- GitHub 徽标：图标(跳仓库) + 25k 药丸；悬停展开镜像下拉 -->
    <div class="gva-gh">
      <a class="gva-gh__btn" :href="REPOS.github" target="_blank" rel="noopener" aria-label="GitHub">
        <img class="gva-gh__logo" src="https://qmplusimg.henrongyi.top/website/github.png" alt="GitHub" width="24" height="24" />
        <span class="gva-gh__count">25k</span>
      </a>
      <div class="gva-gh__menu">
        <div class="gva-gh__menu-inner">
          <a :href="REPOS.gitee" target="_blank" rel="noopener" aria-label="Gitee">
            <img src="https://qmplusimg.henrongyi.top/website/gitee.png" alt="Gitee" width="24" height="24" />
          </a>
          <a :href="REPOS.gitcode" target="_blank" rel="noopener" aria-label="GitCode">
            <img src="https://qmplusimg.henrongyi.top/website/gitcode.png" alt="GitCode" width="24" height="24" />
          </a>
        </div>
      </div>
    </div>

    <!-- 多语言（从 config 迁来，排在 GitHub 之后） -->
    <a class="gva-nav-bilingual" href="#" aria-label="多语言">
      <img class="gva-nav-bilingual__img gva-nav-bilingual__img--light" src="https://qmplusimg.henrongyi.top/website/bilingual.png" alt="" />
      <img class="gva-nav-bilingual__img gva-nav-bilingual__img--dark" src="https://qmplusimg.henrongyi.top/website/bilingual_day.png" alt="" />
    </a>
  </div>
</template>

<style scoped>
.gva-nav-extra {
  display: flex;
  align-items: center;
  gap: 24px;         /* 与顶栏菜单项一致：VPNavBarMenuLink padding 0 12px → 相邻 24px */
  margin-left: 12px; /* 距最后一个菜单项(插件市场 padding-right 12) → 合计 24px */
}

/* ---- GitHub 徽标 ---- */
.gva-gh {
  position: relative;
  display: flex;
  align-items: center;
}
.gva-gh__btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  transition: transform 0.15s ease;
}
.gva-gh__btn:hover {
  transform: translateY(-1px);
}
.gva-gh__logo {
  display: block;
  width: 24px;
  height: 24px;
}
/* 暗色顶栏下 GitHub 深灰 logo 反白 */
.dark .gva-gh__logo {
  filter: brightness(0) invert(1);
}
/* 25k 药丸：浮在图标右上角，白底圆角（随主题走 token） */
.gva-gh__count {
  position: absolute;
  top: -8px;
  right: -11px;
  padding: 0 4px;
  border-radius: 999px;
  background: var(--gva-bg-base);
  border: 1px solid var(--gva-border);
  box-shadow: var(--gva-shadow-sm);
  font-size: 11px;
  font-weight: 600;
  line-height: 1.55;
  color: var(--gva-text-strong);
  white-space: nowrap;
}

/* 悬停展开的镜像下拉 */
.gva-gh__menu {
  position: absolute;
  top: 100%;
  right: -8px;
  padding-top: 10px; /* 透明悬停桥，鼠标从图标移到菜单不断开 */
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;
  z-index: 100;
}
.gva-gh:hover .gva-gh__menu,
.gva-gh:focus-within .gva-gh__menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.gva-gh__menu-inner {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  background: var(--gva-bg-base);
  border: 1px solid var(--gva-border);
  border-radius: var(--gva-radius-sm);
  box-shadow: var(--gva-shadow);
}
.gva-gh__menu-inner a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: background 0.15s ease;
}
.gva-gh__menu-inner a:hover {
  background: var(--gva-bg-alt);
}
.gva-gh__menu-inner img {
  display: block;
  width: 24px;
  height: 24px;
}

/* ---- 多语言（原全局样式迁来，稍放大到 20px 与 GitHub 平衡） ---- */
.gva-nav-bilingual {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}
.gva-nav-bilingual__img {
  display: block;
  width: 20px;
  height: 20px;
  object-fit: contain;
}
.gva-nav-bilingual__img--dark {
  display: none;
}
.dark .gva-nav-bilingual__img--light {
  display: none;
}
.dark .gva-nav-bilingual__img--dark {
  display: block;
}
</style>
