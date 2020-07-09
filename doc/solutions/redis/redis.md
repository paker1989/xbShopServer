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

-   Set: Redis 的 Set 是 _string_ 类型的*无序*集合(unique member)。集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 `O(1)`
    command: `sadd key item`, `smembers key`

-   zset (sorted set): Redis zset 和 set 一样也是 string 类型元素的集合,且不允许重复的成员。
    不同的是每个元素都会关联一个 double 类型的分数。redis 正是通过分数来为集合中的成员进行从小到大的排序。zset 的成员是唯一的,但分数(score)却可以重复。`zadd key score member`, `zrangebyscore key start stop`(这个 start stop 是对应分数的), `zrange key start stop` (这里 start stop 对应的是 index)

```
  zadd woman 0 xinxiu
  ZRANGEBYSCORE runoob 0 1000
```

## 语法

`redis-cli -h host -p port -a password`

```bash
  redis-cli --raw -h 127.0.0.1 -p 6379 -a "mypass" #  --raw是为了避免中文乱码
```

-   DUMP key, EXISTS key, keys pattern, persist key (移除 key 的过期时间，key 将持久保持), randomkey, rename key newkey, renamenx key newkey (仅当 newkey 不存在时，将 key 改名为 newkey 。)
-   type key: 返回 key 所储存的值的类型。

```bash
keys * # return all keys
keys *man # return woman, man, etc
```

-   Incr: Redis Incr 命令将 key 中储存的数字值增一

## String 命令

-   commands related to string:
    set,
    get,
    mget/mset key1, key2...
    getset: 将给定 key 的值设为 value ，并返回 key 的旧值(old value)
    setnx key value: 只有在 key 不存在时设置 key 的值。
    setex key seconds value: 将值 value 关联到 key ，并将 key 的过期时间设为 seconds (以秒为单位)
    INCR/DECR KEY:
    append key value: 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾。

## Hash 命令

-   HDEL key fileds...: 删除一个或多个哈希表字段
-   HEXISTS
-   HGET 获取 key 的 value (HMGET: 获得多个)
-   HGETALL key 获取 key 所有 key-value pair
-   HKEYS key: 获得所有 keys
-   HVALS key: 获得所有 values
-   HLEN key: 字段的数量
-   HSETNX key field value: 只有在字段 field 不存在时，设置哈希表字段的值。

## List 命令

-   正常的 LPUSH; 插入多个 RPUSH RPUSHX
-   头部插入，头部移除 BLPOP
    brpoplpush 从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它
    LINDEX 通过索引获取列表中的元素
-   移除元素 LREM key count value

## Set 命令

-   scard: 获取集合的成员数: size
-   sdiff: 返回两个 set 的*差*集: 差集的结果来自前面的 FIRST_KEY ,而不是后面的 OTHER_KEY1，也不是整个 FIRST_KEY OTHER_KEY1..OTHER_KEYN 的差集。
-   SINTER 交集
-   SUNION 并集

## Zset

-   ZCOUNT key min max 计算在有序集合中指定区间分数的成员数
-   zinterstore:
    Redis Zinterstore 命令计算给定的一个或多个有序集的交集，其中给定 key(zset) 的数量必须以 numkeys 参数指定，并将该交集(结果集)储存到 destination 。默认情况下，结果集中某个成员的分数值是所有给定集下该成员分数值之和。
-   Zrangebylex: 通过字典区间返回有序集合的成员。
-   按 index。score，lex 排名 start stop 返回区间

## hyperloglog

基数计算
基数指的是数据集中不重复数据的个数

-   PFADD PFCOUNT PFMERGE

## 订阅服务

subscribe/unsubscribe
publish
psubscribe pattern: 订阅一个或多个符合给定模式的频道。
pubsub: 命令用于查看订阅与发布系统状态，它由数个不同格式的子命令组成。
返回值: 由活跃频道组成的列表。

## 事务

Redis 事务可以一次执行多个命令， 并且带有以下三个重要的保证：

批量操作在发送 EXEC 命令前被放入队列缓存。
收到 EXEC 命令后进入事务执行，事务中任意命令执行失败，其余的命令依然被执行。
在事务执行过程，其他客户端提交的命令请求不会插入到事务执行命令序列中。
一个事务从开始到执行会经历以下三个阶段：

开始事务。
命令入队。
执行事务。

-   先以 `MULTI` 开始一个事务， 然后将多个命令入队到事务中， 最后由 `EXEC` 命令触发事务， 一并执行事务中的所有命令
-   事务可以理解为一个打包的批量执行脚本，但批量指令并非原子化的操作，中间某条指令的失败不会导致前面已做指令的回滚，也不会造成后续的指令不做。
-   命令:
    1. DISCARD: cancel transaction
    2. _WATCH/UNWATCH_: 监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。

## 脚本 Lua

## 连接相关的命令

-   AUTH password 验证密码是否正确
-   ECHO message 打印字符串
-   SELECT index 切换到指定的数据库
-   QUIT 关闭当前连接

## 服务器命令

-   INFO: 获取 redis 服务器的统计信息& config: executed file path; config file path, etc.
-   [好多别的](https://www.runoob.com/redis/redis-server.html)

## 数据库备份，恢复

-   SAVE
-   BGSAVE
    (https://www.runoob.com/redis/redis-backup.html)

## 安全

```bash
 config get requirepass # 返回""
 config set requirepass paker1989S # 设置密码

 auth paker1989S # 要求先验证才可以使用命令
```

## 客户端连接

-   最大连接数。默认 10000. 可配置

```
redis-server --maxclients 10000
```

## 管道技术

Redis 是一种基于客户端-服务端模型以及请求/响应协议的 TCP 服务。这意味着通常情况下一个请求会遵循以下步骤：

客户端向服务端发送一个查询请求，并监听 Socket 返回，通常是以*阻塞*模式，等待服务端响应。
服务端处理命令，并将结果返回给客户端。

-   `管道技术`: Redis 管道技术可以在服务端未响应时，客户端可以继续向服务端发送请求，并最终*一次性*读取所有服务端的响应。

## Redis 数据过期策略
<!-- https://developer.ibm.com/zh/articles/os-cn-nodejs-redis/ (写的非常好) -->
在实际的生产应用中，服务器的内存都是有限的，而数据缓存的需求空间则可能是无限的。因此高速缓存都会有一定的机制将频繁访问的数据内容优先保存在缓存中，而将长时间不访问的数据从缓存中删除。Redis 提供了以下几种数据过期方式：
直接用 expire 命令设置键过期，这种方式要求开发者自己掌握键值对过期时刻，通常在有修改时使用。
LRU（近期最少使用）模式，当在启动 Redis 的配置中加入 maxmemory 选项时，Redis 就工作在 LRU 模式了。这种模式下，还有几种子类型可以配置：
- allkeys-lru：所有的键值对按照最近最少使用原则被删除。
- volatile-lru: 只有设置了 expire 的键值对会按最近最少原则删除。
- allkeys-random: 随机删除某一个键值对。
- volatile-random: 随机删除某一个设置了 expire 的键值对。

这些配置都是在 redis.conf 文件中配置的，也可以通过代码在创建 redis client 时设置。例如，我们设置 Redis 的最大内存池为 100MB，并且使用 LRU 模式中的 volatile-lru 子模式。
