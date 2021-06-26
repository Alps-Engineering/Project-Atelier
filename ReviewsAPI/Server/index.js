/* eslint-disable no-console */
const express = require('express');
const reviews = require('./routes/reviews');
const metadata = require('./routes/metadata');
const helpful = require('./routes/metadata');
const report = require('./routes/metadata');

const app = express();
const PORT = process.env.PORT || 1337;

app.use(express.json());
app.use('/reviews', reviews);
app.use('/reviews/meta', metadata);
app.use('/reviews/:review_id/helpful', helpful);
app.use('/reviews/:review_id/report', report);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//GET /reviews/
//GET /reviews/meta
//POST /reviews
//PUT /reviews/:review_id/helpful
//PUT /reviews/:review_id/report
