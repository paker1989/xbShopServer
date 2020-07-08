## Annexe

redis native
ref: [node-redis](./node-redis.md)

## 启动 redis

-   windows

```bash
redis-server.exe redis.windows.conf # 启动redis
 redis-cli.exe -h 127.0.0.1 -p 6379 # 启动服务
```

## 配置文件

-   window: `redis.windows.conf`
-   other: `redis.conf`

-   `CONFIG` command

```bash
CONFIG GET loglevel
CONFIG GET * # get all
CONFIG SET CONFIG_SETTING_NAME NEW_CONFIG_VALUE # set config
```

[参数说明](https://www.runoob.com/redis/redis-conf.html):
e.g: demonize

## 数据类型

string, hash, list, set, zset

-   string - max 512 Mb

```bash
 SET people xu
 GET people # string
 DEL people # 下面设置people的hash，如果不del的话会报错
 HMSET people fn xu ln bin # {fn: xu, ln: bin}
 HMGET people fn # xu
```

-   hash: Redis hash 是一个键值(key=>value)对集合。Redis hash 是一个 string 类型的 field 和 value 的映射表，hash 特别适合用于存储对象。
`HMSET hash_name key value key value..`, `HMGET hash key`每个 hash 可以存储 232 -1 键值对（40 多亿）。

-   list:简单的字符串列表，按照插入顺序排序 `lpush key item`, `lrange start stop`(查看)

```bash
    127.0.0.1:6379> lpush people xubin xinxiu
    (integer) 2
    127.0.0.1:6379> LRANGE people
    (error) ERR wrong number of arguments for 'lrange' command
    127.0.0.1:6379> LRANGE people 0
    (error) ERR wrong number of arguments for 'lrange' command
    127.0.0.1:6379> LRANGE people 0 2
    1) "xinxiu"
    2) "xubin"
    127.0.0.1:6379> LRANGE people 0 1
    1) "xinxiu"
    2) "xubin"
    127.0.0.1:6379> LRANGE people 1 1
    1) "xubin"
    127.0.0.1:6379> LRANGE people 1 2
```

- Set: Redis 的 Set 是 *string* 类型的*无序*集合(unique member)。集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 `O(1)`
  command: `sadd key item`, `smembers key`

- zset (sorted set): Redis zset 和 set 一样也是string类型元素的集合,且不允许重复的成员。
不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。zset的成员是唯一的,但分数(score)却可以重复。`zadd key score member`, `zrangebyscore key start stop`(这个start stop是对应分数的), `zrange key start stop` (这里start stop对应的是index)
```
  zadd woman 0 xinxiu
  ZRANGEBYSCORE runoob 0 1000
```


## 语法
` redis-cli -h host -p port -a password`
```bash
  redis-cli --raw -h 127.0.0.1 -p 6379 -a "mypass" #  --raw是为了避免中文乱码
```
- DUMP key, EXISTS key, keys pattern, persist key (移除 key 的过期时间，key 将持久保持), randomkey, rename key newkey, renamenx key newkey (仅当 newkey 不存在时，将 key 改名为 newkey 。)
- type key: 返回 key 所储存的值的类型。
```bash
keys * # return all keys
keys *man # return woman, man, etc
```

## String命令
- commands related to string: 
  set, 
  get,
  mget/mset key1, key2...
  getset: 将给定 key 的值设为 value ，并返回 key 的旧值(old value)
  setnx key value: 只有在 key 不存在时设置 key 的值。
  setex key seconds value: 将值 value 关联到 key ，并将 key 的过期时间设为 seconds (以秒为单位)
  INCR/DECR KEY: 
  append key value: 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾。

## Hash命令
- HDEL key fileds...: 删除一个或多个哈希表字段
- HEXISTS
- HGET 获取key的value (HMGET: 获得多个)
- HGETALL key 获取key所有key-value pair
- HKEYS key: 获得所有keys
- HVALS key: 获得所有values
- HLEN key: 字段的数量
- HSETNX key field value: 只有在字段 field 不存在时，设置哈希表字段的值。