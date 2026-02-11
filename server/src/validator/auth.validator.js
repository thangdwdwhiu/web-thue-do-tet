const { body, validationResult } = require("express-validator");

// Validator cho Register
const registerValidator = [
  body("ho_ten")
    .trim()
    .notEmpty()
    .withMessage("Họ tên không được để trống")
    .isLength({ min: 3, max: 100 })
    .withMessage("Họ tên phải từ 3-100 ký tự"),

  body("ten_tai_khoan")
    .trim()
    .notEmpty()
    .withMessage("Tên tài khoản không được để trống")
    .isLength({ min: 3, max: 50 })
    .withMessage("Tên tài khoản phải từ 3-50 ký tự")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Tên tài khoản chỉ chứa chữ, số và dấu gạch dưới"),

  body("mat_khau")
    .notEmpty()
    .withMessage("Mật khẩu không được để trống")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải từ 6 ký tự trở lên"),

  body("so_dien_thoai")
    .trim()
    .notEmpty()
    .withMessage("Số điện thoại không được để trống")
    .matches(/^[0-9]{10}$/)
    .withMessage("Số điện thoại phải là 10 chữ số"),
];

// Validator cho Login
const loginValidator = [
  body("ten_tai_khoan")
    .trim()
    .notEmpty()
    .withMessage("Tên tài khoản không được để trống"),

  body("mat_khau")
    .notEmpty()
    .withMessage("Mật khẩu không được để trống"),
];

module.exports = {
  registerValidator,
  loginValidator,
};
