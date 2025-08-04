const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
});

const model = mongoose.model("cities", citySchema);
module.exports = model;
