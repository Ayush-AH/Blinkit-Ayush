const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/blinkit")
.then(function(){
    console.log("connected to db");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection