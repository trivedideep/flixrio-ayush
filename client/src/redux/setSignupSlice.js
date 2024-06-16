import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    opensu: false,
};

const signup = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        openSignup: (state, action) => {
            state.opensu = true;
        },
        closeSignup: (state) => {
            state.opensu = false;
        }
    }
});

export const { openSignup, closeSignup } = signup.actions;

export default signup.reducer;