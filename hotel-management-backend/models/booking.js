const mongoose = require("mongoose");
const {UPCOMING, COMPLETED, CANCELLED} = require("../constants/constants")
const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  status: {
  type: String,
  enum: [UPCOMING, COMPLETED, CANCELLED],
  default: UPCOMING
  
  }
}, {timestamps: true});

module.exports = mongoose.model("Booking", bookingSchema);