# 基础组件库

v3.0 基于 [reka-ui](https://reka-ui.com/) 无头原语封装了 GVA 基础组件库，目录 `web/src/core/componentLibrary/`。组件样式与主题系统打通，全部支持换肤与暗黑模式，并统一通过 `v-model`（`defineModel`）双向绑定。

## 技术方案

- **无头原语**：以 reka-ui 提供交互与可访问性（键盘导航、焦点管理、ARIA），组件库只负责样式
- **样式变体**：使用 `class-variance-authority`（cva）管理变体，可选值集中导出并作为 prop `validator` 的白名单
- **语义 token 类名**：颜色一律使用 UnoCSS 语义 token（如 `bg-primary`、`text-base-text`、`bg-container`），由主题引擎提供，天然跟随换肤与暗黑模式
- **class 合并**：`cn()` 工具（`clsx` + `tailwind-merge`）合并条件类并消解冲突的原子类，外部传入的 `class` 可以安全覆盖组件默认样式

## 全局注册

`web/src/core/global.js` 把组件库的每个组件按 kebab-case 注册为 `g-` 前缀的全局组件，模板中直接使用，无需 import：

```vue
<template>
  <g-button variant="outline-primary">保存</g-button>
</template>
```

## 组件清单

### Button（g-button）

| Prop | 说明 |
|------|------|
| `variant` | `default` / `destructive` / `outline` / `outline-primary` / `outline-success` / `secondary` / `ghost` |
| `size` | `default` / `sm` / `lg` / `icon` |
| `loading` | 异步提交时置 true，自动禁用并在文案前转圈 |
| `disabled` | 禁用 |
| `as` / `asChild` | 透传给 reka-ui Primitive，自定义渲染元素 |

### Select 族（g-select）

- 便捷模式：传 `options` / `placeholder` / `disabled` 即可，`v-model` 绑定选中值（保留 option.value 的原类型，string / number / boolean 均可）
- granular 模式：自行组合 `g-select-trigger` / `g-select-content` / `g-select-item`
- `g-select-content` 支持 `position`（`popper` / `item-aligned`）

### Switch（g-switch）

| Prop | 说明 |
|------|------|
| `v-model` | 布尔值 |
| `disabled` | 禁用 |
| `aria-label` | 纯图形控件的可访问名 |

### Slider（g-slider）

| Prop | 说明 |
|------|------|
| `v-model` | 单值 number |
| `min` / `max` / `step` | 范围与步长 |
| `marks` | 刻度文字，如 `{ 0: '0', 0.5: '0.5', 1: '1' }`，渲染在轨道下方 |

### NumberField（g-number-field）

| Prop | 说明 |
|------|------|
| `v-model` | 数值 |
| `min` / `max` / `step` | 范围与步长 |
| `disabled` | 禁用 |

组件会自动拦截清空输入等场景产生的非法值（null / NaN），保留上一个合法值。

### ColorPicker（g-color-picker）

| Prop | 说明 |
|------|------|
| `v-model` | 颜色字符串 |
| `alpha` | 是否提供透明度通道 |
| `format` | 输出格式 `hex` / `rgb` |
| `swatches` | 预置色板（十六进制数组） |
| `showValue` | 触发器是否展示颜色文本 |
| `clearable` | 是否提供「清空」按钮 |

交互面板恒定使用 hsb 色彩空间，按 `format` 输出最终字符串。

### DropdownMenu 族（g-dropdown-menu）

- 便捷模式：传 `items`（`{ label, value?, danger?, disabled?, ... }`），选中项由 `@select` 原样抛出
- `trigger`：`click` / `hover`，hover 模式带 120ms 延迟收起，便于指针滑向面板
- granular 模式：`g-dropdown-menu-content` / `g-dropdown-menu-item` / `g-dropdown-menu-label` / `g-dropdown-menu-separator` 子组件与 `#content` 插槽自定义面板

### PageTab（g-page-tab）

标签页组件，常用于多页签栏：

| Prop | 说明 |
|------|------|
| `mode` | 风格：`chrome` / `slider` / `button` |
| `active` | 是否选中态（由上层计算后传入） |
| `closable` | 是否显示关闭按钮 |

插槽：`prefix` / `suffix` / 默认插槽（标签文案）；事件：`@close`（关闭按钮独立阻断冒泡，不触发标签切换）。

### Menu（g-menu）

| Prop | 说明 |
|------|------|
| `items` | 菜单树 |
| `orientation` | `vertical` / `horizontal` |
| `theme` | `design` / `light` / `group` |
| `collapsed` | 折叠态，折叠后子菜单自动以浮层飞出 |
| `active` | 当前激活项 key |
| `itemHeight` | 菜单项高度，默认 48 |
| `v-model:open-keys` | 展开的分支 key 列表 |

展开策略：`group` 主题自由多开，其余主题为手风琴（仅保留当前路径）；事件：`@select`。

## 使用示例

```vue
<template>
  <div class="flex items-center gap-4">
    <g-button :loading="saving" @click="handleSave">保存</g-button>
    <g-select v-model="form.role" :options="roleOptions" placeholder="请选择角色" />
    <g-switch v-model="form.enabled" aria-label="是否启用" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const saving = ref(false)
const form = ref({ role: '', enabled: true })
const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '普通用户', value: 'user' }
]

const handleSave = () => {
  // 提交逻辑
}
</script>
```

## IconButton（业务组件）

`IconButton` 不在组件库中，是业务组件 `web/src/components/iconButton/index.vue`，使用时需显式 import：

| Prop | 说明 |
|------|------|
| `icon` | Iconify 图标名（如 `lucide:search`） |
| `label` | hover / text 模式下展开显示的文案 |
| `mode` | `icon`：常态显示图标、hover 时过渡为文案；`text`：始终显示文案 |
| `disabled` | 禁用 |

## 相关文档

- [主题系统](./menu-theme.md)
