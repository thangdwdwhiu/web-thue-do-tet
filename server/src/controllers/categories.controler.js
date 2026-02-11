const {DanhMuc} = require("../models/index");


class DanhMucController {

    async getAlls(req, res, next) {
        
        try {

            const danhMucAlls = await DanhMuc.findAll({ 
                order: [["createdAt", "ASC"]]
            });

            res.status(200).json({
                success: true,
                mess: "Lay thanh cong",
                categories: danhMucAlls
            });

        
        }
        catch (err){
            next(err);
        }
        
    }


}


module.exports = new DanhMucController;