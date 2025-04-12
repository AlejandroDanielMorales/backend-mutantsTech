const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productSchema = new Schema({
    createdAt: { type: Date, default: Date.now }, // ← Esto lo llena automáticamente
    name: String,
    category: String,
    description: String,
    price: Number,
    image: String,
    rating: Number,
    active: Boolean
  });
  

module.exports = mongoose.model("Product",productSchema);
