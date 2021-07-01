const router = require('express').Router();
const db = require('./database.js');

router.route('/').get((req, res) => {
  let page = 1;
  let count = 5;
  if (req.query.page) {
    page = req.query.page;
  }
  if (req.query.count) {
    count = req.query.count;
  }
  let queryStr = `SELECT product_id AS id, product_name AS name, slogan, \
                  product_description AS description, category, default_price FROM products \
                  LIMIT ${count} OFFSET ${(page * count) - count}`; //OFFSET value allows us to specify which row to start from retrieving data

  db.query(queryStr, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

router.route('/:product_id').get((req, res) => {
  let id = [req.params.product_id];
  let queryStr = `SELECT products.product_id AS id, products.product_name AS name, products.slogan, \
                  products.product_description AS description, products.category, products.default_price, \
                  JSON_OBJECTAGG(features.feature, features.feature_value) AS features FROM products, features \
                  WHERE products.product_id = ${id} AND features.product_id = ${id} GROUP BY products.product_id`;

  db.query(queryStr, id, (err, result) => {
    if (err) {
      throw err;
    } else {
      let parsedKeys = Object.keys(JSON.parse(result[0].features));
      let parsedValues = Object.values(JSON.parse(result[0].features));
      result[0].features = parsedKeys.map((key, value) => (
        {
          feature: key,
          value: parsedValues[value]
        }
      ));
      res.send(result[0]);
    }
  });
});

router.route('/:product_id/styles').get((req, res) => {
  let id = [req.params.product_id];
  let stylesQuery = `SELECT style_id, style_name AS name, original_price, sale_price, default_style FROM styles WHERE product_id = ${id}`;
  let photosQuery = `SELECT thumbnail_url, photo_url AS url FROM photos WHERE style_id = ?`;
  let skusQuery = `SELECT sku_id, quantity, size FROM skus WHERE style_id = ?`;
  let finalObj = {};

  const getStyles = (product_id) => {
    return new Promise((resolve, reject) => {
      db.query(stylesQuery, id, (err, result) => {
        if (err) {
          reject(`Data cannot properly load:  ${err.code}`);
        } else {
          resolve(result);
        }
      });
    });
  };

  const getPhotos = (style_id) => {
    return new Promise((resolve, reject) => {
      db.query(photosQuery, [style_id], (err, result) => {
        if (err) {
          reject(`Data cannot properly load:  ${err.code}`);
        } else {
          resolve(result);
        }
      });
    });
  };

  const getSkus = (style_id) => {
    return new Promise((resolve, reject) => {
      db.query(skusQuery, [style_id], (err, result) => {
        if (err) {
          reject(`Data cannot properly load:  ${err.code}`);
        } else {
          resolve(result);
        }
      });
    });
  };

  getStyles(id)
  .then(data => {
    finalObj.product_id = id[0];
    finalObj.results = data;
    return finalObj;
  })
  .then(data => {
    return Promise.all(
      finalObj.results.map((key, i) => {
        if (key.sale_price === 'null') {
          key.sale_price = '0';
        }
        data.results[i]['default?'] = data.results[i].default_style;
        if (data.results[i]['default?'] === 1) {
          data.results[i]['default?'] = true;
        } else {
          data.results[i]['default?'] = false;
        }
        delete(data.results[i].default_style);
        return getPhotos(key.style_id)
        .then(photos => {
          key.photos = photos;
          return key;
        })
        .then(() => {
          return getSkus(key.style_id)
          .then(skus => {
            key.skus = {};
            skus.map(sku => {
              key.skus[sku.sku_id] = {
                quantity: sku.size,
                size: sku.quantity
              }
            })
            return key;
          })
        })
      })
    )
    .then(() => {
      res.send(finalObj);
    })
  })
  .catch(err => {
    res.send(err);
  });
});

router.route('/:product_id/related').get((req, res) => {
  let id = [req.params.product_id];
  let queryStr = `SELECT JSON_ARRAYAGG(related_product_id) AS related fROM related WHERE current_product_id = ${id}`;

  db.query(queryStr, (err, result) => {
    if (err) {
      throw err;
    } else {
      let relatedArray = JSON.parse(result[0].related);
      res.send(relatedArray);
    }
  });
});

module.exports = router;















  // const loadData = async () => {
  //   try {
  //     const styles = await getStyles(id);
  //     console.log('styles', styles)
  //     finalObj.product_id = id[0];
  //     finalObj.results = styles;
  //     finalObj.results.map((key, i) => {
  //       if (key.sale_price === 'null') {
  //         key.sale_price = '0';
  //       }
  //       finalObj.results[i]['default?'] = finalObj.results[i].default_style;
  //       if (finalObj.results[i]['default?'] === 1) {
  //         finalObj.results[i]['default?'] = true;
  //       } else {
  //         finalObj.results[i]['default?'] = false;
  //       }
  //       delete(finalObj.results[i].default_style);
  //       const photos1 = await getPhotos(key.style_id);
  //       photos1.photos = photos1;
  //       // const skus = await getSkus(style_id);
  //       })
  //       // console.log('finalObj', finalObj)
  //       res.send(finalObj);
  //   } catch (err) {
  //     console.log('error', err)
  //   }
  // }
  // loadData();
