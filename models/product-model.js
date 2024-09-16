const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Product Schema
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: Boolean,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  image: {
    type: String,
    trim: true,
  },
});

// Create the Product Model
const productModel = mongoose.model("Product", productSchema);

// Joi Validation Schema
const validateProduct = (productData) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    stock: Joi.boolean().min(0).required(),
    description: Joi.string().max(1000).optional(),
    image: Joi.string().optional(),
  });
  return schema.validate(productData);
};

// Exporting the Mongoose Model and Joi Validation Function
module.exports = {
  productModel,
  validateProduct,
};
