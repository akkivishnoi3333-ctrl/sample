const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: String,
  hotelImage: String,
  location: String,
  pricePerNight: Number,
  roomsAvailable: Number
}, {timestamps: true});

module.exports = mongoose.model("Hotel", hotelSchema);