import {createSlice} from "@reduxjs/toolkit";


export const editedTaskSlice = createSlice({
    name: "editedTask",
    initialState: {
        value: null,
    },

    reducers: {
        onTaskClicked: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const {onTaskClicked} = editedTaskSlice.actions;
export const selectEditedTask = state => state.editedTask.value;

export default editedTaskSlice.reducer;
