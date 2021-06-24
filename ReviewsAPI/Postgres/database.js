const { Pool, Client } = require('pg');
const { postgresConfig } = require('../../config');

module.exports.pool = new Pool(postgresConfig);

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

module.exports.client = new Client(postgresConfig);

// client.connect();
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   client.end();
// });
