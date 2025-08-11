const express = require('express');
const router = express.Router();
const { Course, validateCourse } = require('../models/courses.model');
const { Category } = require('../models/categories.model');

router.get('/', async (req, res) => {
  const courses = await Course.find().sort('name');
  res.send(courses);
});

router.post('/', async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid category.');

  let course = new Course({
    name: req.body.name,
    category: {
      _id: category._id,
      name: category.name,
    },
    trainer: req.body.trainer,
    tags: req.body.tags,
    status: req.body.status,
  });
  course = await course.save();
  res.send(course);
});

router.put('/:id', async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid category.');

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      category: {
        _id: category._id,
        name: category.name,
      },
      trainer: req.body.trainer,
      tags: req.body.tags,
      status: req.body.status,
    },
    { new: true }
  );
  if (!course)
    return res.status(404).send('The course with the given ID was not found.');

  res.send(course);
});

router.delete('/:id', async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course)
    return res.status(404).send('The course with the given ID was not found.');

  res.send(course);
});

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course)
    return res.status(404).send('The course with the given ID was not found.');

  res.send(course);
});

module.exports = router;
