import { configureStore } from "@reduxjs/toolkit";
import userReducer from './User.js'
const store=configureStore({
    reducer:{user:userReducer}
})
export default store;