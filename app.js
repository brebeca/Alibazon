const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const verifyToken=require('./utils/verify-middleware/verify-token');
require('dotenv').config();

const indexRouter = require('./routes/indexRouter');
const subcategoryRouter = require('./routes/subcategoryRouter');
const authRouter = require('./routes/authRouter');
const cartRouter= require('./routes/cartRouter');
const wishListRouter=require('./routes/wishListRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', verifyToken.tokenVerify,indexRouter);
app.use('/subcategory',verifyToken.tokenVerify, subcategoryRouter);
app.use('/auth', verifyToken.tokenVerify,authRouter);
app.use('/cart',verifyToken.tokenVerify,cartRouter);
app.use('/wishlist',wishListRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error-pages/error');
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

module.exports = app;
