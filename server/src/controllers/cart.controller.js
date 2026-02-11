const { where } = require("sequelize");
const {GioHang, SanPham} = require("../models/index");
const createError = require("../utils/createError.util");
class CartController {


    async getAlls(req, res, next) { 
        const {id: userId} = req.user;

        try {
            if (!userId) {
                throw createError(401, "Chưa đăng nhập", null, null);
            }
            const list = await GioHang.findAll({
                where: {nguoi_dung_id: userId},
                include: [{
                    model: SanPham,
                    as: "sanPham",
                    include: ["hinhAnh"]
                }],

            });

            res.status(200).json({
                success: true,
                cartItems: list,
            });
            
            
        }
        catch(err) {
            next(err);
        }
    }
    async changeQuantityCartItem(req, res, next) {
        const {id: userId} = req.user;
        const {id: cartItemId} = req.params;
        const {delta} = req.body;

        try {
            // Kiểm tra item có tồn tại không
            const cartItem = await GioHang.findByPk(cartItemId);
            if (!cartItem) {
                throw createError(404, "Sản phẩm không tồn tại trong giỏ hàng", null, null);
            }

            // Kiểm tra item có thuộc user hiện tại không
            if (cartItem.nguoi_dung_id !== userId) {
                throw createError(403, "Bạn không có quyền cập nhật sản phẩm này", null, null);
            }

            const newQuantity = cartItem.so_luong + Number(delta);

            // Nếu số lượng <= 0 thì xóa item
            if (newQuantity <= 0) {
                await cartItem.destroy();
                return res.status(200).json({
                    success: true,
                    message: "Xóa sản phẩm khỏi giỏ hàng thành công",
                    data: null
                });
            }

            // Cập nhật số lượng
            cartItem.so_luong = newQuantity;
            await cartItem.save();

            res.status(200).json({
                success: true,
                message: "Cập nhật số lượng sản phẩm thành công",
                data: cartItem
            });
        } catch(err) {
            next(err);
        }
    }

    async addProduct(req, res, next) {

        const {id: userId} = req.user
        const {san_pham_id, so_luong, size_chon} = req.body;
        
        try{
          
            const product = await SanPham.findByPk(san_pham_id);
            if (!product) {
                throw createError(404, "Sản phẩm không tồn tại", null, null);
            }

     
            let cartItem = await GioHang.findOne({
                where: {
                    nguoi_dung_id: userId,
                    san_pham_id: san_pham_id,
                    size_chon: size_chon
                }
            });

            if (cartItem) {
           
                cartItem.so_luong += Number(so_luong);
                await cartItem.save();
            } else {
             
                cartItem = await GioHang.create({
                    nguoi_dung_id: userId,
                    san_pham_id: san_pham_id,
                    so_luong: so_luong,
                    size_chon: size_chon
                });
            }

            res.status(201).json({
                success: true,
                message: "Thêm sản phẩm vào giỏ hàng thành công",
                data: cartItem
            });
        }
        catch(err) {
            next(err);
        }
    }

    async deleteCartItem(req, res, next) {
        const {id: userId} = req.user;
        const {id: cartItemId} = req.params;

        try {
            // Kiểm tra item có tồn tại không
            const cartItem = await GioHang.findByPk(cartItemId);
            if (!cartItem) {
                throw createError(404, "Sản phẩm không tồn tại trong giỏ hàng", null, null);
            }

            // Kiểm tra item có thuộc user hiện tại không
            if (cartItem.nguoi_dung_id !== userId) {
                throw createError(403, "Bạn không có quyền xóa sản phẩm này", null, null);
            }

            // Xóa item
            await cartItem.destroy();

            res.status(200).json({
                success: true,
                message: "Xóa sản phẩm khỏi giỏ hàng thành công",
                cartItemId
            });
        } catch(err) {
            next(err);
        }
    }

}


module.exports = new CartController();