'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DanhMuc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
static associate(models) {
  DanhMuc.hasMany(models.SanPham, {
    foreignKey: 'danh_muc_id',
    as: 'sanPham'
  });
}

  }
  DanhMuc.init({
    ten_danh_muc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DanhMuc',
    tableName: "DanhMucs",
 
  });
  return DanhMuc;
};