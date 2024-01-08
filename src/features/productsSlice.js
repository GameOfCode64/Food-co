import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  state: null, // Corrected typo: "stare" to "state"
};

export const productFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response = await axios.get(
      "http://https://wpl-backend-gold.vercel.app/products"
    );
    return response?.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState, // Corrected typo: "initalState" to "initialState"
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productFetch.pending, (state) => {
        state.state = "pending";
      })
      .addCase(productFetch.fulfilled, (state, action) => {
        state.state = "fulfilled"; // Corrected typo: "pending" to "fulfilled"
        state.items = action.payload; // Corrected typo: "pyload" to "payload"
      })
      .addCase(productFetch.rejected, (state) => {
        state.state = "rejected";
      });
  },
});

export default productsSlice.reducer;
