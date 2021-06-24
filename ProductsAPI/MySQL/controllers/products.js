const models = require('../models');

module.exports = {

  get: ((req, res) => {
    models.products.getAll((err, results) => {
      if (err) {
        console.log('error:', err);
      } else {
        console.log('results: ', results);
        res.json(results);
      }
    })
  })

};