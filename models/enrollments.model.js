const Joi = require('joi');
const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  courseFee: {
    type: Number,
  },
  dateStart: {
    type: Date,
  },
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

function validateEnrollment(enrollment) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    courseId: Joi.string().required(),
  });
  return schema.validate(enrollment);
}

module.exports = { Enrollment, validateEnrollment };
