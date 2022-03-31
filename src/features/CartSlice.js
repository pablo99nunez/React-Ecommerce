import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    loading: true,
  },
  reducers: {
    addToCart: (state, action) => {
      if (!action.payload.attributes) {
        action.payload.attributes = action.payload.product.attributes.map(
          (item) => ({
            name: item.name,
            active: item.items[0].value,
          })
        );
      }

      const isAlreadyOnCart = state.cart.find(
        (item) =>
          item.product.id === action.payload.product.id &&
          action.payload.attributes.map((e) => e.active).join("") ===
            item.attributes.map((e) => e.active).join("")
      );
      if (isAlreadyOnCart) {
        isAlreadyOnCart.quantity += 1;
      } else {
        state.cart.push({
          product: action.payload.product,
          quantity: 1,
          attributes: action.payload.attributes,
        });
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeFromCart: (state, action) => {
      const itemToRemove = state.cart.find(
        (item) =>
          item.product.id === action.payload.id &&
          action.payload.attributes.map((e) => e.active).join("") ===
            item.attributes.map((e) => e.active).join("")
      );
      if (itemToRemove.quantity > 1) {
        itemToRemove.quantity -= 1;
        state.total -= itemToRemove.product.prices[0].amount;
      } else {
        const filter = state.cart.filter((item) => {
          return (
            item.product.id + item.attributes.map((e) => e.active).join("") !==
            action.payload.id +
              action.payload.attributes.map((e) => e.active).join("")
          );
        });
        state.cart = filter;
        state.total -= itemToRemove.product.prices[0].amount;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    changeAttributes: (state, action) => {
      //Find the item
      const itemToChange = state.cart.find(
        (item) =>
          item.product.id === action.payload.id &&
          action.payload.attributes.map((e) => e.active).join("") ===
            item.attributes.map((e) => e.active).join("")
      );
      //Change the attribute
      itemToChange.attributes[action.payload.index].active =
        action.payload.value;

      //Check if the item changed is already on the cart
      const isAlreadyOnCart = state.cart.filter((item) => {
        return (
          item.product.id === itemToChange.product.id &&
          itemToChange.attributes.map((e) => e.active).join("") ===
            item.attributes.map((e) => e.active).join("")
        );
      });
      if (isAlreadyOnCart.length === 2) {
        //Add the quantity from one product to the other
        isAlreadyOnCart[0].quantity += isAlreadyOnCart[1].quantity;
        //remove duplicates
        state.cart = deleteOnIndex(
          state.cart,
          state.cart.indexOf(isAlreadyOnCart[1])
        );
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("cart", []);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, changeAttributes } =
  CartSlice.actions;

export default CartSlice.reducer;

function deleteOnIndex(array, index) {
  return array.filter((item, i) => i !== index);
}
