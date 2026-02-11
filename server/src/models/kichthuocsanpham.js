'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KichThuocSanPham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
static associate(models) {
  KichThuocSanPham.belongsTo(models.SanPham, {
    foreignKey: 'san_pham_id',
    as: 'sanPham'
  });
}

  }
  KichThuocSanPham.init({
    ten_size: DataTypes.STRING,
    san_pham_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'KichThuocSanPham',
    tableName: "KichThuocSanPhams",

  });
  return KichThuocSanPham;
};