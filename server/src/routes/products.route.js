const productRoute = require("express").Router()
const ProduductController = require("../controllers/products.controller");
const ProductDetailController = require("../controllers/productDetail");
const { createProductValidator } = require("../validator/product.validator");
const upload = require("../middlewares/uploadProductPhoto.middleware");
const validationErrorHandler = require("../middlewares/validationError.middleware");
const requireImages = require("../middlewares/requireImages.middleware");

productRoute.get("/", ProduductController.getAlls);
productRoute.get("/:slug", ProductDetailController.getProductDetail);

// Example admin create endpoint (uses server-side validation)
// Expect field name `images` containing up to 5 image files.
// Expect field name `images` containing up to 5 image files.
// Order: multer parses files -> validators run -> validation errors handled -> ensure images exist -> controller
productRoute.post(
	"/",
	upload.array('images', 5),
	createProductValidator,
	validationErrorHandler,
	requireImages,
	ProduductController.create
);

module.exports = productRoute;