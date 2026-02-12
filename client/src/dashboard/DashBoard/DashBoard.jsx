import React, { useCallback, useEffect, useState } from "react";
import styles from "./DashBoard.module.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Users from "./components/Users";
import Categories from "./components/Categories";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, deleteCategory, getAllDanhMuc, updateCategoryName } from "../../features/categoriesSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2"

const TABS = ["Tổng quan", "Đơn hàng", "Sản phẩm", "Người dùng", "Danh mục"];

export default function DashBoard() {
    const [tab, setTab] = useState("Tổng quan");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const { list: cats, getList, error } = useSelector(
        state => state.categories
    );
    

    const dispatch = useDispatch();


    useEffect(() => {
        if (error) {
            toast.error(error)
        }
        dispatch(getAllDanhMuc());
    }, [dispatch]);

    // ham

const handleUpdateCategoryName = useCallback(
  async (id, ten_danh_muc) => {
    try {
      await dispatch(
        updateCategoryName({ id, ten_danh_muc })
      ).unwrap();

      toast.success("Cập nhật danh mục thành công 🎉");

    } catch (err) {
      toast.error(err?.error || "Cập nhật thất bại");
    }
  },
  [dispatch]
);

const handleCreateCategory = useCallback(async (ten_danh_muc)=>{

    if (!ten_danh_muc || ten_danh_muc.length < 3 || ten_danh_muc > 50){
        toast.error("tên danh mục từ 3-50 kí tự");
        return;
    }
    try {
        await dispatch(createCategory({ten_danh_muc})).unwrap();
        toast.success("Thêm thành công");
    } catch (error) {
        toast.error(error.error || "thêm thất baij")
    }

}, [dispatch])

const handleDeleteCategory = useCallback(async (id) => {
                const result  = await Swal.fire({
                title: "bạn có chắc muốn xóa danh mục này",
                text: "không thể hoàn tác ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Xóa",
                cancelButtonText: "Hủy",
                confirmButtonColor: "red",
                cancelButtonColor: "#6c757d",
            });

        try {

                        if  (result.isConfirmed) {
                await dispatch(deleteCategory({id})).unwrap();
                toast.success("Xóa thành công danh mục")
            }
        }
        catch(err) {
            console.log(err);
            
            toast.error(err.error || "không thể xóa")
        }         
}, [dispatch]);
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
                            <div className={styles.card} style={{ width: "100%" }}>
                                Tổng quan - các số liệu tóm tắt (thêm component thống kê ở đây)
                            </div>
                        </div>
                    )}
                    {tab === "Đơn hàng" && <Orders />}
                    {tab === "Sản phẩm" && <Products />}
                    {tab === "Người dùng" && <Users />}
                    {tab === "Danh mục" && <Categories cats={cats} 
                                                        loading={getList.loading} 
                                                        onUpdateCategoryName={handleUpdateCategoryName}
                                                        onCreateCategory={handleCreateCategory}
                                                        onDeleteCategory={handleDeleteCategory}/>}
                </div>
            </div>
        </div>
    );
}