const createError = require("../utils/createError.util");



const requireRole = (roles = [] ) => {
    return (req, res, next) => {


        try {

            if (!req.user) {
                throw createError(401, "chưa đăng nhập", "AUTH_DENIED", null)
            }
            const role = req.user.role ?? "user";
            

            if (!roles.includes(role)) {
                throw createError(403, "Không có đủ quyền truy cập", "ACCESS_DENIED", null);

            }
            next();
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = requireRole