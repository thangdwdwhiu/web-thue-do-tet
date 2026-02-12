const { body } = require("express-validator");

const nameCategoryValidator = [
    body("ten_danh_muc")
    .notEmpty()
    .withMessage("tên danh mục không được để trống")
    .isLength({min: 2, max: 50})
    .withMessage("tên danh mục phải từ 2 - 50 kí tự")

]


module.exports = {
    nameCategoryValidator
}