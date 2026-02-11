'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NguoiDung extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
static associate(models) {
NguoiDung.hasMany(models.DanhGia, {
  foreignKey: "nguoi_dung_id",
  as: "danhGias"
});


  NguoiDung.hasMany(models.DonHang, {
    foreignKey: 'nguoi_dung_id',
    as: 'donHang'
  });

  NguoiDung.hasMany(models.GioHang, {
    foreignKey: 'nguoi_dung_id',
    as: 'gioHang'
  });
}

  }
  NguoiDung.init({
    ten_tai_khoan: DataTypes.STRING,
    mat_khau: DataTypes.STRING,
    avatar: DataTypes.STRING,
    ho_ten: DataTypes.STRING,
    so_dien_thoai: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NguoiDung',
    tableName: "NguoiDungs"
  });

  return NguoiDung;
};