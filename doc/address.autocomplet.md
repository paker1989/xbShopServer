## 目标
尽量减少call server的次数的同时满足autocomplete
apply `debounce`
- type `country`: 
  1. country应该保存到store里; 第一次打的时候如果没有，call server， save to store;
  2. 选择一个country时候，set regions in store

- type `region`: 
  如果country没选，不提供autocomplte。
  如果已经选择country, `debounce`以后 search in store, 
  <!-- 如果只有唯一选择，自动补全region，且设置region id; -->
  
- type `city`:
  如果country没选，不提供autocomplte。
  如果已经选择country, `debounce` 以后 server call with `country_code` + `searchStr`;
   <!-- 如果只有唯一选择，自动补全`city`, `code postal` 和 `region`，且设置`city id` 和 `region id`; -->

<!-- todo -->
- 选择`country` from autocomplete list:
  1. call server to fetch `region` to store;
  2. set `country_id`

- 选择`city` from autocomplete list:
  1. set `city_id`, `post_code`, `region_id`

- 选择`region` from autocomplete list:
  1. set `region_id`