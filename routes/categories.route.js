const express = require('express');
const router = express.Router();
const { Category, validateCategory } = require('../models/categories.model');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

router.get('/', async (req, res) => {
  // throw new Error('Could not get categories.');
  const categories = await Category.find().sort('name');
  res.send(categories);
});

router.get('/:id', async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return res
      .status(404)
      .send('The category with the given ID was not found.');
  res.send(category);
});

router.post('/', auth, async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({ name: req.body.name });
  await category.save();
  res.send(category);
});

router.put('/:id', auth, async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!category)
    return res
      .status(404)
      .send('The category with the given ID was not found.');
  res.send(category);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category)
    return res
      .status(404)
      .send('The category with the given ID was not found.');
  res.send(category);
});

module.exports = router;
