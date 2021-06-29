const mysql = require('mysql');

const db = mysql.createConnection({
  user: 'root',
  host: '3306',
  password: 'a24jH-Li7',
  database: 'productsSDC'
});

module.exports = db;