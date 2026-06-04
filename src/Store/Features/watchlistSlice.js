import { createSlice } from "@reduxjs/toolkit";

let watchlist = [];
try {
  const storedWatchlist = localStorage.getItem("watchlist");
  if (storedWatchlist) {
    watchlist = JSON.parse(storedWatchlist);
  }
} catch (error) {
  console.error("Failed to load watchlist from local storage", error);
}

const initialState = {
  coins: watchlist,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      const exists = state.coins.some((coin) => coin.id === action.payload);
      if (!exists) {
        state.coins.push(action.payload);
        localStorage.setItem("watchlist", JSON.stringify(state.coins));
      }
    },
    removeFromWatchlist: (state, action) => {
      state.coins = state.coins.filter((coin) => coin.id !== action.payload);
      localStorage.setItem("watchlist", JSON.stringify(state.coins));
    },
  },
});
export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
