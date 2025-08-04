const mongoose = require("mongoose");
const { DB_URI } = require("./config.js");

const dbconnect = async () => {
  try {
    mongoose.connect(DB_URI);
    console.log("Database connection success");
  } catch (error) {
    console.log("Failed to connect database", error);
  }
};

module.exports = { dbconnect };
