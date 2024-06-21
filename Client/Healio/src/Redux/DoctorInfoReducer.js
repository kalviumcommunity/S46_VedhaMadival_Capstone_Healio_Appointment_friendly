import { createSlice } from "@reduxjs/toolkit";

export const DoctorDataSlice = createSlice ({
    name: "DoctorData",
    initialState: {
        DoctorData: [],
    },
    reducers: {
        setDoctorData: (state, action) => {
            state.DoctorData = action.payload;
        },
    },
});

export const { setDoctorData } = DoctorDataSlice.actions;

export default DoctorDataSlice.reducer;
