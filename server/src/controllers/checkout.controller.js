const { v4: uuid } = require("uuid");
const createError = require("../utils/createError.util");
const db = require("../models/index");
const { SanPham, HinhAnhSanPham, DonHang, ChiTietDonHang, sequelize } = db;
const { where } = require("sequelize");
const { generateOrderCode, generateVietQR } = require("../utils/vietqr.util");
const checkoutStore = new Map();

    const BANK_INFO = {
      bankId: process.env.BANK_ID ?? "ICB", // VietinBank (bắt buộc là ICB)
      accountNo: process.env.ACCOUNT_NO ?? "104880268042", // SỐ TK CỦA BẠN
      accountName:process.env.ACCOUNT_NAME ?? "DAO XUAN THANG", // IN HOA, KHÔNG DẤU
    };
class CheckoutController {
  async session(req, res, next) {
    try {
      const nguoi_dung_id = req.user?.id;
      const { san_pham_id, so_luong, gia_ban, size_da_chon } = req.body;

      const fields = {
        nguoi_dung_id,
        san_pham_id,
        so_luong,
        gia_ban,
        size_da_chon,
      };

      const token = uuid();
      checkoutStore.set(token, fields);

      return res.json({
        success: true,
        token: token,
      });
    } catch (err) {
      next(err);
    }
  }
  // lay sesion
  async getSession(req, res, next) {
    try {
      const token = req.params.token;
      if (!token) {
        throw createError(404, "token không hợp lệ", null);
      }
      const session = checkoutStore.get(token);
      if (!session) {
        throw createError(404, "đơn hàng không tồn tại", null, null);
      }
      const {id: nguoi_dung_id} = req.user
      const { san_pham_id, so_luong, gia_ban, size_da_chon } = session;
      const pro = await SanPham.findByPk(san_pham_id, {
        include: [
          {
            model: HinhAnhSanPham,
            as: "hinhAnh",
            attributes: ["url_anh"],
          },
        ],
      });
      const amount = pro.gia_hien_tai * so_luong;
      const orderCode = generateOrderCode(nguoi_dung_id);
      const qrUrl = generateVietQR({
        bankId: "ICB",
        accountNo: BANK_INFO.accountNo,
        accountName: BANK_INFO.accountName,
        amount,
        message: orderCode,
      });
      res.status(200).json({
        success: true,
        data: { ...pro.toJSON(), so_luong, size_da_chon , qrUrl, orderCode},
      });
    } catch (err) {
      next(err);
    }
  
 

  }
      async confirm(req, res, next) {
      try {
        const nguoi_dung_id = req.user?.id;
        const {
          token,
          ten_nguoi_nhan,
          so_dien_thoai_nhan,
          dia_chi_chi_tiet,
          tinh_thanh,
          quan_huyen,
          phuong_xa,
          phuong_thuc_thanh_toan,
        } = req.body;

        const session = checkoutStore.get(token);
        if (!session) {
          throw createError(404, "Phiên thanh toán không tồn tại", "SESSION_NOT_FOUND");
        }

        const { san_pham_id, so_luong, gia_ban, size_da_chon } = session;

        const product = await SanPham.findByPk(san_pham_id);
        if (!product) {
          throw createError(404, "Sản phẩm không tồn tại", "PRODUCT_NOT_FOUND");
        }

        const unitPrice = product.gia_hien_tai || gia_ban || 0;
        const tong_tien = Number(unitPrice) * Number(so_luong);

        const orderCode = generateOrderCode(nguoi_dung_id);

     
        const result = await sequelize.transaction(async (t) => {
          const donHang = await DonHang.create(
            {
              ten_nguoi_nhan,
              so_dien_thoai_nhan,
              dia_chi_chi_tiet,
              tinh_thanh,
              quan_huyen,
              phuong_xa,
              phuong_thuc_thanh_toan,
              tong_tien,
              ngay_dat: new Date(),
              trang_thai: "chờ xác nhận",
              nguoi_dung_id,
            
            },
            { transaction: t }
          );

          const chiTiet = await ChiTietDonHang.create(
            {
              so_luong,
              gia_ban: unitPrice,
              size_da_chon,
              don_hang_id: donHang.id,
              san_pham_id,
            },
            { transaction: t }
          );

          return { donHang, chiTiet };
        });

        
        checkoutStore.delete(token);

        res.status(201).json({
          success: true,
          data: {
            orderCode,
            order: result.donHang,
            items: result.chiTiet,
          },
        });
      } catch (err) {
        next(err);
      }
    }
  
}

module.exports = new CheckoutController();
