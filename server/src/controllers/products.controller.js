const db = require("../models/index");
const { validationResult } = require("express-validator");
const getSlug = require("../utils/slugfromtext.util");
const { SanPham, HinhAnhSanPham, KichThuocSanPham, sequelize } = db;
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

    // Create product (example admin endpoint)
    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ success: false, errors: errors.array() });
            }

            const { ten_san_pham, gia_hien_tai, so_luong_ton, mo_ta, danh_muc_id } = req.body;
            
            const slug = getSlug(ten_san_pham);
            
            // Use transaction to ensure product, images and sizes are created atomically
            const t = await sequelize.transaction();
            try {
                const newProduct = await SanPham.create({
                    ten_san_pham,
                    gia_hien_tai,
                    so_luong_ton,
                    mo_ta,
                    danh_muc_id: danh_muc_id || null,
                    slug,
                    so_ngay_thue_toi_da: Number(50)
                }, { transaction: t });

                // If images were uploaded, create image records
                if (req.files && Array.isArray(req.files) && req.files.length > 0) {
                    const images = req.files.map(f => ({
                        url_anh: `/images/product/${f.filename}`,
                        san_pham_id: newProduct.id
                    }));
                    await HinhAnhSanPham.bulkCreate(images, { transaction: t });
                }

                // Handle sizes coming from form-data. Client sends sizes[] fields.
                let sizes = req.body.sizes || req.body['sizes[]'] || [];
                if (typeof sizes === 'string') sizes = [sizes];
                if (Array.isArray(sizes) && sizes.length > 0) {
                    const sizeRecords = sizes
                        .map(s => (s || '').toString().trim())
                        .filter(Boolean)
                        .map(s => ({ ten_size: s, san_pham_id: newProduct.id }));

                    if (sizeRecords.length > 0) {
                        await KichThuocSanPham.bulkCreate(sizeRecords, { transaction: t });
                    }
                }

                await t.commit();

                // Return created product with images and sizes
                const created = await SanPham.findByPk(newProduct.id, { include: ['hinhAnh', 'sizes'] });
                return res.status(201).json({ success: true, product: created });
            } catch (errTrans) {
                await t.rollback();
                throw errTrans;
            }
        } catch (err) {
            next(err);
        }
    }




}



module.exports = new SanPhamController;