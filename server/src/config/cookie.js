require('dotenv').config();

// Secret key dùng để ký cookie (signed cookies) giúp bảo mật hơn
// Nên lưu trong file .env
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'cai_nay_nen_de_bi_mat';

module.exports = {
  COOKIE_SECRET
};