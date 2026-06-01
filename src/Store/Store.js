import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./Features/watchlistSlice";
import marketReducer from "./Features/marketSlice";
export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    market: marketReducer,
  },
});
