const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  facility: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Reservation', ReservationSchema);