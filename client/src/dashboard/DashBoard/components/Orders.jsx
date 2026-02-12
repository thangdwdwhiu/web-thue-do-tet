import React from "react";
import styles from "../DashBoard.module.css";

export default function Orders() {
    const rows = [
        {id:1, user:"Nguyen A", total:120000, status:"Chờ xử lý"},
        {id:2, user:"Tran B", total:250000, status:"Đang giao"},
    ];
    return (
        <div className={styles.card}>
            <h3>Danh sách đơn hàng</h3>
            <table className={styles.table}>
                <thead>
                    <tr><th>#</th><th>Khách</th><th>Tổng</th><th>Trạng thái</th></tr>
                </thead>
                <tbody>
                    {rows.map(r => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.user}</td>
                            <td>{r.total.toLocaleString()}₫</td>
                            <td>{r.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}