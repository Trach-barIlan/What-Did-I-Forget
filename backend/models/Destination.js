const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  intId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  items: {
    type: [String],
    required: true
  }
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
