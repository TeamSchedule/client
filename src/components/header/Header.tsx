import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../features/isAuthSlice";

import UnauthorizedHeader from "./UnauthorizedHeader";
import AuthorizedHeader from "./AuthorizedHeader";
import "./header.css";

export default function Header() {
    const isAuth = useSelector(selectIsAuth);

    return isAuth ? <AuthorizedHeader /> : <UnauthorizedHeader />;
}
