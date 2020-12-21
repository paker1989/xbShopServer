## fields & modules

order id
order reference （check best pratice）
createAt,
updateAt,
payAt,
<!-- number of products -->
customer_note,
seller_note,
status: (`to define`)

*customer*
*l_order_product*: 


*shipping address*
*invoicing address*

*物流信息*

## feature
- print order

## 数据库设计
a_order:
  id, ref, registration_date, note, status_id, ship_addrid, invoicing_addrid

a_order_product:
  id orderId, sku, number, overwritten_price, origin_price

a_shipping:
  id, orderid,

a_voucher  (optional)
  id, orderid, type, subtype (percentage, amount),

a_payment (optional)


## 页面
`customer detail`:
  - 订单页面
    `objectif`: 显示客户的订单详情，其中有`dashboard`板块 (*total_orders*, *dealed_orders*, *total_paid*), 有`订单列表` （*bref_order_list*, 点击跳转到*order_detail*）
    
`order list`:
  - `详细订单列表` （*detail_order_list*）

`order_detail`:
  1. `dashboard`: 包含信息有: status, number_of_product, order_reference, order_date, paied_date (optional),
                  打印订单(optional)
  2. `order_detail`:
    2.1. `customer_info`: customer meta data,  address (可`选择`或`编辑`)
    2.2. `ordered_product`: sku, thumbnail, type, price, nb_of_ordered, amount, *操作: 删除，编辑*
                            - 合计 
                            - 运费:
                            - 优惠:
                            - 总计(含运费)
    2.3. `seller_note`
  3. `ship_detail`: (optional)