import React from "react";
import styles from "../DashBoard.module.css";

export default function Products() {
    const items = new Array(8).fill(0).map((_,i)=>({
        id:i+1, name:`Sản phẩm ${i+1}`, price: (i+1)*100000
    }));
    return (
        <div>
            <div className={styles.headerRow}>
                <div className={styles.card}>Quản lý sản phẩm</div>
                <div>
                    <button style={{padding:"8px 12px",borderRadius:6}}>Thêm sản phẩm</button>
                </div>
            </div>
            <div className={styles.gridProducts}>
                {items.map(p => (
                    <div className={styles.productCard} key={p.id}>
                        <div className={styles.productImg} />
                        <div>
                            <div style={{fontWeight:600}}>{p.name}</div>
                            <div style={{color:"#64748b"}}>{p.price.toLocaleString()}₫</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}