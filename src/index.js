import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter} from "react-router-dom";

import AppRoutes from "./routes/routes";
import {Provider} from "react-redux";
import store from "./store/store";

import "./reset.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
