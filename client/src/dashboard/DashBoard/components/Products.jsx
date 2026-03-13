import React, { useRef, useState } from "react";
import styles from "../DashBoard.module.css";
import { getImageUrl } from "../../../utils/image";
import Modal from "../../../components/Modal/Modal";
import FormUpdateProduct from "./FormUpdateProduct";
import FormAddProduct from "./FormAddProduct";

export default function Products({ cats = [], products = [], ...props }) {

    const [addProduct, setAddProduct] = useState(false);
    const { formData, onChangeData, onAddNewProduct } = props;
    const inputImgRef = useRef(null);
    const [images, setImages] = useState([]);
    
    // Đã sửa: Lưu trữ sản phẩm đang được chọn thay vì dùng boolean (true/false)
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpenFile = () => {
        if (inputImgRef.current != null) {
            inputImgRef.current.click();
        }
    }

    const handleSelectImages = (e) => {
        const files = Array.from(e.target.files);

        const imgs = files.map((file) => {
            return {
                file: file,
                preview: URL.createObjectURL(file)
            };
        });
        setImages(imgs);
        onChangeData(e);
    }

    return (
        <div>
            {/* --- MODAL THÊM SẢN PHẨM --- */}
            <FormAddProduct addProduct={addProduct}
                            setAddProduct={setAddProduct}
                            onChangeData={onChangeData}
                            cats={cats}
                            formData={formData}
                            handleOpenFile={handleOpenFile}
                            handleSelectImages={handleSelectImages}
                            inputImgRef={inputImgRef}
                            images={images}
                            onAddNewProduct={onAddNewProduct} />

            {/* --- HEADER QUẢN LÝ --- */}
            <div className={styles.headerRow}>
                <div className={styles.card}>
                    Quản lý sản phẩm
                    <select onChange={(e) => props.onSetCatSelected(Number(e.target.value))} className="form-select mt-2" value={props.catSelected}>
                        <option value={Number(-1)}>Tất cả</option>
                        {cats.map((c) => (
                            <option value={c.id} key={c.id}>{c.ten_danh_muc}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <button onClick={() => setAddProduct(true)} style={{ padding: "8px 12px", borderRadius: 6 }}>
                        Thêm sản phẩm
                    </button>
                </div>
            </div>

            {/* --- DANH SÁCH SẢN PHẨM --- */}
            <div className={styles.gridProducts}>
                {products.map(p => (
                    // Đã sửa: Truyền object sản phẩm (p) vào state khi click
                    <div onClick={() => setSelectedProduct(p)} className={styles.productCard} key={p.id} style={{ cursor: "pointer" }}>
                        <img src={getImageUrl(p?.hinhAnh?.[0]?.url_anh) ?? null} className={styles.productImg} alt={p.ten_san_pham} />
                        <div>
                            <div style={{ fontWeight: 600 }}>{p.ten_san_pham}</div>
                            <div style={{ color: "#64748b" }}>{p.gia_hien_tai?.toLocaleString()}₫</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- ĐÃ SỬA: MODAL CẬP NHẬT ĐƯỢC ĐẶT Ở NGOÀI CÙNG --- */}
            {/* Chỉ render component này nếu có sản phẩm được chọn (selectedProduct != null) */}
            {selectedProduct && (
                <FormUpdateProduct 
                    open={!!selectedProduct} 
                    product={selectedProduct} 
                    close={() => setSelectedProduct(null)} 
                />
            )}

        </div>
    );
}