const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

// get all products => api/v1/products
exports.getProducts = async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  try {
    const products = await apiFeatures.query;

    res.status(200).json({
      success: true,
      message: "Cette route affiche tous les produits dans la base de données",
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// get single product details => api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Produit non trouvé", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// Create new product => /api/v1/admin/product/new
exports.newProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// Update product => api/v1/admin/product/:id
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Produit non trouvé", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// Delete product => api/v1/admin/product/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Produit non trouvé", 404));
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Le produit a été supprimé",
    });
  } catch (error) {
    next(error);
  }
};
