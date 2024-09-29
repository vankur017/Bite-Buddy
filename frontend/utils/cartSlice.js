import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : 'cart',
    initialState:{
        items: []
    },
    reducers:{
        addItem:(state, action)=>{
            state.items.push(action.payload);
        },
        clearAllItem:(state)=>{
            state.items.length = 0
        },
        removeItem:(state,action)=>{
            state.items = state.items.filter(
                (item) => item.card.info.id !== action.payload
            );
        }

    }
})

export const {addItem, removeItem , clearAllItem} = cartSlice.actions;

export default cartSlice.reducer