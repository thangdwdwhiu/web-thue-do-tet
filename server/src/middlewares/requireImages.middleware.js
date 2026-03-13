const createError = require("../utils/createError.util");

const requireImages = (req, res, next) => {
  // Multer sets req.files for array uploads
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    return next();
  }

  return next(
    createError(400, "Vui lòng tải lên ít nhất 1 ảnh", "VALIDATION_ERROR", { field: "images" })
  );
};

module.exports = requireImages;
