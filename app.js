const express = require("express")
const routes = require("./routes/index")
const app = express()
app.use(express.json());
app.use("/api",routes) // Middleware to parse JSON bodies



module.exports = app