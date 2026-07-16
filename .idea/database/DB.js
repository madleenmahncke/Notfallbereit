const mysql = require('mysql2/promise');

/**
 * MySQL connection pool
 *
 * @type {Pool}
 */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'notfallbereit',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;