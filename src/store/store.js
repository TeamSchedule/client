import {configureStore} from '@reduxjs/toolkit'

import userInfoReducer from "../features/userInfoSlice";


const REDUX_STORE_KEY_IN_LOCALSTORAGE = 'reduxState';


const store = configureStore({
    reducer: {
        userInfo: userInfoReducer,
    },

    preloadedState: JSON.parse(localStorage.getItem(REDUX_STORE_KEY_IN_LOCALSTORAGE)) || {},
});


store.subscribe(() => {
    localStorage.setItem(REDUX_STORE_KEY_IN_LOCALSTORAGE, JSON.stringify(store.getState()));
});


export default store;
