const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: Number,
    enum: [0.1,2]  //0=>user, 1=>hotel staff, 2=>admin
  }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);