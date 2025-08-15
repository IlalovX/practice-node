const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
  winston.add(new winston.transports.Console());
  winston.add(
    new winston.transports.File({
      filename: 'logs/logfile.log',
      level: 'error',
    })
  );
  winston.add(
    new winston.transports.MongoDB({
      db: 'mongodb://localhost:27017/courses-logs',
      level: 'info',
    })
  );

  winston.exceptions.handle(
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/uncaughtExceptions.log' })
  );

  process.on('uncaughtException', (ex) => {
    winston.error('Uncaught Exception', ex, ex.message);
    process.exit(1);
  });

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
};
