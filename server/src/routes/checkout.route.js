const authMiddleware = require("../middlewares/auth.middleware");
const validationErrorHandler = require("../middlewares/validationError.middleware");
const checkoutController = require("../controllers/checkout.controller");
const { checkoutSessionValidator } = require("../validator/checkout.validator");

const checkoutRoute = require("express").Router()

checkoutRoute.post(
  "/session",
  authMiddleware,
  checkoutSessionValidator,
  validationErrorHandler,
  checkoutController.session
);
checkoutRoute.get("/session/:token", 
    authMiddleware,
    checkoutController.getSession
);

const { confirmOrderValidator } = require("../validator/checkout.validator");

checkoutRoute.post(
  "/confirm",
  authMiddleware,
  confirmOrderValidator,
  validationErrorHandler,
  checkoutController.confirm
);


module.exports = checkoutRoute;