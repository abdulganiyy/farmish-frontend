import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchProducts = createAsyncThunk(
  "shop/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        "https://farmish-api.herokuapp.com/api/v1/product"
      );

      return response.data.products;
    } catch (err) {
      return rejectWithValue("unable to fetch products");
    }
  }
);
const shopSlice = createSlice({
  name: "shop",
  initialState: {
    products: [],
    loading: false,
    cart: [],
    error: "",
    shippingAddress: "",
  },

  reducers: {
    addToCart: (state, { payload }) => {
      const id = payload;
      const product = state.products.find((product) => product._id === id);
      const isAdded = state.cart.find((product) => product._id === id);

      if (isAdded) {
        return;
      }
      state.cart = [...state.cart, product];
    },
    addShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
    },
    [fetchProducts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const shopReducer = shopSlice.reducer;

export const shopActions = shopSlice.actions;
