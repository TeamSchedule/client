import {createSlice} from "@reduxjs/toolkit";


export const isAuthSlice = createSlice({
    name: "isAuth",
    initialState: {
        value: false,
    },

    reducers: {
        login: state => {
            state.value = true;
        },

        onLogout: state => {
            state.value = false;
        },
    },
});

export const {login, onLogout} = isAuthSlice.actions;
export const selectIsAuth = state => state.isAuth.value;

export default isAuthSlice.reducer;
