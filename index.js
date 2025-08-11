const express = require('express');
const app = express();
const mongoose = require('mongoose');
const categoriesRouter = require('./routes/categories.route');
const customersRouter = require('./routes/customers.route');
const coursesRouter = require('./routes/courses.route');
const enrollmentsRouter = require('./routes/enrollment.route');
const usersRouter = require('./routes/users.route');
const authRouter = require('./routes/auth.route');

require('dotenv').config();

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

app.listen(5000, () => console.log('Listening on port 5000...'));
