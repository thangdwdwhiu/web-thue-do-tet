const categoryRoute = require("express").Router();
const DanhMucController = require("../controllers/categories.controler")

categoryRoute.get("/", DanhMucController.getAlls);



module.exports = categoryRoute;