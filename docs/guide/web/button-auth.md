# 按钮权限

## 创建按钮

进入`菜单管理`界面，点击新增或编辑，点击下方的`新增可控按钮`填入按钮名称（英文且不重复）和描述后点击确定

![one](../static/btn/one.png)

进入`权限管理`，点击设置权限-->分配菜单，如果此菜单有可控按钮，则会显示`分配按钮权限`字样，点击进行分配

![two](../static/btn/two.png)

![three](../static/btn/three.png)

点击确定，完成分配。

## 代码操作

进入拥有可被控按钮菜单对应的前端页面，添加引入按钮控制组件,并在template中添加v-auth指令赋予需要被控制的按钮名称

```vue

<template>
  <div>
//   btnAuth为权限组件固定写法 .a  a为菜单管理中创建的按钮名称 配置过后即可实现对按钮的控制
    <div v-auth="btnAuth.a">按钮1</div>
    <div v-auth="btnAuth.b">按钮2</div>
    <div v-auth="btnAuth.c">按钮3</div>
  </div>
</template>

<script setup>
    import { useBtnAuth } from '@/utils/btnAuth'
    const btnAuth = useBtnAuth()
</script>

```