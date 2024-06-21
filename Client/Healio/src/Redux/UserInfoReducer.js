import { createSlice } from "@reduxjs/toolkit";

export const UserDataSlice = createSlice ({
    name: "userData",
    initialState: {
        userData: {},
    },
    reducers: {
        setData: (state, action) => {
            state.userData = action.payload;
        },
    },
});

export const { setData } = UserDataSlice.actions;

export default UserDataSlice.reducer;
