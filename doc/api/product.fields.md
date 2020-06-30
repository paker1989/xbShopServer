## 上传产品的字段

| label             | description                        | type         | mandatory  | default | comment                   |
|-------------------|------------------------------------|--------------|------------|---------|---------------------------|
| id                | product id                         | int(8)       | auto-incre |         |                           |
| name              | product name                       | varchar(100) | yes        | NA      |                           |
| short_description | product description                | varchar(250) | no         | ""      |                           |
| full_description  | full rich text product description | blob         | no         | ""      | rich text                 |
| retail_price      | price range                        | varchar(100) | yes        | ""      |                           |
| goods_unit        | product unit                       | varchar(20)  | yes        | "件"    |                           |
| isOnSale          | is active                          | tinyint(2)   | yes        | yes     |                           |
| isDelete          | is deleted                         | tinyint(2)   |            | no      |                           |
| isSoldout         | is sold out                        | tinyint(2)   |            | no      |                           |
| isNew             | is a new product                   |              |            |         |                           |
| category          | product category                   |              |            |         | category table            |
| cost_price        | cost price                         |              |            |         |                           |
| show_origin_price | show discount mark if is on cost   |              |            |         |                           |
| stock_number      | number of stocks                   |              |            | 100     |                           |
| galleries         |                                    |              |            |         | gallery table             |
| thumbnails        |                                    |              |            |         |                           |
| updateDate        | last update date                   |              |            |         |                           |
| specifications    |                                    |              |            |         | links to goods meta table |