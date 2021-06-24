const express = require('express');
const cors = require('cors');
const db = require('./database.js');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let Products = require('./models/products.model.js');
let Features = require('./models/features.model.js');
let Styles = require('./models/styles.model.js');
let Photos = require('./models/photos.model.js');
let Skus = require('./models/skus.model.js');
let Related = require('./models/related.model.js');

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});