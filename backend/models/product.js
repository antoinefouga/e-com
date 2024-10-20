const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter product name"],
    trim: true,
    maxLenght: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    require: [true, "Please enter product price"],
    maxLenght: [5, "Product price cannot exceed 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    require: [true, "Please enter product name"],
    trim: true,
    maxLenght: [100, "Product name cannot exceed 100 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    required: [true, "Please select category for this product"],
    enum: {
      values: ["Cigarettes électroniques", "E-liquides", "Acessoires"],
      message: "Please select correct category for product",
    },
  },
  stock: {
    type: Number,
    require: [true, "Please enter product stock"],
    maxLenght: [5, "Product stock cannot exceed 5 characters"],
    default: 0,
  },
});

module.exports = mongoose.model("Product", productSchema);
