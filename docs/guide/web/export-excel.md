# 导出模板
<br/>
<img src="/web/export-excel.png"/>

## 名词解释

- 业务库：注：需要提前到db-list自行配置多数据库，如未配置需配置后重启服务方可使用。若无法选择，请到config.yaml中设置disabled:false，选择导入导出的目标库。
- 模板名称: 模板的中文标记，主要用来用户助记。
- 表名称: 需要导出数据的表，输入表名即可。
- 模板标识: 模板的唯一标识，用来区分不同的模板。在使用导出组件时候作为 `templateId` 参数传入。
- 关联条件: 此处可以添加多个关联，需要选择和写入的参数为，join方式[inner, left, right]，关联表，关联条件。
- 模板信息: 此处接收一个json string，用来配置导出的表头，格式如下：

```json
    {
        "表的列": "导出的中文名称列",
    }
```

示例(xxx.xxx标识带json模式)

```json
    {
        "id": "ID",
        "name": "名称",
        "age": "年龄",
        "info.id": "用户信息组ID"
    }
```
- 默认导出条数: 默认导出的条数，如果不填写则默认为全量导出，实际使用中以ExportExcel的入参limit为准。
- 默认排序条件: 默认的排序条件，如果不填写则默认为无排序，实际使用中以ExportExcel的入参order为准。
- 导出条件：此处可以添加多条，每条需要填入的信息为 `json中输入的key`, `对应表的column`, `条件`。


## 组件使用

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

<!-- 导入组件 handleSuccess为导入成功后的回调函数-->
<ImportExcel templateId="api" @on-success="handleSuccess"/>

<!-- 导出模板-->
<ExportTemplate templateId="api" />

```

### 入参解释
```javascript
    condition: {  // 可以传入查询条件 根据模板中配置的查询条件映射关系进行有条件导出
        type: Object,
        default: () => ({})
    }
    limit: {   // 可以限制条目 根据模板中可以配置默认的条目限制 此处入参的优先级高于模板中的配置
        type: Number,
        default: 0
    }
    offset: {  // 可以限制偏移量 根据模板中可以配置默认的偏移量 此处入参的优先级高于模板中的配置
        type: Number,
        default: 0
    }
    order: {  // 可以限制排序 根据模板中可以配置默认的排序 此处入参的优先级高于模板中的配置 
        type: String,
        default: ''
    }
    onSuccess: { // 导入成功后的回调函数
        type: Function,
        default: () => {}
    }
```


此标签会产生一个按钮，点击即可导出对应表，后续会更新导出条件，敬请期待。
