const express  = require("express");
const {SanPham, NguoiDung} = require("./src/models/index");
const { where } = require("sequelize");
const handleCatchError = require("./src/middlewares/handdleError.middleware");
const router = require("./src/routes/index.route");
const cors = require("cors");
const corsOptions = require("./src/config/cors");
const {COOKIE_SECRET} = require("./src/config/cookie");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")))
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(COOKIE_SECRET));

app.use("/", (req, res, next) => {
    SanPham.findOne({
  where: { id: 1 },
  include: [
    'danhMuc',
    'hinhAnh',
    'sizes',
    'danhGia'
  ]
  
});
NguoiDung.destroy({
  where: {id: 1}
})
    next();
} )

// ROUTER

app.use("/api", router);

// BAT LOI CHUNG

app.use(handleCatchError);
module.exports = app;