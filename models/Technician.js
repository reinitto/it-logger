const mongoose = require('mongoose');

const TechSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  }
});

module.exports = mongoose.model('tech', TechSchema);
