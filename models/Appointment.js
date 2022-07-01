const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
  },
  appointments: [
    {
      specialization: {
        type: mongoose.Schema.ObjectId,
        ref: "Specialization",
      },
      admin: {
        type: mongoose.Schema.ObjectId,
        ref: "Admin",
      },
      date: { type: String },
      time: { type: String },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
