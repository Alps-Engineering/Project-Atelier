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
  // try {
  //   const rows = await db.query(queryStr)
  //   console.log('result: ', rows)
  // } catch (err) {
  //   console.log('this is error:', err);
  // };
});

//photos: array of objects photos: [ { thumbnail_url: '', url: '' } ],
//skus: object of objects skus: { sku_id: { quantity: '', size: '' } }

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
          // reject(err.code);
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



  // let id = [req.params.product_id];
  // let styleId = [req.body.style_id];
  // let queryStr = `SELECT style_id, style_name AS name, original_price, sale_price, default_style FROM styles WHERE product_id = ${id}`;
  // let queryStr = `SELECT s.style_id, s.style_name, s.original_price, s.sale_price, s.default_style, ph.thumbnail_url, ph.photo_url, \
  //                 sk.sku_id, sk.quantity, sk.size FROM styles s JOIN products p ON p.product_id=s.product_id JOIN photos ph ON ph.style_id=s.style_id \
  //                 JOIN skus sk ON sk.style_id=ph.style_id WHERE p.product_id = ${id}`;
  // let results;

  // const getPhotos = async () => {
  //   queryStr = `SELECT thumbnail_url, photo_url AS url FROM photos WHERE style_id = ${id}`;
  //   for (let i = 0; i < results.length; i++) {
  //     id = [results[i].style_id];
  //     await db
  //     .connect()
  //     try {
  //     .query(queryStr, id)
  //     .then(res => {
  //       client.release();
  //       results[i].photos = res;
  //     })
  //     .catch(e => {
  //       client.release();
  //       console.error(e.stack);
  //     }));

  //   }

  // }
  // const getSkus = () => {
  //   let skusQuery = `SELECT quantity, size FROM skus WHERE style_id = ?`;
  //   for (let i = 0; i < results.length; i++) {
  //     styleId = [results[i].style_id];
  //     db.query(skusQuery, styleId, (err, result) => {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log('skusResult', result)
  //         results[i].skus += result;
  //       }
  //     });
  //   }
  // }
  // db.query(queryStr, id, (err, result) => {
  //   if (err) {
  //     throw err;
  //   } else {
  //     result.map((obj, i) => {
  //       if (result[i].default_style === 1) {
  //         delete(result[i].default_style);
  //         result[i]['default?'] = true
  //       } else {
  //         delete(result[i].default_style);
  //         result[i]['default?'] = false;
  //       }
  //       return (
  //         result[i].photos = [
  //           {
  //             thumbnail_url: 'test',
  //             url: 'test'
  //           }
  //         ],
  //         result[i].skus = {
  //           'sku_id': {
  //             quantity: 'test',
  //             size: 'test'
  //           }
  //         }
  //       )
  //     });
  //     console.log('resultsArray', result)
  //     res.send({ 'product_id': id[0], 'results': result });
  //   }
  // });
});

router.route('/:product_id/related').get((req, res) => {
  let queryStr = `SELECT * FROM related ORDER BY related_id DESC LIMIT 1`;
  db.query(queryStr, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

module.exports = router;