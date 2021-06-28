const { pool } = require('../database');

module.exports.getReviewsByProduct = (product, sort, page, count, cb) => {
  const selectQryStr = `
  SELECT r.review_id, r.rating, r.helpfulness, r.recommend, r.reviewer_name, r.date, r.summary, r.body, r.response, p.id, p.url
  FROM reviews r
  LEFT JOIN photos p
  ON r.review_id = p.review_id
  WHERE r.product_id = ${product}
  AND r.reported = false;`;

  pool.query(selectQryStr, (err, result) => {
    if (err) {
      console.error('There was a problem getting the reviews from the db: ', err.stack);
      cb(err);
    }
    if (result) {
      const results = [];
      result.rows.forEach((review) => {
        const formatedReview = { ...review };
        formatedReview.photos = [];
        if (formatedReview.id) {
          formatedReview.photos.push({ id: review.id, url: review.url });
        }
        delete formatedReview.id;
        delete formatedReview.url;
        results.push(formatedReview);
      });
      cb(null, {
        product,
        page,
        count,
        results,
      });
    }
  });
};

module.exports.postReviewByProduct = (product, data, cb) => {
  const insertQryStr = ``;

  pool.query(insertQryStr, (err, result) => {
    if (err) {
      console.error('There was a problem writing the data to the db: ', err.stack);
      cb(err);
    }
    if (result) {
      cb(null, result);
    }
  });
};
