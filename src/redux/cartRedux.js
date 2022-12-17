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
      // check if product already exists in cart
      const product = state.products.find(
        (product) => product._id === action.payload._id
      );
      // if product exists, increase quantity
      if (product) {
        product.quantity += 1;
      } else {
        // if product doesn't exist, add it to cart
        state.products.push(action.payload);
      }
      state.cartQuantity += 1;
      state.total += action.payload.TotalPrice * action.payload.quantity;
      state.total = Math.round(state.total * 100) / 100;
    },
    removeFromCart: (state, action) => {
      if (state.cartQuantity > 0) {
        try {
          state.cartQuantity -= action.payload.quantity;
          state.total -= action.payload.TotalPrice * action.payload.quantity;
          state.total = Math.round(state.total * 100) / 100;
          state.products.splice(
            state.products.findIndex((item) => item._id === action.payload._id),
            1
          );
        } catch (err) {
          console.log(err);
        }
      }
    },
    increaseProductQuantity: (state, action) => {
      state.products.find(
        (item) => item._id === action.payload._id
      ).quantity += 1;
      state.cartQuantity += 1;
      state.total += action.payload.TotalPrice;
      state.total = Math.round(state.total * 100) / 100;
    },
    decreaseProductQuantity: (state, action) => {
      if (
        state.products.find((item) => item._id === action.payload._id)
          .quantity > 1
      ) {
        state.products.find(
          (item) => item._id === action.payload._id
        ).quantity -= 1;
        state.cartQuantity -= 1;
        state.total -= action.payload.TotalPrice;
        state.total = Math.round(state.total * 100) / 100;
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.cartQuantity = 0;
      state.total = 0;
    },
    updateCart: (state, action) => {
      const product = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (product) {
        product.price = action.payload.price;
        product.TotalPrice = action.payload.TotalPrice;
      }
      let totalPrices = state.products.map((product) => {
        return product.TotalPrice * product.quantity;
      });

      state.total = totalPrices.reduce((a, b) => a + b, 0);
      state.total = Math.round(state.total * 100) / 100;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  clearCart,
  updateCart,
} = cartSlice.actions;
export default cartSlice.reducer;
