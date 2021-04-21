const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  BookTitle: {
    type: String,
    required: true
  },
    ISBN: {
    type: String,
    required: true
  },
  PublishYear: {
    type: String,
    required: true
  },
  CoverPrice: {
    type: String,
    require: true
  },
  CheckIn: {
    type: String,
    require: true
  },
  CheckOut: {
    type: String,
    require: true
  },
  CheckHistory: {
    type: String,
    require: true
  },
  
});


const Books = mongoose.model('Books', BookSchema);

module.exports = Books;

