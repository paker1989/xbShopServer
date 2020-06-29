## 项目说明
该项目是商城的后台服务器源码，负责提供后端API与前端交互，连接数据库增删改查数据。

## 技术栈
- web-server: koa2
- db: mysql
- test: (to select)
- lint: eslint配置
- type-checking: typescript
- log: log4j(s) or `koa-logger`
- api doc: koa2-swagger-ui
- cache: redis

## (准备)采用的koa中间件 
<!-- 参考 https://www.jianshu.com/p/c2b61e37988b -->
- `koa-router`:
- `koa-convert`: 对于比较老的使用Generate函数的koa中间件(< koa2)，官方提供了一个灵活的工具可以将他们转为基于Promise的中间件供Koa2使用，同样也可以将新的基于Promise的中间件转为旧式的Generate中间件。
- `koa-compress`
- `koa-helmet`: 网络安全得到越来越多的重视，helmet 通过增加如Strict-Transport-Security, X-Frame-Options, X-Frame-Options等HTTP头提高Express应用程序的安全性，koa-helmet为koa程序提供了类似的功能.
- `koa-session` or `koa-jwt`:
   (随着网站前后端分离方案的流行，越来越多的网站从Session Base转为使用Token Base，JWT(Json Web Tokens)作为一个开放的标准被很多网站采用，koa-jwt这个中间件使用JWT认证HTTP请求。)
- `koa-bodyparser` (支持x-www-form-urlencoded, application/json等格式的请求体，但不支持form-data的请求体，需要借助 `formidable` 这个库) 或者 `koa-body` (个人推荐这个，既可以解析post还能上传文件)