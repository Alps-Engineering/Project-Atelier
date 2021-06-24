const models = require('../models');

module.exports = {

  get: ((req, res) => {
    models.product_id.getAll((err, results) => {
      if (err) {
        console.log('error:', err);
      } else {
        console.log('results: ', results);
        res.json(results);
      }
    })
  })

};