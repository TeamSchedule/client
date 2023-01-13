import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import styles from "./Header.module.scss";

export const iconSize = 36;

interface HeaderLinkProps {
    linkTo: string;
    onClick?: () => void;
    Icon?: any;
}

export default function HeaderLink(props: HeaderLinkProps) {
    const Icon = props.Icon;

    const match = useMatch({
        path: props.linkTo,
    });

    return (
        <>
            <NavLink
                to={props.linkTo}
                className={[
                    styles.headerLink,
                    Boolean(match) ? styles.headerLink__active : styles.headerLink__passive,
                ].join(" ")}
                onClick={props.onClick}
            >
                {Icon && (
                    <Icon
                        size={iconSize}
                        className={Boolean(match) ? styles.headerLink_icon__active : styles.headerLink_icon__passive}
                    />
                )}
            </NavLink>
        </>
    );
}
