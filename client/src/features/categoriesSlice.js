import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const baseUrl = import.meta.env.VITE_API_URL;


export const getAllDanhMuc = createAsyncThunk("categories/", async (_, thunk) => {

    try {

        const res = await fetch(`${baseUrl}/categories`, {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
            credentials: "include"
        });
        
        const data = await res.json();
        
        if (!res.ok){
            return thunk.rejectWithValue({error: data.error});
        }
        

        return data.categories;

    }
    catch (err){
        console.log(err);
        return thunk.rejectWithValue({error: "connection error"});
    }
})
const initialState = {

    list: [],
    getList: {
        loading: true,
        error: null
    }

}


const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {} ,
    extraReducers: (buider) => {
        buider
        .addCase(getAllDanhMuc.pending, (state) => {
            state.getList.loading = true;
            
        })
        .addCase(getAllDanhMuc.fulfilled, (state, action) => {
            state.getList.loading = false;
            state.list = action.payload;
            state.getList.error = null;

        })
        .addCase(getAllDanhMuc.rejected, (state, action) => {
            state.getList.loading = false;
            state.getList.error = action.payload.error
        })
    }

})



export default categoriesSlice.reducer;