const express = require("express");
const router = express.Router();

const products = require("../controllers/productController");

router.get("/product/:id", products.getSingleProduct);
router.get("/products", products.getProducts);
router.post("/admin/product/new", products.newProduct);
router
  .route("/admin/product/:id")
  .put(products.updateProduct)
  .delete(products.deleteProduct);

module.exports = router;
