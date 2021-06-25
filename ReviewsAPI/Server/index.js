/* eslint-disable no-console */
const express = require('express');

const app = express();
const PORT = process.env.PORT || 1337;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
