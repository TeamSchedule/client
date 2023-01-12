import React from "react";
import styles from "./ScreenSectionHeader.module.scss";

interface ScreenSectionHeaderProps {
    text: string;
}

export default function ScreenSectionHeader(props: ScreenSectionHeaderProps) {
    return (
        <>
            <h2 className={styles.layoutSectionHeader}>{props.text}</h2>
        </>
    );
}
