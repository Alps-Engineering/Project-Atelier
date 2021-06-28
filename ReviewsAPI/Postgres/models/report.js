const { pool } = require('../database');

module.exports.markReviewReported = (review_id, cb) => {
  const updateQryStr = `
  UPDATE reviews
  SET reported = true
  WHERE review_id = ${review_id};`;

  pool.query(updateQryStr, (err, result) => {
    if (err) {
      console.error('There was a problem updating the data: ', err.stack);
      cb(err);
    }
    if (result) {
      cb(null, result);
    }
  });
};
