import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "isAuthenticated",
  initialState: {
    isAuthenticated : false,
  },
  reducers: {
    SetUnauthenticated: (state) => {
      state.isAuthenticated = false;
    },
    SetAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
  }, 
});
 
export const { SetUnauthenticated , SetAuthenticated } = AuthSlice.actions;

export default AuthSlice.reducer;
