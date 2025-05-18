# MCP Tools

自动化创建MCP工具模板

## 视频教程

[点击观看](https://www.bilibili.com/video/BV1cNJgzbEHT)

## 配置文件说明

```yaml
mcp:
    name: GVA_MCP  # MCP服务名称
    version: v1.0.0 # 版本号
    sse_path: /sse # SSE路径
    message_path: /message # 消息路径
    url_prefix: '' # URL前缀
```

## 自动填写页面参数示例

<img src="/mcp/image.png"/>

点击生成后后端会获得MCP模板

在模板的handle函数中书写业务逻辑即可实现一个简单的mcp工具

<img src="/mcp/image2.png"/>

## 调试工具展示

<img src="/mcp/image3.png"/>

<img src="/mcp/image4.png"/>

<img src="/mcp/image5.png"/>
