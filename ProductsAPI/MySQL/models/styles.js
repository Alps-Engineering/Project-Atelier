const db = require('../database');

module.exports = {

  getAll: (cb => {
    let queryStr = 'SELECT * FROM styles ORDER BY style_id DESC LIMIT 1';
    db.query(queryStr, (err, results) => {
      cb(err, results)
    });
  })

};