const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/data", require("./routes/data"));
app.use("/api/filter-options", require("./routes/filterOptions"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
