const express = require('express');
const app = express();
const mongoose = require('mongoose');
const categoriesRouter = require('./routes/categories.route');
const customersRouter = require('./routes/customers.route');
const coursesRouter = require('./routes/courses.route');
const enrollmentsRouter = require('./routes/enrollment.route');
const usersRouter = require('./routes/users.route');
const authRouter = require('./routes/auth.route');
const errorMiddleware = require('./middleware/error.middleware');
const winston = require('winston');
require('winston-mongodb');
require('dotenv').config();

winston.add(new winston.transports.Console());
winston.add(
  new winston.transports.File({ filename: 'logs/logfile.log', level: 'error' })
);
winston.add(
  new winston.transports.MongoDB({
    db: 'mongodb://localhost:27017/courses-logs',
    level: 'info',
  })
);

winston.exceptions.handle(
  new winston.transports.File({ filename: 'logs/uncaughtExceptions.log' })
);
process.on('uncaughtException', (ex) => {
  winston.error('Uncaught Exception', ex, ex.message);
  process.exit(1);
});

process.on('unhandledRejection', (ex) => {
  throw ex;
});

const myPromise = new Promise.reject(new Error('This is a test error'));
myPromise.then('end');

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set');
}

mongoose
  .connect('mongodb://localhost:27017/courses')
  .then(() => winston.debug('Connected to MongoDB...'))
  .catch((err) => winston.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/categories', categoriesRouter);
app.use('/customers', customersRouter);
app.use('/courses', coursesRouter);
app.use('/enrollments', enrollmentsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// 404 для неизвестных маршрутов (до error handler’а)
app.use((req, res, next) => {
  winston.error('Not Found');
  res.status(404).json({ message: 'Not Found' });
});

// Централизованный обработчик ошибок (Express 5 ловит async/await сам)
app.use(errorMiddleware);

app.listen(5000, () => winston.info('Listening on port 5000...'));
