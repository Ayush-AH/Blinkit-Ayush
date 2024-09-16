const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Cart Schema
const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Create the Cart Model
const cartModel = mongoose.model("Cart", cartSchema);

// Joi Validation Schema
const validateCart = (cartData) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    products: Joi.array().items(Joi.string().required()).required(),
    totalPrice: Joi.number().min(0).required(),
  });
  return schema.validate(cartData);
};

// Exporting the Mongoose Model and Joi Validation Function
module.exports = {
  cartModel,
  validateCart,
};
