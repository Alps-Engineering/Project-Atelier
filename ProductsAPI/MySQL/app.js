const express = require('express');
// const cors = require('cors');
const router = require('./routes.js');

const app = express();
const port = 4000;

// app.use(cors());
app.use(express.json());
app.use('/products', router);

app.get('/', (req, res) => {
  res.send('Test: Products API');
});

app.get('/loaderio-7d0db0914d9bee60ed9ab6d06a4096b3', (req, res) => {
  res.send('loaderio-7d0db0914d9bee60ed9ab6d06a4096b3');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});