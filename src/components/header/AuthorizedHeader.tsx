import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../features/userInfoSlice";
import { PersonalAvatar } from "../avatars";
import { HomePageIcon, SettingsIcon, TeamIcon, ToDoListIcon } from "../svg";
import LogoutMainButton from "./LogoutMainButton";
import HeaderLink, { iconSize } from "./HeaderLink";
import styles from "./Header.module.scss";
import { User } from "../../schemas/instances/users";
import { baseTaskPath, baseUnitPath } from "../../routes/paths";

interface AuthorizedHeaderProps {
    user: User;
}

export default function AuthorizedHeader(props: AuthorizedHeaderProps) {
    return (
        <header className={styles.mainHeader}>
            <HeaderMainNavigationSection />
            <HeaderUserInfoSection user={props.user} />
        </header>
    );
}

interface HeaderUserInfoSectionProps {
    user: User;
}

function HeaderUserInfoSection(props: HeaderUserInfoSectionProps) {
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
    return (
        <div className={styles.headerMainNavigationSection}>
            <HeaderLink linkTo={baseUnitPath} Icon={TeamIcon} />
            <HeaderLink linkTo={baseTaskPath} Icon={ToDoListIcon} />
            <HeaderLink linkTo="/settings" Icon={SettingsIcon} />
        </div>
    );
}
