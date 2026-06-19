import { createSlice } from "@reduxjs/toolkit";

let holdings = [];

try {
  const storedHoldings = localStorage.getItem("holdings");
  if (storedHoldings) {
    holdings = JSON.parse(storedHoldings);
  }
} catch (error) {
  console.error("Faild to load stored holdings", error);
}
const initialState = {
  holdings: holdings,
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
      localStorage.setItem("holdings", JSON.stringify(state.holdings));
    },
    removeHolding: (state, action) => {
      state.holdings = state.holdings.filter(
        (coin) => coin.id !== action.payload,
      );
      localStorage.setItem("holdings", JSON.stringify(state.holdings));
    },
    updateHolding: (state, action) => {
      const { id, quantity, buyPrice } = action.payload;
      const holding = state.holdings.find((coin) => coin.id === id);
      if (holding) {
        holding.quantity = quantity;
        holding.buyPrice = buyPrice;
      }
      localStorage.setItem("holdings", JSON.stringify(state.holdings));
    },
    clearHoldings: (state) => {
      state.holdings = [];
      localStorage.removeItem("holdings");
    },
  },
});

export default portfolioSlice.reducer;

export const { addHolding, removeHolding, updateHolding, clearHoldings } =
  portfolioSlice.actions;
