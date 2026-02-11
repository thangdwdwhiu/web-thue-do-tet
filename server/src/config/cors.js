// Lấy danh sách domain cho phép từ file .env hoặc hardcode
// Ví dụ: VITE_URL=http://localhost:5173
const whitelist = [
  'http://localhost:5173', // Frontend React (Vite)
  'http://localhost:3000', // Frontend React (CRA)
  'https://your-production-domain.com' // Domain thật khi deploy
];

const corsOptions = {
  origin: function (origin, callback) {
    // !origin cho phép các request từ server-to-server hoặc tool như Postman
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Các method cho phép
  allowedHeaders: ['Content-Type', 'Authorization'], // Các header cho phép
  credentials: true, // QUAN TRỌNG: Cho phép gửi Cookie/Token qua request
  optionsSuccessStatus: 200
};

module.exports = corsOptions;