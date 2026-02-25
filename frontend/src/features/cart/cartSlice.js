import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            const index = state.items.findIndex((item) => item.card?.info?.id === action.payload);
            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.pop();
            }
        },
        clearAllItem: (state) => {
            state.items.length = 0;
        },
    },
});

export const { addItem, removeItem, clearAllItem } = cartSlice.actions;
export default cartSlice.reducer;
