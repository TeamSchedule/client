import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PersonalAvatar } from "../avatars";
import { LogoutIcon, SettingsIcon, TeamIcon, ToDoListIcon } from "../svg";
import HeaderLink, { iconSize } from "./HeaderLink";
import styles from "./Header.module.scss";
import { baseCalendarPath, baseNotificationPath, baseSettingsPath, baseUnitPath } from "../../routes/paths";
import BellNotificationIcon from "../svg/BellNotificationIcon";
import { NotificationsContext } from "../App";
import { AuthContext, AuthContextProps } from "../../hooks/useAuth";

export default function AuthorizedHeader() {
    return (
        <header className={styles.mainHeader}>
            <HeaderMainNavigationSection />
            <HeaderUserInfoSection />
        </header>
    );
}

function HeaderUserInfoSection() {
    const { user, logout } = useContext<AuthContextProps>(AuthContext);

    const newNotifications = useContext<Array<object>>(NotificationsContext);

    const login = user?.login || "guest?";

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

            <HeaderLink linkTo="/" onClick={logout} Icon={LogoutIcon} />
        </div>
    );
}

function HeaderMainNavigationSection() {
    return (
        <div className={styles.headerMainNavigationSection}>
            <HeaderLink linkTo={baseUnitPath} Icon={TeamIcon} />
            <HeaderLink linkTo={baseCalendarPath} Icon={ToDoListIcon} />
            <HeaderLink linkTo={baseSettingsPath} Icon={SettingsIcon} />
        </div>
    );
}
