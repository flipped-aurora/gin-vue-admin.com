# 自动化package使用指南

## 创建package
点击左侧菜单栏的自动化Package进入页面，点击新增打开抽屉
![image-package](/generator/image-package.png)

抽屉中关键属性为包名，此处填写小写字母开头的驼峰式命名单词，这是你自动化代码的基础包，所有在创建自动化代码时候选择本package的代码，都会创建在由本功能自动创建出的文件夹下。此处展示以showGva为例，自动生成的文件目录。

![image-package](/generator/image-create.png)
创建完成后，会在web和server下创建对应的package文件夹，如下所示
web/src/api/showGva
web/src/view/showGva
server/api/v1/showGva 内含文件 `enter.go`
server/router/showGva 内含文件 `enter.go`
server/service/showGva 内含文件 `enter.go`
server/model/showGva 内含模型文件与 `request` 入参结构体文件夹

创建时会自动向 `server/api/v1/enter.go`、`server/router/enter.go`、`server/service/enter.go` 注入对应的分组注册代码，无需手动修改。

后续使用自动化代码创建的内容会自动填充进入这些文件夹下
