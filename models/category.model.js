const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 500 },
    image: { type: String}
});


module.exports = mongoose.model("Category", categorySchema);
