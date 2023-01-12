import React from "react";
import styles from "./ScreenHeader.module.scss";

interface ScreenHeaderProps {
    text: string;
}

export default function ScreenHeader(props: ScreenHeaderProps) {
    return (
        <>
            <h1 className={styles.layoutHeader}>{props.text}</h1>
        </>
    );
}
