const mysql = require('mysql');

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'productsSDC'
});

db.connect();

module.exports = db;