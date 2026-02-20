import { createSlice } from "@reduxjs/toolkit";

const storeCartSlice = createSlice({
    name: "storeCart",
    initialState: {
        items: [],
    },
    reducers: {
        addStoreItem: (state, action) => {
            const product = action.payload;
            const id = product.id;

            const existing = state.items.find((item) => item.id === id);
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
        },
        removeStoreItem: (state, action) => {
            const id = action.payload;
            const existing = state.items.find((item) => item.id === id);
            if (existing) {
                if (existing.quantity > 1) {
                    existing.quantity -= 1;
                } else {
                    state.items = state.items.filter((item) => item.id !== id);
                }
            }
        },
        clearStoreCart: (state) => {
            state.items = [];
        },
    },
});

export const { addStoreItem, removeStoreItem, clearStoreCart } =
    storeCartSlice.actions;
export default storeCartSlice.reducer;
