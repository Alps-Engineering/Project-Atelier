const express = require('express');
const { getReviewsByProduct } = require('../../Postgres/models/reviews');
const { markReviewHelpful } = require('../../Postgres/models/helpful');
const { markReviewReported } = require('../../Postgres/models/report');

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

router.put('/:review_id/helpful', (req, res) => {
  markReviewHelpful(req.params.review_id, (err, result) => {
    if (err) {
      res.sendStatus(500);
    }
    if (result) {
      res.sendStatus(201);
    }
  });
});

router.put('/:review_id/report', (req, res) => {
  markReviewReported(req.params.review_id, (err, result) => {
    if (err) {
      res.sendStatus(500);
    }
    if (result) {
      res.sendStatus(201);
    }
  });
});

router.get('/meta', (req, res) => {});

module.exports = router;
