import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/User.js';
import cartReducer from './reducers/Cart.js';

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    }
});

export default store;
