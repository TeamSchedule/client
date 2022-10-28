import React from "react";
import { TextField } from "@mui/material";

export interface InputTextFormItemProps {
    label: string;
    value: string;
    handleChange: (textValue: string) => void;
    className?: string;
}

export default function InputTextFormItem({
    label,
    value,
    handleChange,
    className,
}: InputTextFormItemProps) {
    return (
        <>
            <TextField
                id="standard-basic"
                label={label}
                variant="filled"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                fullWidth={true}
                className={className}
            />
        </>
    );
}
