const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Volunteer = mongoose.model('volunteer', VolunteerSchema);