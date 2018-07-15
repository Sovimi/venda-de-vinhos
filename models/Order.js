var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    userID: String,
    date: { type: Date, default: Date.now },
    total: Number,
    state: String,
    products: [
        {
            _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Wine'},
            quantity: Number
        }],
  });

  module.exports = mongoose.model('Order', OrderSchema);