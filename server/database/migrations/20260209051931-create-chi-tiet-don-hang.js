'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChiTietDonHangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      so_luong: {
        type: Sequelize.INTEGER
      },
      gia_ban: {
        type: Sequelize.BIGINT
      },
      size_da_chon: {
        type: Sequelize.STRING
      },
      don_hang_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "DonHangs",
          key: "id"
        }
      },
      san_pham_id: {
        type: Sequelize.INTEGER,
        references: {
          model : "SanPhams",
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
    await queryInterface.dropTable('ChiTietDonHangs');
  }
};