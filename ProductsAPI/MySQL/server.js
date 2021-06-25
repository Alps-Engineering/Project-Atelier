const express = require('express');
const cors = require('cors');
const db = require('./database.js');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});



const getAll = (callback) => {
  let queryStr = 'SELECT * FROM features';
  db.query(queryStr, function(err, results) {
    callback(err, results);
  });
}

const retrieve = (req, res) => {
  getAll(function(err, results) {
    if (err) {
      console.log(err)
    }
    res.json(results);
  });
}