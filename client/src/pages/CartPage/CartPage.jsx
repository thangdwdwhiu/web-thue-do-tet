import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Nếu dùng react-router
import styles from './CartPage.module.css'; // Import CSS Module
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { changeQuantityCartItem, getItemAlls, removeCartItem } from '../../features/cartSlice';
import { getImageUrl } from '../../utils/image';
import formatPrice from '../../utils/formatPrice';
import { createCheckoutSession } from '../../features/paymentSlice';
import { toast } from 'react-toastify';
import ToolBar from '../../components/ToolBar/ToolBar';

export default function CartPage() {
    // 1. Mock Data: Giả lập dữ liệu trong giỏ
    const { cartItems, loading , error} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getItemAlls());
        if (error) {
            toast.error(error)
        }

    }, [dispatch, error])
    if (loading) return <Loading title={"Đang lấy giỏ hàng"} />

    // Xử lý xóa sản phẩm
    const handleRemove = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            dispatch(removeCartItem(id))
        }
    };
    const handleQuantityChange = async (cartItemId, delta) => {



            const payload = {cartItemId, delta};
            await dispatch(changeQuantityCartItem(payload)).unwrap();
    }

  
    const totalProductPrice = cartItems.reduce((total, item) => {
    const price = item?.sanPham?.gia_hien_tai || 0;
  const quantity = item?.so_luong || 0;

  return total + price * quantity;
        
    }, 0);

  
    


    if (cartItems.length === 0) {
        return (
            <div className="container py-5 text-center">
                <i className="bi bi-cart-x display-1 text-muted"></i>
                <h3 className="mt-3">Giỏ hàng trống</h3>
                <p className="text-muted">Bạn chưa chọn sản phẩm nào.</p>
                <Link to="/" className="btn btn-primary mt-2">Tiếp tục mua sắm</Link>
            </div>
        );
    }

    const handleCheckoutPreview = async (item) => {
        if (!item) {
            toast.error("khong co du lieu");
            return;
        }
        const payload = {
            "san_pham_id": item.san_pham_id,
            "so_luong": item.so_luong,
            "gia_ban": item.sanPham.gia_hien_tai,
            "size_da_chon": item.size_chon
        };
        console.log(payload);

        try {



            const token = await dispatch(createCheckoutSession(payload)).unwrap();
            navigate(`/checkout/${token}`);
        }
        catch (err) {
            toast.error("có lỗi khi thanh toán")
            console.log(err);

        }
    }

    return (
        <>
       <ToolBar />
        <div className="container py-5 bg-light" style={{ minHeight: '100vh', marginTop: "60px" }}>
            <h2 className="mb-4 fw-bold text-uppercase">Giỏ hàng của bạn ({cartItems.length})</h2>

            <div className="row g-4">
                {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM */}
                <div className="col-lg-8">
                    <div className="bg-white p-4 rounded shadow-sm">

                        {/* Header của bảng (Ẩn trên mobile nếu cần) */}
                        <div className="d-none d-md-flex row border-bottom pb-2 fw-bold text-muted small text-uppercase">
                            <div className="col-6">Sản phẩm</div>
                            <div className="col-2 text-center">Số lượng</div>
                            <div className="col-2 text-end">Tạm tính</div>
                            <div className="col-2 text-end">Xóa</div>
                        </div>

                        {/* Danh sách items */}
                        {cartItems.map((item) => (
                            <div onClick={() => handleCheckoutPreview(item)} key={item.id} className={`row align-items-center py-3 ${styles.cartItem}`}>

                                {/* 1. Thông tin SP */}
                                <div className="col-md-6 d-flex gap-3 mb-3 mb-md-0">
                                    <img src={getImageUrl(item?.sanPham?.hinhAnh[0]?.url_anh)} alt={item.name} className={styles.productImg} />
                                    <div>
                                        <h6 className="mb-1 fw-bold">{item.sanPham?.ten_san_pham}</h6>
                                        <div className="badge bg-light text-dark border mb-1">Size: {item.size_chon}</div>


                                    </div>
                                </div>

                                {/* 2. Bộ chỉnh số lượng */}
                                <div className="col-md-2 col-6 d-flex justify-content-center">
                                    <div className={styles.quantityGroup}>
                                        <button className={styles.qtyBtn} onClick={(e) => {
                                            e.stopPropagation();
                                            handleQuantityChange(item.id, -1);
                                        }}>-</button>
                                        <input type="text" className={styles.qtyInput} value={item.so_luong} readOnly />
                                        <button className={styles.qtyBtn} onClick={(e) => {
                                            e.stopPropagation();
                                            handleQuantityChange(item.id, 1);
                                        }}>+</button>
                                    </div>
                                </div>
                                <div className='col-md-2 col-1 text-end'>
                                    <span >{formatPrice(item?.sanPham?.gia_hien_tai * item.so_luong)}</span>
                                </div>


                                {/* 4. Nút xóa */}
                                <div className="col-md-2 col-1 text-end">
                                    <button onClick={(e) =>{ e.stopPropagation(); handleRemove(item.id)}} className={styles.deleteBtn}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Nút Quay lại */}
                    <div className="mt-3">
                        <Link to="/" className="text-decoration-none text-muted">
                            <i className="bi bi-arrow-left me-2"></i>Tiếp tục xem đồ
                        </Link>
                    </div>
                </div>

                {/* CỘT PHẢI: TỔNG KẾT ĐƠN HÀNG */}
                <div className="col-lg-4">
                    <div className={`bg-white p-4 ${styles.summaryCard}`}>
                        <h5 className="fw-bold mb-4">Tổng quan đơn hàng</h5>

                        <div className={styles.summaryRow}>
                            <span>Tạm tính SP:</span>
                            <span className="fw-bold">{cartItems.length} sản phẩm</span>
                        </div>

                        {/* Chỉ hiện dòng Cọc nếu > 0 */}
        


                        <div className={styles.summaryTotal}>
                            <span>TỔNG CỘNG:</span>
                            <span>{formatPrice(totalProductPrice)} đ</span>
                        </div>

{/* 
                        <button className="btn btn-danger w-100 py-3 mt-3 fw-bold text-uppercase rounded-3 shadow-sm">
                            Tiến hành thanh toán
                        </button> */}

                        <div className="text-center mt-3">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" width="40" className="mx-1" alt="Visa" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" width="40" className="mx-1" alt="Master" />
                            <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png" width="30" className="mx-1 rounded" alt="Momo" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </>);
}