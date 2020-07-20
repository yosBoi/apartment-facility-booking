const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  facility: {
    type: String,
    required: true,
    enum: ["Swimming Pool", "Tennis Court", "Gym", "ClubHouse"]
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

module.exports = mongoose.model('Booking', BookingSchema);