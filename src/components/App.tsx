import { Outlet, useLoaderData } from "react-router-dom";

import Header from "./header";

export default function App() {
    const user: any = useLoaderData();

    return (
        <div className="h-100 container-fluid m-0 p-0">
            <Header user={user} />
            <div className="position-relative">
                <div className="row m-0 d-flex px-2">
                    <div className="col-sm-12 p-0 position-relative">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
