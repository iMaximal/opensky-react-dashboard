const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const expressValidator = require('express-validator');
const compression = require('compression');

const user = require('./user');

const app = express();
// security filter
app.use(helmet());

// Compress all routes
app.use(compression());
app.use(logger('dev'));

const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
});
//  apply to all requests
app.use(limiter);

app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use('/user', user);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;

  res.status(err.statusCode).json({
    type: 'error',
    msg: err.message,
  });
});

module.exports = app;
