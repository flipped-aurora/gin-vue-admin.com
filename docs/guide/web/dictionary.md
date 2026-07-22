# 字典功能

> 字典是在后端数据库中存储的kv对，通过字典的value找到对应的文本展示内容
> 字典管理中进行录入

<a class="gva-video-ref" href="https://www.bilibili.com/video/BV1kv4y1g7nT?p=12&amp;vd_source=f2640257c21e3b547a790461ed94875e" target="_blank" rel="noopener"><span class="gva-video-ref__play"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span><span class="gva-video-ref__label">具体录入视频参考</span><span class="gva-video-ref__ext"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg></span></a>

## 字典方法

```js

import { getDict } from '@/utils/dictionary'
// getDict 方法 可以根据在字典录入的字典的type找到对应的字典内容数组 从而在前端可以实现系列使用字典的操作
// 例如：

const sexDict = await getDict("sex")
// res即返回的字典数组 
// [{value:0,label:"男"},{value:1,label:"女"}]

import { showDictLabel } from '@/utils/dictionary'
// showDictLabel 方法 可以根据在字典录入的字典和传入的value值匹配出对应的字典label
// 例如：

const label = showDictLabel(sexDict,0)
// label即返回的内容
// 男

// 或者在html部分直接使用 {{showDictLabel(sexDict,0)}} 获得文字 男

```

## 树形字典（v3.0）

v3.0 字典支持树形结构，`getDict` 增加了可选的第二个参数：

```js
// getDict(type, { depth, value })
// depth：指定获取深度，默认 0 表示返回完整树形结构（带 children）；大于 0 时按深度扁平化返回
// value：指定节点的 value，返回该节点的 children，默认 null

// 获取完整的字典树形结构
const dictTree = await getDict('user_status')

// 获取指定深度的扁平化字典数据
const dictFlat = await getDict('user_status', { depth: 2 })

// 获取指定节点的 children
const children = await getDict('user_status', { value: 'active' })
```

`showDictLabel` 完整签名为 `showDictLabel(dict, code, keyCode = 'value', valueCode = 'label')`，后两个参数可在字段名不是 value/label 时自定义映射。

::: tip
字典数据带缓存：pinia 的 dictionary store 优先调用树形接口 `getDictionaryTreeListByType` 获取数据，失败时自动回退到平铺接口 `findSysDictionary`，并按 type/depth/value 生成缓存 key 复用结果。
:::

字典详情相关接口还包括 `getDictionaryDetailsByParent`（按父节点获取字典详情）和 `getDictionaryPath`（获取节点路径），可在需要级联场景时直接使用。
