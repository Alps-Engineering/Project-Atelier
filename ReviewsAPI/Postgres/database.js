const { Pool, Client } = require('pg');

module.exports.pool = new Pool({
  user: 'tim',
  host: 'localhost',
  database: 'sdc',
  password: 'password',
  port: 5432,
});

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

module.exports.client = new Client({
  user: 'tim',
  host: 'localhost',
  database: 'sdc',
  password: 'password',
  port: 5432,
});

// client.connect();
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   client.end();
// });
