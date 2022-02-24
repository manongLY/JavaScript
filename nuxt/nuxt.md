## Nuxt

### 路由

##### 自动路由
在 pages 目录下添加例如 room.vue ,在浏览器可以直接通过 url/room 访问 room.vue 页面

#### nuxt-link
- 传参
```
<NuxtLink :to="'/notice/'+item.id" >动态传参</NuxtLink>
```
- 接参
```
this.$route.params.id
```

### axios

#### 配置，可以使用 store
```
plugins/axios.js

import Vue from 'vue'
let vm = new Vue()

const localStorage = require("store");

export default function ({ $axios, redirect, store }) {
    // request  拦截器
    $axios.onRequest(config => {
        // 配置 token
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            // redirect('/400')
        }
    })

    // response  拦截器
    $axios.onResponse(
        response => {
            let code = response.data.code;
            if (code === 401100 || code === 401101) {
                // store 操作
                // toast 插件
                vm.$toast.center(response.data.message)
            }
            return response.data;
        },
        error => {
            return Promise.reject(error);
        }
    )
}
```

#### 使用 axios
```
utils/axios.js

import Vue from 'vue'
let vm = new Vue()

export function get(url,params){
    return vm.$nuxt.$axios({
        url:url, 
        method: 'get',
        params
    })
}

export function post(url,data){
    return vm.$nuxt.$axios({
        url:url, 
        method: 'post',
        data: data
    })
}
```
```
api/user.js

import {post, get} from '~/utils/axios';

export const userApi = {
    // 首页列表
    sendPhoneSms: data => post('/xxx', data),
    .
    .
    .
}

```
```
*.vue 
userApi.sendPhoneSms(data).then(res => {
    if (res.code == '200') {
        
    } else {
        this.toast(res.message);
    }
})
```


#### 使用QRCode.js
场景需要，**同时** 需要两种引入方式

- 1、nuxt.config.js -- script 
```
script: [
    {
        src: "/qrcode.js",
    },
    .
    .
    .
]
```
qrcode.js 文件 在 static 目录下

这种情形已经可以满足普通的业务需求。
但是我们业务场景里需要在新开的标签页里也要使用。两个页面路由不同，新开的标签页路由比如是 /my 。那么页面加载 `qrcode.js`的路径就是 `ip+/my/qrcode.js` 这样根本加载不到。
所以还需要下面这种方式。
- 2、nuxt.config.js -- plugins
```
plugins: [
    {
        src: '~/plugins/qrcode.js',
        ssr: false
    },
    .
    .
    .
],
```
`plugins/qrcode.js`文件
```
(function () {
  let url = '/qrcode.js'
  let sm = document.createElement("script");
  let s = document.getElementsByTagName("script")[0];
  sm.src = url;
  s.parentNode.insertBefore(sm, s);
})();
```

### 使用 eventBus
```
this.$eventBus.$on('test',this.test())
```
这样写会**自动执行一遍**

需要写成下面这样
```
this.$eventBus.$on('test',() =>{
    this.test()
})
```