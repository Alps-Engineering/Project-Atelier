const { pool } = require('../database');

module.exports.markReviewHelpful = (review_id, cb) => {
  const selectQryStr = `
  SELECT helpfulness
  FROM reviews
  WHERE review_id = ${review_id};`;

  pool.query(selectQryStr, (err, result) => {
    if (err) {
      console.error('There was a problem getting the data from the db: ', err.stack);
      cb(err);
    }
    if (result) {
      const updateQryStr = `
      UPDATE reviews
      SET helpfulness = ${result.rows[0].helpfulness + 1}
      WHERE review_id = ${review_id};`;

      pool.query(updateQryStr, (err, result) => {
        if (err) {
          console.error('There was a problem inserting the data: ', err.stack);
          cb(err);
        }
        cb(null, result);
      });
    }
  });
};
