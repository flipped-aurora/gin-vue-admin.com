# 导出模板
<br/>
<img src="/web/export-excel.png"/>

提供了自动导出的功能，需要提前在此处定制模板，需要录入模板标题，模板对应的表格名称，模板的唯一标识，模板和excel表头的映射关系。

然后在你需要导出的页面`<script>`标签添加下方的组件

```javascript

import ExportExcel from '@/components/exportExcel/exportExcel.vue'

```

然后在`<template>`中使用即可

```html

<ExportExcel templateId="api" />

```

此标签会产生一个按钮，点击即可导出对应表，后续会更新导出条件，敬请期待。
