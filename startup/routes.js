const express = require('express');
const categoriesRouter = require('../routes/categories.route');
const customersRouter = require('../routes/customers.route');
const coursesRouter = require('../routes/courses.route');
const enrollmentsRouter = require('../routes/enrollment.route');
const usersRouter = require('../routes/users.route');
const authRouter = require('../routes/auth.route');
const errorMiddleware = require('../middleware/error.middleware');

module.exports = function (app) {
  app.use(express.json());
  app.use('/categories', categoriesRouter);
  app.use('/customers', customersRouter);
  app.use('/courses', coursesRouter);
  app.use('/enrollments', enrollmentsRouter);
  app.use('/users', usersRouter);
  app.use('/auth', authRouter);
  app.use(errorMiddleware);
};
