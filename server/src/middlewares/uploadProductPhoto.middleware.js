const multer = require("multer")
const path = require("path")
const createError = require("../utils/createError.util");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/images/product"));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `product-${Date.now()}${ext}`;
        cb(null,filename);
    }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    cb(createError(400, "Chỉ cho upload ảnh"), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, 
  },
})

module.exports = upload