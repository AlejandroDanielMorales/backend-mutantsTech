const app = require("./app.js")

const mongoose = require("mongoose")

const mongo_uri ="mongodb+srv://master-user:jimmorrison27@mt-ecommerce.8z3yt5m.mongodb.net/?retryWrites=true&w=majority&appName=mt-ecommerce"
const PORT = process.env.PORT || 3000

mongoose.connect(mongo_uri)
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error("MongoDB connection error:", err)
  })  

