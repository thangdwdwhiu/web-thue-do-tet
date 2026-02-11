const { body } = require("express-validator");

// Validator cho Add Product to Cart
const addToCartValidator = [
  body("san_pham_id")
    .notEmpty()
    .withMessage("ID sản phẩm không được để trống")
    .isInt({ min: 1 })
    .withMessage("ID sản phẩm phải là số nguyên dương"),

  body("so_luong")
    .notEmpty()
    .withMessage("Số lượng không được để trống")
    .isInt({ min: 1 })
    .withMessage("Số lượng phải từ 1 trở lên"),

  body("size_chon")
    .trim()
    .notEmpty()
    .withMessage("Size không được để trống")
    .isLength({ min: 1, max: 50 })
    .withMessage("Size phải từ 1-50 ký tự"),
];

// Validator cho Change Quantity Cart Item
const changeQuantityValidator = [
  body("delta")
    .notEmpty()
    .withMessage("Mức thay đổi không được để trống")
    .isInt()
    .withMessage("Mức thay đổi phải là số nguyên")
    .custom((value) => {
      if (value === 0) {
        throw new Error("Mức thay đổi không thể bằng 0");
      }
      return true;
    }),
];

module.exports = {
  addToCartValidator,
  changeQuantityValidator,
};
