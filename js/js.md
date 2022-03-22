

1. 页面刷新
`document.addEventListener('DOMContentLoaded', run);`

2、 input自动填充账号密码
```
readonly 
onfocus="this.removeAttribute('readonly');" 
onblur="this.setAttribute('readonly',true);"
```