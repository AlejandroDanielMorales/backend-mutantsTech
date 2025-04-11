const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    createdAt: { type: Date, default: Date.now }, // ← Esto lo llena automáticamente
    name: String,
    profilePicture: String,
    rol: String,
    country: String,
    email: String,
    password: String,
    isLogged: Boolean
  });
  

module.exports = mongoose.model("User",userSchema);
