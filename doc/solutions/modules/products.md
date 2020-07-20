## creation/update

-   product is saved in sub-tables

    1. a_productMeta: id, name, short_dscp, detail_dscp, comment, thumbnail
    2. l_product_cat (linked to `category`):
    3. l_product_galleries (linked to `a_galleries`):
    4. l_product_specs (linked to `a_specs`):

-   save logic:

    -   creation:
        1. init transaction, 
        2. save images and return thumbnail url, 
        3. then save meta, 
        4. then save galleries, 
        5. save categories, 
        6. and save specs,
        7. commit when everything is done;

## delete


## read
- ref: [test2.js](../../../_test_/redis/redis.bestpractice.js)
-   cache logic:
    1. _two cache entry_:
        <!-- - `product_sort_option`: _set_: sort options (expire in *24 hours*) -->
        - `product_keys`: _sortedSet_, 格式为`product:filter:na:sell:na:stock:na...` score is average of all sorts, (no expire until manually clean)
        - `product_bref`: hash: only contains: a_productMeta fields (expire in *4 hours*)
        - `product_detail`: hash: contains all fields (expire in *4 hours*)
    2. logic:
       1. 前端返回的参数有`sort options`, `limit`, `filter options: {isDeleted = 0}`
       2. 拼接成`product_keys`查找, 如果一致，进入第3步，如果不一致, get all product keys with options from db and set in `product_keys`, 进入第3步
       3. get *product_keys* fragment, and get from `product_bref`, if not exist, get from db and update `product_bref`;
       4. 点击`product_details`时hit cache，then call db if needed;

   3. 前端策略: store `available_page`, if find, then return, if not, call backend; if sort or filter change, then expire `available_page` and call backend;