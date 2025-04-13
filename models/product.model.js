const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  category: { type: String, required: true, trim: true },
  description: { type: String, trim: true, maxlength: 500 },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, trim: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  active: { type: Boolean, default: true }
});

  

module.exports = mongoose.model("Product",productSchema);
