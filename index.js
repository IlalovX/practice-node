const express = require('express');
const app = express();
const mongoose = require('mongoose');
const categoriesRouter = require('./routes/categories.route');
const customersRouter = require('./routes/customers.route');
const coursesRouter = require('./routes/courses.route');
const enrollmentsRouter = require('./routes/enrollment.route');
const usersRouter = require('./routes/users.route');
const authRouter = require('./routes/auth.route');
const errorMiddleware = require('./middleware/error');
const winston = require('winston');

require('dotenv').config();

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set');
}

mongoose
  .connect('mongodb://localhost:27017/courses')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/categories', categoriesRouter);
app.use('/customers', customersRouter);
app.use('/courses', coursesRouter);
app.use('/enrollments', enrollmentsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// 404 для неизвестных маршрутов (до error handler’а)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Централизованный обработчик ошибок (Express 5 ловит async/await сам)
app.use(errorMiddleware);

app.listen(5000, () => console.log('Listening on port 5000...'));
