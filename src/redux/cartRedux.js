import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartQuantity: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartQuantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.TotalPrice * action.payload.quantity;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
