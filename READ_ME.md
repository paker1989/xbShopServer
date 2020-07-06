## 项目说明

该项目是商城的后台服务器源码，负责提供后端 API 与前端交互，连接数据库增删改查数据。

## 技术栈

-   web-server: koa2
-   db: mysql
-   test: (to select)
-   lint: eslint 配置
-   type-checking: typescript
-   log: log4j(s) or `koa-logger`
-   api doc: koa2-swagger-ui
-   cache: redis
-   utils: ahooks (react hooks)
-   mock-server: [json-server](./local-json-server/READ_ME.md)
-   i8n: react-intl  <!-- to do -->
-   rich-text editor: draft-editor

## (准备)采用的 koa 中间件

<!-- 参考 https://www.jianshu.com/p/c2b61e37988b -->

-   `koa-router`:
-   `koa-convert`: 对于比较老的使用 Generate 函数的 koa 中间件(< koa2)，官方提供了一个灵活的工具可以将他们转为基于 Promise 的中间件供 Koa2 使用，同样也可以将新的基于 Promise 的中间件转为旧式的 Generate 中间件。
-   `koa-compress`
-   `koa-helmet`: 网络安全得到越来越多的重视，helmet 通过增加如 Strict-Transport-Security, X-Frame-Options, X-Frame-Options 等 HTTP 头提高 Express 应用程序的安全性，koa-helmet 为 koa 程序提供了类似的功能.
-   `koa-session` or `koa-jwt`:
    (随着网站前后端分离方案的流行，越来越多的网站从 Session Base 转为使用 Token Base，JWT(Json Web Tokens)作为一个开放的标准被很多网站采用，koa-jwt 这个中间件使用 JWT 认证 HTTP 请求。)
-   `koa-bodyparser` (支持 x-www-form-urlencoded, application/json 等格式的请求体，但不支持 form-data 的请求体，需要借助 `formidable` 这个库) 或者 `koa-body` (个人推荐这个，既可以解析 post 还能上传文件)
