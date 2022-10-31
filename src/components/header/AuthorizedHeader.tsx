import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../features/userInfoSlice";
import { PersonalAvatar } from "../avatars";
import { HomePageIcon, SettingsIcon, TeamIcon, ToDoListIcon } from "../svg";
import LogoutMainButton from "./LogoutMainButton";
import HeaderLink, { iconSize } from "./HeaderLink";
import styles from "./Header.module.scss";

export default function AuthorizedHeader() {
    return (
        <header className={styles.mainHeader}>
            <HeaderMainNavigationSection />
            <HeaderUserInfoSection />
        </header>
    );
}

function HeaderUserInfoSection() {
    const userInfo = useSelector(selectUserInfo);

    const login = userInfo.login;

    return (
        <div className={styles.headerUserInfoSection}>
            <PersonalAvatar size={iconSize} />
            <Link to={`${login}/profile`} className="px-3 fs-5 d-none d-sm-block">
                {login}
            </Link>

            <LogoutMainButton />
        </div>
    );
}

function HeaderMainNavigationSection() {
    const userInfo = useSelector(selectUserInfo);

    const login = userInfo.login;

    return (
        <div className={styles.headerMainNavigationSection}>
            <HeaderLink linkTo={`/${login}/profile`} path={`/${login}/profile`} Icon={HomePageIcon} />
            <HeaderLink linkTo={`/${login}/teams`} path={`/${login}/teams`} Icon={TeamIcon} />
            <HeaderLink linkTo={`/${login}/tasks`} path={`/${login}/tasks`} Icon={ToDoListIcon} />
            <HeaderLink linkTo={`/${login}/settings`} path={`/${login}/settings`} Icon={SettingsIcon} />
        </div>
    );
}
