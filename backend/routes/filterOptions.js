const express = require("express");
const router = express.Router();
const Data = require("../models/Data");

router.get("/", async (req, res) => {
  try {
    const filterOptions = {
      end_year: await Data.distinct("end_year"),
      topic: await Data.distinct("topic"),
      sector: await Data.distinct("sector"),
      region: await Data.distinct("region"),
      pestle: await Data.distinct("pestle"),
      source: await Data.distinct("source"),
      // Add other filter options as needed
    };
    res.json(filterOptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
