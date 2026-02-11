import { memo } from "react";

export default memo(function CardQr({ url }) {

    return (
        <div className="card border-0 shadow-sm mt-3 text-center p-3">
            <h6 className="fw-bold mb-3">Quét mã QR để thanh toán</h6>

            <img
                src={url}
                alt="QR Thanh toán"
                className="img-fluid mx-auto d-block"
                style={{ maxWidth: "220px" }}
            />

            <p className="small text-muted mt-2 mb-0">
                Vui lòng quét mã để hoàn tất thanh toán
            </p>
        </div>
    )
})