import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const info = action.payload.card?.info || action.payload;
      const id = info.id;

      const existingItem = state.items.find(
        (item) => (item.card?.info?.id || item.id) === id
      );

      if (existingItem) {
        // Increase quantity if item already in cart
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        // Add new item with quantity = 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(
        (item) => (item.card?.info?.id || item.id) === id
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // Remove completely if last one
          state.items = state.items.filter(
            (item) => (item.card?.info?.id || item.id) !== id
          );
        }
      }
    },
    clearAllItem: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearAllItem } = cartSlice.actions;
export default cartSlice.reducer;
