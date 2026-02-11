'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DanhGia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      so_sao: {
        type: Sequelize.INTEGER
      },
      noi_dung: {
        type: Sequelize.TEXT
      },
      ngay_danh_gia: {
        type: Sequelize.DATE
      },
      san_pham_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "SanPhams",
          key: "id"
        }
      },
      nguoi_dung_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "NguoiDungs",
          key: "id"
        }
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
    await queryInterface.dropTable('DanhGia');
  }
};