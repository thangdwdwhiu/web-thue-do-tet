import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../services/apiFetch";

const baseUrl = import.meta.env.VITE_API_URL;

const initialState = {
    getList: {
        list: [],
        loading: true,
        error: null
    },
    getProductDetails: {
        productDetails: {},
        loading: true,
        error: null
    },
    create: {
        loading: false,
        error: null,
        success: false
    }

}

export const getAllsProduct = createAsyncThunk("/", async(_,thunk) => {

    try{

        const res = await fetch(`${baseUrl}/products`, {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
            credentials: "include"
        });
        const data = await res.json();
        
        if (!res.ok) {
            return thunk.rejectWithValue({error: data.error})
        }

        return data.products;

    }
    catch (err) {
        console.log(err);
        return thunk.rejectWithValue({error: "Lỗi mạng"});
        
    }
})

export const getProductDetails = createAsyncThunk("product/detail", async (slug, thunk) => {
    try{
        const res = await fetch(`${baseUrl}/products/${slug}`, {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
            credentials: "include"
        });

        const data =  await res.json();

        if (!res.ok){
            return thunk.rejectWithValue({error: data.error})
        }

        return data.details;

    }
    catch (err) {
        console.log(err);
        return thunk.rejectWithValue({error: "loi mang"});
        
    }
})
export const createProduct = createAsyncThunk("product/create", async (payload, thunk) => {
    try {
        const data = await apiFetch("/products", {
            method: "POST",
            body: payload,
            credentials: "include"
        });

        return data;
        

    }
    catch (err) {
        console.log(err);
        return thunk.rejectWithValue({error: err.message})
        
    }
})
const productSlice = createSlice({

    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllsProduct.pending, (state) => {
            state.getList.loading = true;
        })
        .addCase(getAllsProduct.fulfilled, (state, action) => {
            state.getList.list = action.payload;
            state.getList.loading = false;
            state.getList.error = null;
        })
        .addCase(getAllsProduct.rejected, (state,action) => {
            state.getList.loading = false;
            state.getList.error = action.payload.error;
            
        })
        // man hinh chi tiet san pham
        .addCase(getProductDetails.pending,  (state) => {
                state.getProductDetails.loading = true;
        })
        .addCase(getProductDetails.fulfilled, (state, action) => {
            state.getProductDetails.loading = false;
            state.getProductDetails.error = null;
            state.getProductDetails.productDetails = action.payload;
        })
        .addCase(getProductDetails.rejected, (state, action) => {
            state.getProductDetails.loading = false;
            state.getProductDetails.error = action.payload.error;
            state.getProductDetails.productDetails = {};
        })

        // Create product
        .addCase(createProduct.pending, (state) => {
            state.create.loading = true;
            state.create.error = null;
            state.create.success = false;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.create.loading = false;
            state.create.error = null;
            state.create.success = true;

            // server returns { success: true, product }
            const created = action.payload && action.payload.product ? action.payload.product : null;
            if (created) {
                // add to list front
                state.getList.list.unshift(created);
            }
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.create.loading = false;
            state.create.success = false;
            state.create.error = action.payload ? action.payload.error : (action.error && action.error.message) || "Tạo thất bại";
        })
        



    }
});



export default productSlice.reducer;