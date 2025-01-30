const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });  
  
const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    password: '',
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to the MySQL database');
    connection.release();
});

module.exports = pool; 