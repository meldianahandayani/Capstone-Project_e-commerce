import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, title, price, image, quantity } = action.payload;
      const existingItem = state.items.find((cartItem) => cartItem.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ id, title, price, image, quantity });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateCartQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === id);

      if (item && quantity >= 1) {
        item.quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((cartItem) => cartItem.id !== id);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, updateCartQuantity, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
