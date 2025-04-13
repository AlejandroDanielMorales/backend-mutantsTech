const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  profilePicture: { type: String, trim: true },
  rol: { type: String, enum: ["admin", "user"], default: "user" },
  country: { type: String, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true, 
    match: /^\S+@\S+\.\S+$/ 
  },
  password: { type: String, required: true, minlength: 6, select: false },
  isLogged: { type: Boolean, default: false }
}, { timestamps: true });
  

module.exports = mongoose.model("User",userSchema);
