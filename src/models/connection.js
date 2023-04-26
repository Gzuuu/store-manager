const mysql = require('mysql2/promisse');

const connection = mysql.createPool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_HOST,
});

module.exports = connection;