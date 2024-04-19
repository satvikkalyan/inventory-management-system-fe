import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.items.findIndex(item => item.product_id === action.payload.product_id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        const newItem = {...action.payload, quantity: 1};
        state.items.push(newItem);
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.product_id !== action.payload.product_id);
    },
    updateQuantity(state, action) {
      const item = state.items.find(item => item.product_id === action.payload.product_id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
