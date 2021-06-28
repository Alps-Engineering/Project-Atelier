/* eslint-disable no-console */
const express = require('express');
const reviews = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 1337;

app.use(express.json());
app.use('/reviews', reviews);

app.get('/', (req, res) => res.send('Hello World'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
