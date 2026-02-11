'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChiTietDonHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
static associate(models) {
  ChiTietDonHang.belongsTo(models.DonHang, {
    foreignKey: 'don_hang_id',
    as: 'donHang'
  });

  ChiTietDonHang.belongsTo(models.SanPham, {
    foreignKey: 'san_pham_id',
    as: 'sanPham'
  });
}

  }
  ChiTietDonHang.init({
    so_luong: DataTypes.INTEGER,
    gia_ban: DataTypes.BIGINT,
    size_da_chon: DataTypes.STRING,
    don_hang_id: DataTypes.INTEGER,
    san_pham_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChiTietDonHang',
    tableName: "ChiTietDonHangs"
  });
  return ChiTietDonHang;
};