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