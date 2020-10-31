## 用户列表 (a_user)
- meta data:
ID: 6位数, 头像, 昵称, 性别，注册时间，最近登录，手机，邮箱

- related table: mandatory指的是一个后台系统中一定必备的模块。optional的模块只针对电商。
  1. a_useraddress (mandatory):
    - 收件人，
      手机，
      详细地址 (所在地区，详细地址)
  2. a_order (mandatory): 订单
  3. a_tracking (optional): 所访问的商品页面
  4. a_shopcart (optional) (购物车)
    

## 订单列表 (a_order)
- meta data: 
  1. order_status: (待付款，待发货，待收货，已收货，已关闭，全部订单)
  2. order_id: db auto increment id
  3. order_ref:
  4. order_timestamp: 
  5. pay_timestamp: 付款时间
  6. expedition_timestamp: 发货时间
  7. delivery_fee
  8. computed_price: 
  9. final_price: 管理员修改价格。默认和总价一样
  10. comment

- related module:
  1. a_user: 买家信息
  2. a_delivery: 快递模板
  3. l_ordered_goods: 订单详情: goods list,
  4. l_order_address: 地址: 订单地址, 因为用户可以修改，所以不能直接用用户的地址。要独立成表

## 店铺设置

## Others
- change locale的时候如果是edit form的话需要提醒。