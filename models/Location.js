const mongoose = require("mongoose");
const slugify = require("slugify");

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a location"],
  },
  lga: {
    type: String,
  },
  state: {
    type: String,
  },
  slug: String,
  country: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//create location slug from the location
LocationSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Location", LocationSchema);
