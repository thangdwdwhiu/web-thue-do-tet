const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role || 'user' }, // Payload
    process.env.JWT_SECRET || "your_secret_key", // Secret Key (nên để trong .env)
    { expiresIn: "1d" } // Thời gian hết hạn
  );
};

module.exports = generateAccessToken;