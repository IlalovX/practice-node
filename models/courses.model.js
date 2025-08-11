const Joi = require('joi');
const mongoose = require('mongoose');
const { categorySchema } = require('./categories.model');

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    trainer: {
      type: String,
      require: true,
    },
    tags: {
      type: [String],
    },
    status: {
      type: String,
      require: true,
      enum: ['Active', 'Inactive'],
    },
  })
);

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    categoryId: Joi.string().required(),
    trainer: Joi.string().required(),
    tags: Joi.array().items(Joi.string().min(3).max(50)),
    status: Joi.string().valid('Active', 'Inactive').default('Active'),
  });
  return schema.validate(course);
}

module.exports = {
  Course,
  validateCourse,
};
