import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ToolBar from "../../components/ToolBar/ToolBar";
import ProductInfo from "./components/ProductInfor";
import ProductSale from "./components/ProductSale";
import styles from "./ProductDetail.module.css";

import { getProductDetails } from "../../features/productsSlice";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { createCheckoutSession } from "../../features/paymentSlice";
import { addCartItem } from "../../features/cartSlice";

export default function ProductDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const {loading: paymentPreLoading} = useSelector((state) => state.payment);
  const {error: cartError}  = useSelector((state) => state.cart) 
  const navigate = useNavigate();

  const { productDetails, loading, error } = useSelector(
    (state) => state.products.getProductDetails
  );

  useEffect(() => {
    if (cartError) {
      toast.error(cartError);

    }
    if (slug) dispatch(getProductDetails(slug));
  }, [slug, dispatch, cartError]);


    const handlePaymentPreview = useCallback(async (payload) =>  {
        if (Object.values(payload).some(value => !value)) {
          toast.error("có lỗi khi thanh toán, thử lại");
          return;
        }

        try{
          const token = await dispatch(createCheckoutSession(payload)).unwrap();
          navigate(`/checkout/${token}`)
          
        }
        catch(err) {
          toast.error(err.error || err.message)
        }
  }, [dispatch, navigate])

    const addProductToCart = useCallback(async (payload) => {
      try {
       await dispatch(addCartItem(payload)).unwrap();
       toast.success("Thêm vào giỏ hàng thành công")
      }
      catch(err) {

        console.log(err);
        
      }
  }, [navigate, dispatch])
  if (!slug) return <div>Không có sản phẩm</div>;
  if (loading) return <Loading title={"đang tải sản phẩm"} />;
  if (error) return <div>Lỗi: {error}</div>;
  if (!productDetails) return null;



  return (
    <>
    {
      paymentPreLoading && (<Loading title={"đang tiến hành thanh toán"} />) 
    }
      <ToolBar />

      <div className={`container-fluid ${styles.main}`}>
        <ProductInfo styles={styles} infor={productDetails} />

        <ProductSale styles={styles} sale={productDetails} handlePaymentPreview={handlePaymentPreview} addProductToCart={addProductToCart}  />
      </div>
    </>
  );
}
