const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  task: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  background: {
    type: String,
    required: true
  },
  order: {
    type: Number
  },
  userId: {
    type: String
  }
  ,
  userName: {
    type: String
  }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);