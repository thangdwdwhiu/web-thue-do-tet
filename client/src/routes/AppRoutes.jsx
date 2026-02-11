import {Route, BrowserRouter, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import CheckoutPreview from "../pages/CheckoutPreview/CheckoutPreview";
import CartPage from "../pages/CartPage/CartPage";
import AuthRoute from "../components/AuthRoute";
import AuthPage from "../pages/Auth/AuthPage";
import PaymentSuccess from "../pages/PaymentResult/PaymentSuccess";
import PaymentError from "../pages/PaymentResult/PaymentError";

export default function AppRoutes() {


return(
    <BrowserRouter>
    
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="product-detail/:slug" element={<ProductDetail />}/>
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route element={<AuthRoute />}>
          <Route path="/checkout/:token" element={<CheckoutPreview />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/error" element={<PaymentError />} />
                    </Route> 
                </Routes>
    
    </BrowserRouter>
)

}