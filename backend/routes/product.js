const express = require("express");
const router = express.Router();

const products = require("../controllers/productController");

router.get("/products", products.getProducts);
router.post("/product/new", products.newProduct);

module.exports = router;
