import React from "react";
import styles from "../DashBoard.module.css";

export default function Categories() {
    const cats = ["Áo", "Quần", "Giày", "Phụ kiện"];
    return (
        <div className={styles.card}>
            <h3>Danh mục</h3>
            <ul>
                {cats.map((c,i)=> <li key={i}>{c}</li>)}
            </ul>
        </div>
    );
}