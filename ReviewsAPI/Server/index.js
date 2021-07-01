/* eslint-disable no-console */
const express = require('express');
const reviews = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 1337;

app.use(express.urlencoded({ extended: true }));
app.use('/reviews', reviews);

app.get('/', (req, res) => res.send('Hello World'));
app.get('/loaderio-5cb2b636946d4a3fe44a56a40fce88a6', (req, res) => res.send('loaderio-5cb2b636946d4a3fe44a56a40fce88a6'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
