'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DanhGia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
static associate(models) {
  DanhGia.belongsTo(models.SanPham, {
    foreignKey: 'san_pham_id',
    as: 'sanPham'
  });

DanhGia.belongsTo(models.NguoiDung, {
  foreignKey: "nguoi_dung_id",
  as: "nguoiDanhGia"
});

}

  }
  DanhGia.init({
    so_sao: DataTypes.INTEGER,
    noi_dung: DataTypes.TEXT,
    ngay_danh_gia: DataTypes.DATE,
    san_pham_id: DataTypes.INTEGER,
    nguoi_dung_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DanhGia',
    tableName: "DanhGia",
   
  });
  return DanhGia;
};