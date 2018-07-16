var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Wine = require('../models/Wine.js');
var Order = require('../models/Order.js');

/* GET ALL WINES */
router.get('/', function(req, res, next) {
  Wine.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE WINE BY ID */
router.get('/:id', function(req, res, next) {
  Wine.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* ADD PRODUCT TO ORDER */
router.put('/:userID/:wineID', function(req, res, next) {
    Order.findOneAndUpdate({'userID': req.params.userID, 'state': 'processing'}, 
      {'$push': {'products': { '_id' : req.params.wineID, 'quantity': 1} } },
      { 'upsert' : true, 'new': false },
      function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
});

module.exports = router;