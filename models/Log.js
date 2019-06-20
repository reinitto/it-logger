const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  attention: {
    type: Boolean
  },
  tech: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// LogSchema.index({
//   message: 'text',
//   tech: 'text'
// });
module.exports = mongoose.model('log', LogSchema);
