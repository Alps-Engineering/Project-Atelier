const express = require('express');
const cors = require('cors');
const router = require('./routes.js');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use('/products', router);

app.get('/', (req, res) => {
  res.send('Test: Products API');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});