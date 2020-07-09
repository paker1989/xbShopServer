<!--
https://github.com/NodeRedis/node-redis#clientoffline_queue_length
 -->

# commands

This library is a `1 to 1` mapping of the Redis commands.

```javascript
client.hmset('key', ['foo', 'bar'], function (err, res) {
    // ...
});
```

# Promisify

```javascript
const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

getAsync.then(console.log).catch(console.error);
```

-   If the key is missing, reply will be null.

## event emit

client will emit some events about the state of the connection to the Redis server.
`ready`, `end` `error` `reconnecting` `connect`

## redis.createClient()

如果同个机器上跑 redis server，那正常情况下不需要 config port or host

-   options:

        -   host port path(unix socket), url,
        -   string_number (default null), if true, Node Redis will return Redis number values as Strings instead of javascript Numbers. Useful if you need to handle big numbers (above Number.MAX_SAFE_INTEGER === 2^53).
        -   return_buffers (connection 层面)，detect_buffers (commands 层面。如果 key 是 buffer，就返回 buffer)

        ```javascript
        // This will return a JavaScript String
        client.get('foo_rand000000000000', function (err, reply) {
            console.log(reply.toString()); // Will print `OK`
        });

        // This will return a Buffer since original key is specified as a Buffer
        client.get(new Buffer('foo_rand000000000000'), function (err, reply) {
            console.log(reply.toString()); // Will print `<Buffer 4f 4b>`
        });
        ```

        - enable_offline_queue,
        - passsword, db
        - rename_commands, prefix, etc
        - retry_stragegy

        ```javascript
            const client = redis.createClient({
            retry_strategy: function(options) {
            if (options.error && options.error.code === "ECONNREFUSED") {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error("The server refused the connection");
            }
            if (options.total_retry_time > 1000 _ 60 _ 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error("Retry time exhausted");
            }
            if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
            }
            // reconnect after
            return Math.min(options.attempt \* 100, 3000);
            },
            });
        ```

## client.auth(password, [, callback]):

-   the AUTH command must be sent as the _first_ command after connecting.
-   To make this easier, client.auth() stashes password and will send it after each connection, including reconnections (不错。make sense)

## client.quit/end : 前者 run 完所有 running commands，后者直接 end

-   You should set flush to true, if you are not absolutely sure you do not care about any other commands. If you set flush to false all still running commands will silently fail.

## error handling

redisError (parent class) -> replyError, AbortError, ParserError 等

-   Error codes
    Node Redis returns a NR_CLOSED error code if the clients connection dropped. If a command unresolved command got rejected a UNCERTAIN_STATE code is returned. A CONNECTION_BROKEN error code is used in case Node Redis gives up to reconnect.

## Hash commands

The reply from an HGETALL command will be converted into a JavaScript Object.

```javascript
client.hmset('key', 'foo', 'bar', 'hello', 'world');

client.hgetall('hosts', function (err, value) {
    console.log(value.foo); // > "bar"
    console.log(value.hello); // > "world"
});
```

-   client.hmset(hash, key1, val1, ...keyN, valN, [callback])

## PubSub

```javascript
const redis = require('redis');

const subscriber = redis.createClient();
const publisher = redis.createClient();

let messageCount = 0;

subscriber.on('subscribe', function (channel, count) {
    publisher.publish('a channel', 'a message');
    publisher.publish('a channel', 'another message');
});

subscriber.on('message', function (channel, message) {
    messageCount += 1;

    console.log("Subscriber received message in channel '" + channel + "': " + message);

    if (messageCount === 2) {
        subscriber.unsubscribe();
        subscriber.quit();
        publisher.quit();
    }
});

subscriber.subscribe('a channel');
```

When a client issues a SUBSCRIBE or PSUBSCRIBE, that connection is put into a `subscriber` mode. At that point, the only valid commands are those that modify the subscription set, and quit (also ping on some redis versions). When the subscription set is empty, the connection is put back into regular mode.

-   subscriber events: message(channel, message), pmessage, message_buffer, etc.

## client.multi([commands])

MULTI commands are queued up until an EXEC is issued, and then all commands are run atomically by Redis. The interface returns an individual Multi object by calling client.multi(). If any command fails to queue, _all commands are rolled back and none is going to be executed_

```javascript
const redis = require('redis');
const client = redis.createClient();

let setSize = 20;

client.sadd('key', 'member1');
client.sadd('key', 'member2');

while (setSize > 0) {
    client.sadd('key', 'member' + setSize);
    setSize -= 1;
}

// chain commands
client
    .multi()
    .scard('key')
    .smembers('key')
    .keys('*')
    .dbsize()
    .exec(function (err, replies) {
        console.log('MULTI got ' + replies.length + ' replies');
        replies.forEach(function (reply, index) {
            console.log('REPLY  @ index ' + index + ': ' + reply.toString());
        });
    });
```

所有的 values 成为 replies 的成员。
If your code contains an syntax error an EXECABORT error is going to be thrown and all commands are going to be aborted. That error contains a .errors property that contains the concrete errors. _If all commands were queued successfully and an error is thrown by redis while processing the commands that error is going to be returned in the result array!_ No other command is going to be aborted though than the ones failing.
或者可以这么写

```javascript
const redis = require('redis');

const client = redis.createClient();

client
    .multi([
        ['mget', 'foo', 'bar', redis.print],
        ['incr', 'hello'],
    ])
    .exec(function (err, replies) {
        console.log(replies);
    });
```

## Multi.exec_atomic([callback]):

Identical to `Multi.exec` but with the difference that executing a single command will not use transactions.

## 乐观锁

```javascript
const redis = require('redis');

const client = redis.createClient();

client.watch('foo', function (watchError) {
    if (watchError) throw watchError;

    client.get('foo', function (getError, result) {
        if (getError) throw getError;

        // Process result
        // Heavy and time consuming operation here to generate "bar"

        client
            .multi()
            .set('foo', 'bar')
            .exec(function (execError, results) {
                /**
                 * If err is null, it means Redis successfully attempted
                 * the operation.
                 */
                if (execError) throw err;

                /**
                 * If results === null, it means that a concurrent client
                 * changed the key while we were processing it and thus
                 * the execution of the MULTI command was not performed.
                 *
                 * NOTICE: Failing an execution of MULTI is not considered
                 * an error. So you will have err === null and results === null
                 */
            });
    });
});
```

-   NOTICE: _Failing an execution of MULTI is not considered an error. So you will have err === null and results === null_

[watch example](../../../_test_/redis/watcher.test.js)

-   *watch*是浅观察，观察不到 hash 的 field 的变化

## client.batch

-   same as multi, but not invlove `transaction`

## useful apis

-   client.server_info
-   redis.print(): A handy callback function for displaying return values when testing.
-   redis.duplicate()
-   redis.add_command, send_command, etc 给 redis 的 prototype 加 methods
-   client.connected/command_queue_length/offline_queue_length
