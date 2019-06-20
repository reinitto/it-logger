const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
// @route       POST /logs
// @desc        Register a new log
// @access      Public
router.post('/', async (req, res) => {
  const { message, attention, tech } = req.body;

  try {
    let newLog = new Log({
      message,
      attention,
      tech,
      date: new Date()
    });
    const log = await newLog.save();
    res.json(log);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
// @route       GET /logs
// @desc        Get all logs
// @access      Public
router.get('/', async (req, res) => {
  try {
    let logs = await Log.find().sort({
      date: -1
    });
    res.json(logs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
// @route       PUT /logs/id
// @desc        Update a log
// @access      Public
router.put('/:id', async (req, res) => {
  const { message, attention, tech } = req.body;
  //Build contact object
  const logFields = {};
  if (message) logFields.message = message;
  if (attention) {
    logFields.attention = attention;
  } else {
    logFields.attention = false;
  }
  if (tech) logFields.tech = tech;
  try {
    let log = await Log.findByIdAndUpdate(
      req.params.id,
      {
        $set: logFields
      },
      { new: true }
    );

    res.json(log);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
// @route       DELETE /logs/id
// @desc        Delete a log
// @access      Public
router.delete('/:id', async (req, res) => {
  try {
    await Log.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Log removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
