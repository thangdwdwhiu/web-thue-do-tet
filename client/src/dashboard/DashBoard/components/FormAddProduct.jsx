import Modal from "../../../components/Modal/Modal"

export default function FormAddProduct({...props}) {
    const {addProduct, 
        onAddNewProduct, 
        setAddProduct, 
        onChangeData, 
        cats, 
        formData, 
        handleOpenFile, 
        handleSelectImages,
        inputImgRef,
         images
    } = props

    return(
                    <Modal 
                title={"Thêm sản phẩm"} 
                open={addProduct} 
                onCancel={() => setAddProduct(false)}
                onConfirm={onAddNewProduct}  
            >
                <div>
                    <label>
                        Tên sản phẩm: 
                        <input onChange={onChangeData} className="form-control" type="text" name="ten_san_pham" value={formData.ten_san_pham} />
                    </label><br />
                    
                    Danh Mục:
                    <select onChange={(e) => props.onSetCatSelected(Number(e.target.value))} className="form-select mt-2 w-50" value={props.catSelected}>
                        <option value={Number(-1)}>Vui lòng chọn danh mục</option>
                        {cats.map((c) => (
                            <option value={c.id} key={c.id}>{c.ten_danh_muc}</option>
                        ))}
                    </select>
                    
                    <label>
                        Giá hiện tại: 
                        <input onChange={onChangeData} value={formData.gia_hien_tai} className="form-control" type="number" name="gia_hien_tai" min="0" step="1" />
                    </label>
                    
                    <label>
                        Số lượng tồn: 
                        <input onChange={onChangeData} value={formData.so_luong_ton} className="form-control" type="number" name="so_luong_ton" min="0" step="1" />
                    </label>
                    
                    <label>
                        SIZES (cách nhau bởi dấu ","):
                        <input value={formData.sizes} onChange={onChangeData} className="form-control" type="text" name="sizes" />
                    </label>                   
                    
                    <label>
                        Mô tả:
                        <input value={formData.mo_ta} onChange={onChangeData} className="form-control" type="text" name="mo_ta" />
                    </label>

                    <p className="mt-2">Số ngày thuê tối đa: 50</p>
                    
                    <div>
                        <p>Chọn ảnh sản phẩm (tối đa 2): </p> 
                        <button onClick={handleOpenFile} className="btn btn-primary">Tải lên</button>
                        <input onChange={handleSelectImages} ref={inputImgRef} style={{display: "none"}} type="file" multiple name="images" accept="image/*" />
                    </div>
                    <br />
                    
                    <div className="row row-cols-3">
                        {images.map((img, index) => (
                            <div key={index} className="col">
                                <img 
                                    className="card"
                                    style={{width:"100%", height: "100%", objectFit: "cover"}}
                                    src={img.preview} 
                                    alt="preview" 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
    )
}