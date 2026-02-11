'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HinhAnhSanPham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
static associate(models) {
  HinhAnhSanPham.belongsTo(models.SanPham, {
    foreignKey: 'san_pham_id',
    as: 'sanPham'
  });
}

  }
  HinhAnhSanPham.init({
    url_anh: DataTypes.STRING,
    san_pham_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HinhAnhSanPham',
    tableName: "HinhAnhSanPhams",
   
  });
  return HinhAnhSanPham;
};