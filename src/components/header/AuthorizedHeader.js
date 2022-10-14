import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../features/userInfoSlice";
import PersonalAvatar from "../avatars/PersonalAvatar";
import clearInfo from "../../utils/clearInfo";
import { COLORS } from "../../consts";
import {
    BellNotificationIcon,
    HomePageIcon,
    LogoutIcon,
    SettingsIcon,
    TeamIcon,
    ToDoListIcon,
} from "../svg";

const iconSize = 36;
const avatarSize = iconSize;

function AuthorizedHeader() {
    const userInfo = useSelector(selectUserInfo);

    return (
        <header className="row justify-content-end py-2 main-header mx-0 px-2 position-fixed left-0 top-0 right-0">
            <div className="d-flex justify-content-between">
                <HeaderMainNavigationSection login={userInfo.login} />
                <HeaderUserInfoSection login={userInfo.login} />
            </div>
        </header>
    );
}

export default AuthorizedHeader;

function HeaderUserInfoSection({ login }) {
    return (
        <div className="d-flex align-items-center">
            <HeaderLinkIcon linkTo={`/`}>
                <BellNotificationIcon size={iconSize - 4} color={COLORS.PRIMARY} />
            </HeaderLinkIcon>
            <PersonalAvatar width={avatarSize} height={avatarSize} />
            <p className="my-0 px-3">{login}</p>
            <LogoutMainButton />
        </div>
    );
}

function LogoutMainButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function logout() {
        clearInfo(dispatch);
        navigate("/");
    }

    return (
        <>
            <HeaderLinkIcon linkTo="/" onClick={logout}>
                <LogoutIcon size={26} color={COLORS.PRIMARY} />
            </HeaderLinkIcon>
        </>
    );
}

function HeaderMainNavigationSection({ login }) {
    return (
        <div className="d-flex align-items-center">
            <HeaderLinkIcon linkTo={`/${login}/profile`}>
                <HomePageIcon size={iconSize + 2} color={COLORS.PRIMARY} />
            </HeaderLinkIcon>
            <HeaderLinkIcon linkTo={`/${login}/teams`}>
                <TeamIcon size={iconSize} color={COLORS.PRIMARY} />
            </HeaderLinkIcon>
            <HeaderLinkIcon linkTo={`/${login}/tasks`}>
                <ToDoListIcon size={iconSize} color={COLORS.PRIMARY} />
            </HeaderLinkIcon>
            <HeaderLinkIcon linkTo={`/${login}/profile`}>
                <SettingsIcon size={iconSize} color={COLORS.PRIMARY} />
            </HeaderLinkIcon>
        </div>
    );
}

function HeaderLinkIcon({ children, linkTo, onClick }) {
    return (
        <>
            <Link to={linkTo} className="mx-3" onClick={onClick} style={{ textDecoration: "none" }}>
                {children}
            </Link>
        </>
    );
}
