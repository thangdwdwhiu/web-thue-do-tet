const express = require("express");
const AuthController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validationErrorHandler = require("../middlewares/validationError.middleware");
const { registerValidator, loginValidator } = require("../validator/auth.validator");

const authRoute = express.Router();

authRoute.delete("/", AuthController.logout);
authRoute.post("/register", registerValidator, validationErrorHandler, AuthController.register)
authRoute.post("/login", loginValidator, validationErrorHandler, AuthController.login)
authRoute.get("/me", authMiddleware, AuthController.me);


module.exports = authRoute;