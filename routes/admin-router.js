const express = require("express")
const router = express.Router()
const adminModel = require("../model/admin-model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const productModel = require("../model/product-model")
const { isLoggedIn } = require("../middlewear/admin-login-middlewear")
const Redis = require("ioredis")


const redisClient = new Redis({
    host: "redis-13238.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: "13238",
    password: "IJ9XtMMVgiVmr8LruRIDbNk8Ll0yjZk6"
})

redisClient.on("connect", function () {
    console.log("connected to ioredis");
})

router.get("/dashboard", isLoggedIn, async function (req, res) {
    let products = await productModel.find()
    res.render("admin_dashboard", { products })
})
router.get("/products", isLoggedIn, async function (req, res) {
    let redisProducts = await redisClient.get("products")

    if (redisProducts) {
        console.log("redis");
        var data = JSON.parse(redisProducts)
        data = data.map(product => {
            if (product.image) {
                product.image = Buffer.from(product.image, 'base64');
            }
            return product;
        });
        return res.render("admin_products", { products: data })
    }

    console.log("db se aya");
    let products = await productModel.find()
    await redisClient.set("products", JSON.stringify(products),"EX",10)
    res.render("admin_products", { products })
})

router.get("/search/:productName", async function (req, res) {
    let name = new RegExp(`^${req.params.productName}`, "i")
    let products = await productModel.find({ name })
    console.log(products);

    res.json(products)
})
router.get("/login", function (req, res) {
    res.render("admin_login")
})

if (process.env.NODE_ENV === "development") {
    router.get("/register", async function (req, res) {
        let admin = await adminModel.find()
        if (admin.length > 0) return res.send("Admin is already registered")

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash("ayush", salt, async function (err, hash) {
                admin = await adminModel.create({
                    name: "ayush",
                    email: "ayushahirwar6673@gmail.com",
                    password: hash,
                    role: "admin"
                })
                let token = jwt.sign({ email: admin.email, isAdmin: admin.role }, process.env.JWT_SECRET)
                res.cookie("adminToken", token)
                res.send("admin created sucessfully")

            })
        })
    })
}

router.post("/login", async function (req, res) {
    let { email, password } = req.body
    if (!(email || password)) return res.send("empty fields")

    let admin = await adminModel.findOne({ email })
    if (!admin) return res.send("email or paaword is incorrect")

    bcrypt.compare(password, admin.password, function (err, result) {
        if (!result) return res.send("email or password is incorrect")
        let token = jwt.sign({ email: admin.email, isAdmin: admin.role }, process.env.JWT_SECRET)
        res.cookie("adminToken", token)
        res.redirect("/admin/dashboard")
    })


})

router.get("/logout", function (req, res) {
    res.cookie("adminToken", "")
    res.redirect("/admin/login")
})

module.exports = router