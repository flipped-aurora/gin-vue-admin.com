---
id: vscode
title: 使用VSCode开发
---

### VSCode工作区（版本>v2.5.2后加入）

#### 2.4.1 开发

使用`VSCode`打开根目录下的工作区文件`gin-vue-admin.code-workspace`，在边栏可以看到三个虚拟目录：`backend`、`frontend`、`root`。

#### 2.4.2 运行/调试

需要先安装 vscode 插件中的 go 插件。

在运行和调试中也可以看到三个task：`Backend`、`Frontend`、`Both (Backend & Frontend)`。运行`Both (Backend & Frontend)`可以同时启动前后端项目。

#### 2.4.3 settings

其它配置
以下为非必须， 当你的 go 不在系统环境变量中时， 不能找到，你可能需要配置如下内容。

在工作区配置文件中有`go.toolsEnvVars`字段，是用于`VSCode`自身的go工具环境变量。此外在多go版本的系统中，可以通过`gopath`、`go.goroot`指定运行版本。

```json
    "go.gopath": null,
    "go.goroot": null,
```
