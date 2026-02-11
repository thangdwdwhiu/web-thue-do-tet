import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ToolBar from '../../components/ToolBar/ToolBar';

export default function PaymentSuccess() {
    const navigate = useNavigate();
    const orderCode = useLocation().state

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <ToolBar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card border-0 shadow-lg">
                            <div className="card-body text-center py-5">
                                <div style={{ fontSize: '80px', color: '#28a745', marginBottom: '20px' }}>
                                    <i className="bi bi-check-circle-fill"></i>
                                </div>

                                <h2 className="fw-bold mb-3">Thanh Toán Thành Công!</h2>

                                <p className="text-muted mb-4" style={{ fontSize: '16px' }}>
                                    Đơn hàng của bạn đã được xác nhận và đang chờ xử lý.
                                </p>

                                <div className="alert alert-info mb-4">
                                    <p className="mb-0">
                                        <strong>Mã đơn hàng:</strong> {orderCode ?? "không xác định"}
                                    </p>
                                </div>

           

       

                                <div className="d-flex gap-2">
                                    <button 
                                        onClick={() => navigate('/')} 
                                        className="btn btn-outline-primary flex-grow-1 py-2"
                                    >
                                        Về Trang Chủ
                                    </button>
                                    <button 
                                        onClick={() => navigate('/cart')} 
                                        className="btn btn-primary flex-grow-1 py-2"
                                    >
                                        Tiếp Tục Mua Sắm
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mt-4">
                            <div className="card-header bg-light">
                                <h6 className="mb-0 fw-bold">Vui lòng chú ý số điện thoaij</h6>
                            </div>
                            {/* <div className="card-body">
                                <p className="mb-2"><strong>Người nhận:</strong> Nguyễn Văn A</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
