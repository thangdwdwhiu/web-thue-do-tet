const { SanPham, DanhGia, NguoiDung } = require("../models");

class ProductDetail {
  async getProductDetail(req, res, next) {
    const { slug } = req.params;
    if (!slug) {
      throw createError(404, "sản phẩm không tồn tại", null);
    }
    const id = slug.split("-").pop();


    try {
const details = await SanPham.findOne({
  where: { id },
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
          as: "nguoiDanhGia", 
          
        }
      ]
    }
  ]
});

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
