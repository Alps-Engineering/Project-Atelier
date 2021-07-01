const { pool } = require('../database');

module.exports.getReviewsByProduct = (product, sort, page, count, cb) => {
  const selectQryStr = `
  SELECT r.review_id, r.rating, r.helpfulness, r.recommend, r.reviewer_name, r.date, r.summary, r.body, r.response, p.id, p.url
  FROM reviews r
  LEFT JOIN photos p
  ON r.review_id = p.review_id
  WHERE r.product_id = ${product}
  AND r.reported = false;`;

  pool
    .query(selectQryStr)
    .catch((err) => {
      console.error('There was a problem getting the reviews from the db: ', err.stack);
      cb(400);
    })
    .then((result) => {
      if (result.rows.length < 1) {
        cb(null, "This product doesn't have any reviews");
      } else {
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

module.exports.postReviewByProduct = (data, cb) => {
  const { product_id, rating, summary, body, recommend, name, email, characteristics, photos } = data;
  const insertReviewQryStr = `
  INSERT INTO reviews (product_id, rating, recommend, reviewer_name, reviewer_email, date, summary, body)
  VALUES (${product_id}, ${rating}, ${recommend}, '${name}', '${email}', '${new Date().toISOString()}', '${summary}', '${body}')
  RETURNING review_id;`;

  pool
    .query(insertReviewQryStr)
    .catch((err) => {
      console.error('There was a problem writing review to the db: ', err.stack);
      cb(err);
    })
    .then((result) => {
      const chars = JSON.parse(characteristics);
      const { review_id } = result.rows[0];
      const charsKeys = Object.keys(chars);
      const resultPromises = charsKeys.map((char) => {
        const insertCharReviewsQryStr = `
          INSERT INTO char_reviews (characteristic_id, review_id, value)
          VALUES (${char}, ${review_id}, ${chars[char]})
          RETURNING review_id;`;
        return pool.query(insertCharReviewsQryStr);
      });
      Promise.all(resultPromises)
        .catch((err) => {
          console.error('There was a problem posting characterisitics to the db: ', err.stack);
          cb(err);
        })
        .then((result) => {
          const photosArray = JSON.parse(photos);
          const { review_id } = result[0].rows[0];
          const resultPromises = photosArray.map((photo) => {
            const insertPhotosQryStr = `
                INSERT INTO photos (review_id, url)
                VALUES (${review_id}, '${photo}')
                RETURNING review_id;`;
            return pool.query(insertPhotosQryStr);
          });
          Promise.all(resultPromises)
            .catch((err) => {
              console.error('There was a problem posting a photo to the db: ', err.stack);
              cb(err);
            })
            .then((result) => cb(null, result[0].rows[0]));
        });
    });
};
