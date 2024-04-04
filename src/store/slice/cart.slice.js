import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ id: productId, quantity: 1 });
      }
      state.totalQuantity++;
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== productId);
        } else {
          existingItem.quantity--;
        }
        state.totalQuantity--;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;