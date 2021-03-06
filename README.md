# otc-chat-next 找币改版-聊天模块

项目用于找币用户间即时通讯。

运行环境： iOS 和 Android 的 `找币` App 内，以及网页端找币内。

项目作用：用于两个找币用户（一个普通用户和一个承兑商用户）之间基于一个订单聊天。

支持发送文字、语音、图片、视频。

## 项目构建

需知：项目启动后第一时间会发现提示 “初始化聊天失败” ，这是因为 url 栏没有携带参数。真实使用环境下（App 内嵌）都会携带三个参数：`token`, `id`, 以及 `orderid`。其中 `token` 为用户 OTC token，`id` 为找币用户 id，`orderid` 为订单 id。任何一个参数不正确都会导致聊天无法顺利进行，因此在调试和开发前请确保地址栏填写了正确的参数。

### 部署

首先确保本地安装了 `node.js`，然后在终端 `cd` 到本项目的根目录，输入以下命令：

```
npm install # 安装依赖
```

安装完成后，构建用于正式部署的生产包：

```
npm run build # 构建生产包，用于正式部署
```

构建完成后的包在 `/dist` 下，把所有文件放至服务器上的某个目录下，并且配置 Nginx。

例如将文件夹放至在服务器的 `/home/html` 下，则对应的 Nginx 配置为：

```nginx
server {
    listen  9099;
    root    /usr/share/nginx/html/otc-chat-next;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /receive {
        proxy_pass http://172.16.100.214:8080;
    }

    location /backend {
        proxy_pass http://172.16.100.214:8080;
    }

    location /sub {
        proxy_pass http://172.16.101.126:8888;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }

    location /oss {
        proxy_pass http://172.16.101.126:8888;
    }

    location /record {
        proxy_pass http://172.16.101.126:8888;
    }
}
```

### 开发

```
npm install # 安装依赖
```

```
npm run serve # 启动开发环境
```

```
npm run lint # 检查语法
```

```
npm run development # 构建生产包，用于测试
```

## 开发注意事项

### 代码格式化

代码使用 [Prettier](https://prettier.io) 自动格式化，配置文件为根目录下的 `.prettierrc.js` 。**请务必在 commit 代码时保证格式统一**，如果想自动格式化代码，确保你的 IDE 安装了 Prettier 插件。

### 颜色系统

由根目录的 `colors.config.js` 统一进行配置，Quasar 和 Tailwind 会读取，保证具有相同的颜色。

## 业务逻辑备忘

### 消息

支持的消息类型包括文字、语音、图片、视频。

其中语音、图片、视频都是先上传至阿里云 OSS，获取 url，然后发送给对方。对方通过 url 下载后显示。

#### 聊天记录

由于业务需要，从后端拉取的聊天记录是基于订单的，比如用户 A 和用户 B 产生了两个订单 c 和 d，那么在 c 订单下聊天时不会显示之前在 d 订单下聊天的记录。

#### 语音

单条语音消息的时长有限制，为 10s。

#### 图片

上传的图片会先被压缩，最大尺寸为长边 1920px。

已知限制：发送 gif 格式的动图会被压缩成静态的。

#### 视频

视频传输的大小限制为 100M。
