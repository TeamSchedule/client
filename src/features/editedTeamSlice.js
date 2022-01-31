import {createSlice} from "@reduxjs/toolkit";


export const editedTeamSlice = createSlice({
    name: "editedTeam",
    initialState: {
        value: null,
    },

    reducers: {
        onTeamClicked: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const {onTeamClicked} = editedTeamSlice.actions;
export const selectEditedTeam = state => state.editedTeam.value;

export default editedTeamSlice.reducer;
