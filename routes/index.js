var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile.js');
var ctrlAuth = require('../controllers/auth.js');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// cart
router.get('/cart', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;