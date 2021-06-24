const csv = require('csv-parser');
const fs = require('fs');
const { pool } = require('../database');

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  fs.createReadStream(
    '/home/tim/HackReactor/Project-Atelier/ReviewsAPI/data/characteristic_reviewsTest.csv',
  )
    .pipe(
      csv({
        mapHeaders: ({ header }) => {
          if (header === 'id') return null;
          if (header === 'characteristic_id') return 'id';
          return header;
        },
      }),
    )
    .on('data', (data) => {
      client.query(
        `UPDATE reviews SET characteristics = '${JSON.stringify({
          id: data.id,
          value: data.value,
        })}' WHERE review_id = ${data.review_id};`,
        (err, result) => {
          if (err) return console.error('Error executing query', err.stack);
        },
      );
    })
    .on('end', () => {
      console.log('done');
    });
});
