const mongoose = require("mongoose")

const addresSchema = mongoose.Schema({
    state:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pin:{
        type:Number,
        required:true
    }
})

const cartSchema = mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    quantity:{
        type:Number,
        required:true
    }
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    cart:[cartSchema],
    address:[addresSchema]
},{timestamps:true})


module.exports = mongoose.model("user",userSchema)