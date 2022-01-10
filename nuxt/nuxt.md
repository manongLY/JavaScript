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