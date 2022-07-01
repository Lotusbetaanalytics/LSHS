const mongoose = require("mongoose");

const CheckSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
  },
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Check", CheckSchema);
