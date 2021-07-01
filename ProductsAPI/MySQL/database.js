const mysql = require('mysql');

const db = mysql.createConnection({
  user: 'root',
  host: '52.15.44.93',
  port: '3306',
  password: '',
  database: 'productsSDC'
});

module.exports = db;