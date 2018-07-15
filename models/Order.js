var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    userID: String,
    date: { type: Date, default: Date.now },
    total: Number,
    state: String,
    products: [
        {
            wineID: {type: mongoose.Schema.Types.ObjectId, ref: 'Wine'}, 
            //wineID: String,
            quantity: Number
        }],
  });

  module.exports = mongoose.model('Order', OrderSchema);