const express = require('express');
const cors = require('cors');
const db = require('./database.js');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});