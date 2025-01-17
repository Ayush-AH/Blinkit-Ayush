const mongoose = require("mongoose")


const adminSchema = mongoose.Schema({
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
    role:{
        type:String,
        required:true
    },
},{timestamps:true})


module.exports = mongoose.model("admin",adminSchema)