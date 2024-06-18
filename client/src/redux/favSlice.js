import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userFav: JSON.parse(localStorage.getItem('user')),
};

const fav = createSlice({
    name: 'fav',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userFav = action.payload;
        }
    }
});

export const { setUser } = fav.actions;

export default fav.reducer;