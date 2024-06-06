const express = require("express");
const router = express.Router();
const Data = require("../models/Data");

router.get("/", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
