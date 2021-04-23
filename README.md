# otc-chat-next 找币改版-私聊模块

项目用于内嵌在原生开发的 iOS 和 Android App 内，用户和承兑商的聊天。

支持发送文字、语音、图片、视频。

## 项目配置

### Setup

```
npm install
```

```
npm run serve
```

```
npm run build
```

```
npm run lint
```

### 代码格式化

代码使用 [Prettier](https://prettier.io) 自动格式化，配置文件为根目录下的 `.prettierrc.js` 。**请务必在 commit 代码时保证格式统一**，如果想自动格式化代码，确保你的 IDE 安装了 Prettier 插件。

## 项目开发

### 颜色系统

由根目录的 `colors.config.js` 统一进行配置，Quasar 和 Tailwind 会读取，保证具有相同的颜色。

## 业务逻辑

### 消息
支持的消息类型包括文字、语音、图片、视频。

其中语音、图片、视频都是先上传至阿里云 OSS，获取 url，然后发送给对方。对方通过 url 下载后显示。

#### 语音

单条语音消息的时长有限制，为 10s。

#### 图片

上传的图片会先被压缩，最大尺寸为长边 1920px。

#### 视频

视频传输的大小限制为 100M。