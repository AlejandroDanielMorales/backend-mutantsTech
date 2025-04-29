require("dotenv").config();
const app = require("./app.js");
const mongoose = require("mongoose");

const mongo_uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

mongoose.connect(mongo_uri)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
