const mongoose = require("mongoose")
const { type } = require("os")


const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:Buffer,
        required:true
    },
    mimetype:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("product",productSchema)