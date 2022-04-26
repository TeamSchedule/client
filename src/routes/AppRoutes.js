import React from "react";
import UnauthorizedRoutes from "./UnauthorizedRoutes";
import AuthorizedRoutes from "./AuthorizedRoutes";
import isAuthenticated from "../utils/isAuthenticated";


export default function AppRoutes() {
    return isAuthenticated() ? <AuthorizedRoutes /> : <UnauthorizedRoutes />;
}
