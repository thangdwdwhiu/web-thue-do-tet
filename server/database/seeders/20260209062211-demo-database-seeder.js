'use strict';
const bcrypt = require('bcrypt'); // Đảm bảo bạn đã npm install bcryptjs nếu muốn hash pass thật

module.exports = {
  async up (queryInterface, Sequelize) {
    const currentDate = new Date();

    // 1. Tạo Danh Mục
    // -------------------------------------------------------
    const categories = await queryInterface.bulkInsert('DanhMucs', [
      { ten_danh_muc: 'Thời trang Nam', createdAt: currentDate, updatedAt: currentDate },
      { ten_danh_muc: 'Thời trang Nữ', createdAt: currentDate, updatedAt: currentDate },
      { ten_danh_muc: 'Phụ kiện', createdAt: currentDate, updatedAt: currentDate }
    ], { returning: ['id'] });

    // Lấy ID danh mục vừa tạo (để gán cho sản phẩm)
    // Lưu ý: bulkInsert trả về ID tùy thuộc vào DB adapter, đây là giả định ID lần lượt 1, 2, 3
    
    // 2. Tạo Người Dùng
    // -------------------------------------------------------
    // Mật khẩu demo: '123456'
    const passwordHash = '$2a$10$YourHashedPasswordHere'; // Thay bằng hash thực tế nếu cần login

    await queryInterface.bulkInsert('NguoiDungs', [
      {
        ten_tai_khoan: 'admin_thang',
        mat_khau: passwordHash, 
        ho_ten: 'Đào Xuân Thắng',
        so_dien_thoai: '0988888888',
        role: 'admin',
        avatar: 'https://i.imgur.com/admin-avatar.jpg',
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        ten_tai_khoan: 'khachhang1',
        mat_khau: passwordHash,
        ho_ten: 'Nguyễn Văn A',
        so_dien_thoai: '0912345678',
        role: 'customer',
        avatar: 'https://i.imgur.com/user-avatar.jpg',
        createdAt: currentDate,
        updatedAt: currentDate
      }
    ]);

    // 3. Tạo Sản Phẩm (Gán với Danh mục ID = 1)
    // -------------------------------------------------------
    const products = await queryInterface.bulkInsert('SanPhams', [
      {
        ten_san_pham: 'Áo Thun Basic Nam',
        gia_hien_tai: 150000,
        so_luong_ton: 100,
        so_luot_mua: 10,
        sao_trung_binh: 4.5,
        so_ngay_thue_toi_da: 0, // 0 nghĩa là chỉ bán
        mo_ta: 'Áo thun cotton thoáng mát',
        danh_muc_id: 1, // ID của Thời trang Nam
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        ten_san_pham: 'Váy Dạ Hội Cao Cấp',
        gia_hien_tai: 2000000,
        so_luong_ton: 20,
        so_luot_mua: 2,
        sao_trung_binh: 5.0,
        so_ngay_thue_toi_da: 7, // Cho thuê tối đa 7 ngày
        mo_ta: 'Váy dạ hội sang trọng, phù hợp tiệc tùng',
        danh_muc_id: 2, // ID của Thời trang Nữ
        createdAt: currentDate,
        updatedAt: currentDate
      }
    ], { returning: ['id'] });

    // 4. Tạo Hình Ảnh Sản Phẩm & Kích Thước
    // -------------------------------------------------------
    // Giả sử ID sản phẩm là 1 và 2
    
    // Ảnh
    await queryInterface.bulkInsert('HinhAnhSanPhams', [
      { url_anh: 'ao-thun-1.jpg', san_pham_id: 1, createdAt: currentDate, updatedAt: currentDate },
      { url_anh: 'ao-thun-2.jpg', san_pham_id: 1, createdAt: currentDate, updatedAt: currentDate },
      { url_anh: 'vay-da-hoi-1.jpg', san_pham_id: 2, createdAt: currentDate, updatedAt: currentDate }
    ]);

    // Size
    await queryInterface.bulkInsert('KichThuocSanPhams', [
      { ten_size: 'M', san_pham_id: 1, createdAt: currentDate, updatedAt: currentDate },
      { ten_size: 'L', san_pham_id: 1, createdAt: currentDate, updatedAt: currentDate },
      { ten_size: 'S', san_pham_id: 2, createdAt: currentDate, updatedAt: currentDate }
    ]);

    // 5. Tạo Đánh Giá (Khách hàng ID 2 đánh giá SP ID 1)
    // -------------------------------------------------------
    await queryInterface.bulkInsert('DanhGia', [
      {
        so_sao: 5,
        noi_dung: 'Áo mặc rất mát, giao hàng nhanh',
        ngay_danh_gia: currentDate,
        san_pham_id: 1,
        nguoi_dung_id: 2,
        createdAt: currentDate,
        updatedAt: currentDate
      }
    ]);

    // 6. Tạo Giỏ Hàng (Khách hàng ID 2 thêm SP ID 2)
    // -------------------------------------------------------
    await queryInterface.bulkInsert('GioHangs', [
      {
        so_luong: 1,
        size_chon: 'S',
        nguoi_dung_id: 2,
        san_pham_id: 2,
        createdAt: currentDate,
        updatedAt: currentDate
      }
    ]);

    // 7. Tạo Đơn Hàng & Chi Tiết (Khách hàng ID 2 mua SP ID 1)
    // -------------------------------------------------------
    const orders = await queryInterface.bulkInsert('DonHangs', [
      {
        nguoi_dung_id: 2,
        ten_nguoi_nhan: 'Nguyễn Văn A',
        so_dien_thoai_nhan: '0912345678',
        dia_chi_chi_tiet: 'Số 1 Đại Cồ Việt',
        tinh_thanh: 'Hà Nội',
        quan_huyen: 'Hai Bà Trưng',
        phuong_xa: 'Bách Khoa',
        phuong_thuc_thanh_toan: 'COD',
        tong_tien: 300000, // 2 áo * 150k
        ngay_dat: currentDate,
        trang_thai: 'DangGiao',
        createdAt: currentDate,
        updatedAt: currentDate
      }
    ], { returning: ['id'] });

    // Chi tiết đơn hàng (Giả sử Order ID là 1)
    await queryInterface.bulkInsert('ChiTietDonHangs', [
      {
        don_hang_id: 1,
        san_pham_id: 1,
        so_luong: 2,
        gia_ban: 150000,
        size_da_chon: 'L',
        createdAt: currentDate,
        updatedAt: currentDate
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    // Xóa dữ liệu theo thứ tự ngược lại để tránh lỗi khóa ngoại
    await queryInterface.bulkDelete('ChiTietDonHangs', null, {});
    await queryInterface.bulkDelete('DonHangs', null, {});
    await queryInterface.bulkDelete('GioHangs', null, {});
    await queryInterface.bulkDelete('DanhGia', null, {});
    await queryInterface.bulkDelete('KichThuocSanPhams', null, {});
    await queryInterface.bulkDelete('HinhAnhSanPhams', null, {});
    await queryInterface.bulkDelete('SanPhams', null, {});
    await queryInterface.bulkDelete('NguoiDungs', null, {});
    await queryInterface.bulkDelete('DanhMucs', null, {});
  }
};