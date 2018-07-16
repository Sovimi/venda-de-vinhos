var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = require('../models/Order.js');
var Wine = require('../models/Wine.js');

/* GET ALL ORDERS */
router.get('/', function(req, res, next) {
  Order.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET ALL ORDERS OF A USER*/
router.get('/:id', function(req, res) {
    Order.find({'userID': req.params.id}, function(err, orders) {
      if (err) return next(err);
      res.json(orders);
    });
  });

/* GET PROCESSING USER ORDER DETAILS*/
router.get('/:id/:state', function(req, res) {
  Order.findOne({'userID': req.params.id, 'state': req.params.state}).
  populate('products._id').
  exec(function(err, orders) {
    if (err) return next(err);
    res.json(orders);
  });
});

/* UPDATE PRODUCT QUANTITY */
router.put('/:id/:wineID/:quantity', function(req, res, next) {
  Order.findOneAndUpdate({'_id': req.params.id}, 
    {'$set': {'products': {'quantity': req.params.quantity, '_id' : req.params.wineID} } },
    function (err, post) {
      if (err) return next(err);
      console.log(post);
      res.json(post);
    });
});

/* DELETE PRODUCT FROM ORDER */
router.put('/:id/:wineID', function(req, res, next) {
  Order.findOneAndUpdate({'_id': req.params.id}, 
    {'$pull': {'products': {'_id': req.params.wineID.toString()} } },
    { 'upsert' : true, 'multi': true, 'new': true },
    function (err, post) {
      if (err) return next(err);
      res.json(post);
    post.save();
    });
});

/* SAVE ORDER */
router.put('/:id', function(req, res, next) {
    Order.findByIdAndUpdate(req.params.id, 
    {'state':'completed'}, 
    function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

 /*NEW EMPTY ORDER*/ 
 router.post('/', function(req, res, next) {
  Order.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ORDER */
router.delete('/:id', function(req, res, next) {
  Order.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;