const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.ObjectId,
    ref: "Location",
  },
  date: { type: String },
  year: { type: String },
  month: { type: String },
  death: { type: String },
  births: { type: String },
  total: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Record", RecordSchema);
