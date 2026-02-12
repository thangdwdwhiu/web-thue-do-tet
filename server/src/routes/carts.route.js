const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validationErrorHandler = require("../middlewares/validationError.middleware");
const { addToCartValidator, changeQuantityValidator } = require("../validator/cart.validator");

const cartRoute  = require("express").Router();


cartRoute.get("/", authMiddleware, cartController.getAlls);
cartRoute.post("/", authMiddleware, addToCartValidator, validationErrorHandler, cartController.addProduct);
cartRoute.put("/:id", authMiddleware, changeQuantityValidator, validationErrorHandler, cartController.changeQuantityCartItem);
cartRoute.delete("/:id", authMiddleware, cartController.deleteCartItem);

module.exports = cartRoute;