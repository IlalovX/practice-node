const winston = require('winston');

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error',
  });
};
