import React from "react";
import styles from "../DashBoard.module.css";

export default function Topbar({ title, onToggleSidebar }) {
    return (
        <header className={styles.topbar}>
            <div className="left" style={{display:"flex",alignItems:"center",gap:12}}>
                <button onClick={onToggleSidebar} aria-label="toggle" style={{fontSize:18}}>☰</button>
                <div style={{fontWeight:600}}>{title}</div>
            </div>
            <div className={styles.search}>
                <span>🔍</span>
                <input placeholder="Tìm kiếm..." style={{border:"none",background:"transparent",outline:"none"}} />
            </div>
            <div className={styles.actions}>
                <div style={{padding:6}}>🔔</div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <div style={{width:36,height:36,borderRadius:18,background:"#cbd5e1"}} />
                    <div style={{minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:600}}>Admin</div>
                        <div style={{fontSize:12,color:"#64748b"}}>Online</div>
                    </div>
                </div>
            </div>
        </header>
    );
}