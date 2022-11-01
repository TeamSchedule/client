import React from "react";
import { TextField } from "@mui/material";

export interface TextInputProps {
    label: string;
    value: string;
    handleChange: (textValue: string) => void;
    className?: string;
}

export default function TextInput(props: TextInputProps) {
    return (
        <>
            <TextField
                id="standard-basic"
                label={props.label}
                variant="filled"
                value={props.value}
                onChange={(e) => props.handleChange(e.target.value)}
                fullWidth={true}
                className={props.className}
            />
        </>
    );
}
