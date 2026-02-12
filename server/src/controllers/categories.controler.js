const { where } = require("sequelize");
const { DanhMuc, SanPham } = require("../models/index");
const createError = require("../utils/createError.util");

class DanhMucController {
  async getAlls(req, res, next) {
    try {
      const danhMucAlls = await DanhMuc.findAll({
        order: [["createdAt", "ASC"]],
      });

      return res.status(200).json({
        success: true,
        mess: "Lấy danh mục thành công",
        categories: danhMucAlls,
      });
    } catch (err) {
      next(err);
    }
  }

  async createCategory(req, res, next) {
    try {
      const { ten_danh_muc } = req.body;

      if (!ten_danh_muc) {
        return res.status(400).json({
          success: false,
          mess: "Tên danh mục không được để trống",
        });
      }

      const existingCategory = await DanhMuc.findOne({
        where: { ten_danh_muc },
      });

      if (existingCategory) {
        throw createError(400, "Danh mục đã tồn tại");
      }

      const newCategory = await DanhMuc.create({
        ten_danh_muc,
      });

      return res.status(201).json({
        success: true,
        mess: "Tạo danh mục thành công",
        category: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeCategory(req, res, next) {
    try {
      const maDanhMuc = req.params.id;

      const proCount  =await SanPham.count({
        where: {
            danh_muc_id: maDanhMuc
        }
      });
      if (proCount > 0) {
        throw createError(409, "Danh mục này hiện vẫn còn sản phẩm")
      }

      if (!maDanhMuc) {
        throw createError(404, "Thiếu mã danh mục");
      }
      const danhMuc = await DanhMuc.findByPk(maDanhMuc);

      if (!danhMuc) {
        throw createError(409, "Danh mục không tồn tại trên hệ thống");
      }
      await danhMuc.destroy();

      return res.status(203).json({
        sucess: true,
        mess: "Xóa thành công",
        id: maDanhMuc
      })
    } catch (err) {
      next(err);
    }
  }

  async updateCategoryName(req, res, next) {

    try {
        const id = req.params.id;
        const {ten_danh_muc} = req.body
        if (!id) {
            throw  createError(404, "tham số không hợp lệ");
        }
        
        const danhMuc = await DanhMuc.findByPk(id);
        if (!danhMuc) {
            throw createError(400, "Danh mục không tồn tại");
        }
        danhMuc.ten_danh_muc = ten_danh_muc;
       await danhMuc.save();

       res.status(200).json({
        succes: true,
        category: danhMuc
       })
    }
    catch(err) {
        next(err);
    }
  }
  
}


module.exports = new DanhMucController();
