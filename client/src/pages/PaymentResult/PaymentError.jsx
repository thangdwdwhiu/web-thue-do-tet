import React from 'react';
import { useNavigate } from 'react-router-dom';
import ToolBar from '../../components/ToolBar/ToolBar';

export default function PaymentError() {
    const navigate = useNavigate();

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <ToolBar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card border-0 shadow-lg">
                            <div className="card-body text-center py-5">
                                <div style={{ fontSize: '80px', color: '#dc3545', marginBottom: '20px' }}>
                                    <i className="bi bi-x-circle-fill"></i>
                                </div>

                                <h2 className="fw-bold mb-3 text-danger">Thanh Toán Thất Bại!</h2>

                                <p className="text-muted mb-4" style={{ fontSize: '16px' }}>
                                    Đã có lỗi xảy ra trong quá trình xử lý thanh toán. Vui lòng thử lại.
                                </p>

                                <div className="alert alert-danger mb-4">
                                    <h6 className="fw-bold mb-2">Lý do thất bại:</h6>
                                    <p className="mb-0">
                                        Không thể kết nối với cổng thanh toán. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.
                                    </p>
                                </div>

                                <div className="card border-warning bg-light mb-4">
                                    <div className="card-body">
                                        <p className="mb-2"><strong>Mã lỗi:</strong> ERR_PAYMENT_001</p>
                                        <p className="mb-0"><strong>Thời gian:</strong> {new Date().toLocaleString('vi-VN')}</p>
                                    </div>
                                </div>

                                <div className="alert alert-info mb-4">
                                    <i className="bi bi-info-circle me-2"></i>
                                    <strong>Lưu ý:</strong> Đơn hàng của bạn chưa được tạo. Vui lòng thử lại hoặc liên hệ hỗ trợ.
                                </div>

                                <div className="d-flex gap-2">
                                    <button 
                                        onClick={() => navigate(-1)} 
                                        className="btn btn-outline-secondary flex-grow-1 py-2"
                                    >
                                        Quay Lại
                                    </button>
                                    <button 
                                        onClick={() => navigate('/')} 
                                        className="btn btn-danger flex-grow-1 py-2"
                                    >
                                        Về Trang Chủ
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mt-4">
                            <div className="card-header bg-light">
                                <h6 className="mb-0 fw-bold">Cần Hỗ Trợ?</h6>
                            </div>
                            <div className="card-body">
                                <p className="mb-2">
                                    <i className="bi bi-telephone me-2 text-primary"></i>
                                    <strong>Gọi hỗ trợ:</strong> <a href="tel:0984851325">0984851325</a>
                                </p>
                                <p className="mb-2">
                                    <i className="bi bi-envelope me-2 text-primary"></i>
                                    <strong>Email:</strong> <a href="mailto:support@example.com">support@example.com</a>
                                </p>
                                <p className="mb-0">
                                    <i className="bi bi-chat-dots me-2 text-primary"></i>
                                    <a href="#">Chat với chúng tôi</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
