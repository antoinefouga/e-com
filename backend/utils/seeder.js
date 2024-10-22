const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const products = require("../data/product.json");

// setting dotenv file
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.info("Products are deleted");

    await Product.insertMany(products);
    console.info("All products are added");

    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
};

seedProducts();
