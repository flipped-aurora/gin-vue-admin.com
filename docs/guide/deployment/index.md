# 项目上线

## 前端

在web目录下执行 npm run build 得到 dist文件夹 将dist文件夹上传到服务器 建议使用nginx进行代理 并且设置 proxy 把请求代理到后端

## 后端

### 交叉编译

在Windows 编译到 Linux 和Mac：
```
# 交叉编译到Linux
set GOOS=linux
set GOARCH=amd64
go build -o app-linux

# 交叉编译到Mac
set GOOS=darwin
set GOARCH=amd64
go build -o app-mac
```

在Linux下交叉编译到Windows和Mac：

```
# 交叉编译到Windows
GOOS=windows GOARCH=amd64 go build -o app-windows.exe

# 交叉编译到Mac
GOOS=darwin GOARCH=amd64 go build -o app-mac
```

在Mac下交叉编译到Windows和Linux：

```
# 交叉编译到Windows
GOOS=windows GOARCH=amd64 go build -o app-windows.exe

# 交叉编译到Linux
GOOS=linux GOARCH=amd64 go build -o app-linux
```



在 server下 go build . 得到一个可执行文件然后将可执行文件和config.yaml 以及 resource 文件夹上传至服务器 三者最好放在同一路径下 最终服务器目录结构可能如下 

```

    ├── breakpointDir  // 后续断点续传自动生成
    ├── chunk   // 后续断点续传自动生成
    ├── fileDir   // 后续断点续传自动生成
    ├── finish   // 后续断点续传自动生成
    ├── resource
    │   └── 子目录文件					
    ├── dist
    │   └── 子目录文件
    ├── gin-vue-admin
    ├── config.yaml
    
```

## [Tips.] Nginx的配置（以下内容节取自授权文档）

安装Nginx

```
yum install -y nginx
#安装所有模块
yum -y install nginx-all-modules.noarch

# 启动nginx
systemctl start nginx && systemctl enable nginx 

```

打开编辑配置文件
```
vim /etc/nginx/nginx.conf
```


参考配置代码如下

```nginx
events {
  worker_connections  1024;  ## Default: 1024
} 

http {
     include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

server {
    listen 80;
    index index.php index.html index.htm default.php default.htm default.html;
    server_name home.mychat.cloud;
    root 你的dist所在位置;
    
    location  /api {
        rewrite ^/api/(.*)$ /$1 break;
        proxy_pass http://127.0.0.1:8888; # 设置代理服务器的协议和地址  端口要和后端部署保持一致
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
}
```

重启生效
```
sudo systemctl restart nginx
```

后端地址未作修改时默认为```http://127.0.0.1:8888```
