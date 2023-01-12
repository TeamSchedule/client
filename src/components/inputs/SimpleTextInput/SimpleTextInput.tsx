import React from "react";
import styles from "./SimpleTextInput.module.scss";
import { TextField } from "@mui/material";

interface SimpleTextInputProps {
    value: string;
    handleChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    isOk?: boolean;
    className?: string;
}

export default function SimpleTextInput(props: SimpleTextInputProps) {
    return (
        <>
            <TextField
                id="standard-basic"
                label={props.label}
                variant="outlined"
                value={props.value}
                onChange={(e) => props.handleChange(e.target.value)}
                fullWidth={true}
                className={props.className}
            />
        </>
    );
}

interface InputLabelTextProps {
    text?: string;
}

function InputLabelText(props: InputLabelTextProps) {
    if (!props.text) return null;
    return (
        <>
            <span className={styles.inputLabelText}>{props.text}</span>
        </>
    );
}
