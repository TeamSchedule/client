import React from 'react';
import {Outlet} from "react-router-dom";


export function Main() {
    return (
        <div className="row m-0 d-flex">
            <div className="col-sm-12 p-0 position-relative">
                <Outlet />
            </div>
        </div>
    );
}
