'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // 1️⃣ Thêm cột slug CHO PHÉP NULL
    await queryInterface.addColumn('SanPhams', 'slug', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // 2️⃣ Update slug cho dữ liệu cũ
    await queryInterface.sequelize.query(`
      UPDATE "SanPhams"
      SET slug = CONCAT('san-pham-', id)
      WHERE slug IS NULL
    `);

    // 3️⃣ Đổi slug thành NOT NULL + UNIQUE
    await queryInterface.changeColumn('SanPhams', 'slug', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('SanPhams', 'slug');
  }
};
