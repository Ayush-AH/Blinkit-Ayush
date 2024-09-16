const express = require("express")
const router = express.Router()
const { isLoggedIn } = require("../middlewear/login-middlewear")
const productModel = require("../model/product-model")
const userModel = require("../model/user-model")

router.get("/", isLoggedIn, async function (req, res) {
    const user = await userModel.findOne({ _id: req.user._id }).populate({
        path: "cart",
        populate: {
            path: "product"
        }
    })
    var finalprice = 0
    user.cart.forEach(function (item) {
        finalprice += item.product.price * item.quantity
    })
    res.render("cart", { user, finalprice })
})

router.get("/add/:id", isLoggedIn, async function (req, res) {
    let product = await productModel.findOne({ _id: req.params.id })
    if (!product) return res.send("Invalid Product Id")
    const user = await userModel.findOne({ _id: req.user._id }).populate({
        path: "cart",
        populate: {
            path: "product"
        }
    })
    var productExists = false

    if (user.cart.length > 0) {
        user.cart.forEach(function (item) {
            if (item.product._id.toString() === req.params.id) {
                item.quantity += 1,
                productExists = true
            } 
        })
        if(!productExists){
                user.cart.push({ product: product._id, quantity: 1 })
        }
    }
    else {
        user.cart.push({ product: product._id, quantity: 1 })
    }
    await user.save()
    res.redirect("/products")
})
router.get("/remove/:id", isLoggedIn, async function (req, res) {
    let product = await productModel.findOne({ _id: req.params.id })
    if (!product) return res.send("Invalid Product Id")
    const user = await userModel.findOne({ _id: req.user._id }).populate({
        path: "cart",
        populate: {
            path: "product"
        }
    })

    if (user.cart.length > 0) {
        user.cart.forEach(function (item, index) {
            if (item.product._id.toString() === req.params.id) {
                if (item.quantity > 1) {
                    item.quantity -= 1
                } else {
                    user.cart.splice(index, 1)
                }
            }
        })
    }
    await user.save()
    res.redirect("/products")
})

router.get("/addtocart/:id", isLoggedIn, async function (req, res) {
    let product = await productModel.findOne({ _id: req.params.id })
    if (!product) return res.send("Invalid Product Id")
    const user = await userModel.findOne({ _id: req.user._id }).populate({
        path: "cart",
        populate: {
            path: "product"
        }
    })
    var productExists = false

    if (user.cart.length > 0) {
        user.cart.forEach(function (item) {
            if (item.product._id.toString() === req.params.id) {
                item.quantity += 1
                productExists = true
            }
        })
        if (!productExists) {
            user.cart.push({ product: product._id, quantity: 1 });
        }
    }
    else {
        user.cart.push({ product: product._id, quantity: 1 })
    }
    await user.save()
    res.redirect("/cart")
})
router.get("/removefromcart/:id", isLoggedIn, async function (req, res) {
    let product = await productModel.findOne({ _id: req.params.id })
    if (!product) return res.send("Invalid Product Id")
    const user = await userModel.findOne({ _id: req.user._id }).populate({
        path: "cart",
        populate: {
            path: "product"
        }
    })

    if (user.cart.length > 0) {
        user.cart.forEach(function (item, index) {
            if (item.product._id.toString() === req.params.id) {
                if (item.quantity > 1) {
                    item.quantity -= 1
                } else {
                    user.cart.splice(index, 1)
                }
            }
        })
    }
    await user.save()
    res.redirect("/cart")
})


module.exports = router