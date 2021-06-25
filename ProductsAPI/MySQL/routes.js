const router = require('express').Router();
const db = require('./database.js');

router.route('/').get((req, res) => {
  let page = 1;
  let count = 5;
  if (req.query.page) {
    page = req.query.page;
  }
  if (req.query.count) {
    count = req.query.count;
  }
  let queryStr = `SELECT * FROM products LIMIT ${count} OFFSET ${(page * count) - count}`; //OFFSET value allows us to specify which row to start from retrieving data
  db.query(queryStr, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

//need to incorporate id variable into query?
router.route('/:product_id').get((req, res) => {
  let id = [req.params.id];
  let queryStr = `SELECT products.product_id, products.product_name, products.slogan, products.product_description, products.category, products.default_price, \
                  JSON_OBJECTAGG(features.feature, features.feature_value) AS features FROM products, features \
                  WHERE products.product_id=features.product_id GROUP BY products.product_id`;

  db.query(queryStr, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log('result:', result)
      res.send(result);
    }
  });
});

router.route('/:product_id/styles').get((req, res) => {
  let queryStr = `SELECT * FROM styles ORDER BY style_id DESC LIMIT 1`;
  db.query(queryStr, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

router.route('/:product_id/related').get((req, res) => {
  let queryStr = `SELECT * FROM related ORDER BY related_id DESC LIMIT 1`;
  db.query(queryStr, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

module.exports = router;