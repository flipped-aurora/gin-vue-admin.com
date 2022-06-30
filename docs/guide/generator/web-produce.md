# 生产使用表单生成器

- 1.需修改`web/src/view/systemTools/formCreate/indev.vue`

  ```
  <template>
    <div style="height:80vh">
      <iframe width="100%" height="100%" :src="`${basePath}:${basePort}/form-generator/#/`" frameborder="0" />
    </div>
  </template>
  ```

  修改为

  ```
  <template>
    <div style="height:80vh">
      <iframe width="100%" height="100%" :src="`${basePath}/form-generator/#/`" frameborder="0" />
    </div>
  </template>
  ```

  

- 2.添加修改nginx配置

  ```
      location  /form-generator {
          proxy_set_header Host $http_host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header X-Forwarded-Proto $scheme;
      	proxy_pass http://127.0.0.1:8888;
      }
  ```

  

- 3.同时`web/.env.production`配置为

  ```
  ENV = 'production'
  
  VITE_CLI_PORT = 8080
  VITE_SERVER_PORT = 8888
  VITE_BASE_API = /api
  #下方修改为你的线上域名
  VITE_BASE_PATH = https://你的线上域名
  ```

  

