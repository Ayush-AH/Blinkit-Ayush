const express = require("express")
const router = express.Router()
const productModel = require("../model/product-model")
const upload = require("../config/multer")
const { isLoggedIn } = require("../middlewear/login-middlewear")
const userModel = require("../model/user-model")

router.get("/", isLoggedIn,async function (req, res) {
    let user = await userModel.findOne({email:req.user.email})
    let products = await productModel.aggregate([
        {
            $group: {
                _id: "$category",
                products: {
                    $push: "$$ROOT"
                }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                products: 1
            }
        }
    ])
    const formattedResult = products.reduce((acc, item) => {
        acc[item.category] = item.products;
        return acc;
    }, {});
    let randomProds = await productModel.aggregate([
        {
          $sample: { size: 3 } 
        }
      ])
    res.render("index",{products:formattedResult , rnproducts:randomProds , user})
})

router.post("/create", upload.single("image"), async function (req, res) {
    let { name, image, price, category, stock, description } = req.body
    if (!(name || price || category || stock || description)) return res.send("empty fields")
    if (!req.file.buffer) return res.send("image is required")

    let product = await productModel.create({
        name,
        price,
        description,
        stock,
        category,
        image: req.file.buffer,
        mimetype: req.file.mimetype
    })
    res.redirect("/admin/products")
})

router.get("/delete/:id", isLoggedIn, async function (req, res) {
    if (!req.user.admin === "admin") return res.send("You don't have permission to delete!!")
    let product = await productModel.findOneAndDelete({ _id: req.params.id })
    res.redirect("/admin/products")
})
router.post("/delete", isLoggedIn, async function (req, res) {
    let { product_id } = req.body
    if (!req.user.admin === "admin") return res.send("You don't have permission to delete!!")
    let product = await productModel.findOneAndDelete({ _id: product_id })
    res.redirect("/admin/products")
})

module.exports = router