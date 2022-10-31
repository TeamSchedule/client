import React from "react";
import { Outlet } from "react-router-dom";

export function TaskPage() {
    return (
        <div className="row mx-0 px-0 align-items-stretch align-content-stretch h-100">
            <div className="col">
                <Outlet />
            </div>
        </div>
    );
}
