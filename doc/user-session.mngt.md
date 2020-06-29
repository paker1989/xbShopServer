<!-- 
  用户登录状态管理设计
  (https://zhuanlan.zhihu.com/p/26330273)
 -->
 ## Cases
1. 登录/注销 
2. 访问用户状态
3. 访问需要用户登录前提的API

## API
A. login
B. logout
C. syncUserSession: 同步用户信息
D. syncUserInceptor: 访问用户登录前提的拦截器

## user management solutions
1. 用户初始化时: C (syncUserSession)
2. 登录/注销时: A/B
3. 访问需要用户登录前提的API时，通过`D`访问`C`, 如果*登录状态失效*时 => `emit sessionInvalid event`
4. `emit sessionInvalid event`: 统一处理。

## comments
对于那些希望刷新后仍保留的应用状态（如列表页码，业务过程的步骤序号），可以放到路由的 hash 里，在程序引导时再读取。