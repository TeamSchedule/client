import {configureStore} from '@reduxjs/toolkit'

import userInfoReducer from "../features/userInfoSlice";
import selectedDateReducer from "../features/selectedDateSlice";
import teamsReducer from "../features/teamsSlice";
import editedTeamReducer from "../features/editedTeamSlice";


const REDUX_STORE_KEY_IN_LOCALSTORAGE = 'reduxState';


const store = configureStore({
    reducer: {
        userInfo: userInfoReducer,
        teams: teamsReducer,

        // TODO: Don't save in localStorage:
        selectedDate: selectedDateReducer,
        editedTeam: editedTeamReducer,
    },

    preloadedState: JSON.parse(localStorage.getItem(REDUX_STORE_KEY_IN_LOCALSTORAGE)) || {},
});


store.subscribe(() => {
    localStorage.setItem(REDUX_STORE_KEY_IN_LOCALSTORAGE, JSON.stringify(store.getState()));
});


export default store;
