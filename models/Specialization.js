const mongoose = require("mongoose");
const slugify = require("slugify");

const SpecializationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a Specialization"],
  },
  location: {
    type: mongoose.Schema.ObjectId,
    ref: "Location",
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//create Specialization slug from the Specialization
SpecializationSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Specialization", SpecializationSchema);
