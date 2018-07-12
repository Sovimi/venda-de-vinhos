var mongoose = require('mongoose');

var WineSchema = new mongoose.Schema({
    name: String,
    year: Number,
    brand: String,
    description: String,
    type: String,
    estate: String,
    price: String,
    castas: [
        {name: String, percent: Number, color: String}],
  });

  module.exports = mongoose.model('Wine', WineSchema);