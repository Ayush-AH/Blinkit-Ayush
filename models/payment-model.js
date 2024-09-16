const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Payment Schema
const paymentSchema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  method: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  transaction: {
    type: Number,
    required: true,
    unique: true,
  },
});

// Create the Payment Model
const paymentModel = mongoose.model("Payment", paymentSchema);

// Joi Validation Schema
const validatePayment = (paymentData) => {
  const schema = Joi.object({
    order: Joi.string().required(),
    amount: Joi.number().min(0).required(),
    method: Joi.number().required(), // e.g., 1 = Credit Card, 2 = PayPal, 3 = Bank Transfer
    status: Joi.number().required(), // 0 = Pending, 1 = Completed
    transaction: Joi.number().required(),
  });
  return schema.validate(paymentData);
};

// Exporting the Mongoose Model and Joi Validation Function
module.exports = {
  paymentModel,
  validatePayment,
};
