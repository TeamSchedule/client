import React from "react";
// import {useSelector} from "react-redux";
// import {selectIsAuth} from "../features/isAuthSlice";
import UnauthorizedRoutes from "./UnauthorizedRoutes";
import AuthorizedRoutes from "./AuthorizedRoutes";

export default function AppRoutes() {
    // const isAuth = useSelector(selectIsAuth);
    const isAuth = false;

    return isAuth ? <AuthorizedRoutes /> : <UnauthorizedRoutes />;
}
