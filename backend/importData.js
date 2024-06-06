const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Data = require("./models/Data");
const data = require("./jsondata.json");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    Data.insertMany(data)
      .then(() => {
        console.log("Data Imported");
        process.exit();
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  });
