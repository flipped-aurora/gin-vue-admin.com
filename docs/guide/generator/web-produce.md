# 生产使用表单生成器

v3.0 起，表单生成器是前端内置组件，**生产环境无需任何额外配置**。

## 部署说明

- 表单生成器页面（`web/src/plugin/auto/view/formCreate/index.vue`）随前端一起构建，执行 `npm run build` 后就是打包产物的一部分。
- 不需要独立部署 form-generator 服务，也不需要配置 nginx 代理。
- 设计完成的表单通过"解析为 Vue 原生标签"生成代码，复制到 `web/src/view/` 业务页面中使用，随业务代码正常构建发布。

::: warning 旧版说明
v2 时代通过 iframe 嵌入独立 form-generator 服务的方案（修改 `formCreate/index.vue` 的 iframe 地址、nginx 配置 `/form-generator` 代理、调整 `VITE_BASE_PATH`）已随 v3.0 移除，本文不再保留相关步骤。
:::

## 可选：生产环境隐藏入口

表单生成器属于开发辅助工具。如果不希望生产环境的普通用户看到该菜单，可以通过 **角色管理** 不为对应角色分配"表单生成器"菜单权限，或在 **菜单管理** 中调整该菜单的可见性。
