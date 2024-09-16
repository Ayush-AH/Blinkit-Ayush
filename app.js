const express = require("express")
const app = express()
require("dotenv").config()
require("./config/mongoose-connection")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")
const indexRouter = require("./routes/index-router")
const authRouter = require("./routes/auth-router")
const adminRouter = require("./routes/admin-router")
const productRouter = require("./routes/product-router")
const userRouter = require("./routes/user-router")
const cartRouter = require("./routes/cart-router")
const passport = require('passport');
require("./config/google-oauth")

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash())
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());


app.use("/",indexRouter)
app.use("/auth",authRouter)
app.use("/admin",adminRouter)
app.use("/products",productRouter)
app.use("/users",userRouter)
app.use("/cart",cartRouter)

app.listen(3000)