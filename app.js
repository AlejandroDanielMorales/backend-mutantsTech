const express = require("express")
const routes = require("./routes/index")
const app = express()
const cors = require("cors")


app.use(cors({ origin: 'https://frontend-mutantstech.onrender.com', credentials: true }));

app.use(express.json());

app.use("/api/uploads", express.static("uploads"));

app.use("/api",routes) 

module.exports = app