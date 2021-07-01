const { pool } = require('../database');

const formatCharacteristics = (dbRows) => {
  const chars = {};
  dbRows.forEach((row) => {
    const { id, name, value } = row;
    if (!chars[name]) {
      chars[name] = { id, sum: value, quantity: 1 };
    } else {
      chars[name].sum += value;
      chars[name].quantity += 1;
    }
    chars[name].value = (chars[name].sum / chars[name].quantity).toString();
  });
  for (const key in chars) {
    delete chars[key].sum;
    delete chars[key].quantity;
  }
  return chars;
};

const formatRatings = (dbRows) => {
  const product_id = dbRows[0].product_id.toString();
  const ratings = {};
  const recommended = {};
  dbRows.forEach((row) => {
    const { rating, recommend } = row;
    if (ratings[rating]) {
      ratings[rating] += 1;
    } else {
      ratings[rating] = 1;
    }
    if (recommended[recommend]) {
      recommended[recommend] += 1;
    } else {
      recommended[recommend] = 1;
    }
  });
  for (const key in ratings) {
    ratings[key] = ratings[key].toString();
  }
  for (const key in recommended) {
    recommended[key] = recommended[key].toString();
  }
  return {
    product_id,
    ratings,
    recommended,
  };
};

module.exports.getMetadata = (product_id, cb) => {
  const selectCharQryStr = `
  SELECT c.product_id, c.id, c.name, cr.value
  FROM characteristics c
  INNER JOIN char_reviews cr
  ON c.id = cr.characteristic_id
  WHERE c.product_id = ${product_id};`;

  pool
    .query(selectCharQryStr)
    .catch((err) => {
      console.error('There was a problem getting the characteristics data from the db: ', err.stack);
      cb(400);
    })
    .then((result) => {
      if (result.rows.length < 1) {
        cb(404);
      }
      const characteristics = formatCharacteristics(result.rows);
      const selectRatingsQryStr = `
        SELECT product_id, rating, recommend
        FROM reviews
        WHERE product_id = ${product_id};`;

      pool
        .query(selectRatingsQryStr)
        .catch((err) => {
          console.error('There was a problem getting the ratings data from the db: ', err.stack);
          cb(500);
        })
        .then((result) => {
          if (result.rows.length < 1) {
            cb(404);
          }
          const ratings = formatRatings(result.rows);
          cb(null, Object.assign(ratings, { characteristics }));
        });
    });
};
