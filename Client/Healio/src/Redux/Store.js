import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { LoaderSlice } from "./LoaderReducer";
import { AuthSlice } from "./AuthenticateReducer";


const rootReducer = combineReducers({
  loader: LoaderSlice.reducer,
  isAuthenticated: AuthSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
