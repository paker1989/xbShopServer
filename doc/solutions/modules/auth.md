1. 实现自动登录:
 在cookie里设置loginOpt, login, password, rememberme, expiretime. 
 如果找到了，比较expiretime。如果过期了，显示login form，rememberme = `true`; 登录后重新设置cookie;
 如果没找到，则rememberme = `false`.

 https://github.com/bukinoshita/react-cookies


## Q:
  password的传输和储存？
  - 密码直接传输就可以，关键之后要上`https`;

## Annexe:
react-router + hook 实现按登录状态展示页面和组件:
https://juejin.im/post/6844904145049255950

[译]React中的用户认证(登录态管理)
https://juejin.im/post/6844903854006337549

js原生cookie封装函数
https://www.jianshu.com/p/bd3a64f454a0

# 思路
- App.js, 
  1. 先 useAuthenticated(), 如果已经登录了，则跳转dashboard， 否则跳转login;

- login.js:
  useMount(), 从cookie里提取rememberme，如果没有，显示，有，try login;