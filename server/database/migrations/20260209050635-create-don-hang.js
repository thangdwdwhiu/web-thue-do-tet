'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DonHangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_nguoi_nhan: {
        type: Sequelize.STRING
      },
      so_dien_thoai_nhan: {
        type: Sequelize.STRING
      },
      dia_chi_chi_tiet: {
        type: Sequelize.STRING
      },
      tinh_thanh: {
        type: Sequelize.STRING
      },
      quan_huyen: {
        type: Sequelize.STRING
      },
      phuong_xa: {
        type: Sequelize.STRING
      },
      phuong_thuc_thanh_toan: {
        type: Sequelize.STRING
      },
      tong_tien: {
        type: Sequelize.BIGINT
      },
      ngay_dat: {
        type: Sequelize.DATE
      },
      trang_thai: {
        type: Sequelize.STRING
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
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DonHangs');
  }
};