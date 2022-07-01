const mongoose = require("mongoose");

const VitalsSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
  },
  vitals: [
    {
      bloodPressure: { type: String },
      heartRate: { type: String },
      glucoseLevel: String,
      bloodCount: String,
      date: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vitals", VitalsSchema);
