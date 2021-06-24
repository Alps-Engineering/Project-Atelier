const express = require('express');
const cors = require('cors');
const db = require('./database');
const router = require('./routes.js');
const mysql = require('mysql');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use('/products', router);

app.get('/', (req, res) => {
  res.send('Test: Products API');
});

// app.get('/products', (req, res) => {
//   db.query('SELECT * FROM products ORDER BY product_id DESC LIMIT 1', (err, result) => {
//     if (err) {
//       console.log('Error: ', err);
//     } else {
//       console.log('sent!', result)
//       res.send(result) // can also use res.json(result)
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});