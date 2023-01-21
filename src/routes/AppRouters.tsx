import React from "react";
// import {useSelector} from "react-redux";
// import {selectIsAuth} from "../features/isAuthSlice";
import { unauthorizedRouter } from "./UnauthorizedRoutes";
import { authorizedRouter } from "./AuthorizedRoutes";
import { RouterProvider } from "react-router-dom";

export default function AppRouters() {
    // const isAuth = useSelector(selectIsAuth);
    const isAuth = true;
    const router = isAuth ? authorizedRouter : unauthorizedRouter;
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
