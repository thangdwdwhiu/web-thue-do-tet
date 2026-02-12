import { useCallback, useEffect, useState } from "react";
import CategoryPanel from "./components/CategoryPanel";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import Filter from "./components/Filter";
import ProductList from "./components/ProductList";

import aoTruyenThong from "../../assets/aotruyenthong.jpg";
import children from "../../assets/children.jpg";
import vest from "../../assets/vest.jpg";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllDanhMuc } from "../../features/categoriesSlice";
import { getAllsProduct } from "../../features/productsSlice";
import Loading from "../../components/Loading";
import { checkAuth, logout } from "../../features/authSlice";

export default function Home() {
  const imgs = { aoTruyenThong, children, vest };
  const dispatch = useDispatch();

 
  const { list: categoryList, getList: getListCategories } = useSelector((state) => state.categories);


  const { getList: getListProducts } = useSelector((state) => state.products);
  const {isLogin, error} = useSelector((state) => state.auth.auth)
  const {user} = useSelector((state) => state.auth.user)
  console.log(user);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(getAllDanhMuc());
    dispatch(getAllsProduct());
    dispatch(checkAuth());
  }, [dispatch]);


  useEffect(() => {
    if (getListProducts.list && getListProducts.list.length > 0) {
      setProducts(getListProducts.list);
    }
  }, [getListProducts.list]);

  const filterBySearch = useCallback((newProducts) => {
  setProducts(newProducts);
}, []);


  if (getListCategories.loading) {
    return <Loading title={"đang tải danh mục"} />;
  }
  if (getListCategories.error) {
    return <div>Lỗi tải danh mục: {getListCategories.error}</div>;
  }

  
  if (getListProducts.loading) {
    return <Loading title={"đang tải sản phẩm"} />;
  }
  if (getListProducts.error) {
    return <div>Lỗi tải sản phẩm: {getListProducts.error}</div>;
  }
  const handleFilerCategories = (maDanhMuc) => {
      const originalList = getListProducts.list;

      if (maDanhMuc === -1) {
        setProducts(originalList);
        return;
      }
      setProducts(originalList.filter((p) => p.danh_muc_id == maDanhMuc));

  }

  const handleFilerPrice = (option) => {

    const originalList = getListProducts.list || [];

    switch (option) {
      case 0: // dưới 200k
        setProducts(originalList.filter((p) => p.gia_hien_tai <= 200000));
        break;
      case 1: // 200k - 700k
        setProducts(originalList.filter((p) => p.gia_hien_tai > 200000 && p.gia_hien_tai <= 700000));
        break;
      case 2: // trên 1 triệu
        setProducts(originalList.filter((p) => p.gia_hien_tai > 1000000));
        break;
      case 3: // Tăng dần
        setProducts([...originalList].sort((a, b) => a.gia_hien_tai - b.gia_hien_tai));
        break;
      case 4: // Giảm dần
        setProducts([...originalList].sort((a, b) => b.gia_hien_tai - a.gia_hien_tai));
        break;
      default: // tất cả
        setProducts(originalList);
    }
  };
  const handleLogout = async () => {
      dispatch(logout());
  }



  return (
    <>
      <Header 
      styles={styles} 
      products={getListProducts.list} 
      filterBySearch={filterBySearch} 
      isLogin={isLogin} 
      avatar={user.avatar}
      handleLogout={handleLogout}/>
      <HeroBanner styles={styles} />
     
      <CategoryPanel styles={styles} imgs={imgs} categories={categoryList || []} handleFilerCategories={handleFilerCategories} />

      <div className="d-flex w-100 p-2 gap-3" style={{minHeight: "100vh"}}>
        <Filter styles={styles} handleFilerPrice={handleFilerPrice} />
   
        <ProductList styles={styles} products={products} />
      </div>

      <footer style={{ marginTop: 50 }}>
        <h2 style={{ textAlign: "center" }}>Thông tin liên hệ</h2>
        <div className="container-fluid bg-secondary text-white d-flex flex-column align-items-center">
             <strong> Developer: Xuân thắng</strong>
              ~ HẾT ~
        </div>
      </footer>
    </>
  );
}