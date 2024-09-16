const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Category Schema
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
    unique: true,
  },
});

// Create the Category Model
const categoryModel = mongoose.model("Category", categorySchema);

// Joi Validation Schema
const validateCategory = (categoryData) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
  });
  return schema.validate(categoryData);
};

// Exporting the Mongoose Model and Joi Validation Function
module.exports = {
  categoryModel,
  validateCategory,
};
