# viper

## 优先级说明

`server/core/viper.go` 按以下优先级确定配置文件路径：

1. 使用 `./server -c xxx/config.yaml` 命令行参数传递的值，优先级最高

2. [ConfigEnv](https://github.com/flipped-aurora/gin-vue-admin/blob/main/server/core/internal/constant.go#L4) 环境变量 `GVA_CONFIG`，是定义在server/core/internal/constant.go 的一个常量，可自行修改为自己想要的环境变量

3. 按照 Gin 框架自带的环境变量 `GIN_MODE` 匹配 `server/core/internal/constant.go` 文件中定义的配置文件：

   | GIN_MODE | 配置文件 |
   | -------- | -------- |
   | debug    | config.debug.yaml |
   | release  | config.release.yaml |
   | test     | config.test.yaml |

4. 若上述按模式匹配的配置文件不存在，则兜底使用 `config.yaml`

   :::warning 注意

   GIN_MODE 只能有三个值，debug、release、test， 其他值会panic的
   :::

## 热更新

`Viper()` 初始化时开启了 `WatchConfig`，配置文件变更后会自动重新 `Unmarshal` 到 `global.GVA_CONFIG`，无需重启服务即可生效（打印 `config file changed: xxx`）。

## root 路径适配

启动时会把 `AutoCode.Root` 自动适配为项目根目录的绝对路径，保证代码生成器在任何启动目录下都能定位到项目根路径，因此 config.yaml 中的 `autocode.root` 请不要手动配置。

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
