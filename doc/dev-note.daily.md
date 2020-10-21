<!-- 
 dev daily roadmap
 -->
## 2020/06/27
研究文档编辑: `koa2-swagger-ui`

## 2020/06/28

## 2020/06/29
plan:
1. configure `xbShopAdmin` project (done)

prerequisite: antd pro, mysql

## 2020/06/30
TODO:
1. 配置好eslint, prettierrc (todo)
2. 定好产品字段。 (done)
3. 对比google keep 缺失的配置 (todo)
4. 需要搞清楚： 图片上传的细节, 压缩。([image.compress.md](./solutions/image.compress.md))
   富文本内图片的存储.

## 2020/07/01
todo
1. todo: koa server基本设置

## 2020/07/16
制定下一步的计划: [TO_DO.md](./todo/TO_DO.md)

## 2020/09/09
- user log out, auto login;
- product edit module;

## 2020/09/16
todo:
- back fn (done)
- redux store; (done)
- validate password fn, (done)
- role population;
- default page population;
- save&back fn

## 2020/09/28
to test:
- backendstatus, msg cases: 1. 成功跳转 2. 失败 3. reset --> good
- update admin cache fn; --> to test
- authMiddleware test --> good
- get all admin fn, cached fn --> to test

## 2020/10/01
to test:
- delete role action & impact on front;

## 2020/10/03
to test:
- set active tab in store (done)
- get all user access fn, (done)
- update role (done) 

- updateAdmin 回顾一下。update完之后然后呢???
- todo: admin's email unique check,  edition. 

## 2020/10/07
to test:
- duplicate user role check;
- fake role id check;

## 2020/10/12
to test:
- test access touched update;

todo:
- native roles NOT allowed to edit even;
- access populations

## 2020/10/13
to test:
- check duplicate avoid deleted one (done)
- update admin deleted (done)
- typeof object (done)
- filter only deleted one (done);

todo
- stop restore if same email detected
- destory action
- edit action