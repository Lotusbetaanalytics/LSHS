const mongoose = require("mongoose");

const MaternalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  location: {
    type: mongoose.Schema.ObjectId,
    ref: "Location",
  },
  records: [
    {
      date: { type: String },
      year: { type: String },
      month: { type: String },
      bedComplementBed: { type: String },
      bedComplementOther: { type: String },
      totalAdmissions: { type: String },
      totalDischarges: { type: String },
      bba: { type: String },
      pncSession: { type: String },
      pncAttendance: { type: String },
      casualtyAttendances: { type: String },
      newBooking: { type: String },
      oldBooking: { type: String },
      ancAttendance: { type: String },
      clinicAttendances: { type: String },
      familyPlanning: { type: String },
      deliveries: { type: String },
      bookedCases: { type: String },
      unbookedCases: { type: String },
      singlesDelivered: { type: String },
      twinsDelivered: { type: String },
      tripletsDelivered: { type: String },
      threePlus: { type: String },
      normalDeliveries: { type: String },
      forcepsDeliveries: { type: String },
      breechDeliveries: { type: String },
      caesareanDeliveries: { type: String },
      births: { type: String },
      liveBirthsMale: { type: String },
      liveBirthsFemale: { type: String },
      stillBirthsMale: { type: String },
      stillBirthsFemale: { type: String },
      natalDeaths: { type: String },
      MBookedCase: { type: String },
      MUBookedCase: { type: String },
      maternalBID: { type: String },
      spontaneousAbortion: { type: String },
      inducedAbortion: { type: String },
      otherAbortion: { type: String },
      abortionCases: { type: String },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Maternal", MaternalSchema);
