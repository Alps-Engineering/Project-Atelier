const express = require('express');
const { client } = require('../../Postgres/database');

const router = express.Router();

router.put((req, res) => {
  client.query(
    `
    UPDATE reviews
    SET reported = true
    WHERE review_id = ${req.params.review_id};
    `,
    (err, result) => {
      if (err) {
        console.error('There was a problem getting the data from the db: ', err.stack);
        res.sendStatus(500);
      }
      res.sendStatus(201);
    },
  );
});

module.exports = router;
