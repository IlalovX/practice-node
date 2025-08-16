const express = require('express');
const router = express.Router();
const { Users, validateUsers } = require('../models/users/users.model');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth.middleware');

router.get('/me', auth, async (req, res) => {
  const user = await Users.findById(req.user._id).select('-password');
  if (!user) return res.status(404).send('User not found');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validateUsers(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new Users(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
});

router.get('/', async (req, res) => {
  const users = await Users.find();
  res.send(users);
});

router.get('/:id', async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) return res.status(404).send('User not found');
  res.send(user);
});

router.put('/:id', auth, async (req, res) => {
  const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) return res.status(404).send('User not found');
  res.send(user);
});

router.delete('/:id', auth, async (req, res) => {
  const user = await Users.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send('User not found');
  res.send(user);
});

module.exports = router;
