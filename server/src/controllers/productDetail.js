const { SanPham, DanhGia, NguoiDung } = require("../models");
const createError = require("../utils/createError.util");

class ProductDetail {

  async getProductDetail(req, res, next) {
    const { slug } = req.params;

    if (!slug) {
      throw createError(404, "Sản phẩm không tồn tại");
    }

    try {

      const details = await SanPham.findOne({
        where: { slug },
        include: [
          "hinhAnh",
          "sizes",
          "danhMuc",
          {
            model: DanhGia,
            as: "danhGia",
            include: [
              {
                model: NguoiDung,
                as: "nguoiDanhGia"
              }
            ]
          }
        ]
      });

      if (!details) {
        throw createError(404, "Không tìm thấy sản phẩm");
      }

      res.status(200).json({
        success: true,
        details
      });

    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProductDetail();