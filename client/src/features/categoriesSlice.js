import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../services/apiFetch";

const baseUrl = import.meta.env.VITE_API_URL;

export const getAllDanhMuc = createAsyncThunk(
  "categories/",
  async (_, thunk) => {
    try {
      const res = await fetch(`${baseUrl}/categories`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        return thunk.rejectWithValue({ error: data.error });
      }

      return data.categories;
    } catch (err) {
      console.log(err);
      return thunk.rejectWithValue({ error: "connection error" });
    }
  },
);
const initialState = {
  list: [],
  getList: {
    loading: true,
    error: null,
  },
  error: null,
};

export const updateCategoryName = createAsyncThunk(
  "categories/ten_danh_muc",
  async ({ id, ten_danh_muc }, thunk) => {
    try {
      const data = await apiFetch(`/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: { ten_danh_muc },
        credentials: "include",
      });

      return data;
    } catch (error) {
      console.log(error);
      return thunk.rejectWithValue({ error: error.message });
    }
  },
);
export const createCategory = createAsyncThunk(
  "categories/taodanhmucs",
  async ({ ten_danh_muc }, thunk) => {
    try {
      const data = await apiFetch(`/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { ten_danh_muc },
        credentials: "include",
      });

      return data;
    } catch (error) {
      console.log(error);
      return thunk.rejectWithValue({ error: error.message });
    }
  },
);
//delete
export const deleteCategory = createAsyncThunk(
  "categories/xoadanhmuc",
  async ({ id }, thunk) => {
    try {
      const data = await apiFetch(`/categories/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      return data;
    } catch (error) {
      console.log(error);
      return thunk.rejectWithValue({ error: error.message });
    }
  },
);
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
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
        state.getList.error = action.payload.error;
      })
      .addCase(updateCategoryName.fulfilled, (state, action) => {
        const updated = action.payload.category;

        const index = state.list.findIndex((c) => c.id === updated.id);
        if (index !== -1) {
          state.list[index] = updated;
        }
      })

      .addCase(updateCategoryName.rejected, (state, action) => {
        state.error = action.payload?.error || "không cập nhập được danh mục";
      })

      // create
      .addCase(createCategory.fulfilled, (state, action) => {
        state.list = [...state.list, action.payload.category];
      })
      .addCase(
        createCategory.rejected,
        (state, action) => (state.error = action.payload.error),
      )
.addCase(deleteCategory.fulfilled, (state, action) => {
  const deletedId = Number(action.payload.id);

  state.list = state.list.filter(
    c => Number(c.id) !== deletedId
  );
})


      .addCase(deleteCategory.rejected , (state, action)=>state.error = action.payload.error)
  },
});

export default categoriesSlice.reducer;
