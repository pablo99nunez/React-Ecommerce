import { configureStore } from "@reduxjs/toolkit";
import PLPSlice from "./features/PLP/PLPSlice";
import CartSlice from "./features/CartSlice";
import CurrencySlice from "./features/CurrencySlice";

export default configureStore({
  reducer: {
    PLP: PLPSlice,
    Cart: CartSlice,
    Currency: CurrencySlice,
  },
});
