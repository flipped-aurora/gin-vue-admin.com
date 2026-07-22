# 表单生成器

v3.0 起，表单生成器是前端内置的可视化设计器，基于 [@form-create/designer](https://github.com/xaboy/form-create-designer) 实现，页面代码位于 `web/src/plugin/auto/view/formCreate/index.vue`。

它直接运行在前端页面中，**不再是独立的 form-generator 服务**，因此不存在旧版本的 `127.0.0.1 拒绝连接` 问题，也无需任何额外部署。

::: warning 旧版说明
v2 时代的表单生成器是独立的 form-generator 服务，通过 iframe 嵌入页面，需要单独启动并处理跨端口访问（即"127.0.0.1 拒绝连接"问题的来源）。该方案已随 v3.0 移除，旧文档中的处理方式不再适用。
:::

## 入口

左侧菜单：**系统工具 → 表单生成器**（路由 `formCreate`，支持 KeepAlive）。

## 使用步骤

1. **拖拽设计表单**：从左侧组件库拖入表单项，在右侧配置字段属性（字段名、标题、占位提示、校验规则、布局等）。
2. **解析为 Vue 原生标签**：点击设计器顶部的"解析为 Vue 原生标签"按钮，系统读取设计器的 `getRule()` 与 `getOption()`，生成完整的 Vue 单文件组件代码。
3. **复制使用**：在弹窗中点击"一键复制"，把代码粘贴到 `web/src/view/` 下的业务页面中即可使用。

## 生成的代码说明

生成的是一个可直接运行的 `<template>` + `<script setup>` 闭环组件：

- **template**：`el-form` + 若干 `el-form-item`，表单项通过 `v-model="formData.字段名"` 双向绑定；设计器中的栅格布局会转换为 `el-row` / `el-col`；表单级的 `label-width`、`size`、`label-position`、`hide-required-asterisk` 配置会保留。
- **formData**：按各字段初始值生成 `reactive` 对象（checkbox 类型默认初始化为 `[]`）。
- **rules**：勾选了必填的字段生成 `{ required: true, message: 'xxx不能为空', trigger: 'blur' }` 规则；自定义校验规则（`validate`）原样输出。
- **submitForm / resetForm**：提交时先走 `el-form` 的 `validate` 校验，通过后在控制台打印表单数据；重置调用 `resetFields()`。

## 组件映射表

设计器组件与 Element Plus 标签的对应关系（取自 `formCreate/index.vue` 的 `typeMap`）：

| 设计器组件 | 生成标签 |
| :--------- | :------- |
| input | `el-input` |
| inputNumber | `el-input-number` |
| select | `el-select`（options 生成 `el-option`） |
| radio | `el-radio-group`（options 生成 `el-radio`） |
| checkbox | `el-checkbox-group`（options 生成 `el-checkbox`） |
| switch | `el-switch` |
| timePicker | `el-time-picker` |
| datePicker | `el-date-picker` |
| slider | `el-slider` |
| rate | `el-rate` |
| colorPicker | `el-color-picker` |
| cascader | `el-cascader` |
| upload | `el-upload` |
| row / col（布局） | `el-row` / `el-col` |

未出现在映射表中的组件按 `el-{type}` 规则兜底转换。

## 注意事项

- 设计器初始化配置为 `{ fieldReadonly: false, useTemplate: true }`，即字段可编辑、启用模板解析模式。
- 生成的代码是基础模板，提交逻辑（`submitForm` 中目前只打印数据）需要按业务补充接口调用。
- 生成代码使用 Element Plus 组件，与项目前端栈一致，无需额外引入依赖。
