import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import clearInfo from "../../utils/clearInfo";
import { LogoutIcon } from "../svg";
import { COLORS } from "../../consts";
import HeaderLink from "./HeaderLink";

export default function LogoutMainButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function logout() {
        clearInfo(dispatch);
        navigate("/");
    }

    return (
        <>
            <HeaderLink linkTo="/" onClick={logout}>
                <LogoutIcon size={26} color={COLORS.PRIMARY} />
            </HeaderLink>
        </>
    );
}
