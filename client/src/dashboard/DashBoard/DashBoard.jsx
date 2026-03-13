import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./DashBoard.module.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Users from "./components/Users";
import Categories from "./components/Categories";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getAllDanhMuc,
  updateCategoryName
} from "../../features/categoriesSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { createProduct, getAllsProduct } from "../../features/productsSlice";

const TABS = ["Tổng quan", "Đơn hàng", "Sản phẩm", "Người dùng", "Danh mục"];

export default function DashBoard() {
  const [tab, setTab] = useState("Tổng quan");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [catSelected, setCatSelected] = useState(-1);

  const { list: cats, getList, error } = useSelector(state => state.categories);
  const { list: productsOrigin } = useSelector(state => state.products.getList);

  const [formData, setFormData] = useState({
    ten_san_pham: "",
    danh_muc_id: null,
    gia_hien_tai: "",
    so_luong_ton: "",
    mo_ta: "",
    images: [],
    sizes: ""
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) toast.error(error);

    dispatch(getAllDanhMuc());
    dispatch(getAllsProduct());
  }, [dispatch, error]);

  // filter product theo danh mục
  const filteredProduct = useMemo(() => {
    if (catSelected === -1) return productsOrigin;
    return productsOrigin.filter(p => p.danh_muc_id === catSelected);
  }, [productsOrigin, catSelected]);

  // ========================
  // CATEGORY
  // ========================

  const handleUpdateCategoryName = useCallback(
    async (id, ten_danh_muc) => {
      try {
        await dispatch(updateCategoryName({ id, ten_danh_muc })).unwrap();
        toast.success("Cập nhật danh mục thành công 🎉");
      } catch (err) {
        toast.error(err?.error || "Cập nhật thất bại");
      }
    },
    [dispatch]
  );

  const handleCreateCategory = useCallback(
    async ten_danh_muc => {
      if (!ten_danh_muc || ten_danh_muc.length < 3 || ten_danh_muc.length > 50) {
        toast.error("Tên danh mục từ 3-50 kí tự");
        return;
      }

      try {
        await dispatch(createCategory({ ten_danh_muc })).unwrap();
        toast.success("Thêm thành công");
      } catch (error) {
        toast.error(error?.error || "Thêm thất bại");
      }
    },
    [dispatch]
  );

  const handleDeleteCategory = useCallback(
    async id => {
      const result = await Swal.fire({
        title: "Bạn có chắc muốn xóa danh mục này?",
        text: "Không thể hoàn tác",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        confirmButtonColor: "red"
      });

      try {
        if (result.isConfirmed) {
          await dispatch(deleteCategory({ id })).unwrap();
          toast.success("Xóa thành công danh mục");
        }
      } catch (err) {
        toast.error(err?.error || "Không thể xóa");
      }
    },
    [dispatch]
  );

  // ========================
  // FORM INPUT
  // ========================

  const onChangeData = (e) => {

    const { name, value, files } = e.target;

    if (name === "images") {

        setFormData(prev => ({
            ...prev,
            images: Array.from(files)
        }));

        return;
    }

    if (name === "gia_hien_tai" || name === "so_luong_ton") {
        const sanitized = value.replace(/\D/g, "");
        setFormData(prev => ({ ...prev, [name]: sanitized }));
        return;
    }

    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
};

  // ========================
  // ADD PRODUCT
  // ========================

  const handleAddNewProduct = useCallback(async () => {

  const price = Number(formData.gia_hien_tai);
  const stock = Number(formData.so_luong_ton);

  if (!Number.isInteger(price) || price < 5000) {
    toast.error("Giá phải >= 5000");
    return;
  }

  if (!Number.isInteger(stock) || stock < 0) {
    toast.error("Số lượng tồn không hợp lệ");
    return;
  }

  if (!formData.ten_san_pham || formData.ten_san_pham.length < 3) {
    toast.error("Tên sản phẩm phải >= 3 kí tự");
    return;
  }

  if (formData.images.length < 2) {
    toast.error("Chọn ít nhất 2 ảnh");
    return;
  }

  const sizes = formData.sizes
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  if (sizes.length === 0) {
    toast.error("Nhập ít nhất 1 size");
    return;
  }

  const form = new FormData();

  form.append("ten_san_pham", formData.ten_san_pham);
  form.append("gia_hien_tai", price);
  form.append("so_luong_ton", stock);
  form.append("mo_ta", formData.mo_ta);

  form.append(
    "danh_muc_id",
    catSelected === -1 ? "" : catSelected
  );

  sizes.forEach(size => {
    form.append("sizes[]", size);
  });

  formData.images.forEach(img => {
    form.append("images", img);
  });

  try {

    await dispatch(createProduct(form)).unwrap();

    toast.success("Thêm sản phẩm thành công 🎉");

    setFormData({
      ten_san_pham: "",
      danh_muc_id: null,
      gia_hien_tai: "",
      so_luong_ton: "",
      mo_ta: "",
      images: [],
      sizes: ""
    });

  } catch (err) {
    toast.error(err?.error || "Tạo sản phẩm thất bại");
  }

}, [dispatch, formData, catSelected]);
  // ========================
  // UI
  // ========================

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
                Tổng quan - thống kê hệ thống
              </div>
            </div>
          )}

          {tab === "Đơn hàng" && <Orders />}

          {tab === "Sản phẩm" && (
            <Products
              cats={cats}
              products={filteredProduct}
              onSetCatSelected={id => setCatSelected(id)}
              onAddNewProduct={handleAddNewProduct}
              formData={formData}
              onChangeData={onChangeData}
            />
          )}

          {tab === "Người dùng" && <Users />}

          {tab === "Danh mục" && (
            <Categories
              cats={cats}
              loading={getList.loading}
              onUpdateCategoryName={handleUpdateCategoryName}
              onCreateCategory={handleCreateCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          )}
        </div>
      </div>
    </div>
  );
}