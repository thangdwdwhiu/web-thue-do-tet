const { NguoiDung } = require("../models/index");
const createError = require("../utils/createError.util"); 
const bcrypt = require("bcrypt");
const generateAccessToken = require("../utils/jwt.util");
const { UUID } = require("sequelize");

// Helper tạo Token (Access Token)

const isProduction = process.env.NODE_ENV === "production"
class AuthController {
  
  // 1. ĐĂNG KÝ (Register)
  async register(req, res, next) {
    try {
      // Lấy dữ liệu từ payload (theo cấu trúc bạn gửi)
      const payload = req.body.payload || req.body; 

      const { ho_ten, ten_tai_khoan, mat_khau, so_dien_thoai } = payload;

      // 1. Kiểm tra tài khoản đã tồn tại chưa
      const existingUser = await NguoiDung.findOne({
        where: { ten_tai_khoan: ten_tai_khoan }
      });

      if (existingUser) {
        throw createError(409, "Tên tài khoản đã tồn tại", "USERNAME_EXISTS");
      }

      // 2. Mã hóa mật khẩu (Hashing)
   
      const hashedPassword = await bcrypt.hash(mat_khau, 10);

      // 3. Tạo người dùng mới trong DB
      // Lưu ý: Mapping đúng key từ Frontend (camelCase) sang DB (snake_case)
      const newUser = await NguoiDung.create({
        ten_tai_khoan: ten_tai_khoan,
        mat_khau: hashedPassword, // Lưu mật khẩu đã mã hóa
        ho_ten: ho_ten,
        so_dien_thoai: so_dien_thoai,
        avatar: "/images/avatar/1.png" 
      });

      // 4. Trả về kết quả (Không trả về mật khẩu)
      res.status(201).json({
        success: true,
        message: "Đăng ký thành công",
        user: {
          id: newUser.id,
          ten_tai_khoan: newUser.ten_tai_khoan,
          ho_ten: newUser.ho_ten
        }
      });

    } catch (err) {
      next(err);
    }
  }

  // 2. ĐĂNG NHẬP (Login)
  async login(req, res, next) {
    try {
      const payload =  req.body;

      const { ten_tai_khoan, mat_khau } = payload;

      // 1. Tìm user trong DB
      const user = await NguoiDung.findOne({
        where: { ten_tai_khoan: ten_tai_khoan }
      });

      // Nếu không thấy user
      if (!user) {
        throw createError(404, "Tài khoản không tồn tại", "USER_NOT_FOUND");
      }

      // 2. So sánh mật khẩu (Compare hash)
      const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
      
      if (!isMatch) {
        throw createError(401, "Mật khẩu không chính xác", "WRONG_PASSWORD");
      }

      // 3. Tạo Token (JWT)
      const token = generateAccessToken(user);

 
      
      res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction, 
        sameSite: isProduction ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000 // 1 ngày
      });


      const { mat_khau: password, ...userInfo } = user.dataValues; 

      res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        token,
        user: userInfo
      });

    } catch (err) {
      next(err);
    }
  }

  
  async refresh(req, res, next) {
    try {
      // Giả sử req.user đã được decode từ Middleware xác thực token trước đó
      const userId = req.user?.id; 

      if (!userId) {
         throw createError(401, "Bạn chưa đăng nhập", "UNAUTHORIZED");
      }

      const user = await NguoiDung.findOne({
        where: { id: userId },
        attributes: { exclude: ['mat_khau'] } // Không lấy cột mật khẩu
      });

      if (!user) {
        throw createError(404, "Không tìm thấy tài khoản", "USER_NOT_FOUND");
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  // 4. LẤY THÔNG TIN USER HIỆN TẠI (Me)
  async me(req, res, next) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw createError(401, "Bạn chưa đăng nhập", "UNAUTHORIZED");
      }

      const user = await NguoiDung.findOne({
        where: { id: userId },
        attributes: { exclude: ['mat_khau'] } // Không lấy cột mật khẩu
      });

      if (!user) {
        throw createError(404, "Không tìm thấy tài khoản", "USER_NOT_FOUND");
      }

      res.status(200).json({
        success: true,
        user
      });
      
    } catch (err) {
      next(err);
    }
  }

  async logout (req, res, next) {
      res.clearCookie("token", {
                httpOnly: true,
        secure: isProduction, 
        sameSite: isProduction ? "none" : "lax",
   

      });
      res.status(401).json({
        success: true,
        error: "Đăng xuất thành công"
      })
  }
}

module.exports = new AuthController();