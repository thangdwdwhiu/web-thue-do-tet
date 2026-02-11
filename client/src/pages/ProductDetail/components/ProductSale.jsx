import { useState, useEffect, memo } from "react";
import formatPrice from "../../../utils/formatPrice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default memo ( function  ProductSale({ styles, sale, handlePaymentPreview, addProductToCart }) {
    const navigate = useNavigate();
    const [sizeSelected, setSizeSelected] = useState(() => (sale.sizes ?? sale.kich_co ?? [])[0]?.ten_size || (sale.sizes ?? sale.kich_co ?? [])[0]?.name || (sale.sizes ?? sale.kich_co ?? [])[0] || "");
    const [rentalDays, setRentalDays] = useState(1);
    const [returnDate, setReturnDate] = useState("");

    const formatDate = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const getToday = () => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    };

    useEffect(() => {
        const today = getToday();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        setReturnDate(formatDate(tomorrow));
    }, []);

    // --- SỬA 1: Thêm kiểm tra vào hàm nhập số ngày ---
    const handleDaysChange = (e) => {
        let days = parseInt(e.target.value) || 0;

        // ---> CHỈ THÊM ĐOẠN NÀY <---
        if (days > 50) {
            alert("Chỉ được thuê tối đa 50 ngày!");
            days = 50;
        }
        // -----------------------------

        setRentalDays(days);

        const newDate = getToday();
        newDate.setDate(newDate.getDate() + days);
        setReturnDate(formatDate(newDate));
    };

    // --- SỬA 2: Thêm kiểm tra vào hàm chọn lịch ---
    const handleDateChange = (e) => {
        let dateString = e.target.value;

        if (dateString) {
            const selectedDate = new Date(dateString);
            selectedDate.setHours(0, 0, 0, 0);

            const today = getToday();
            const diffTime = selectedDate - today;
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // ---> CHỈ THÊM ĐOẠN NÀY <---
            if (diffDays > 50) {
                alert("Chỉ được thuê tối đa 50 ngày!");
                diffDays = 50;

                // Phải tính lại ngày hiển thị cho đúng 50 ngày
                const maxDate = getToday();
                maxDate.setDate(maxDate.getDate() + 50);
                dateString = formatDate(maxDate);
            }
            // -----------------------------

            setReturnDate(dateString);
            setRentalDays(diffDays > 0 ? diffDays : 0);
        } else {
            setReturnDate("");
        }
    };

    // --- Phần render giữ nguyên logic cũ ---
    let ratingIcons = [];
    for (let i = 1; i <= 5; i++) {
        const diff = (sale.rating ?? sale.sao_trung_binh ?? 0) - i;
        if (diff >= 0) ratingIcons.push(<i key={i} className="bi bi-star-fill"></i>);
        else if (diff >= -0.5) ratingIcons.push(<i key={i} className="bi bi-star-half"></i>);
        else ratingIcons.push(<i key={i} className="bi bi-star"></i>);
    }
    const contactFb = () => {
        window.location.href = "https://www.facebook.com/xthang2005";
    }
    // payment 

    const handleCreateSession = () => {
        if (!sizeSelected) {
            toast.error("vui lòng chọn size");
            return;
        }
        if(rentalDays < 1){
            toast.error("Số ngày thuê từ 1 ngày trở đi");
            return;
        }
        if (rentalDays > sale.so_luong_ton) {
            toast.error("Sản phẩm này đã hết hàng");
            return;
        }
        const payload = { san_pham_id: sale.id ?? sale.san_pham_id ?? sale._id ?? null, 
            so_luong: rentalDays,
            gia_ban: sale.gia_hien_tai, 
            size_da_chon: sizeSelected };
        handlePaymentPreview(payload);
      
    }
    const onAddProduct = () => {
        const payload = { san_pham_id: sale.id ?? sale.san_pham_id ?? sale._id ?? null,
             so_luong: rentalDays, size_chon: sizeSelected}
            if (rentalDays > sale.so_luong_ton){
                toast.error("không đủ hàng");
                return;
            }

        addProductToCart(payload);
    }

    return (
        <div className={styles.right}>
            <strong className={styles.productName}>{sale.name ?? sale.ten_san_pham ?? ""}</strong>
            <div className={styles.ratingGroup}>
                {ratingIcons.map((i) => i)} &nbsp; {sale.rating ?? sale.sao_trung_binh ?? 0}
            </div>

            SIZE
            <div>
                {(sale.sizes ?? sale.kich_co ?? []).map((s) => {
                    const label = s.ten_size || s.name || s;
                    const key = s.id || label;
                    return (
                        <button onClick={() => setSizeSelected(label)} key={key} className={`btn btn-outline-primary me-2 ${sizeSelected == label && "active"}`}>
                            {label}
                        </button>
                    )
                })}
            </div>

            { sale.so_luong_ton > 0  ?
                (<span>kho: {sale.so_luong_ton}</span>)
                : (<span className="text-danger">Hết hàng</span>)
            }

            Số ngày thuê
            <label htmlFor="mountSale" className="d-flex align-items-center">
                <input
                    type="number"
                    step={1}
                    min={1}
                    className="form-control w-25"
                    value={rentalDays}
                    onChange={handleDaysChange} // Gắn hàm đã sửa
                />
                date:
                <input
                    type="date"
                    className="form-control w-25"
                    value={returnDate}        // Nhớ bind value
                    onChange={handleDateChange} // Gắn hàm đã sửa
                    min={formatDate(new Date())}
                />
            </label>
            Tổng tiền: <strong style={{
                width: "auto",
                color: "red"
            }}>{formatPrice(sale.gia_hien_tai * rentalDays)} đ</strong>
            
            <div><button onClick={onAddProduct} className="btn"><i className="bi bi-cart-plus-fill fs-2 text-primary"></i></button></div> 
            Contact:
            <div title="contact">
                <button onClick={contactFb} className="btn"><i className="bi bi-facebook fs-3"></i></button>
                <button className="btn">
                    <a style={{textDecoration: "none"}} href="tel:0901234567">
                        Gọi ngay: 0984851325</a>
                </button>
            </div>
            <button onClick={handleCreateSession} className="btn btn-danger ms-auto me-auto mt-3">Thuê ngay</button>
        </div>
    );
})