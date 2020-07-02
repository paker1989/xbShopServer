const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'my_db',
    supportBigNumbers: true,
    // Force date types (TIMESTAMP, DATETIME, DATE)
    // to be returned as strings rather than inflated
    // into JavaScript Date objects. Can be true/false
    //  or an array of type names to keep as strings. (Default: false)
    // dateStrings: true
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    // console.log('The solution is: ', results[0].solution);
});

connection.end();
