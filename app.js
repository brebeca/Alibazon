const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const Sentry = require("@sentry/node");
const Apm = require("@sentry/apm");
const config =require('./config');
const indexRouter = require('./routes/indexRouter');
const subcategoryRouter = require('./routes/subcategoryRouter');
const authRouter = require('./routes/authRouter');
const cartRouter= require('./routes/cartRouter');
const wishListRouter=require('./routes/wishListRouter');
const {tokenVerify}=require('./utils/verify-middleware/verify-token');
const utils=require('./utils/utils-functions');
const db=require('./utils/database-utils/db-connection').connect;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

Sentry.init({ dsn: 'https://69b6cc8e72114f328ff4026ce528ad7d@o426095.ingest.sentry.io/5367518' });
Sentry.configureScope(function(scope) {
  scope.setTag("page.locale", "de-at");
});

app.use(Sentry.Handlers.requestHandler());

app.use('/',tokenVerify,indexRouter);
app.use('/subcategory',tokenVerify, subcategoryRouter);
app.use('/auth', authRouter);
app.use('/cart',cartRouter);
app.use('/wishlist',wishListRouter);



app.use(Sentry.Handlers.errorHandler());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(async function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  let message='Page not found !';
  let page='page not found';
  if(err.status!==404)
  {
    message=err.message;
    page='error';
  }
  res.status(err.status || 500);
  res.render(config.indexPage, await utils.getThePageVars(message,page));
});


app.listen(config.app.port);
 db();
module.exports = app;
