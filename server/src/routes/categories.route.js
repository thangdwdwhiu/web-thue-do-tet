const categoryRoute = require("express").Router();
const DanhMucController = require("../controllers/categories.controler");
const authMiddleware = require("../middlewares/auth.middleware");
const requireRole = require("../middlewares/requireRole.middleware");
const validationErrorHandler = require("../middlewares/validationError.middleware");
const { nameCategoryValidator } = require("../validator/category.validator");

categoryRoute.get("/", DanhMucController.getAlls);
categoryRoute.post("/", authMiddleware, requireRole(["admin"]), nameCategoryValidator, validationErrorHandler, DanhMucController.createCategory);
categoryRoute.delete("/:id", authMiddleware, requireRole(["admin"]), DanhMucController.removeCategory);
categoryRoute.put("/:id", authMiddleware, requireRole(["admin"]) ,nameCategoryValidator, validationErrorHandler, DanhMucController.updateCategoryName )

module.exports = categoryRoute;