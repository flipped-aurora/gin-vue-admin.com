# 自定义图标【菜单以及直接使用】

### 说明

v3.0 的图标体系由全局组件 `SvgIcon`（`src/components/svgIcon/svgIcon.vue`）提供双通道支持：

- **本地 svg 图标**：构建为 SVG sprite（vite-auto-import-svg），通过 `localIcon` 属性按 symbol id 使用。
- **在线图标**：基于 `@iconify/vue`，通过 `icon` 属性使用 Iconify 图标集中的任意图标（查询网站：https://icones.js.org/ 或 https://icon-sets.iconify.design/）。

### 使用

```vue
<template>
  <!-- 本地图标（所有可用的本地图标见开发模式控制台输出） -->
  <SvgIcon localIcon="lock" class="text-red-500 text-3xl" />

  <!-- Iconify 在线图标 -->
  <SvgIcon icon="lucide:search" class="text-red-500 text-3xl" />
</template>
```

### 本地图标注册

以文件 `web/src/assets/icons/customer-gva.svg` 为例，只需要把 svg 文件放入 `web/src/assets/icons/` 目录下即可自动注册为全局组件，组件名即文件名，之后在菜单配置中选择使用，或者直接在模板里写 `<customer-gva></customer-gva>` 即可。

- 插件目录 `web/src/plugin/**/assets/icons/` 下的 svg 同样会被扫描注册，组件名自动加上 `插件名-` 前缀，避免与系统图标重名。
- 开发模式下控制台会输出全部可用的本地图标名，方便查找复制。
- 图标文件名不允许包含空格（含空格的 svg 会被跳过并在控制台报错）。

svg文件不可以有宽和高，如果需要自动适配颜色，需要在svg文件中添加`fill="currentColor"`属性，如果使用特定颜色svg自行填充fill即可

### 菜单图标

菜单图标是后端菜单 `meta.icon` 中配置的字符串，前端在运行时按名字解析对应的全局组件进行渲染，因此菜单图标既可以填本地 svg 的文件名，也可以填已注册的全局图标组件名。

### 实现代码

> /web/src/core/global.js

```javascript
import svgIcon from '@/components/svgIcon/svgIcon.vue'

const createIconComponent = (name) => ({
  name: 'SvgIcon',
  render() {
    return h(svgIcon, {
      localIcon: name
    })
  }
})

const registerIcons = async (app) => {
  const iconModules = import.meta.glob('@/assets/icons/**/*.svg') // 系统目录 svg 图标
  const pluginIconModules = import.meta.glob(
    '@/plugin/**/assets/icons/**/*.svg'
  ) // 插件目录 svg 图标
  const mergedIconModules = Object.assign({}, iconModules, pluginIconModules)
  let allKeys = []
  for (const path in mergedIconModules) {
    let pluginName = ''
    if (path.startsWith('/src/plugin/')) {
      pluginName = `${path.split('/')[3]}-` // 插件图标加 插件名- 前缀
    }
    const iconName = path.split('/').pop().replace(/\.svg$/, '')
    // iconName 带空格则不注册并提示名称不合法
    if (iconName.indexOf(' ') !== -1) {
      console.error(`icon ${iconName}.svg includes whitespace in ${path}`)
      continue
    }
    const key = `${pluginName}${iconName}`
    app.component(key, createIconComponent(key))
    allKeys.push(key)
  }

  // 开发模式下列出所有可用的本地图标，方便直接查找复制使用
  import.meta.env.MODE == 'development' &&
    console.log(`所有可用的本地图标: ${allKeys.join(', ')}`)
}
```
