import { createSlice } from "@reduxjs/toolkit";

const storeCartSlice = createSlice({
    name: "storeCart",
    initialState: {
        items: [],
    },
    reducers: {
        addStoreItem: (state, action) => {
            const existingProduct = state.items.find((item) => item.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeStoreItem: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload);
            if (index >= 0) {
                state.items.splice(index, 1);
            }
        },
        updateStoreItemQty: (state, action) => {
            const { id, delta } = action.payload;
            const existingProduct = state.items.find((item) => item.id === id);
            if (existingProduct) {
                existingProduct.quantity += delta;
                if (existingProduct.quantity <= 0) {
                    state.items = state.items.filter(item => item.id !== id);
                }
            }
        },
        clearStoreCart: (state) => {
            state.items = [];
        },
    },
});

export const { addStoreItem, removeStoreItem, updateStoreItemQty, clearStoreCart } = storeCartSlice.actions;
export default storeCartSlice.reducer;
