'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GioHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
static associate(models) {
  GioHang.belongsTo(models.NguoiDung, {
    foreignKey: 'nguoi_dung_id',
    as: 'nguoiDung'
  });

  GioHang.belongsTo(models.SanPham, {
    foreignKey: 'san_pham_id',
    as: 'sanPham'
  });
}

  }
  GioHang.init({
    so_luong: DataTypes.INTEGER,
    size_chon: DataTypes.STRING,
    nguoi_dung_id: DataTypes.INTEGER,
    san_pham_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GioHang',
    tableName: "GioHangs"
  });
  return GioHang;
};