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
- (done) stop restore if same email detected
- (done) destory action

in-progress:
- edit action: next step ==> manage password for update

## 2020/10/27
- bad parameter reset;
- password for edit;
- normal update;

## 2020/10/28
to do:
- 更新role时对admin对update的影响 (done)
- 更新role的access的情况时check linked admin的影响 (没关系)

## 2020/10/29
to do:
- 处理reserved superadmin edition display

## 2020/11/2
to test
- pseudo min length (done)
- review addCustomer responsiveness design (done)
to do:
- add customer 添加submit功能，保存图片等
- *common component*: `sideNavTab`'
- isActive
- password

## 2020/11/7
todo:
- test again save
- manage thumbnail: default value according to gender, upload (user folder);
- sideNavbar: init on mont | switch tab
- address;

## 2020/11/8
- save thumbnail (done)
- sideNavbar: init on mont | switch tab
- address;

- to do:
  -> manage: (done)
     1. default thumbnail; 
       form: define thumbnail value: file or string, 然后在saga判断
     2. update case so thumbnail is not to be managed

## 2020/11/11
- todo:
  onselect menu item; --> done
  address ui;
  lazy loading on toggle menu item;
  update customer logic
  cache design

  - ajouter une address，push history转化成`edit mode`以后，*customer validation* & *customer population*

## 2020/11/19
 - todo:
   migrate render logic of customer to route mode => easier to maintain;
   breadcrumb of add address;

## 2020/11/21
todo:  => dataSource: { text, value }
  (done)- complete `http://localhost:3000/api/v1/customer/getGeoAutos` fn: { type: 'region', searchStr : '> 2'}:
   search region, contains *searchStr* in title;
  (k.o.)- loading status while *fetching*;
  (done)- the same for `city`;
  (done)- `onSelectCountry`;

  - (done) `onselect` or `onchange`: set input value + set form value + set postal code value
  - exception page --> redirect to login page;

  - (done) 加 instruction
  - save basic method: department 和city可能是`id` 也可能是*customer-filled* `text`;
    - (done) cancel option
    - (done) save: consider `default` field & consider city - department save;
    - (no need) define default;
    - (done) decorate params ??? -> validation: 
    - (done) auto-set region while set city;
    - (done) valition & control: if addressId is not present then customerId *always* but present and send to backend;
  - address card design

  - (done) customerid is not valid:
    --> not integer;
    --> isNaN
  
## 26/11/2020
- new cache key;
- edit address 
  1 data compute
  2 url composition
- delete address, set as default 