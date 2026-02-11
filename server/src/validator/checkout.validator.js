const { body } = require("express-validator");

// Validator cho Checkout Session
const checkoutSessionValidator = [
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

  body("gia_ban")
    .notEmpty()
    .withMessage("Giá bán không được để trống")
    .isFloat({ min: 0 })
    .withMessage("Giá bán phải là số dương"),

  body("size_da_chon")
    .trim()
    .notEmpty()
    .withMessage("Size không được để trống")
    .isLength({ min: 1, max: 50 })
    .withMessage("Size phải từ 1-50 ký tự"),
];

module.exports = {
  checkoutSessionValidator,
  // Validator cho confirm order
  confirmOrderValidator: [
    body("token").notEmpty().withMessage("Token phiên thanh toán không được để trống"),
    body("ten_nguoi_nhan").trim().notEmpty().withMessage("Tên người nhận không được để trống"),
    body("so_dien_thoai_nhan")
      .trim()
      .notEmpty()
      .withMessage("Số điện thoại người nhận không được để trống")
      .matches(/^[0-9]{10}$/)
      .withMessage("Số điện thoại phải là 10 chữ số"),
    body("dia_chi_chi_tiet").trim().notEmpty().withMessage("Địa chỉ chi tiết không được để trống"),
    body("tinh_thanh").trim().notEmpty().withMessage("Tỉnh/Thành không được để trống"),
    body("quan_huyen").trim().notEmpty().withMessage("Quận/Huyện không được để trống"),
    body("phuong_xa").trim().notEmpty().withMessage("Phường/Xã không được để trống"),
    body("phuong_thuc_thanh_toan")
      .trim()
      .notEmpty()
      .withMessage("Phương thức thanh toán không được để trống")
      .isIn(["COD", "BANKING", "chuyển khoản"]) 
      .withMessage("Phương thức thanh toán không hợp lệ"),
  ],
};
