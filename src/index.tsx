import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import AppRouters from "./routes/AppRouters";

import "./reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./assets/styles/globalStyles.scss";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppRouters />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
