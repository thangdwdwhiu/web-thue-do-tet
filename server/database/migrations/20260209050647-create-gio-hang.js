'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GioHangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      so_luong: {
        type: Sequelize.INTEGER
      },
      size_chon: {
        type: Sequelize.STRING
      },
      nguoi_dung_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "NguoiDungs",
          key: "id"
        }
      },
      san_pham_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('GioHangs');
  }
};