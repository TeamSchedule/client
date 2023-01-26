import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { router } from "./routes/AllRoutes";

import "./reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./assets/styles/globalStyles.scss";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
