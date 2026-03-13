import Modal from "../../../components/Modal/Modal"

export default function FormUpdateProduct ({product, open, close}) {
    // Thêm dòng này để tránh lỗi khi chưa có sản phẩm nào được chọn
    if (!product) return null; 

    const {ten_san_pham} = product;

    return (
        <Modal 
            title={`Xem chi tiết sản phẩm: ${ten_san_pham || ""}`}
            open={open}
            cancelText="Hủy"
            confirmText="Cập nhật"
            onCancel={close}
        >
            Nội dung modal cập nhật ở đây
        </Modal>
    )
}