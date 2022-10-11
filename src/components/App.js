import React from "react";
import { Outlet } from "react-router";

import Header from "./header/Header";

export default function App() {
    return (
        <div className="h-100 container-fluid m-0 p-0">
            <Header />
            <div className="position-relative" style={{ top: "50px" }}>
                <Outlet />
            </div>
        </div>
    );
}
