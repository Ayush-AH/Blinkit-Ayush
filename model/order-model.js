const mongoose = require("mongoose")
const { type } = require("os")


const orderModel = mongoose.Schema({
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
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    payment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"payment"
    },
    delivery:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"delivery"
    }
})

module.exports = mongoose.model("order",orderModel)