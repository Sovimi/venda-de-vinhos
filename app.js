var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var passport = require('passport');

var wine = require('./routes/wine');
var auth = require('./routes/index');
var user = require('./routes/user');
var order = require('./routes/order')

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//mongoose.connect('mongodb://localhost/wineCellar', {promiseLibrary: require('bluebird') })
//  .then(() =>  console.log('connection succesful'))
//  .catch((err) => console.error(err));
// [SH] Bring in the data model
require('./models/db');
require('./config/passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', auth);
app.use('/wines', express.static(path.join(__dirname, 'dist')));
app.use('/wine', wine);
app.use('/user', user);
app.use('/order', order);
app.use(cookieParser());
app.use(cors());

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

// [SH] Use the API routes when path starts with /api
app.use('/login', auth);
app.use('/register', auth);
app.use('/profile', auth);
app.use('/cart', auth);
app.use('/orders', express.static(path.join(__dirname, 'dist')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;