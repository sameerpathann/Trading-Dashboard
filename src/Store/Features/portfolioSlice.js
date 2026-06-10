import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  holdings: [],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addHolding: (state, action) => {
      const exists = state.holdings.find(
        (coin) => coin.id === action.payload.id,
      );
      if (exists) {
        const oldInvestment = exists.quantity * exists.buyPrice;
        const newInvestment = action.payload.quantity * action.payload.buyPrice;
        const totalQuantity = exists.quantity + action.payload.quantity;
        exists.buyPrice = (oldInvestment + newInvestment) / totalQuantity;
        exists.quantity = totalQuantity;
      } else {
        state.holdings.push(action.payload);
      }
    },
    removeHolding: (state, action) => {
      state.holdings = state.holdings.filter(
        (coin) => coin.id !== action.payload,
      );
    },
  },
});

export default portfolioSlice.reducer;

export const { addHolding, removeHolding } = portfolioSlice.actions;
