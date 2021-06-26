const express = require('express');
const { client } = require('../../Postgres/database');

const router = express.Router();

router.put((req, res) => {
  client.query(
    `
    SELECT helpfulness
    FROM reviews
    WHERE review_id = ${req.params.review_id};
    `,
    (err, result) => {
      if (err) {
        console.error('There was a problem getting the data from the db: ', err.stack);
        res.sendStatus(500);
      }
      client.query(
        `
        UPDATE reviews
        SET helpfullness = ${result.rows[0] + 1}
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
    },
  );
});

module.exports = router;
