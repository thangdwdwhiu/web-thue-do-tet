import React from "react";
import styles from "../DashBoard.module.css";

export default function Users() {
    const users = [
        {id:1, name:"Nguyen A", username:"ngua", phone:"0987"},
        {id:2, name:"Tran B", username:"tranb", phone:"0912"},
    ];
    return (
        <div className={styles.card}>
            <h3>Người dùng</h3>
            <table className={styles.table}>
                <thead><tr><th>#</th><th>Họ tên</th><th>Tên tài khoản</th><th>Điện thoại</th></tr></thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.username}</td>
                            <td>{u.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}