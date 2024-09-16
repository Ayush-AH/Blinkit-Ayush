const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Order Schema
const orderSchema = mongoose.Schema({
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
  address: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"], // 0 = Pending, 1 = Shipped, 2 = Delivered
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment",
    required: true,
  },
  delivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "delivery",
    required: true,
  },
});

// Create the Order Model
const orderModel = mongoose.model("Order", orderSchema);

// Joi Validation Schema
const validateOrder = (orderData) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    products: Joi.array().items(Joi.string().required()).required(),
    totalPrice: Joi.number().min(0).required(),
    address: Joi.string().required(),
    status: Joi.number()
      .valid("pending", "processing", "shipped", "delivered", "cancelled")
      .required(), // 0 = Pending, 1 = Shipped, 2 = Delivered
    payment: Joi.string().required(),
    delivery: Joi.string().required(),
  });
  return schema.validate(orderData);
};

// Exporting the Mongoose Model and Joi Validation Function
module.exports = {
  orderModel,
  validateOrder,
};
