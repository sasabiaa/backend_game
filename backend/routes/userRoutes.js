const express = require("express");
const router = express.Router();
const { leaderboard } = require("../service/userService.js");

router.get("/leaderboard/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await leaderboard(id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).json({ message: error.message || error });
  }
});

module.exports = router;
