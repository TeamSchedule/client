import React, { useState } from "react";
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
            <HeaderLinkIcon linkTo={`/`}>
                <BellNotificationIcon size={iconSize - 4} color={COLORS.PRIMARY} />
            </HeaderLinkIcon>
            <PersonalAvatar size={avatarSize} />
            <p className="my-0 px-3 fs-5">{login}</p>
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
    const [currentTabNumber, setCurrentTabNumber] = useState(0);

    function getBgColor(tabNumber) {
        return currentTabNumber === tabNumber ? COLORS.PRIMARY : "white";
    }

    function getColor(tabNumber) {
        return currentTabNumber === tabNumber ? "white" : COLORS.PRIMARY;
    }

    return (
        <div className="d-flex align-items-center">
            <HeaderLinkIcon
                linkTo={`/${login}/profile`}
                onClick={() => setCurrentTabNumber(0)}
                styles={{ background: getBgColor(0) }}
            >
                <HomePageIcon size={iconSize + 2} color={getColor(0)} />
            </HeaderLinkIcon>

            <HeaderLinkIcon
                linkTo={`/${login}/teams`}
                onClick={() => setCurrentTabNumber(1)}
                styles={{ background: getBgColor(1) }}
            >
                <TeamIcon size={iconSize} color={getColor(1)} />
            </HeaderLinkIcon>

            <HeaderLinkIcon
                linkTo={`/${login}/tasks`}
                onClick={() => setCurrentTabNumber(2)}
                styles={{ background: getBgColor(2) }}
            >
                <ToDoListIcon size={iconSize} color={getColor(2)} />
            </HeaderLinkIcon>

            <HeaderLinkIcon
                linkTo={`/${login}/settings`}
                onClick={() => setCurrentTabNumber(3)}
                styles={{ background: getBgColor(3) }}
            >
                <SettingsIcon size={iconSize} color={getColor(3)} />
            </HeaderLinkIcon>
        </div>
    );
}

function HeaderLinkIcon({ className, children, linkTo, onClick, styles }) {
    return (
        <>
            <Link
                to={linkTo}
                className={className + " " + "d-flex align-items-center px-3 h-100"}
                onClick={onClick}
                style={{ textDecoration: "none", ...styles }}
            >
                {children}
            </Link>
        </>
    );
}
