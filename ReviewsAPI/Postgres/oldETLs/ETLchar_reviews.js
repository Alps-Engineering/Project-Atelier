const csv = require('csv-parser');
const fs = require('fs');
const { pool } = require('../database');

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  // client.query("UPDATE reviews SET characteristics = hstore(ARRAY[['id-name', 'value']]);", (err, result) => {
  //   if (err) {
  //     return console.error('Error executing hstore dummy data query', err.stack);
  //   }
  //   console.log('adding dummy data complete');

  let concurrent = 0;
  const stream = fs.createReadStream(
    '/home/tim/HackReactor/Project-Atelier/ReviewsAPI/data/characteristic_reviews.csv',
  );
  stream
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
      concurrent += 1;
      if (concurrent > 120) {
        stream.pause();
      }
      client.query(
        `
          UPDATE reviews
          SET characteristics = characteristics || '"${data.id}" => "${data.value}"'
          WHERE review_id = ${Number(data.review_id)};
          `,
        (err, result) => {
          if (err) {
            return console.error(`Error executing query on review: ${data.review_id}`, err.stack);
          }
          concurrent -= 1;
          console.log(`review: ${data.review_id}, concurrent: ${concurrent}`);
          if (concurrent < 10) {
            stream.resume();
          }
        },
      );
    })
    .on('end', () => {
      console.log('done');
    });
  // });
});
