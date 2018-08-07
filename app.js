const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const storeRouter = require('./routes/store');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', storeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'key not found!'));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).end();
});

module.exports = app;
