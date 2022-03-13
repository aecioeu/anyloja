const util = require('util')
const mysql = require('mysql2')

/*
const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'mysql669.umbler.com',
    port: '41890',
    user: 'produto.user',
    password: '#Zd*i6oo5U',
    database: 'produto.link',
    'multipleStatements': true,
    queueLimit: 0,
    waitForConnections: true
});
*/

const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'catalogo',
    'multipleStatements': true,
    queueLimit: 0,
    waitForConnections: true
});


pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})


pool.query = util.promisify(pool.query)

/*

process.on('SIGINT', () =>
    pool.end(err => {
        if (err) return console.log(err);
        console.log('pool => fechado');
        process.exit(0);
    })
);
*/
module.exports = pool;