import { memo } from "react";
import { getImageUrl } from "../../../utils/image";
import formatPrice from "../../../utils/formatPrice";
import CardQr from "../../../components/CardQr";

export default memo(function Checkout_DescOrder({ handleConfirm, checkoutData, locLoading, paymentMethod, checkoutLoading }) {



    return (
        <div className="col-md-5 col-lg-4">
            <div className="card border-0 shadow-sm position-sticky" style={{ top: '20px' }}>
                <div className="card-header bg-white py-3"><h5 className="mb-0 fw-bold">Đơn hàng của bạn</h5></div>
                <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                        {checkoutData && (
                            <li className="list-group-item d-flex gap-3 py-3">
                                <img src={getImageUrl(checkoutData.hinhAnh?.[0]?.url_anh || '')} alt={checkoutData.ten_san_pham} className="rounded border" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                <div className="flex-grow-1">
                                    <h6 className="mb-0">{checkoutData.ten_san_pham}</h6>
                                    <div className="d-flex justify-content-between mt-1">
                                        <small>X{checkoutData.so_luong} SIZE: {checkoutData.size_da_chon}</small>
                                        <span className="fw-bold">{formatPrice((checkoutData.so_luong || 1) * (checkoutData.gia_hien_tai || checkoutData.price || 0))}</span>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="card-footer bg-white p-3 border-0">
                    <button onClick={handleConfirm} disabled={locLoading || checkoutLoading} className={`btn w-100 py-2 fs-5 fw-bold text-uppercase ${paymentMethod === 'BANKING' ? 'btn-success' : 'btn-danger'}`}>
                        {paymentMethod === 'BANKING' ? 'Quét QR thanh toán' : 'Thanh toán khi nhận hàng'}
                    </button>
                    <p className="text-center small text-muted mt-2 mb-0"><i className="bi bi-shield-lock-fill me-1"></i></p>
                </div>
            </div>

            {/* hien thi qr thanh toan  */}
            {paymentMethod === "BANKING" && checkoutData?.qrUrl && (
                    <CardQr url={checkoutData.qrUrl} />
            )}

        </div>
    )
})