const { pool } = require('../database');

module.exports.markReviewReported = (review_id, cb) => {
  const updateQryStr = `
  UPDATE reviews
  SET reported = true
  WHERE review_id = ${review_id};`;

  pool
    .query(updateQryStr)
    .catch((err) => {
      console.error('There was a problem updating the data: ', err.stack);
      cb(err);
    })
    .then((result) => {
      cb(null, result);
    });
};
