'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DonHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
static associate(models) {
  DonHang.belongsTo(models.NguoiDung, {
    foreignKey: 'nguoi_dung_id',
    as: 'nguoiDung'
  });

  DonHang.hasMany(models.ChiTietDonHang, {
    foreignKey: 'don_hang_id',
    as: 'chiTiet'
  });
}

  }
  DonHang.init({
    ten_nguoi_nhan: DataTypes.STRING,
    so_dien_thoai_nhan: DataTypes.STRING,
    dia_chi_chi_tiet: DataTypes.STRING,
    tinh_thanh: DataTypes.STRING,
    quan_huyen: DataTypes.STRING,
    phuong_xa: DataTypes.STRING,
    phuong_thuc_thanh_toan: DataTypes.STRING,
    tong_tien: DataTypes.BIGINT,
    ngay_dat: DataTypes.DATE,
    trang_thai: DataTypes.STRING,
    nguoi_dung_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DonHang',
    tableName: "DonHangs"
  });
  return DonHang;
};