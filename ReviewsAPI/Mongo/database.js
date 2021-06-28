const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sdc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports.db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log("We're connected!");
// });
