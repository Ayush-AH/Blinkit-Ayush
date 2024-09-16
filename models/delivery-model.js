const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Delivery Schema
const deliverySchema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
    required: true,
  },
  deliveryBoy: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "in-transit", "delivered", "cancelled"], // Example status values
  },
  trackingURL: {
    type: String,
    required: true,
    trim: true,
  },
  estimatedDeliveryTime: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create the Delivery Model
const deliveryModel = mongoose.model("Delivery", deliverySchema);

// Joi Validation Schema
const validateDelivery = (deliveryData) => {
  const schema = Joi.object({
    order: Joi.string().required(),
    deliveryBoy: Joi.string().min(3).max(100).required(),
    status: Joi.string()
      .valid("pending", "in-transit", "delivered", "cancelled")
      .required(),
    trackingURL: Joi.string().uri(),
    estimatedDeliveryTime: Joi.string().required(),
  });
  return schema.validate(deliveryData);
};

// Exporting the Mongoose Model and Joi Validation Function
module.exports = {
  deliveryModel,
  validateDelivery,
};
