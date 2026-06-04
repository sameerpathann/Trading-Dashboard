import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./Features/watchlistSlice";
import marketReducer from "./Features/marketSlice";
import themeReducer from "./Features/themeSlice";
export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    market: marketReducer,
    theme: themeReducer,
  },
});
