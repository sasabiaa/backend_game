const express = require("express");
const router = express.Router();
const {
  getPredictResult,
  getDiseaseResult,
} = require("../service/predictService.js");

router.get("/request/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const response = await getPredictResult(city);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).json({ message: error.message || error });
  }
});

router.get("/request/:city/:cough/:fever/:fatigue", async (req, res) => {
  try {
    const city = req.params.city;
    const cough = req.params.cough;
    const fever = req.params.fever;
    const fatigue = req.params.fatigue;
    const response = await getDiseaseResult(city, cough, fever, fatigue);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).json({ message: error.message || error });
  }
});

module.exports = router;
