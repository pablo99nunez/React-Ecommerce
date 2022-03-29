import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../..";
import { GET_PRODUCTS } from "../../queries/products";

export const fetchProducts = createAsyncThunk("PLP/fetch", async (category) => {
  let results = [];
  await client
    .query({ query: GET_PRODUCTS, variables: { category } })
    .then(({ data }) => {
      results = data.category.products;
    });
  return { results, category };
});

export const PLPSlice = createSlice({
  name: "PLP",
  initialState: {
    products: [],
    loading: true,
    category: "",
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.results;
      state.loading = false;
      state.category = action.payload.category;
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload.results;
      state.category = action.payload.category;
      state.loading = false;
    },
    [fetchProducts.rejected]: (state, action) => {
      console.log(action);
    },
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export default PLPSlice.reducer;
