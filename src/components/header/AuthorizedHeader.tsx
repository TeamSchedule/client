import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PersonalAvatar } from "../avatars";
import { SettingsIcon, TeamIcon, ToDoListIcon } from "../svg";
import LogoutMainButton from "./LogoutMainButton";
import HeaderLink, { iconSize } from "./HeaderLink";
import styles from "./Header.module.scss";
import { baseNotificationPath, baseTaskPath, baseUnitPath } from "../../routes/paths";
import BellNotificationIcon from "../svg/BellNotificationIcon";
import { NotificationsContext } from "../App";
import useLocalStorage from "../../hooks/useLocalStorage";
import { AuthUserKey } from "../../consts/common";

export default function AuthorizedHeader() {
    return (
        <header className={styles.mainHeader}>
            <HeaderMainNavigationSection />
            <HeaderUserInfoSection />
        </header>
    );
}

function HeaderUserInfoSection() {
    const [user, _] = useLocalStorage(AuthUserKey);

    const newNotifications = useContext<Array<object>>(NotificationsContext);

    const login = user.login;

    return (
        <div className={styles.headerUserInfoSection}>
            <HeaderLink
                linkTo={baseNotificationPath}
                Icon={BellNotificationIcon}
                badgeContent={newNotifications.length}
            />

            <PersonalAvatar size={iconSize} />
            <Link to={`${login}/profile`} className="px-3 fs-5 d-none d-sm-block">
                {login}
            </Link>

            <LogoutMainButton />
        </div>
    );
}

function HeaderMainNavigationSection() {
    return (
        <div className={styles.headerMainNavigationSection}>
            <HeaderLink linkTo={baseUnitPath} Icon={TeamIcon} />
            <HeaderLink linkTo={baseTaskPath} Icon={ToDoListIcon} />
            <HeaderLink linkTo="/settings" Icon={SettingsIcon} />
        </div>
    );
}
