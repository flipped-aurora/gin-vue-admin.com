# 127.0.0.1拒绝连接

![image-20201026171737491](/generator/image-20201026171737491.png)

- 出现这种情况,
  - 旧版本 请到 `web/src/view/systemTools/formCreate/index.vue` 找到 `127.0.0.1` 替换为本机或服务器ip
  - 新版本 请前往相对应的环境变量中修改 制定参数
  `path : VITE_BASE_PATH` `port :VITE_SERVER_PORT `

- server项目默认端口是 `8888` ,如果你修改,那也要把 `127.0.0.1:8888` 相应的端口修改 `ip:自定义端口`

