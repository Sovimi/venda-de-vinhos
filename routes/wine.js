var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Wine = require('../models/Wine.js');

/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
  Wine.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function(req, res, next) {
  Wine.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;