const mongoose = require("mongoose")


const categoryModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("category",categoryModel)