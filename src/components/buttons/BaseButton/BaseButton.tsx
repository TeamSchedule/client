import React from "react";
import styles from "./BaseButton.module.scss";
import { CircularProgress } from "@mui/material";

function getVariantClassName(variant: string): string {
    switch (variant) {
        case "danger":
            return styles.baseButton__danger;
        case "success":
            return styles.baseButton__success;
        case "common":
            return styles.baseButton__common;
        case "backdown":
            return styles.baseButton__backdown;
        default:
            return styles.baseButton__common;
    }
}

export interface BaseButtonProps {
    text: string;
    disabled?: boolean;
    className?: string;
    onClick?: React.FormEventHandler;
    loading?: boolean;
    color?: string;
}

export default function BaseButton(props: BaseButtonProps) {
    return (
        <button
            type="submit"
            className={[
                styles.baseButton,
                props.className ? props.className : "",
                props.color ? getVariantClassName(props.color) : "",
                props.disabled !== undefined && props.disabled ? styles.baseButton__disabled : "",
            ].join(" ")}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.loading === undefined || !props.loading ? (
                props.text
            ) : (
                <CircularProgress color="inherit" size={20} className={styles.btnLoader} />
            )}
        </button>
    );
}
