const express = require('express');
const { getReviewsByProduct } = require('../../Postgres/models/reviews');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    const product = req.query.product_id;
    const { sort } = req.query;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    getReviewsByProduct(product, sort, page, count, (err, result) => {
      if (err) {
        res.sendStatus(500);
      }
      if (result) {
        res.json(result);
      }
    });
  })
  .post((req, res) => {});

module.exports = router;
