<!--
  前端商城模块设计以及细节
 -->

## 页面

- 首页
- 搜索页
- 分类
- {支付流程}
- 购物车
- 商品详情
- 个人页面

### 首页

- 组件: 搜索框，carousel，滚动通知(可选), 横向 categories, 首页精选(可从 categories 中配置显示的条目)
- 交互:
  1.  点击`搜索框`跳转到`搜索页`
  2.  点击`横向categories`跳转到对应`分类`

### 搜索页

- 组件: 搜索框，历史记录, 显示结果, sort(_todo_) (综合，价格，销量)
- 交互:

  0. onLoad:

  ```javascript
    remote.request(`${baseUrl}/api/loadSHistory`, {method: 'post', [session id]);
    <!-- 返回 历史记录 -->
  ```

  1. 点击`搜索框`输入。点击键盘上*搜索* call api:

  ```javascript
  remote.request(`${baseUrl}/api/search`, {
    method: "post",
    data: { searchStr, sort: [] },
  });
  ```

  2. `历史记录`:
     - 删除
     ```javascript
     remote.request(`${baseUrl}/api/deleteSHistory`, { method: "post" });
     ```
     - 点击`tag`搜索
     
  3. `商品详情`: 点击加载商品详情

  4. `加载更多`: 点击加载更多
     ```javascript
     remote.request(`${baseUrl}/api/search`, { method: "post", data: {
       searchStr, pageSize, currentPage++, sort: 0
     } });
     ```

- 组件详情：
  <!-- 显示结果：
  ```html
  <view class="category">{{categroy}}</view>
  <view class="result" wx:for="category.results"></view>
  ``` -->
