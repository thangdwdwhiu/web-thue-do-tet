function generateOrderCode(userId) {
  return `DH${Date.now().toString().slice(-6)}U${userId}`;
}

function generateVietQR({ bankId, accountNo, accountName, amount, message }) {
  return `https://img.vietqr.io/image/${bankId}-${accountNo}-compact.png?amount=${amount}&addInfo=${encodeURIComponent(message)}&accountName=${encodeURIComponent(accountName)}`;
}

module.exports = {
  generateOrderCode,
  generateVietQR,
};
