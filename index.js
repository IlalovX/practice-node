const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/config')();

require('./startup/logging')();

require('./startup/db')();

require('./startup/routes')(app);

require('./startup/prod')(app);

const server = app.listen(5000, () =>
  winston.info('Listening on port 5000...')
);

module.exports = server;
