const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [5, "Product price cannot exceed 5 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: {
    public_id: {
      type: String,
      requiredd: true,
    },
    url: {
      type: String,
      requiredd: true,
    },
  },
  category: {
    type: String,
    requiredd: [true, "Please select category for this product"],
    enum: {
      values: ["Cigarettes électroniques", "E-liquides", "Acessoires"],
      message: "Please select correct category for product",
    },
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [5, "Product stock cannot exceed 5 characters"],
  },
});

module.exports = mongoose.model("Product", productSchema);
