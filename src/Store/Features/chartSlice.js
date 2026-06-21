import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchChartData } from "../../Services/chartApi";

export const getChartData = createAsyncThunk(
  "chart/getChartData",
  async (days, thunkAPI) => {
    try {
      return await fetchChartData(days);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  },
);

const initialState = {
  chartData: [],
  loading: false,
  error: null,
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.chartData = action.payload;
      })
      .addCase(getChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chartSlice.reducer;
