const jwt = require("jsonwebtoken");
const createError = require("../utils/createError.util");

const authMiddleware = (req, res, next) => {
  try {
    
    const token = req.cookies?.token;

    if (!token) {
      throw createError(401, "Bạn chưa đăng nhập", "UNAUTHORIZED");
    }

   
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "key"
    );

  
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      next(createError(401, "Token đã hết hạn", "TOKEN_EXPIRED"));
    } else if (err.name === "JsonWebTokenError") {
      next(createError(401, "Token không hợp lệ", "INVALID_TOKEN"));
    } else {
      next(err);
    }
  }
};

module.exports = authMiddleware;
