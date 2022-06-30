# viper

## 优先级说明

1. path 可变参数是为了给单元测试留下一个口子，方便使用相对路径或者绝对路径指定config文件所在的位置

2. 使用 `./server -c xxx/config.yaml` 使用命令行进行传递的值赋值给config变量

3. [ConfigEnv](https://github.com/flipped-aurora/gin-vue-admin/blob/main/server/core/internal/constant.go#L4) 是定义在server/core/internal/constant.go 的一个常量，可自行修改为自己想要的环境变量

4. 最后会按照 Gin 框架自带的环境变量 `GIN_MODE` 进行匹配 `server/core/internal/constant.go` 文件中的定义。

   :::danger 注意

   GIN_MODE 只能有三个值，debug、release、test， 其他值会panic的
   :::

## `GIN_MODE` 使用场景说明

1. 有三个分支，开发分支 develop，测试分支 test ，生产分支 release
2. 但是三个分支的链接的数据库，oss都是不同的，所以就会有三个配置文件，这个不可能用文档保存的
3. 所以一般使用git的.gitattributes文件，每个分支都有属于自己的分支的配置文件以及Dockerfile
4. 在Dockerfile文件里指定是以下的任意一行代码即可，这样就可以控制每种环境对应的配置文件

```
ENV GIN_MODE=debug
ENV GIN_MODE=release
ENV GIN_MODE=test
```





