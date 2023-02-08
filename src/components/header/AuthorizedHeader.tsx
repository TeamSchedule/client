import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MainAvatar from "../MainAvatar";
import { CalendarIcon, LogoutIcon, SettingsIcon, TeamIcon, ToDoListIcon } from "../svg";
import HeaderLink, { iconSize } from "./HeaderLink";
import styles from "./Header.module.scss";
import {
    baseCalendarPath,
    baseSettingsPath,
    EventListPath,
    NotificationListPath,
    startPagePath,
    UnitListPath,
} from "../../routes/paths";
import BellNotificationIcon from "../svg/BellNotificationIcon";
import { NotificationsContext } from "../App";
import useAuth from "../../hooks/useAuth";

export default function AuthorizedHeader() {
    return (
        <header className={styles.mainHeader}>
            <HeaderMainNavigationSection />
            <HeaderUserInfoSection />
        </header>
    );
}

function HeaderUserInfoSection() {
    const { user, logout } = useAuth();

    const newNotifications = useContext<Array<object>>(NotificationsContext);

    const login = user?.login || "guest?";

    return (
        <div className={styles.headerUserInfoSection}>
            <HeaderLink
                linkTo={NotificationListPath}
                Icon={BellNotificationIcon}
                badgeContent={newNotifications.length}
                className="mx-1"
            />

            <MainAvatar size={iconSize} src={user?.avatar} />
            <Link to={`${login}/profile`} className="px-3 fs-5 d-none d-sm-block">
                {login}
            </Link>

            <HeaderLink linkTo={startPagePath} onClick={logout} Icon={LogoutIcon} className="d-none d-md-inline-flex" />
        </div>
    );
}

function HeaderMainNavigationSection() {
    return (
        <div className={styles.headerMainNavigationSection}>
            <HeaderLink linkTo={baseCalendarPath} Icon={CalendarIcon} />
            <HeaderLink linkTo={UnitListPath} Icon={TeamIcon} />
            <HeaderLink linkTo={EventListPath} Icon={ToDoListIcon} />
            <HeaderLink linkTo={baseSettingsPath} Icon={SettingsIcon} />
        </div>
    );
}
