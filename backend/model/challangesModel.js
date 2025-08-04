const mongoose = require("mongoose");

const challangeModel = new mongoose.Schema({
  name: {
    type: String,
  },
  typeChallange: {
    type: String,
    enum: [
      "dailyAction",
      "outdoorActivity",
      "education",
      "community",
      "reporting",
      "planting",
      "wasteManagement",
      "transportation",
      "energySaving",
    ],
  },
  durationType: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
  },
  point: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  },
});

const model = mongoose.model("challanges", challangeModel);
module.exports = model;
