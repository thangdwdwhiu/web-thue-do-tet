import { memo } from "react";

export default memo(function Checkout_InforReceiver({ 
    formData, 
    handleChange, 
    handleGeolocate, 
    locLoading, 
    detectedAddress, 
    locError,
    paymentMethod,
    setPaymentMethod 
}) {
    return (
        <div className="col-md-7 col-lg-8">
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                    <h5 className="mb-0 fw-bold">Thông tin người nhận</h5>
                </div>
                <div className="card-body p-4">
                    {/* Họ tên */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Họ tên người nhận <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="tenNguoiNhan"
                            value={formData.tenNguoiNhan}
                            onChange={handleChange}
                            placeholder="Nhập họ tên"
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Số điện thoại <span className="text-danger">*</span>
                        </label>
                        <input
                            type="tel"
                            className="form-control"
                            name="soDienThoaiNhan"
                            value={formData.soDienThoaiNhan}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại"
                        />
                    </div>

                    {/* Địa chỉ chi tiết */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Địa chỉ chi tiết <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                name="diaChiChiTiet"
                                value={formData.diaChiChiTiet}
                                onChange={handleChange}
                                placeholder="Số nhà, tên đường..."
                            />
                            <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={handleGeolocate}
                                disabled={locLoading}
                            >
                                {locLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Đang lấy...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-geo-alt-fill me-1"></i>
                                        Lấy vị trí
                                    </>
                                )}
                            </button>
                        </div>
                        {detectedAddress && (
                            <small className="text-success d-block mt-1">
                                <i className="bi bi-check-circle-fill me-1"></i>
                                Đã phát hiện: {detectedAddress}
                            </small>
                        )}
                        {locError && (
                            <small className="text-danger d-block mt-1">
                                <i className="bi bi-exclamation-circle-fill me-1"></i>
                                {locError}
                            </small>
                        )}
                    </div>

                    {/* Row cho Tỉnh/Thành, Quận/Huyện, Phường/Xã */}
                    <div className="row g-3 mb-3">
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">Tỉnh/Thành phố</label>
                            <input
                                type="text"
                                className="form-control"
                                name="tinhThanh"
                                value={formData.tinhThanh}
                                onChange={handleChange}
                                placeholder="Tỉnh/TP"
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">Quận/Huyện</label>
                            <input
                                type="text"
                                className="form-control"
                                name="quanHuyen"
                                value={formData.quanHuyen}
                                onChange={handleChange}
                                placeholder="Quận/Huyện"
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">Phường/Xã</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phuongXa"
                                value={formData.phuongXa}
                                onChange={handleChange}
                                placeholder="Phường/Xã"
                            />
                        </div>
                    </div>

                    {/* Phương thức thanh toán */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Phương thức thanh toán</label>
                        <div className="d-flex gap-3">
                            <div className="form-check flex-fill">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id="cod"
                                    checked={paymentMethod === 'COD'}
                                    onChange={() => setPaymentMethod('COD')}
                                />
                                <label className="form-check-label w-100" htmlFor="cod">
                                    <div className="border rounded p-3 h-100">
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-cash-coin fs-3 text-danger me-2"></i>
                                            <div>
                                                <div className="fw-bold">COD</div>
                                                <small className="text-muted">Thanh toán khi nhận hàng</small>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <div className="form-check flex-fill">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id="banking"
                                    checked={paymentMethod === 'BANKING'}
                                    onChange={() => setPaymentMethod('BANKING')}
                                />
                                <label className="form-check-label w-100" htmlFor="banking">
                                    <div className="border rounded p-3 h-100">
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-qr-code-scan fs-3 text-success me-2"></i>
                                            <div>
                                                <div className="fw-bold">Chuyển khoản</div>
                                                <small className="text-muted">Quét mã QR</small>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});