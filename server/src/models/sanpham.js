'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SanPham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
static associate(models) {

  SanPham.belongsTo(models.DanhMuc, { foreignKey: 'danh_muc_id', as: 'danhMuc' });
  

  SanPham.hasMany(models.HinhAnhSanPham, { foreignKey: 'san_pham_id', as: 'hinhAnh' });
  

  SanPham.hasMany(models.KichThuocSanPham, { foreignKey: 'san_pham_id', as: 'sizes' });

  SanPham.hasMany(models.DanhGia, {foreignKey: "san_pham_id", as: "danhGia"});

  SanPham.hasMany(models.ChiTietDonHang, {foreignKey: "san_pham_id", as: "chiTietDonHang"});

  
}
  }
  SanPham.init({
    ten_san_pham: DataTypes.STRING,
    gia_hien_tai: DataTypes.BIGINT,
    so_luong_ton: DataTypes.INTEGER,
    so_luot_mua: DataTypes.INTEGER,
    sao_trung_binh: DataTypes.FLOAT,
    so_ngay_thue_toi_da: DataTypes.INTEGER,
    mo_ta: DataTypes.TEXT,
    danh_muc_id: DataTypes.INTEGER,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SanPham',
    tableName: "SanPhams",
  
  });
  return SanPham;
};