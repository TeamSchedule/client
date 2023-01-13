import { Outlet, useLoaderData } from "react-router-dom";

import Header from "./header";
import { HEADER_HEIGHT } from "../consts";

export default function App() {
    const user: any = useLoaderData();

    return (
        <div className="h-100 container-fluid m-0 p-0">
            <Header user={user} />
            <div className="position-relative" style={{ top: `${HEADER_HEIGHT + 10}px` }}>
                <Outlet />
            </div>
        </div>
    );
}
