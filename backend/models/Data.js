const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  endYear: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  startYear: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

module.exports = mongoose.model("Data", dataSchema);
