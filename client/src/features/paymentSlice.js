import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../services/apiFetch";



export const createCheckoutSession = createAsyncThunk(
  "payment/createCheckoutSession",
  async (payload, thunk) => {
    try {
      const data = await apiFetch("/checkout/session", {
        method: "POST",
        body: payload,
      });

      return data.token;
    } catch (err) {
      if (err.status && err.status === 401) {
        window.location.href = "/auth";
      }
      return thunk.rejectWithValue({error: err.message});
    }
  }
);


  //  2. Lấy info checkout

export const getCheckoutInfo = createAsyncThunk(
  "payment/getCheckoutInfo",
  async (token, thunk) => {
    try {
      const res = await apiFetch(`/checkout/session/${token}`);
      return res.data;
    } catch (err) {
      return thunk.rejectWithValue(err.message);
    }
  }
);

/* =====================
   3. Xác nhận đơn hàng
===================== */
export const confirmOrder = createAsyncThunk(
  "payment/confirmOrder",
  async (payload, thunk) => {
    try {
      const res = await apiFetch("/checkout/confirm", {
        method: "POST",
        body: payload,
      });
      return res.data;
    } catch (err) {
      return thunk.rejectWithValue(err.message);
    }
  }
);


const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null,
    checkoutToken: null,
    checkoutData: null,
    orderResult: null,
  },
  reducers: {
    clearCheckout(state) {
      state.checkoutToken = null;
      state.checkoutData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create session
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutToken = action.payload;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get checkout info
      .addCase(getCheckoutInfo.fulfilled, (state, action) => {
        state.checkoutData = action.payload;
      })

      // confirm order
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.orderResult = action.payload;
      });
  },
});

export const { clearCheckout } = paymentSlice.actions;
export default paymentSlice.reducer;
