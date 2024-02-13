const mongoose = require("mongoose");

const OrderHistorySchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },    
      order_place_time : {type : String}
},{timestamps : true})

module.exports = mongoose.model("purchased Product" ,OrderHistorySchema)