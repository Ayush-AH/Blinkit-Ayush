const mongoose = require("mongoose");
const Joi = require("joi");

// Address Sub-Schema for Mongoose
const AddressSchema = mongoose.Schema({
  state: {
    type: String,
    required: true, // Make state required
  },
  zip: {
    type: Number,
    required: true, // Make zip required
    min: [1000, "Zip code too short"], // Example validation for zip
  },
  city: {
    type: String,
    required: true, // Make city required
  },
  address: {
    type: String,
    required: true, // Make address required
  },
});

// User Schema for Mongoose
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Make name required
    },
    email: {
      type: String,
      required: true,
      unique: true, // Email must be unique
    },
    password: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
      minlength: 10, // Example phone validation (depends on your country format)
    },
    addresses: [AddressSchema],
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

// Joi validation schema for user
const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6),
    phone: Joi.number().min(1000000000), // Phone should be a minimum of 10 digits
    addresses: Joi.array().items(
      Joi.object({
        state: Joi.string().required(),
        zip: Joi.number().min(1000).required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
      })
    ),
  });

  return schema.validate(data);
};

module.exports = {
  userModel,
  validateUser,
};
