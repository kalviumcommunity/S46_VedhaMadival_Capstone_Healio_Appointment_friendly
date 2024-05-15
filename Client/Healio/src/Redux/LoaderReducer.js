import { createSlice } from "@reduxjs/toolkit";

export const LoaderSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false,
  },
  reducers: {
    ShowLoading: (state) => {
      state.loading = true;
    },
    HideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { ShowLoading, HideLoading } = LoaderSlice.actions;

export default LoaderSlice.reducer;
