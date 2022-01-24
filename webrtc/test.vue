<template>
  <div class="test">
    <video
        id="myvideo"
        style="width: 900px; height: 100px; border: 1px solid red"
        ></video>
    <div>
      <el-select v-model="audioSource" @change="audioSelect" placeholder="请选择音频输入">
        <el-option
          v-for="item in audioInputs"
          :key="item.value"
          :label="item.text"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select @change="start" placeholder="请选择音频输出">
        <el-option
          v-for="item in audioOutputs"
          :key="item.value"
          :label="item.text"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="videoSource" @change="videoSelect" placeholder="请选择视频">
        <el-option
          v-for="item in videoSources"
          :key="item.value"
          :label="item.text"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="center">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
import { baseApi } from "~/api/base";

export default {
  layout: "main",
  props: {},
  data() {
    return {
      audioInputs: [],
      audioOutputs: [],
      videoSources: [],
      audioSource: '',
      videoSource: ''
    };
  },
  components: {},
  created() {
    // baseApi.hwdList().then(res => {
    //     if (res.code = 200) {
    //         console.log(res)
    //     }
    // })
  },
  mounted() {
    navigator.mediaDevices
      .enumerateDevices()
      .then((e) => {
        this.gotDevices(e);
      })
      .catch((e) => {
        this.handleError(e);
      });
  },
  methods: {
    audioSelect(e) {
        console.log('音频：',e);
        this.start()
    },
    videoSelect(e){
        console.log('视频：',e);
        this.start()
    },
    start(){
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
    },
    handleError(e) {
      console.log(e);
    },
    gotDevices(deviceInfos) {
      console.log("ddddddddddd:", deviceInfos);
      // Handles being called several times to update labels. Preserve values.
      // const values = selectors.map((select) => select.value);
      // selectors.forEach((select) => {
      //   while (select.firstChild) {
      //     select.removeChild(select.firstChild);
      //   }
      // });
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
    //   this.audioSource = this.audioInputs[0].value
        // this.videoSource = this.videoSources[0].value
      // selectors.forEach((select, selectorIndex) => {
      //   if (
      //     Array.prototype.slice
      //       .call(select.childNodes)
      //       .some((n) => n.value === values[selectorIndex])
      //   ) {
      //     select.value = values[selectorIndex];
      //   }
      // });
    },
  },
  watch: {},
  computed: {},
};
</script>
<style lang="scss" scoped>
.test {
  background: #888888;
  width: 100%;
  height: 100vh;
  .center {
    width: 400px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    .left {
      width: 50%;
      background: #3e3e46;
      height: 100%;
    }
    .right {
      width: 50%;
      height: 100%;
      background: #3e3e46;
    }
  }
}
</style>
