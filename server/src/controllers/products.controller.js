const {SanPham} = require("../models/index");


class SanPhamController {

    async getAlls(req, res, next) {


        try {
            const sanPhamAlls = await SanPham.findAll({
                    include: ["hinhAnh"]

            })


            res.status(200).json({
                success: true,
                mess: "lay san pham thanh cong",
                products: sanPhamAlls
            });
        }
        catch (err) {
            next(err);
        }
    }




}



module.exports = new SanPhamController;