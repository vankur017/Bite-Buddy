import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import userReducer from './userSlice'
import storeCartReducer from './storeCartSlice'

const appStore = configureStore({
    reducer: {
        mycart: cartReducer,
        user: userReducer,
        storeCart: storeCartReducer,
    }
})

export default appStore