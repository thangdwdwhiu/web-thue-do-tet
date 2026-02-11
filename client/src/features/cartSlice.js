import { apiFetch } from "../services/apiFetch";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getItemAlls = createAsyncThunk("cart/get", async(_,thunk) => {

    try {
        const data = await apiFetch("/cart", {
            method: "GET",
            credentials: "include",
            headers: {"Content-Type": "application/json"}
        });

        return data.cartItems;
    }
    catch(err) {
        if (err.status && err.status === 401){
            window.location.href = "/auth";
        }
        return thunk.rejectWithValue({error: err.message, code: err.code})
    }
}) 

export const removeCartItem = createAsyncThunk("cart/remove", async (id, thunk) => {
    try {
        const data = await apiFetch(`/cart/${id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        });

        return data.cartItemId;


    }
    catch (err) {
        console.log(err);
        if (err.status && err.status == 401) {
            window.location.href = "/auth";
        }
        return thunk.rejectWithValue({error: err.message})
        
    }
})
export const changeQuantityCartItem = createAsyncThunk("cart/update", async (payload, thunk) => {
    try {
        const data = await apiFetch(`/cart/${payload.cartItemId}`, {
            method: "PUT",
            headers:{"Content-Type" : "application/json"},
            body: {delta: payload.delta},
            credentials: "include"
        });

        return data.data;
    }
    catch (err) {
        console.log(err);
        if(err.status && err.status === 401) {
            window.location.href = "/auth"
        }
        return thunk.rejectWithValue({error: err.message})
        
    }
});

export const addCartItem = createAsyncThunk ("cart/add", async (payload, thunk) => {

    try {
        const data = await apiFetch("/cart", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: payload,
            credentials: "include"
        });

        return data.message;
    }
    catch (err) {
        console.log(err);
        if (err.status && err.status === 401) {
            window.location.href = "/auth";
        }

        return thunk.rejectWithValue({error: err.message || "lỗi thêm giỏ hàng"})
        
    }
})


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        loading: true,
        cartItems: [],
        error: null
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(getItemAlls.pending, state=> {
            state.loading = true;
        })
        .addCase(getItemAlls.fulfilled, (state, action) => {
            state.cartItems = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(getItemAlls.rejected, (state, action) => {
            state.loading =false;
            state.cartItems = [];
            state.error = action.payload.error
        })
        .addCase(changeQuantityCartItem.pending, state => state)
        .addCase(changeQuantityCartItem.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems.forEach((i) =>{ if (i.id === action.payload.id)
                i.so_luong = action.payload.so_luong;
            } )
        }) 
        .addCase(changeQuantityCartItem.rejected, (state, action) =>{
            state.error = action.payload.error || "lỗi gọi api";
        })
        //xóa
        .addCase(removeCartItem.fulfilled, (state, action) => {
            const cartItemId = action.payload;
            state.cartItems = state.cartItems.filter((i) => i.id != cartItemId);
        })
        .addCase(removeCartItem.rejected, (state, action) => {
            state.error = action.payload.error || " loi khi xoa san pham";
        })
        // them sản phẩm vào giỏ hàng
        .addCase(addCartItem.fulfilled, (state, action) => {
        })
        .addCase(addCartItem.rejected, (state, action) => {
            state.error = action.payload.error;
        })
    
    }
})

export default cartSlice.reducer;
