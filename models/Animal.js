const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  rescue_date: {
    type: Date,
    default:Date.now
  },
  description: {
    type: String
  },
  updated_date: {
    type: Date,
    default:Date.now
    
  }
});

module.exports = Animal = mongoose.model('animal', AnimalSchema);