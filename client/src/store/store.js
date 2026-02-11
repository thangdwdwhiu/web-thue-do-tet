import {configureStore} from "@reduxjs/toolkit";
import categoriesreducer from "../features/categoriesSlice";
import producReducer  from "../features/productsSlice";
import authReducer from "../features/authSlice";
import paymentReducer from "../features/paymentSlice";
import cartReducer from "../features/cartSlice";

const store = configureStore({
    reducer:{
        categories: categoriesreducer,
        products: producReducer,
        auth: authReducer,
        payment: paymentReducer,
        cart: cartReducer
    }
})


export default store;
