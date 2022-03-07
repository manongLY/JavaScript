## 播放本地虚拟流
https://webrtc.github.io/samples/src/content/devices/input-output/
1. 通过`navigator.mediaDevices.enumerateDevices`请求一个可用的媒体输入和输出设备的列表
```
navigator.mediaDevices
  .enumerateDevices()
  .then((e) => {
    this.gotDevices(e);
  })
  .catch((e) => {
    this.handleError(e);
});
```

```
gotDevices(deviceInfos) {
    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        const option = document.createElement("option");
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === "audioinput") {
            option.text =
            deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
            this.audioInputs.push(option);
        } else if (deviceInfo.kind === "audiooutput") {
            option.text =
            deviceInfo.label || `speaker ${audioOutputSelect.length + 1}`;
            this.audioOutputs.push(option);
        } else if (deviceInfo.kind === "videoinput") {
            option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
            this.videoSources.push(option);
        } else {
            console.log("Some other kind of source/device: ", deviceInfo);
        }
    }
},
```

2. 页面通过`select`下拉列表展示设备信息，选中某个设备时进行 `navigator.mediaDevices.getUserMedia`进行播放

```
const constraints = {
    audio: {deviceId: this.audioSource ? {exact: this.audioSource} : undefined},
    video: {deviceId: this.videoSource ? {exact: this.videoSource} : undefined}
};
navigator.mediaDevices.getUserMedia(constraints).then(mediaStream=>{
    console.log('第一个then：',mediaStream);
    let video = document.getElementById("myvideo");
    video.srcObject = mediaStream;
    video.onloadedmetadata = function (mediaStream) {
        video.play();
    };
}).then(e=>{
    console.log('第二个then：',e);
}).catch((e) => {
    this.handleError(e);
});
```

业务内容是主播使用客户端应用进行直播，网页端使用客户端提供的虚拟流同步视频播放。
###### 问题
1. `NotReadableError Could not start audio source`
打开客户端直播助手，占用着摄像头时，使用 `navigator.mediaDevices.getUserMedia`，就会这个报错。
应该使用上面的流程使用虚拟流进行视频播放，不可以直接使用摄像头。
2. `DOMException: Could not start video source`
项目中播放本地虚拟流失败，具体原因不详。
通过设置 `audio: false` 解决了。
3. 与本机开播助手设置的分辨率不一致
可以在 `navigator.mediaDevices.getUserMedia` 传入想要的分辨率
```
const constraints = {
    audio: false,
    video: {
        deviceId: vidoeSource ? {exact: vidoeSource} : undefined,
        // 设置分辨率
        width: {exact: 800}, 
        // 设置分辨率
        height: {exact: 600}
    }
};
navigator.mediaDevices.getUserMedia(constraints)
```

###### test-user-media.html 
用来测试本机是否能连接本地摄像头

##### 摄像头流显示比例不对
设置video css 
```
width: 100% !important;
object-fit: fill
```
然后通过js 修改 video 高度
```
let player = document.getElementById("video");
player.style.cssText = 'height:'+player.offsetWidth * 0.75+'px !important';
```

# 补充 rtmp、rtsp、flv 协议

## 使用 flv.js 播放 rtmp （不使用 Flash）
播放 rtmp 视频流的两种方式。
1. 直接播放rtmp流需要使用Flash。使用 vue-video-player,还需要安装Flash，很麻烦。
2. 使用`flvjs`播放`flv协议`的流地址,需要将 rtmp 转成 flv。

现在先完成使用`flvjs`播放`flv`协议的视频流。转换的视频暂且不聊。
**在 Nuxt 中使用**

1. 安装
```
npm install --save flv.js
```
2. 定义插件，创建全局对象
/plugins/flv.js
```

import flvjs from 'flv.js'
import Vue from 'vue';
Vue.prototype.$Flv = flvjs

在 nuxt.config.js 的 plugins 模块 添加该文件
```
3. 在`.vue`文件中使用
```
<video id="flvVideo" autoplay width="1000" height="1000"></video>


if (this.$Flv.isSupported()) {
    var flvPlayer = new this.$Flv.FlvPlayer({
        type: "flv",
        isLive : true,
        hasAudio : true,
        hasVideo : true,
        url: "https://pili-live-hdl.iusns.com/iusns-live/"+this.id+".flv",
    });
    flvPlayer.attachMediaElement(flvVideo);
    flvPlayer.load();
}else{
    console.error('不支持flv.js');
}
```