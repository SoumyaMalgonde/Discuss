// connecting database

require("dotenv").config();

// get the client
const mysql = require('mysql2');

//  create the connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});

module.exports = pool;