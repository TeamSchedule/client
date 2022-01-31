import {createSlice} from "@reduxjs/toolkit";


export const selectedDateSlice = createSlice({
    name: "selectedDate",
    initialState: {
        value: new Date().toJSON(),
    },

    reducers: {
        onSelectDate: (state, action) => {
            state.value = action.payload.toJSON();
        },
    },
});

export const {onSelectDate} = selectedDateSlice.actions;
export const selectSelectedDate = state => new Date(state.selectedDate.value);

export default selectedDateSlice.reducer;
