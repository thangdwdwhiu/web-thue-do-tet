import React from "react";
import styles from "../DashBoard.module.css";

const Icon = ({ children }) => <span className={styles.icon}>{children}</span>;

export default function Sidebar({ tabs = [], active, onChange, collapsed, onToggle }) {
    return (
        <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
            <div className={styles.brand}>
                <div style={{width:32,height:32,background:"#fff",borderRadius:6}} />
                {!collapsed && <div>Admin</div>}
            </div>
            <nav className={styles.menu}>
                {tabs.map(t => (
                    <div
                        key={t}
                        className={`${styles.menuItem} ${active === t ? styles.active : ""}`}
                        onClick={() => onChange(t)}
                        title={t}
                    >
                        <Icon>{t[0]}</Icon>
                        {!collapsed && <span>{t}</span>}
                    </div>
                ))}
            </nav>
            <div style={{padding:12}}>
                <div className={styles.menuItem} onClick={onToggle}>
                    <Icon>≡</Icon>
                    {!collapsed && <span>Thu/ Mở</span>}
                </div>
            </div>
        </aside>
    );
}