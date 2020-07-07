## terminate a connection

```javascript
// solution 1
connection.end(function(err) {
  // The connection is terminated now
});

// solution 2
/**
 *  This will cause an immediate termination of the underlying socket.
 * /
connection.destroy(); // 没有callback
```

## 连接池方法(pooling)

```javascript
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'example.org',
    user: 'bob',
    password: 'secret',
    database: 'my_db',
});

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
```

-   pool.query 是以下的语法糖
    `pool.getConnection()` ->`connection.query()` `pool.release()`
-   如果想 terminate connection。 -> destroy()

-   pool 的`option`和正常的一样，除此之外还多几个如下：
    `acquireTiemout`, `queueLimit` (limit of nb queued), `connectionLimit`

-   pool events:

    1. acquire

    ```javascript
    pool.on('acquire', function (connection) {
        console.log('Connection %d acquired', connection.threadId);
    });
    ```

    2. connection
    3. enqueue
    4. release

-   关闭所有 pool 的 connextion: This is typically done if the pool is used in a script or when trying to gracefully shutdown a server.
    ```javascript
    pool.end(function (err) {
        // all connections in the pool have ended
    });
    ```

## poolCluster

```javascript
// create
var poolCluster = mysql.createPoolCluster();

// add configurations (the config is a pool config object)
poolCluster.add(config); // add configuration with automatic name
poolCluster.add('MASTER', masterConfig); // add a named configuration
poolCluster.add('SLAVE1', slave1Config);
poolCluster.add('SLAVE2', slave2Config);

// remove configurations
poolCluster.remove('SLAVE2'); // By nodeId
poolCluster.remove('SLAVE*'); // By target group : SLAVE1-2

// Target Group : ALL(anonymous, MASTER, SLAVE1-2), Selector : round-robin(default)
poolCluster.getConnection(function (err, connection) {});

// Target Group : MASTER, Selector : round-robin
poolCluster.getConnection('MASTER', function (err, connection) {});

// Target Group : SLAVE1-2, Selector : order
// If can't connect to SLAVE1, return SLAVE2. (remove SLAVE1 in the cluster)
poolCluster.on('remove', function (nodeId) {
    console.log('REMOVED NODE : ' + nodeId); // nodeId = SLAVE1
});

// A pattern can be passed with *  as wildcard
poolCluster.getConnection('SLAVE*', 'ORDER', function (err, connection) {});

// The pattern can also be a regular expression
poolCluster.getConnection(/^SLAVE[12]$/, function (err, connection) {});

// of namespace : of(pattern, selector)
poolCluster.of('*').getConnection(function (err, connection) {});

var pool = poolCluster.of('SLAVE*', 'RANDOM');
pool.getConnection(function (err, connection) {});
pool.getConnection(function (err, connection) {});
pool.query(function (error, results, fields) {});

// close all connections
poolCluster.end(function (err) {
    // all connections in the pool cluster have ended
});
```

## Switching users and altering connection state

```javascript
connection.changeUser({ user: 'john' }, function (err) {
    if (err) throw err;
});
```

-   The available options for this feature are:
    1. user: The name of the new user (defaults to the previous one).
    2. password: The password of the new user (defaults to the previous one).
    3. charset: The new charset (defaults to the previous one).
    4. database: The new database (defaults to the previous one).

## 断网的情况

You may lose the connection to a MySQL server due to network problems, the server timing you out, the server being restarted, or crashing. All of these events are considered fatal errors, and will have the `err.code = 'PROTOCOL_CONNECTION_LOST'`

## query

3 种方式:

```javascript
// 1 .query(sqlString, callback)
connection.query('SELECT * FROM `books` WHERE `author` = "David"', function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
});

//  2 .query(sqlString, values, callback)
connection.query('SELECT * FROM `books` WHERE `author` = ?', ['David'], function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
});

// 3 .query(options, callback)
connection.query(
    {
        sql: 'SELECT * FROM `books` WHERE `author` = ?',
        timeout: 40000, // 40s
        values: ['David'],
    },
    function (error, results, fields) {
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
    }
);
```

## escape

`mysql/connection/pool.escape(_user_provided_raw_data)`;s
如果用 placeholder 模式的话自动 escape

escape 规则如下

-   Numbers are left untouched
-   Booleans are converted to true / false
-   Date objects are converted to 'YYYY-mm-dd HH:ii:ss' strings
-   Buffers are converted to hex strings, e.g. X'0fa5'
-   Strings are safely escaped
-   Arrays are turned into list, e.g. ['a', 'b'] turns into 'a', 'b'
-   Nested arrays are turned into grouped lists (for bulk inserts), e.g. [['a', 'b'], ['c', 'd']] turns into ('a', 'b'), ('c', 'd')
-   Objects that have a `toSqlString` method will have `.toSqlString()` called and the returned value is used as the raw SQL.

```javascript
var CURRENT_TIMESTAMP = {
    toSqlString: function () {
        return 'CURRENT_TIMESTAMP()';
    },
};
var sql = mysql.format('UPDATE posts SET modified = ? WHERE id = ?', [CURRENT_TIMESTAMP, 42]);
console.log(sql); // UPDATE posts SET modified = CURRENT_TIMESTAMP() WHERE id = 42
```

-   Objects are turned into key = 'val' pairs for each _enumerable_ property on the object. If the property's value is a function, it is skipped; if the property's value is an object, toString() is called on it and the returned value is used.
-   undefined / null are converted to NULL
-   NaN / Infinity are left as-is. MySQL does not support these, and trying to insert them as values will trigger MySQL errors until they implement support.

## mysql.raw(), mysql.format()

```javascript
// raw()
// To generate objects with a toSqlString method, the mysql.raw() method can be used. This creates an object that will be left un-touched when using in a ? placeholder, useful for using functions as dynamic values:
var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
var sql = mysql.format('UPDATE posts SET modified = ? WHERE id = ?', [CURRENT_TIMESTAMP, 42]);
console.log(sql); // UPDATE posts SET modified = CURRENT_TIMESTAMP() WHERE id = 42

//format()
var query = 'SELECT * FROM posts WHERE title=' + mysql.escape('Hello MySQL');
console.log(query); // SELECT * FROM posts WHERE title='Hello MySQL'
```

## escapeId

you can use `??` characters as placeholders for identifiers you would like to have escaped like this:

```javascript
var userId = 1;
var columns = ['username', 'email'];
var query = connection.query('SELECT ?? FROM ?? WHERE id = ?', [columns, 'users', userId], function (
    error,
    results,
    fields
) {
    if (error) throw error;
    // ...
});

console.log(query.sql); // SELECT `username`, `email` FROM `users` WHERE id = 1
```

## prepare query

```javascript
var sql = 'SELECT * FROM ?? WHERE ?? = ?';
var inserts = ['users', 'id', userId];
sql = mysql.format(sql, inserts);
```

## 自定义 format

```javascript
connection.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(
        /\:(\w+)/g,
        function (txt, key) {
            if (values.hasOwnProperty(key)) {
                return this.escape(values[key]); // 可以使用escape
            }
            return txt;
        }.bind(this)
    );
};

connection.query('UPDATE posts SET title = :title', { title: 'Hello MySQL' });
```

## auto-incre 的 row 的 return key 获取方法

```javascript
connection.query('INSERT INTO posts SET ?', { title: 'test' }, function (error, results, fields) {
    if (error) throw error;
    console.log(results.insertId);
});
```

-   `supportBigNumbers`: 如果超过 js number 限制，需要开启这个来把数字转化成 string。否则报错

## affectedRows

You can get the number of affected rows from an insert, update or delete statement.
`results.affectedRows`

## changed rows

You can get the number of changed rows from an update statement.
"changedRows" differs from "affectedRows" in that it does not count updated rows whose values were not changed.
`results.changedRows`

## connection thread id

```javascript
connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
});
```

## Streaming query rows

```javascript
var query = connection.query('SELECT * FROM posts');
query
    .on('error', function (err) {
        // Handle error, an 'end' event will be emitted after this as well
    })
    .on('fields', function (fields) {
        // the field packets for the rows to follow
    })
    .on('result', function (row) {
        // Pausing the connnection is useful if your processing involves I/O
        connection.pause();

        processRow(row, function () {
            connection.resume();
        });
    })
    .on('end', function () {
        // all rows have been received
    });
```
