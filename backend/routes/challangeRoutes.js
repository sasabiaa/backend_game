const express = require("express");
const router = express.Router();

const {
  doneChallange,
  getAllChallanges,
  getProgressChallanges,
  startChallanges,
} = require("../service/challangesService.js");

router.get("/getAllChallange/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getAllChallanges(id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).json({ message: error.message || error });
  }
});

router.get("/getProgressChallanges/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getProgressChallanges(id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).json({ message: error.message || error });
  }
});

router.post("/startChallange", async (req, res) => {
  try {
    const idUser = req.body.idUser;
    const idChallanges = req.body.idChallanges;
    const result = await startChallanges(idUser, idChallanges);
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).json({ message: error.message || error });
  }
});

router.post("/finishChallanges", async (req, res) => {
  try {
    const idUser = req.body.idUser;
    const idChallanges = req.body.idChallanges;
    const result = await doneChallange(idUser, idChallanges);
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).json({ message: error.message || error });
  }
});

module.exports = router;
