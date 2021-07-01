/* eslint-disable no-console */
const express = require('express');
const reviews = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 1337;

app.use(express.urlencoded({ extended: true }));
app.use('/reviews', reviews);

app.get('/', (req, res) => res.send('Hello World'));
app.get('/loaderio-5a11d815064a13498b8c19e06f8f1854', (req, res) => res.send('loaderio-5a11d815064a13498b8c19e06f8f1854'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
