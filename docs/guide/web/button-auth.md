# 按钮权限

> 实现方式是采用 vue 原生的注册指令方式，
> 实现代码
```js
// 权限按钮展示指令
import { useUserStore } from '@/pinia/modules/user'
export default {
  install: (app) => {
    const userStore = useUserStore()
    app.directive('auth', {
      // 当被绑定的元素插入到 DOM 中时……
      mounted: function(el, binding) {
        const userInfo = userStore.userInfo
        let type = ''
        switch (Object.prototype.toString.call(binding.value)) {
          case '[object Array]':
            type = 'Array'
            break
          case '[object String]':
            type = 'String'
            break
          case '[object Number]':
            type = 'Number'
            break
          default:
            type = ''
            break
        }
        if (type === '') {
          el.parentNode.removeChild(el)
          return
        }
        const waitUse = binding.value.toString().split(',')
        let flag = waitUse.some(item => item === userInfo.authorityId)
        if (binding.modifiers.not) {
          flag = !flag
        }
        if (!flag) {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}
```

## 创建按钮

进入`菜单管理`界面，点击新增或编辑，点击下方的`新增可控按钮`填入按钮名称（英文且不重复）和描述后点击确定

![one](/btn/one.png)

进入`权限管理`，点击设置权限-->分配菜单，如果此菜单有可控按钮，则会显示`分配按钮权限`字样，点击进行分配

![two](/btn/two.png)

![three](/btn/three.png)

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
