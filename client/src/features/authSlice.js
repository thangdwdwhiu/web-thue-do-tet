import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../services/apiFetch";

const baseUrl = import.meta.env.VITE_API_URL;

export const checkAuth  = createAsyncThunk("auth/checkAuth", async(_, thunk) => {
    try{
        const data = await apiFetch("/auth/me");
        
        if (data.success && data.user) {
            return data.user;
        }
        
        return thunk.rejectWithValue({error: "Dữ liệu người dùng không hợp lệ"});

    }
    catch (err) {
        return thunk.rejectWithValue({error: err.message || "Lỗi api"});
    }
})
const initialState = {
    auth: {
        loading: true,
        isLogin: false,
        error: null,
    },
    register: {
        loading: true,
        user: {}
    },
    login: {
        loading: true
    },
    user: {
        user: {},
        token: null
    }
}

export const register = createAsyncThunk("auth/register", async(payload,thunk) => {
    try {
        const res = await fetch(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            credentials: "include",
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (!res.ok) {
            return thunk.rejectWithValue({error: data.error});
        }
        return data.user;
    }
    catch (err) {
        console.log(err);
        return thunk.rejectWithValue({error: "connection error"})
        
    }
})
export const login = createAsyncThunk("auth/login", async (payload, thunk) => {
    try {
        const res = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(payload),
            credentials: 'include'
        });
        
        const data = await res.json();

        if (!res.ok) {
            return thunk.rejectWithValue({error: data.error});
        }

        if (!data.user) {
            return thunk.rejectWithValue({error: "Dữ liệu người dùng không hợp lệ"});
        }

        return data.user;
    }
    catch (err) {
        console.log(err);
        return thunk.rejectWithValue({error: "connection error"});
        
    }
})



const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {
        clearAuth: () => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(checkAuth.pending, (state) => {
            state.auth.loading = true
            state.auth.isLogin = false
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.auth.loading = false;
            state.auth.error = null;
            state.auth.isLogin = true;
            state.user.user = action.payload;
             console.log(" Auth fulfilled:", action.payload);
        })
        .addCase(checkAuth.rejected, (state, action) => {
            state.auth.error = action.payload.error;
            state.auth.isLogin = false;
            state.auth.loading = false;
            state.user = {}
        })
        // register
        .addCase(register.pending, state=> {
            state.register.loading  =true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.register.loading = false;
            state.register.user = action.payload;
        })
        .addCase(register.rejected, (state) => {
            state.register.loading = false;
        })
        // login
        .addCase(login.pending, state => {
            state.login.loading = true;
            state.auth.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.login.loading = false;
            state.user.user = action.payload;
            state.auth.isLogin = true;
            state.auth.error = null;
        })
        .addCase(login.rejected, (state, action) => {
            state.login.loading = false;
            state.auth.error = action.payload.error;
            state.auth.isLogin = false;
        })
    }

})

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
