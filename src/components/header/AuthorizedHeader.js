import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../features/userInfoSlice";
import PersonalAvatar from "../avatars/PersonalAvatar";
import clearInfo from "../../utils/clearInfo";
import { COLORS } from "../../consts";
import { HomePageIcon, LogoutIcon, SettingsIcon, TeamIcon, ToDoListIcon } from "../svg";

const iconSize = 36;
const avatarSize = iconSize;

function AuthorizedHeader() {
    const userInfo = useSelector(selectUserInfo);

    return (
        <header className="row justify-content-end main-header mx-0 position-fixed left-0 top-0 right-0">
            <div className="d-flex justify-content-between p-0">
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
            <PersonalAvatar size={avatarSize} />
            <Link to={`${login}/profile`}>
                <p className="my-0 px-3 fs-5">{login}</p>
            </Link>

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
    const location = useLocation();

    useEffect(() => {}, [location.pathname]);

    function getBgColor(path) {
        return location.pathname.startsWith(path) ? COLORS.PRIMARY : "white";
    }

    function getColor(path) {
        return location.pathname.startsWith(path) ? "white" : COLORS.PRIMARY;
    }

    return (
        <div className="d-flex align-items-center">
            <HeaderLinkIcon
                linkTo={`/${login}/profile`}
                styles={{ background: getBgColor(`/${login}/profile`) }}
            >
                <HomePageIcon size={iconSize + 2} color={getColor(`/${login}/profile`)} />
            </HeaderLinkIcon>

            <HeaderLinkIcon
                linkTo={`/${login}/teams`}
                styles={{ background: getBgColor(`/${login}/teams`) }}
            >
                <TeamIcon size={iconSize} color={getColor(`/${login}/teams`)} />
            </HeaderLinkIcon>

            <HeaderLinkIcon
                linkTo={`/${login}/tasks`}
                styles={{ background: getBgColor(`/${login}/tasks`) }}
            >
                <ToDoListIcon size={iconSize} color={getColor(`/${login}/tasks`)} />
            </HeaderLinkIcon>

            <HeaderLinkIcon
                linkTo={`/${login}/settings`}
                styles={{ background: getBgColor(`/${login}/settings`) }}
            >
                <SettingsIcon size={iconSize} color={getColor(`/${login}/settings`)} />
            </HeaderLinkIcon>
        </div>
    );
}

function HeaderLinkIcon({ className, children, linkTo, onClick, styles }) {
    return (
        <>
            <Link
                to={linkTo}
                className={className + " " + "d-flex align-items-center px-3 h-100 headerLinkIcon"}
                onClick={onClick}
                style={{ textDecoration: "none", ...styles }}
            >
                {children}
            </Link>
        </>
    );
}
