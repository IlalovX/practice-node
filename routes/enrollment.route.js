const express = require('express');
const router = express.Router();
const {
  Enrollment,
  validateEnrollment,
} = require('../models/enrollments.model');
const { Customer } = require('../models/customers.model');
const { Course } = require('../models/courses.model');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const enrollments = await Enrollment.find()
    .populate('course', 'name')
    .populate('customer', 'name')
    .sort('dateStart');
  res.send(enrollments);
});

router.post('/', async (req, res) => {
  const { error } = validateEnrollment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.body.customerId)) {
    return res.status(400).send('Invalid customerId format');
  }

  if (!mongoose.Types.ObjectId.isValid(req.body.courseId)) {
    return res.status(400).send('Invalid courseId format');
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const course = await Course.findById(req.body.courseId);
  if (!course) return res.status(400).send('Invalid course.');

  const enrollment = new Enrollment({
    customer: customer._id,
    course: course._id,
    courseFee: course.fee,
    dateStart: new Date(),
  });

  await enrollment.save();
  res.send(enrollment);
});

router.put('/:id', async (req, res) => {
  const { error } = validateEnrollment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.body.customerId)) {
    return res.status(400).send('Invalid customerId format');
  }

  if (!mongoose.Types.ObjectId.isValid(req.body.courseId)) {
    return res.status(400).send('Invalid courseId format');
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const course = await Course.findById(req.body.courseId);
  if (!course) return res.status(400).send('Invalid course.');

  const enrollment = await Enrollment.findByIdAndUpdate(
    req.params.id,
    {
      customer: req.body.customerId,
      course: req.body.courseId,
      courseFee: course.fee,
      dateStart: new Date(),
    },
    { new: true }
  );

  if (!enrollment) return res.status(404).send('Enrollment not found.');

  res.send(enrollment);
});

router.delete('/:id', async (req, res) => {
  const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
  if (!enrollment) return res.status(404).send('Enrollment not found.');

  res.send(enrollment);
});

router.get('/:id', async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id)
    .populate('course', 'name')
    .populate('customer', 'name');
  if (!enrollment) return res.status(404).send('Enrollment not found.');

  res.send(enrollment);
});

module.exports = router;
