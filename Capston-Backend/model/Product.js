
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, default: null },
  description: { type: String, default: null },
  price: { type: Number, unique: true },
    image : {type : String },
},{timestamps : true});

module.exports = mongoose.model('Product', ProductSchema)
