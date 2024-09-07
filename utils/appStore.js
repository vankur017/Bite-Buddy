import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'

const appStore = configureStore({
    reducer:{
        mycart : cartReducer
    }
})

export default appStore