import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "features/cart/cartSlice";
import storeCartReducer from "features/store/storeCartSlice";

const appStore = configureStore({
    reducer: {
        mycart: cartReducer,
        storeCart: storeCartReducer,
    },
});

export default appStore;
