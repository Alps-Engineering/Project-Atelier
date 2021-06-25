const csv = require('csv-parser');
const fs = require('fs');
const { pool } = require('../database');

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  fs.createReadStream('/home/tim/HackReactor/Project-Atelier/ReviewsAPI/data/characteristicsTest.csv')
    .pipe(csv())
    .on('data', (data) => {
      client.query(
        `
          SELECT review_id, characteristics -> '${data.id}' AS value
          FROM reviews
          WHERE characteristics ? '${data.id}';
          `,
        (err, result) => {
          if (err) {
            return console.error(`Error executing SELECT query on review: ${data.review_id}`, err.stack);
          }
          result.rows.forEach((review) => {
            client.query(
              `
              UPDATE reviews
              SET characteristics = characteristics || '"${data.id}-${data.name}" => "${review.value}"'
              WHERE review_id = ${review.review_id}
              `,
              (err, result) => {
                if (err) {
                  return console.error(`Error executing UPDATE query on review: ${data.review_id}`, err.stack);
                }
              },
            );
          });
        },
      );
    })
    .on('end', () => {
      console.log('done');
    });
});
