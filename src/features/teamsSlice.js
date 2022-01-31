import {createSlice} from "@reduxjs/toolkit";


export const teamsSlice = createSlice({
    name: "teams",
    initialState: {
        value: [],
    },

    reducers: {
        setTeams: (state, action) => {
            state.value = action.payload;
        },
    },
});


export const {setTeams} = teamsSlice.actions;
export const selectTeams = state => new Date(state.teams.value);

export default teamsSlice.reducer;
