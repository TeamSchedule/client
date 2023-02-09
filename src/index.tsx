import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AllRoutes";
import { ThemeProvider } from "@mui/material";
import MainTheme from "./assets/theme";

import "./reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./assets/styles/globalStyles.scss";

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={MainTheme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
