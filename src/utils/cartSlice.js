import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (val) => val.item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.cnt += 1;
      } else {
        state.items.push({ cnt: 1, item: action.payload });
      }
      state.totalPrice += action.payload.price;
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(
        (val) => val.item.productId === action.payload.productId
      );

      if (index !== -1) {
        const item = state.items[index];
        if (item.cnt > 1) {
          item.cnt -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
      state.totalPrice -= action.payload.price;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
