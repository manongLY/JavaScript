### 普通 js 文件使用 vue 插件
在处理 axios 响应拦截时,无法直接通过 this.$toast(msg) 进行文字提示
```
axios.interceptors.response.use(
    this.$toast(msg)
)
```
可以通过 vue 实例替换 this 使用
```
import Vue from 'vue'
let vm = new Vue()

axios.interceptors.response.use(
    vm.$toast(msg)
)
```