import React, { useEffect, useState } from 'react';
import ToolBar from '../../components/ToolBar/ToolBar';
import styles from "./CheckoutPreview.module.css";
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckoutInfo, confirmOrder } from '../../features/paymentSlice';
import Loading from '../../components/Loading';
import Checkout_DescOrder from './components/Checkout_DescOrder';
import Chekout_InforReceiver from './components/Chekout_InforReceiver';

export default function CheckoutPreview() {
    const token = useParams().token;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { checkoutData, loading: checkoutLoading } = useSelector((s) => s.payment);

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [locLoading, setLocLoading] = useState(false);
    const [coords, setCoords] = useState(null);
    const [detectedAddress, setDetectedAddress] = useState('');
    const [locError, setLocError] = useState(null);

    // form data object
    const [formData, setFormData] = useState({
        tenNguoiNhan: '',
        soDienThoaiNhan: '',
        diaChiChiTiet: '',
        tinhThanh: '',
        quanHuyen: '',
        phuongXa: ''
    });

    // handle change for all form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (token) dispatch(getCheckoutInfo(token));
    }, [dispatch, token]);

    const handleGeolocate = () => {
        if (!navigator.geolocation) {
            setLocError('Trình duyệt không hỗ trợ Geolocation');
            return;
        }
        setLocError(null);
        setLocLoading(true);
        setDetectedAddress('');
        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                setCoords({ lat, lon });
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=vi`);
                const data = await res.json();
                const display = data.display_name || `${lat}, ${lon}`;
                setDetectedAddress(display);

                // const addr = data.address || {};
                // setTinhThanh(addr.state || addr.region || addr.county || '');
                // setQuanHuyen(addr.county || addr.state_district || addr.city_district || '');
                // setPhuongXa(addr.suburb || addr.town || addr.village || '');
                // setDiaChiChiTiet(addr.road ? `${addr.road} ${addr.house_number || ''}`.trim() : '');
                const dc = display.split(", ");
                setFormData(prev => ({
                    ...prev,
                    tinhThanh: dc[2] || '',
                    quanHuyen: dc[1] || '',
                    phuongXa: dc[0] || ''
                }));
                // setDiaChiChiTiet(addr.road ? `${addr.road} ${addr.house_number || ''}`.trim() : '');
            } catch (err) {
                console.log(err);
                setLocError('Không thể lấy địa chỉ từ vị trí');
            } finally {
                setLocLoading(false);
            }
        }, (err) => {
            setLocError(err.message || 'Lỗi khi lấy vị trí');
            setLocLoading(false);
        }, { enableHighAccuracy: false, timeout: 10000 });
    };

    const handleConfirm = async () => {
        if (!formData.tenNguoiNhan) return toast.error('Vui lòng nhập họ tên người nhận');
        if (!formData.soDienThoaiNhan) return toast.error('Vui lòng nhập số điện thoại');
        if (!formData.diaChiChiTiet && !detectedAddress) return toast.error('Vui lòng nhập địa chỉ chi tiết hoặc lấy vị trí');
        if (!checkoutData) return toast.error('Dữ liệu đơn hàng không hợp lệ');


        const payload = {
            ten_nguoi_nhan: formData.tenNguoiNhan,
            so_dien_thoai_nhan: formData.soDienThoaiNhan,
            dia_chi_chi_tiet: formData.diaChiChiTiet || detectedAddress,
            tinh_thanh: formData.tinhThanh,
            quan_huyen: formData.quanHuyen,
            phuong_xa: formData.phuongXa,
            phuong_thuc_thanh_toan: paymentMethod === 'BANKING' ? 'chuyển khoản' : 'COD',
            tong_tien: (checkoutData.so_luong || 1) * (checkoutData.gia_hien_tai || checkoutData.price || 0),
            san_pham_id: checkoutData.id ?? checkoutData.san_pham_id ?? checkoutData._id ?? null,
            so_luong: checkoutData.so_luong ?? 1,
            gia_ban: checkoutData.gia_hien_tai ?? checkoutData.price ?? 0,
            size_da_chon: checkoutData.size_da_chon,
            token
        };

        if(paymentMethod === "BANKING"){
            toast.warning("Chức năng sẽ sớm được cập nhập, hãy chuyển qua COD!")
            return;
        }
        try {
            const data =  await dispatch(confirmOrder(payload)).unwrap();
            console.log(data);
            
            toast.success('Đặt hàng thành công');
            navigate("/payment/success", {state: data.orderCode, replace: true});

        } catch (err) {
            console.log(err);
            
            toast.error(err || 'Lỗi khi gửi đơn hàng');
            navigate("/payment/error", {replace: true})
        }
    };

    if (!token) return <Navigate to={'/'} />;
    if (checkoutLoading) return <Loading title={"Đang lấy thông tin đơn hàng"} />;

    return (
        <div className={`container py-5 ${styles.mainContent}`} style={{ backgroundColor: '#f8f9fa' }}>
            <ToolBar />
            <div className="row g-4">
                {/* thông tin người mua */}
                <Chekout_InforReceiver
                    formData={formData}
                    handleChange={handleChange}
                    handleGeolocate={handleGeolocate}
                    locLoading={locLoading}
                    detectedAddress={detectedAddress}
                    locError={locError}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                />

                {/* tom tat don hang */}
                <Checkout_DescOrder 
                handleConfirm={handleConfirm} 
                checkoutData={checkoutData}
                locLoading={locLoading}
                paymentMethod={paymentMethod}
                checkoutLoading={checkoutLoading} /> 

            </div>
        </div>
    );
}