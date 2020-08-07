const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type : String,
    default: ''
  }
});

module.exports = User = mongoose.model('user', UserSchema);