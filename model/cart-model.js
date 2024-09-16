const mongoose = require("mongoose")


const cartModel = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }],
    totalPrice:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("cart",cartModel)