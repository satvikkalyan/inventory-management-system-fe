import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/User.js';
import cartReducer from './reducers/Cart.js';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
