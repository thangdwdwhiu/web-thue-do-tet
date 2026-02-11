const { validationResult } = require("express-validator");
const createError = require("../utils/createError.util");

const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    const firstError = errors.array()[0];
    const errorMessage = firstError.msg;
    const errorField = firstError.param;

    return next(
      createError(
        400,
        errorMessage,
        "VALIDATION_ERROR",
        { field: errorField }
      )
    );
  }

  next();
};

module.exports = validationErrorHandler;
