const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error'));
connection.once('open', () => {
  console.log('Successfully connected to Mongodb')
});

module.exports = db;