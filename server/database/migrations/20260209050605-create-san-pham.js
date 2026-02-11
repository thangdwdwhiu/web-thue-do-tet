'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SanPhams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_san_pham: {
        type: Sequelize.STRING
      },
      gia_hien_tai: {
        type: Sequelize.BIGINT
      },
      so_luong_ton: {
        type: Sequelize.INTEGER
      },
      so_luot_mua: {
        type: Sequelize.INTEGER
      },
      sao_trung_binh: {
        type: Sequelize.FLOAT
      },
      so_ngay_thue_toi_da: {
        type: Sequelize.INTEGER
      },
      mo_ta: {
        type: Sequelize.TEXT
      },
      danh_muc_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "DanhMucs",
          key: "id"
        }
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SanPhams');
  }
};