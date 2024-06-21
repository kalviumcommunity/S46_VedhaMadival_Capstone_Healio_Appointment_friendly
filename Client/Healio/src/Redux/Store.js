import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { LoaderSlice } from "./LoaderReducer";
import {AuthSlice} from "./AuthenticateReducer";
import { UserDataSlice } from "./UserInfoReducer";
import { DoctorDataSlice } from "./DoctorInfoReducer";


const rootReducer = combineReducers({
  loader: LoaderSlice.reducer,
  isAuthenticated: AuthSlice.reducer,
  userData: UserDataSlice.reducer,
  DoctorData: DoctorDataSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
