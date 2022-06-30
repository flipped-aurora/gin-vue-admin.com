# 侧边栏样式自定义

## 自定义样式

v2.5.2beta版本开始支持侧边样式自定义

需要进入文件  /web/src/view/layout/aside/index.vue

```javascript

// line:56 修改方法 getTheme中的样式 #fff 为亮色模式   #191a23 为暗色模式

// background :基础背景色 请与 userStore.sideMode 相同
// activeBackground :选中项背景色
// activeText :选中项文字颜色
// normalText :普通文字颜色
// hoverBackground :鼠标悬停背景色
// hoverText :悬停文字颜色

const getTheme = () => {
  switch (userStore.sideMode) {
    case '#fff':
      theme.value = {
        background: '#fff',
        activeBackground: '#4D70FF',
        activeText: '#fff',
        normalText: '#333',
        hoverBackground: 'rgba(64, 158, 255, 0.08)',
        hoverText: '#333',
      }
      break
    case '#191a23':
      theme.value = {
        background: '#191a23',
        activeBackground: '#4D70FF',
        activeText: '#fff',
        normalText: '#fff',
        hoverBackground: 'rgba(64, 158, 255, 0.08)',
        hoverText: '#fff',
      }
      break
  }
}

```