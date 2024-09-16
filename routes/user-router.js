const express = require("express")
const router = express.Router()

router.get("/login",function(req,res){
    res.render("user_login")
})

router.get("/logout",function(req,res){
    res.cookie("token","")
    res.redirect("/users/login")
})


module.exports = router