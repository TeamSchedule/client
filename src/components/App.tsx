import { Outlet } from "react-router-dom";

import Header from "./header";
import { HEADER_HEIGHT } from "../consts";

export default function App() {
    return (
        <div className="h-100 container-fluid m-0 p-0">
            <Header />
            <div className="position-relative" style={{ top: `${HEADER_HEIGHT + 10}px` }}>
                <Outlet />
            </div>
        </div>
    );
}
