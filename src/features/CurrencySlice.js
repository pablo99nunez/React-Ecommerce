import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "..";
import { GET_CURRENCIES } from "../queries/currency";

export const getCurrencies = createAsyncThunk(
  "Currency/GetCurrencies",
  async () => {
    const { data } = await client.query({
      query: GET_CURRENCIES,
    });
    return data.currencies;
  }
);

const CurrencySlice = createSlice({
  name: "Currency",
  initialState: {
    currency: {},
    currencies: [],
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
  extraReducers: {
    [getCurrencies.fulfilled]: (state, action) => {
      console.log(action);
      state.currency = action.payload[0];
      state.currencies = action.payload;
    },
  },
});

export const { setCurrency } = CurrencySlice.actions;
export default CurrencySlice.reducer;
