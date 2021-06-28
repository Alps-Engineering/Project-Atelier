const { pool } = require('../database');

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query(
    `
    UPDATE reviews
    SET characteristics = delete(characteristics, 'id-name')
    `,
    (err, result) => {
      if (err) {
        return console.error('Error executing clean up query', err.stack);
      }
    },
  );

  let counter = 0;
  while (counter < 100) {
    client.query(
      `
      UPDATE reviews
      SET characteristics = delete(characteristics, '${counter}')
      WHERE characteristics ? '${counter}'
      `,
      (err, result) => {
        if (err) {
          return console.error('Error executing clean up query', err.stack);
        }
      },
    );
    counter += 1;
  }
});
