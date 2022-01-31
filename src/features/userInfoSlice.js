import {createSlice} from "@reduxjs/toolkit";


export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        value: {},
    },

    reducers: {
        set: (state, action) => {
            state.value = action.payload;
        },

        onDeleteUserInfo: state => {
            state.value = {};
        },
    },
});

export const {set, onDeleteUserInfo} = userInfoSlice.actions;
export const selectUserInfo = state => state.userInfo.value;

export default userInfoSlice.reducer;
