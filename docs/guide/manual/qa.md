# 常见问题

## 启动失败

如果你没有安装 wget，可能第一次运行下载资源失败。

```bash
    apt-get update
    apt-get install wget
```

## 从旧版本升级

关掉运行的机器人进程或停止 docker 容器，替换 `OPQBot` 二进制文件即可，请注意替换后文件和文件夹的权限，请设定为 777 ，否则会出现部分功能不能使用的情况。

宝塔面板可视化设定或执行命令：

```bash
    chmod -R 777 /dir_name
```
