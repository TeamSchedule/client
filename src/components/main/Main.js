import React from "react";
import { Outlet } from "react-router-dom";

export function Main() {
    return (
        <div className="row m-0 d-flex px-2">
            <div className="col-sm-12 p-0 position-relative">
                <Outlet />
            </div>
        </div>
    );
}
