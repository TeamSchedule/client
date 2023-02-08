import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { Badge, BadgeProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { startPagePath } from "../../routes/paths";

export const iconSize = 36;

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    "& .MuiBadge-badge": {
        right: 5,
        top: 5,
    },
}));

interface HeaderLinkProps {
    linkTo: string;
    onClick?: () => void;
    Icon?: any;
    badgeContent?: number;
    className?: string;
}

export default function HeaderLink(props: HeaderLinkProps) {
    const Icon = props.Icon;

    const { pathname } = useLocation();
    const match = props.linkTo === startPagePath ? false : pathname.startsWith(props.linkTo);

    return (
        <>
            <NavLink
                to={props.linkTo}
                className={[
                    styles.headerLink,
                    match ? styles.headerLink__active : styles.headerLink__passive,
                    "px-md-3",
                    props.className || "",
                ].join(" ")}
                onClick={props.onClick}
            >
                {Icon && (
                    <StyledBadge badgeContent={props.badgeContent} color="primary">
                        <Icon
                            size={iconSize}
                            className={match ? styles.headerLink_icon__active : styles.headerLink_icon__passive}
                        />
                    </StyledBadge>
                )}
            </NavLink>
        </>
    );
}
