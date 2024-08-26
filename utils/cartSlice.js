import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        items:[]
    },
    reducers:{
        addItem:(state, actions)=>{
            state.items.push(actions.payload)//mutating the existing state directly
        },
        removeItem:(state,actions)=>{
            state.items.pop()
        },
        clearCart:(state)=>{
            state.items.length = 0
        }
    }
})

export const {addItem, removeItem, clearCart} = cartSlice.actions

export default cartSlice.reducer;