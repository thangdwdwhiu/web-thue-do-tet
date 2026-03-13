const { body } = require("express-validator");

const createProductValidator = [
  body("ten_san_pham")
    .notEmpty()
    .withMessage("Tên sản phẩm không được để trống")
    .isLength({ min: 3, max: 120 })
    .withMessage("Tên sản phẩm phải từ 3 - 120 kí tự"),

  body("gia_hien_tai")
    .notEmpty()
    .withMessage("Giá không được để trống")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Giá phải là số nguyên không âm")
    .toInt(),

  body("so_luong_ton")
    .notEmpty()
    .withMessage("Số lượng tồn không được để trống")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Số lượng tồn phải là số nguyên không âm")
    .toInt(),

  body("mo_ta")
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage("Mô tả phải từ 10 - 500 kí tự"),

  body("danh_muc_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Danh mục không hợp lệ")
    .toInt(),

  // Advanced validations you can enable or customize:
  // - enforce price minimum (e.g. >= 5000)
  // - enforce price multiple (e.g. multiple of 1000)
  // - enforce upper bounds for stock
];

module.exports = {
  createProductValidator,
};
