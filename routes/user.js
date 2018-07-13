var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

module.exports = router;