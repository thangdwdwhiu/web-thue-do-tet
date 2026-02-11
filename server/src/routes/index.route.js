const express = require("express");
const router = express.Router();


const authRoute = require("./auth.route");
const userRoute = require("./users.route");
const categoryRoute = require("./categories.route");
const productRoute = require("./products.route");
const cartRoute = require("./carts.route");
const orderRoute = require("./orders.route");
const reviewRoute = require("./reviews.route");
const checkoutRoute = require("./checkout.route");
// Gắn route
router.use("/auth", authRoute);          // /api/auth
// router.use("/users", userRoute);         // /api/users
router.use("/categories", categoryRoute);// /api/categories
router.use("/products", productRoute);   // /api/products
router.use("/checkout", checkoutRoute);
router.use("/cart", cartRoute);           // /api/cart
// router.use("/orders", orderRoute);        // /api/orders
// router.use("/reviews", reviewRoute);      // /api/reviews

// Route test
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running 🚀"
  });
});

module.exports = router;
