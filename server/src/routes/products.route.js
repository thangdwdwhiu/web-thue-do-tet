const productRoute = require("express").Router()
const ProduductController = require("../controllers/products.controller");
const ProductDetailController = require("../controllers/productDetail");

productRoute.get("/", ProduductController.getAlls);
productRoute.get("/:slug", ProductDetailController.getProductDetail);


module.exports = productRoute;