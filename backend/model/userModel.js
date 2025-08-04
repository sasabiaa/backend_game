const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {
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
  point: {
    type: Number,
  },
  streaks: {
    type: Number,
  },
  dailyAction_count: {
    type: Number,
  },
  outdoorActivity_count: {
    type: Number,
  },
  education_count: {
    type: Number,
  },
  community_count: {
    type: Number,
  },
  planting_count: {
    type: Number,
  },
  wasteManagement: {
    type: Number,
  },
  transportation_count: {
    type: Number,
  },
  energySaving_count: {
    type: Number,
  },
  achievment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "achievment",
  },
  completedChallanges: [
    {
      challange: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "challanges",
      },
      status: {
        type: String,
        enum: ["Done", "Progress"],
        default: "Progress",
      },
    },
  ],
});

const model = mongoose.model("users", userSchema);
module.exports = model;
