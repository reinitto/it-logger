const express = require('express');
const router = express.Router();

const Tech = require('../models/Technician');
// @route       POST /techs
// @desc        Register a new technician
// @access      Public
router.post('/', async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    let tech = new Tech({
      firstName,
      lastName
    });

    await tech.save();

    res.json(tech);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
// @route       GET /logs
// @desc        get all logs
// @access      Public
router.get('/', async (req, res) => {
  try {
    const techs = await Tech.find().sort({
      date: -1
    });
    res.json(techs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
// @route       PUT /techs/id
// @desc        Update a tech
// @access      Public
router.put('/:id', async (req, res) => {
  const { firstName, lastName } = req.body;

  //Build contact object
  const techFields = {};
  if (firstName) techFields.firstName = firstName;
  if (lastName) techFields.lastName = lastName;
  try {
    let tech = await Tech.findByIdAndUpdate(
      req.params.id,
      {
        $set: techFields
      },
      { new: true }
    );

    res.json(tech);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
// @route       DELETE /techs/id
// @desc        Delete a tech
// @access      Public
router.delete('/:id', async (req, res) => {
  try {
    await Tech.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Tech removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
