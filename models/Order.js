var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    userID:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: { type: Date, default: Date.now },
    total: Number,
    state: String,
    products: [
        {
            wineID: {type: mongoose.Schema.Types.ObjectId, ref: 'Wine'}, 
            quantity: Number
        }],
  });

  module.exports = mongoose.model('Order', OrderSchema);