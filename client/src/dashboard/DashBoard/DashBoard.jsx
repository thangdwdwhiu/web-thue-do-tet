import React, { useState } from "react";
import styles from "./DashBoard.module.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Users from "./components/Users";
import Categories from "./components/Categories";

const TABS = ["Tổng quan", "Đơn hàng", "Sản phẩm", "Người dùng", "Danh mục"];

export default function DashBoard() {
    const [tab, setTab] = useState("Tổng quan");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className={styles.container}>
            <Sidebar
                tabs={TABS}
                active={tab}
                onChange={setTab}
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(v => !v)}
            />
            <div className={styles.main}>
                <Topbar
                    title={tab}
                    onToggleSidebar={() => setSidebarCollapsed(v => !v)}
                />
                <div className={styles.content}>
                    {tab === "Tổng quan" && (
                        <div className={styles.headerRow}>
                            <div className={styles.card} style={{width: "100%"}}>
                                Tổng quan - các số liệu tóm tắt (thêm component thống kê ở đây)
                            </div>
                        </div>
                    )}
                    {tab === "Đơn hàng" && <Orders />}
                    {tab === "Sản phẩm" && <Products />}
                    {tab === "Người dùng" && <Users />}
                    {tab === "Danh mục" && <Categories />}
                </div>
            </div>
        </div>
    );
}