import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { COLORS } from "../../consts";

export const iconSize = 36;

interface HeaderLinkProps {
    linkTo: string;
    onClick?: () => void;
    children?: React.ReactElement;
    path?: string;
    Icon?: any;
}

export default function HeaderLink(props: HeaderLinkProps) {
    const location = useLocation();

    const [className, setClassName] = useState(styles.headerLink);
    const Icon = props.Icon;

    useEffect(() => {
        if (props.path) {
            if (location.pathname.startsWith(props.path)) {
                setClassName(styles.headerLink__active);
            } else {
                setClassName(styles.headerLink__passive);
            }
        }
    }, [location.pathname]);

    return (
        <>
            <Link to={props.linkTo} className={[styles.headerLink, className].join(" ")}>
                {Icon && (
                    <Icon
                        size={iconSize}
                        // color={props.path && location.pathname.startsWith(props.path) ? "#ffffff" : COLORS.PRIMARY}
                        className={
                            props.path && location.pathname.startsWith(props.path)
                                ? styles.headerLink_icon__active
                                : styles.headerLink_icon__passive
                        }
                    />
                )}
            </Link>
        </>
    );
}
