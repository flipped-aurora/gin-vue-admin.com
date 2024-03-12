# 导出模板
<br/>
<img src="/web/export-excel.png"/>

提供了自动导出的功能，需要提前在此处定制模板，需要录入模板标题，模板对应的表格名称，模板的唯一标识，模板和excel表头的映射关系。

然后在你需要导出的页面`<script>`标签添加下方的组件

```javascript
// 导出组件
import ExportExcel from '@/components/exportExcel/exportExcel.vue'
// 导入组件
import ImportExcel from '@/components/exportExcel/importExcel.vue'
// 导出模板组件
import ExportTemplate from '@/components/exportExcel/exportTemplate.vue'

```

然后在`<template>`中使用即可

```html

<!-- 导出组件-->
<ExportExcel templateId="api" :condition="你的查询条件对象" :limit="10" :offset="10" order="id desc"/>
/*
    condition: {  // 可以传入查询条件 根据模板中配置的查询条件映射关系进行有条件导出
        type: Object,
        default: () => ({})
    },
    limit: {   // 可以限制条目 根据模板中可以配置默认的条目限制 此处入参的优先级高于模板中的配置
        type: Number,
        default: 0
    },
    offset: {  // 可以限制偏移量 根据模板中可以配置默认的偏移量 此处入参的优先级高于模板中的配置
        type: Number,
        default: 0
    },
    order: {  // 可以限制排序 根据模板中可以配置默认的排序 此处入参的优先级高于模板中的配置 
        type: String,
        default: ''
    }
*/
<!-- 导入组件 handleSuccess为导入成功后的回调函数-->
<ImportExcel templateId="api" @on-success="handleSuccess"/>

<!-- 导出模板-->
<ExportTemplate templateId="api" />

```

此标签会产生一个按钮，点击即可导出对应表，后续会更新导出条件，敬请期待。
