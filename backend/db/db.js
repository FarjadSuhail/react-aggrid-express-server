const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  waitForConnections: true,
  connectionLimit: 10,
});

console.log("ENV DB USER:", process.env.DB_USER);
console.log("ENV DB PASS:", process.env.DB_PASS);

module.exports = pool.promise();
