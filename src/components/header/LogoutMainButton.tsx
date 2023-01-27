import React from "react";
import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../svg";
import HeaderLink from "./HeaderLink";
import { loginPath } from "../../routes/paths";
import { LocalStorageApi } from "../../api/storage";

export default function LogoutMainButton() {
    const navigate = useNavigate();

    function logout() {
        LocalStorageApi.CLEAR();
        navigate(loginPath);
    }

    return (
        <>
            <HeaderLink linkTo="/" onClick={logout} Icon={LogoutIcon} />
        </>
    );
}
