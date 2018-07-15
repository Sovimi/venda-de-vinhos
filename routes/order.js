var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = require('../models/Order.js');

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
      console.log(req.params.id);
    });
  });

/* GET PROCESSING USER ORDER*/
router.get('/:id/:state', function(req, res) {
  Order.find({'userID': req.params.id, 'state': req.params.state}, function(err, orders) {
    if (err) return next(err);
    res.json(orders);
    console.log(req.params.state);
  });
});

/* UPDATE PRODDUCT QUANTITY */
router.put('/:id', function(req, res, next) {
  Order.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PRODUCT FROM ORDER */
router.put('/:id', function(req, res, next) {
    Order.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

/* SAVE ORDER */
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