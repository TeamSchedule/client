import React from "react";
import styles from "./ErrMsg.module.scss";

interface ErrorMsgProps {
    errText: string;
    visible?: boolean;
}

export default function ErrorMsg(props: ErrorMsgProps) {
    const isErrorShown = props.visible === undefined ? false : props.visible;
    if (!isErrorShown) return null;

    return <span className={styles.errMsg}>{props.errText}</span>;
}
