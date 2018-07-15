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
  populate('products.wineID').
  exec(function(err, orders) {
    if (err) return next(err);
    res.json(orders);
  });
});

/* UPDATE PRODUCT QUANTITY */
router.put('/:id/:state/:wineID', function(req, res, next) {
  Order.findByIdAndUpdate(req.params.id,
    { "products.$": { "quantity": req.body }
    }, function (err, post) {
    if (err) return next(err);
    console.log(req.body)
    res.json(post);
  });
});

/* DELETE PRODUCT FROM ORDER */
router.delete('/:id/:wineID', function(req, res, next) {
    Order.findById(req.params.id, 
    function (err, post) {
      if (err) return next(err);
      
      post.products.pull(req.params.wineID)
      post.save(function(err, editedOrder){
        if(err){
            return console.log(err)
        }
        console.log(editedOrder.products.length);
        console.log(req.params.wineID)
      })
      res.json(post);
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

/* DELETE ORDER */
router.delete('/:id', function(req, res, next) {
  Order.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;