const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Admin Schema
const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/, // Simple regex for email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["superadmin", "admin", "moderator"], // Example roles
    required: true,
  },
});

// Create the Admin Model
const adminModel = mongoose.model("Admin", adminSchema);

// Joi Validation Schema
const validateAdmin = (adminData) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid("superadmin", "admin", "moderator").required(),
  });
  return schema.validate(adminData);
};

// Exporting the Mongoose Model and Joi Validation Function
module.exports = {
  adminModel,
  validateAdmin,
};
