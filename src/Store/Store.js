import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./Features/watchlistSlice";
import marketReducer from "./Features/marketSlice";
import themeReducer from "./Features/themeSlice";
import portfolioReducer from "./Features/portfolioSlice";
import chartReducer from "./Features/chartSlice";
export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    market: marketReducer,
    theme: themeReducer,
    portfolio: portfolioReducer,
    chart: chartReducer,
  },
});
