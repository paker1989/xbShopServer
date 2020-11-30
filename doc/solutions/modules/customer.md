## get customer
 `customer meta`:
   - pseudo, email, avatar, gender, active

  - `customer_ids`: _sortedSet_, 格式为`customer:filter:na:sell:na:stock:na...` score is average of all sorts, (no expire until manually clean);
  - 
  - `product_bref`: hash: only contains: a_productMeta fields (expire in *4 hours*)

## dev todo：
1. *server*: 
  `customer.controller`: 
     - getCustomers({ filter, sort, startP, limit, pageSize } = ctxBody);
      要点: *一起提取*;
  `customerHelper`: 
     - (done) getCustomerIdsKey
     - (done) setCustomerIds
     - (done) removeCustomerIds --> above 3： *limit* = infinite;
     
     - (done) getCustomerMetaKey
     - (done) setCustomerMeta
     - (done) getCustomerMeta --> above 3: *limit* = 4 hours;
  `customerDAO`:
     - (done) getCustomerIds(filter, sort);
     - getCustomerList({ filter = 'NA', sort = 'NA', psize, start});
     - getCustomerMeta({ ids }):

2. *client*:
   - getCustomersSaga: 



## address
