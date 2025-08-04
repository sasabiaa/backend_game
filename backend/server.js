const express = require("express");
const app = express();
const { dbconnect } = require("./config/database");
const cors = require("cors");

const predictRoutes = require("./routes/predictionRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const challangeRoutes = require("./routes/challangeRoutes.js");

app.use(cors());
app.use(express.json());

dbconnect()
  .then(() => {
    app.use("/predict", predictRoutes);
    app.use("/users", userRoutes);
    app.use("/challange", challangeRoutes);
    app.listen(8000, () => {
      console.log("Server connected");
    });
  })
  .catch((err) => {
    console.log("Something Wrong", err);
  });
