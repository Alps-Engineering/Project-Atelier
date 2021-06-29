const express = require('express');
const { getReviewsByProduct, postReviewByProduct } = require('../../Postgres/models/reviews');
const { markReviewHelpful } = require('../../Postgres/models/helpful');
const { markReviewReported } = require('../../Postgres/models/report');
const { getMetadata } = require('../../Postgres/models/metadata');

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
  .post((req, res) => {
    postReviewByProduct(req.body, (err, result) => {
      if (err) {
        res.sendStatus(500);
      }
      if (result) {
        res.status(201).json(result);
      }
    });
  });

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

router.get('/meta', (req, res) => {
  getMetadata(req.query.product_id, (err, result) => {
    if (err) {
      res.sendStatus(500);
    }
    if (result) {
      res.json(result);
    }
  });
});

module.exports = router;
