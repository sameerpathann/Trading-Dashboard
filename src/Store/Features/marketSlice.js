import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMarketData } from "../../Services/marketApi";

export const getMarketData = createAsyncThunk(
  "market/getMarketData",
  async (_, thunkAPI) => {
    try {
      const data = await fetchMarketData();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went Wrong",
      );
    }
  },
);

const initialState = {
  marketCoins: [],
  loading: false,
  error: null,
};

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMarketData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMarketData.fulfilled, (state, action) => {
      state.loading = false;
      state.marketCoins = action.payload;
    });
    builder.addCase(getMarketData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default marketSlice.reducer;
