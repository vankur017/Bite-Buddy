import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import userReducer from './userSlice'
const appStore = configureStore({
    reducer:{
        mycart : cartReducer,
        user : userReducer
    }
})

export default appStore