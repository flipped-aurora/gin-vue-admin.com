# 自定义全局皮肤

v3.0 内置全新的主题系统（`src/theme` 主题引擎），点击**顶栏右侧的设置按钮**即可打开主题设置抽屉（el-drawer），分为「外观 / 布局 / 预设 / 通用」四个页签，所有配置实时生效。

::: warning
v2.6.4 版本通过 `/web/src/config.json` 配置页面的方式已在 v3.0 移除，请改用主题设置抽屉或主题预设 JSON。
:::

## 外观设置

| 配置项 | 说明 |
| --- | --- |
| themeScheme | 主题模式：`auto` 跟随系统 / `light` 浅色 / `dark` 深色 |
| themeColor | 主题色，默认 `#2264f2` |
| otherColor | 语义色：info / success / warning / error；`isInfoFollowPrimary` 开启后信息色跟随主色 |
| themeRadius | 全局圆角，默认 `0.5rem`，滑块调节范围 0 ~ 1（步进 0.05） |
| size | 全局尺寸：`default` / `large` / `small` |
| grayscale | 灰色模式 |
| colourWeakness | 色弱模式 |
| watermark | 水印开关 |

预置主题色卡：

| 名称 | 色值 |
| --- | --- |
| 科技蓝 | `#2264f2` |
| 雅紫 | `#b48df3` |
| 天蓝 | `#1d84ff` |
| 清新绿 | `#60c041` |
| 湖青 | `#38c0fc` |
| 活力橙 | `#f9901f` |
| 樱粉 | `#ff80c8` |

## 布局设置

五种布局模式：

| 模式 | 说明 |
| --- | --- |
| normal | 经典布局 |
| head | 顶部导航 |
| combination | 混合布局 |
| sidebar | 侧栏常驻 |
| vertical | 通栏侧边 |

侧边栏尺寸：`sideWidth` 默认 256、`sideCollapsedWidth`（收缩宽度）默认 80、`sideItemHeight`（菜单项高度）默认 48。

响应式断点（`src/hooks/responsive.js`）：

| 断点 | 区间 | 行为 |
| --- | --- | --- |
| mobile | < 640px | 侧边栏切换为 Drawer 抽屉菜单 |
| pad | 640 ~ 1024px | 强制「通栏侧边」布局并自动收缩侧边栏（不修改用户所选布局） |
| desktop | >= 1024px | 使用用户所选布局 |

## 界面元素

| 配置项 | 说明 |
| --- | --- |
| menu.theme | 菜单风格：`light` / `design` / `group` |
| menu.darkSider | 独立深色侧边栏（浅色主题下侧边栏单独使用深色） |
| tab.visible | 是否显示标签栏 |
| tab.mode | 标签栏风格：`chrome` 浏览器标签 / `slider` 底部指示条 / `button` 描边胶囊 |
| tab.showIcon | 标签上是否显示路由图标 |
| tab.bg / tab.shadow | 标签栏背景与阴影档位 |
| header.breadcrumb | 面包屑：`visible` 显示开关、`showIcon` 图标开关 |
| header.refresh / search / collapseButton | 顶栏刷新、搜索、折叠按钮的显示开关 |
| header.bg / header.shadow | 顶栏背景与阴影档位 |
| card.mode | 卡片模式：`border` 描边 / `shadow` 阴影 |
| page.transition | 页面切换动画：`slide` / `fade` / `zoom` / `none` |

## 主题预设

「预设」页签内置 4 个官方预设：

| 预设 | 说明 |
| --- | --- |
| GVA-科技蓝 | 默认科技蓝主题 |
| GVA 经典蓝 | 经典蓝色风格 |
| Azir-清新蓝 | 清新蓝色风格 |
| 暗夜深色 | 深色风格 |

同时支持：

- **保存预设**：把当前全部配置保存为自定义预设（存于 localStorage）。
- **导出 JSON**：把预设导出为 JSON 文件，便于分享与备份。
- **导入 JSON**：导入预设 JSON，兼容性按文件中的 `minMainVersion`（最低主版本号）判定。

## 技术原理

主题系统由两部分组成：

- **Theme Store**（`src/pinia/modules/theme.js`）：`settings` 是唯一持久化数据源，所有派生（token、CSS 变量、组件库配置）都由它计算。
- **Runtime 适配器**（`src/theme/adapters/`）：
  - Runtime：把主题变量注入到 `style#theme-vars`；
  - Element Plus 适配：写入 `--el-color-*` 系列变量；
  - Chrome 适配：写入 `--gva-header-bg`、`--gva-header-shadow` 等界面变量；
  - Structure 适配：切换卡片模式等结构类名。

颜色由 `@simple-prism/core` 生成：5 个语义色各 11 阶色板（50 ~ 950），外加中性表面色（container / layout / muted / border / control-track / base-text / muted-foreground）。CSS 变量命名遵循 `--{name}-color`、`--{name}-{step}-color` 规则。

暗色与防闪烁：

- 暗色模式通过 `html.dark` class 切换；浅色主题 + 深色侧边栏时使用 `.gva-sider-dark` 作用域单独应用暗色。
- 首屏防闪由 `index.html` 内联脚本在页面绘制前完成暗色判定，避免浅色闪屏。

持久化与同步：

- 配置本地保存在 localStorage（键名 `gva-theme-settings`）。
- 登录后配置会经 `/user/setSelfSetting` 接口同步到后端（500ms 防抖），用户在其他设备登录时可拉取 `originSetting` 还原主题。

## 与 Element Plus 的关系

主题引擎通过 `el-config-provider` 向 Element Plus 下发 `size`、`zIndex` 等行为配置；颜色不经过编译期定制，而是运行时直接写入 `--el-color-primary` 等 CSS 变量，因此切换主题色无需重新构建。需要全局覆盖 Element Plus 样式时，仍可写在 `src/style/element_visiable.scss`。
